import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// Helper to get simple device info
const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    let deviceType = 'desktop';
    if (/mobile/i.test(ua)) deviceType = 'mobile';
    else if (/tablet|ipad/i.test(ua)) deviceType = 'tablet';

    let os = 'Unknown';
    if (ua.indexOf('Win') !== -1) os = 'Windows';
    else if (ua.indexOf('Mac') !== -1) os = 'MacOS';
    else if (ua.indexOf('Linux') !== -1) os = 'Linux';
    else if (ua.indexOf('Android') !== -1) os = 'Android';
    else if (ua.indexOf('like Mac') !== -1) os = 'iOS';

    let browser = 'Unknown';
    if (ua.indexOf('Chrome') !== -1) browser = 'Chrome';
    else if (ua.indexOf('Firefox') !== -1) browser = 'Firefox';
    else if (ua.indexOf('Safari') !== -1) browser = 'Safari';
    else if (ua.indexOf('Edge') !== -1) browser = 'Edge';

    return { deviceType, os, browser, userAgent: ua };
};

export function useAnalytics() {
    const location = useLocation();
    const initialized = useRef(false);

    // Function to track custom events with retry logic
    const trackEvent = async (category: string, action: string, label?: string) => {
        try {
            // Wait for visitorId to be set (with retry)
            let visitorId = sessionStorage.getItem('visitor_id');
            let attempts = 0;
            const maxAttempts = 10;

            while (!visitorId && attempts < maxAttempts) {
                await new Promise(r => setTimeout(r, 200)); // Wait 200ms
                visitorId = sessionStorage.getItem('visitor_id');
                attempts++;
            }

            if (!visitorId) {
                console.warn('Failed to track event: visitor_id not available after retries');
                return;
            }

            const { error } = await supabase.from('analytics_events').insert({
                visitor_id: visitorId,
                event_category: category,
                event_action: action,
                event_label: label
            });

            if (error) {
                console.error('Failed to insert event:', error);
            }
        } catch (error) {
            console.error('Failed to track event:', error);
        }
    };

    useEffect(() => {
        const initSession = async () => {
            if (initialized.current) return;

            // 1. Check if session exists in sessionStorage
            let sessionId = sessionStorage.getItem('analytics_session_id');
            let visitorId = sessionStorage.getItem('visitor_id');
            const isNewSession = !sessionId;

            if (isNewSession) {
                sessionId = uuidv4();
                sessionStorage.setItem('analytics_session_id', sessionId);
            }

            // 2. Identify or Create Visitor
            // Simple approach: One visitor ID per session for now to keep it simple without cookies
            // In a robust app, you might use a persistent cookie for visitor_id

            if (!visitorId) {
                const deviceInfo = getDeviceInfo();
                const ipHash = 'anon-' + Math.random().toString(36).substring(7); // Client-side anon ID

                const { data, error } = await supabase
                    .from('analytics_visitors')
                    .insert({
                        session_id: sessionId,
                        ip_hash: ipHash,
                        user_agent: deviceInfo.userAgent,
                        device_type: deviceInfo.deviceType,
                        os: deviceInfo.os,
                        browser: deviceInfo.browser,
                        referrer: document.referrer || 'direct'
                    })
                    .select()
                    .single();

                if (!error && data) {
                    visitorId = data.id;
                    sessionStorage.setItem('visitor_id', data.id);
                }
            }

            initialized.current = true;
        };

        initSession();
    }, []);

    // Track Page Views
    useEffect(() => {
        const trackPageView = async () => {
            // Wait a bit for visitor_id to be set if it's a fresh load
            await new Promise(r => setTimeout(r, 500));

            const visitorId = sessionStorage.getItem('visitor_id');
            if (!visitorId) return;

            // Don't track admin pages for analytics (optional)
            if (location.pathname.startsWith('/cp-7x9k2m')) return;

            await supabase.from('analytics_page_views').insert({
                visitor_id: visitorId,
                path: location.pathname
            });
        };

        trackPageView();
    }, [location.pathname]);

    return { trackEvent };
}
