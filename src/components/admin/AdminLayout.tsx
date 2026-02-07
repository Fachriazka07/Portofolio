import { ReactNode, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';
import './AdminStyles.css';

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const { session, loading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-box"></div>
                <p className="font-bold uppercase tracking-widest text-sm animate-pulse">Initializing Interface...</p>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/cp-7x9k2m/login" replace />;
    }

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="admin-layout">
            {/* Mobile Header */}
            <header className="admin-mobile-header">
                <button className="mobile-toggle" onClick={toggleSidebar} aria-label="Toggle Menu">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="mobile-logo">Admin</div>
            </header>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
            )}

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="admin-main">
                {children}
            </main>
        </div>
    );
}
