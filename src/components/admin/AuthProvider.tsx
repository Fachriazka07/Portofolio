import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase, getSession, onAuthStateChange } from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    loading: true,
    signOut: async () => { }
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        getSession().then((sess) => {
            setSession(sess);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = onAuthStateChange((sess) => {
            setSession(sess);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ session, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
