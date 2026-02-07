import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    Wrench,
    GraduationCap,
    Mail,
    LogOut,
    ExternalLink,
    X
} from 'lucide-react';
import { useAuth } from './AuthProvider';
import logo from '../../assets/logo.webp';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/cp-7x9k2m/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <a href="/cp-7x9k2m" className="sidebar-logo">
                    <div className="logo-icon p-0 overflow-hidden bg-white">
                        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="logo-text">Admin</div>
                </a>
                {onClose && (
                    <button className="sidebar-close-btn" onClick={onClose} aria-label="Close Sidebar">
                        <X size={24} />
                    </button>
                )}
            </div>

            <nav className="sidebar-nav">
                <NavLink
                    to="/cp-7x9k2m"
                    end
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <div className="sidebar-section-label" style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    opacity: 0.5,
                    marginTop: '0.5rem'
                }}>Content</div>

                <NavLink
                    to="/cp-7x9k2m/projects"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                >
                    <FolderKanban size={20} />
                    <span>Projects</span>
                </NavLink>

                <NavLink
                    to="/cp-7x9k2m/skills"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                >
                    <Wrench size={20} />
                    <span>Skills</span>
                </NavLink>

                <NavLink
                    to="/cp-7x9k2m/qualifications"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                >
                    <GraduationCap size={20} />
                    <span>Qualifications</span>
                </NavLink>

                <NavLink
                    to="/cp-7x9k2m/messages"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                >
                    <Mail size={20} />
                    <span>Messages</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="nav-item"
                    style={{ marginBottom: '0.5rem' }}
                >
                    <ExternalLink size={20} />
                    <span>View Website</span>
                </a>

                <button onClick={handleLogout} className="nav-item logout">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
