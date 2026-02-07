import { supabase } from './supabase';

export type TimePeriod = 'day' | 'week' | 'month';

export interface VisitorStats {
    totalVisitors: number;
    totalPageViews: number;
    liveVisitors: number;
    eventsCount: number;
}

export interface EventLog {
    id: string;
    event_category: string;
    event_action: string;
    event_label: string;
    created_at: string;
    visitor?: {
        country?: string;
        device_type?: string;
    };
}

/**
 * Get the start date based on the selected time period
 */
const getStartDate = (period: TimePeriod): Date => {
    const now = new Date();
    switch (period) {
        case 'day':
            // Start of today (00:00:00)
            return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        case 'week':
            // 7 days ago
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return weekAgo;
        case 'month':
            // 30 days ago
            const monthAgo = new Date(now);
            monthAgo.setDate(monthAgo.getDate() - 30);
            return monthAgo;
        default:
            return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
};

/**
 * Get visitor statistics filtered by time period
 */
export const getVisitorStats = async (period: TimePeriod = 'day'): Promise<VisitorStats> => {
    const startDate = getStartDate(period);
    const startISO = startDate.toISOString();

    // Total Visitors in period
    const { count: totalVisitors } = await supabase
        .from('analytics_visitors')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startISO);

    // Total Page Views in period
    const { count: totalPageViews } = await supabase
        .from('analytics_page_views')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startISO);

    // Live Visitors (Active in last 15 minutes)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count: liveVisitors } = await supabase
        .from('analytics_page_views')
        .select('visitor_id', { count: 'exact', head: true })
        .gte('created_at', fifteenMinutesAgo);

    // Events count in period
    const { count: eventsCount } = await supabase
        .from('analytics_events')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startISO);

    return {
        totalVisitors: totalVisitors || 0,
        totalPageViews: totalPageViews || 0,
        liveVisitors: liveVisitors || 0,
        eventsCount: eventsCount || 0
    };
};

/**
 * Get recent events filtered by time period
 */
export const getRecentEvents = async (period: TimePeriod = 'day', limit = 10): Promise<EventLog[]> => {
    const startDate = getStartDate(period);

    const { data } = await supabase
        .from('analytics_events')
        .select(`
            id,
            event_category,
            event_action,
            event_label,
            created_at,
            visitor:analytics_visitors (
                country,
                device_type
            )
        `)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .limit(limit);

    return (data as any[]) || [];
};

/**
 * Get traffic chart data based on period
 */
export const getTrafficChartData = async (period: TimePeriod = 'day') => {
    let days: number;
    let labelFormat: Intl.DateTimeFormatOptions;

    switch (period) {
        case 'day':
            days = 1;
            // For day view, show hours
            labelFormat = { hour: '2-digit', minute: '2-digit' };
            break;
        case 'week':
            days = 7;
            labelFormat = { weekday: 'short', day: 'numeric' };
            break;
        case 'month':
            days = 30;
            labelFormat = { month: 'short', day: 'numeric' };
            break;
        default:
            days = 7;
            labelFormat = { month: 'short', day: 'numeric' };
    }

    const startDate = getStartDate(period);

    const { data } = await supabase
        .from('analytics_page_views')
        .select('created_at')
        .gte('created_at', startDate.toISOString());

    if (period === 'day') {
        // For daily view, group by hour (24 hours)
        const hours = new Array(24).fill(0);
        const labels = hours.map((_, i) => {
            const hour = i.toString().padStart(2, '0');
            return `${hour}:00`;
        });

        data?.forEach(row => {
            const date = new Date(row.created_at);
            const hour = date.getHours();
            hours[hour]++;
        });

        return { labels, data: hours };
    } else {
        // For week/month view, group by day
        const dates = new Array(days).fill(0).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (days - 1 - i));
            return d.toLocaleDateString('en-US', labelFormat);
        });

        const pageViews = new Array(days).fill(0);

        data?.forEach(row => {
            const date = new Date(row.created_at);
            const dateStr = date.toLocaleDateString('en-US', labelFormat);
            const index = dates.indexOf(dateStr);
            if (index !== -1) pageViews[index]++;
        });

        return { labels: dates, data: pageViews };
    }
};

/**
 * Get device statistics filtered by time period
 */
export const getDeviceStats = async (period: TimePeriod = 'day') => {
    const startDate = getStartDate(period);

    const { data } = await supabase
        .from('analytics_visitors')
        .select('device_type')
        .gte('created_at', startDate.toISOString());

    const devices = { desktop: 0, mobile: 0, tablet: 0 };
    data?.forEach((row: any) => {
        const type = (row.device_type || 'desktop') as keyof typeof devices;
        if (devices[type] !== undefined) devices[type]++;
    });

    return {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        data: [devices.desktop, devices.mobile, devices.tablet]
    };
};
