import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
    getAllProjects,
    getAllSkills,
    getAllQualifications,
    getContactMessages
} from '../../lib/supabase';
import {
    getVisitorStats,
    getTrafficChartData,
    getDeviceStats,
    getRecentEvents,
    type VisitorStats,
    type EventLog,
    type TimePeriod
} from '../../lib/analytics';
import {
    FolderKanban, Wrench, GraduationCap, Mail,
    Users, Activity, MousePointer, Monitor,
    BarChart3, Database
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export function Dashboard() {
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        qualifications: 0,
        messages: 0
    });
    const [analytics, setAnalytics] = useState<VisitorStats>({
        totalVisitors: 0,
        totalPageViews: 0,
        liveVisitors: 0,
        eventsCount: 0
    });
    const [trafficData, setTrafficData] = useState<any>(null);
    const [deviceData, setDeviceData] = useState<any>(null);
    const [events, setEvents] = useState<EventLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState<TimePeriod>('day');

    useEffect(() => {
        const fetchAllStats = async () => {
            try {
                const [
                    projects, skills, qualifications, messages,
                    visitorStats, traffic, devices, recentEvents
                ] = await Promise.all([
                    getAllProjects(),
                    getAllSkills(),
                    getAllQualifications(),
                    getContactMessages(),
                    getVisitorStats(period),
                    getTrafficChartData(period),
                    getDeviceStats(period),
                    getRecentEvents(period)
                ]);

                setStats({
                    projects: projects.length,
                    skills: skills.length,
                    qualifications: qualifications.length,
                    messages: messages.length
                });

                setAnalytics(visitorStats);

                // Neo-Brutalism Chart Colors
                setTrafficData({
                    labels: traffic.labels,
                    datasets: [
                        {
                            label: 'Page Views',
                            data: traffic.data,
                            borderColor: '#000000',
                            backgroundColor: '#FFD700',
                            borderWidth: 3,
                            pointBackgroundColor: '#FFFFFF',
                            pointBorderColor: '#000000',
                            pointBorderWidth: 3,
                            pointRadius: 6,
                            pointHoverRadius: 8,
                            tension: 0,
                            fill: false
                        }
                    ]
                });

                setDeviceData({
                    labels: devices.labels,
                    datasets: [
                        {
                            data: devices.data,
                            backgroundColor: [
                                '#FFD700', // Yellow - Desktop
                                '#FF6B6B', // Coral - Mobile
                                '#4ECDC4'  // Teal - Tablet
                            ],
                            borderColor: '#000000',
                            borderWidth: 3,
                        },
                    ],
                });

                setEvents(recentEvents);

            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllStats();
        const interval = setInterval(fetchAllStats, 30000);
        return () => clearInterval(interval);
    }, [period]); // Re-fetch when period changes

    // Neo-Brutalism Chart Options
    const lineChartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#000000',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                padding: 12,
                cornerRadius: 0,
                displayColors: false,
                borderWidth: 0,
                titleFont: { weight: 'bold' as const },
                bodyFont: { weight: 'bold' as const }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#000000',
                    font: { weight: 'bold' as const }
                },
                border: { display: true, color: '#000000', width: 3 }
            },
            y: {
                grid: {
                    color: '#e5e5e5',
                    lineWidth: 2
                },
                ticks: {
                    color: '#000000',
                    font: { weight: 'bold' as const },
                    stepSize: 1
                },
                border: { display: true, color: '#000000', width: 3 }
            }
        }
    };

    const doughnutOptions = {
        maintainAspectRatio: false,
        responsive: true,
        cutout: '60%',
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#000000',
                    usePointStyle: true,
                    boxWidth: 16,
                    padding: 20,
                    font: { weight: 'bold' as const, size: 12 }
                }
            }
        }
    };

    return (
        <AdminLayout>
            {/* HEADER - Uses .page-header style */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Dashboard</h1>
                    <p style={{ fontWeight: 600, opacity: 0.7, marginTop: '0.25rem' }}>
                        Overview metrics and content management.
                    </p>
                </div>
                {/* System Status Badge - Neo-Brutalism Style */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'var(--admin-surface)',
                    border: '3px solid var(--admin-border)',
                    boxShadow: '4px 4px 0 var(--admin-border)',
                    padding: '0.5rem 1rem'
                }}>
                    <span style={{ position: 'relative', display: 'flex', width: '12px', height: '12px' }}>
                        <span style={{
                            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: '#4ECDC4',
                            opacity: 0.75
                        }}></span>
                        <span style={{
                            position: 'relative',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: '#4ECDC4',
                            border: '2px solid #000'
                        }}></span>
                    </span>
                    <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        System Online
                    </span>
                </div>
            </div>

            {loading ? (
                <div className="admin-loading" style={{ minHeight: '400px', background: 'transparent' }}>
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                    {/* SECTION 1: CONTENT DATABASE */}
                    <section>
                        <SectionHeader icon={Database} title="Content Database" color="#FFD700" />
                        <div className="stat-grid">
                            <StatCard
                                icon={FolderKanban}
                                value={stats.projects}
                                label="Projects"
                                colorClass="yellow"
                            />
                            <StatCard
                                icon={Wrench}
                                value={stats.skills}
                                label="Skills"
                                colorClass="coral"
                            />
                            <StatCard
                                icon={GraduationCap}
                                value={stats.qualifications}
                                label="Qualifications"
                                colorClass="teal"
                            />
                            <StatCard
                                icon={Mail}
                                value={stats.messages}
                                label="Messages"
                                colorClass="green"
                            />
                        </div>
                    </section>

                    {/* SECTION 2: ANALYTICS */}
                    <section>
                        {/* Header with Period Filter */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1.25rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: '#4ECDC4',
                                    color: '#000000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '3px solid #000000',
                                    boxShadow: '3px 3px 0 #000000'
                                }}>
                                    <BarChart3 size={20} strokeWidth={2.5} />
                                </div>
                                <h2 style={{
                                    fontWeight: 900,
                                    fontSize: '1.25rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '-0.5px',
                                    color: '#000000'
                                }}>
                                    Analytics
                                </h2>
                            </div>

                            {/* Period Filter Buttons */}
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <PeriodButton
                                    label="Today"
                                    active={period === 'day'}
                                    onClick={() => setPeriod('day')}
                                />
                                <PeriodButton
                                    label="7 Days"
                                    active={period === 'week'}
                                    onClick={() => setPeriod('week')}
                                />
                                <PeriodButton
                                    label="30 Days"
                                    active={period === 'month'}
                                    onClick={() => setPeriod('month')}
                                />
                            </div>
                        </div>

                        {/* Analytics Stats */}
                        <div className="stat-grid" style={{ marginBottom: '1.5rem' }}>
                            <StatCard
                                icon={Users}
                                value={analytics.totalVisitors}
                                label="Unique Visitors"
                                colorClass="yellow"
                            />
                            <StatCard
                                icon={Activity}
                                value={analytics.totalPageViews}
                                label="Page Views"
                                colorClass="coral"
                            />
                            <StatCard
                                icon={Monitor}
                                value={analytics.liveVisitors}
                                label="Active Now"
                                colorClass="teal"
                                isLive
                            />
                            <StatCard
                                icon={MousePointer}
                                value={analytics.eventsCount}
                                label="Total Events"
                                colorClass="green"
                            />
                        </div>

                        {/* CHARTS ROW */}
                        <div className="dashboard-charts-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '1.5rem',
                            marginBottom: '1.5rem'
                        }}>
                            {/* Traffic Chart */}
                            <div className="admin-card dashboard-traffic-card" style={{ gridColumn: 'span 2' }}>
                                <h3 style={{
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    textTransform: 'uppercase',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <Activity size={20} /> Traffic Overview
                                </h3>
                                <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1.5rem', fontWeight: 600 }}>
                                    Daily page views for the last 7 days
                                </p>
                                <div style={{ height: '280px', minHeight: '200px', width: '100%', position: 'relative' }}>
                                    {trafficData && <Line data={trafficData} options={lineChartOptions} />}
                                </div>
                            </div>

                            {/* Device Chart */}
                            <div className="admin-card">
                                <h3 style={{
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    textTransform: 'uppercase',
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <Monitor size={20} /> Devices
                                </h3>
                                <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1.5rem', fontWeight: 600 }}>
                                    Visitor breakdown by device
                                </p>
                                <div style={{ height: '240px', display: 'flex', justifyContent: 'center' }}>
                                    {deviceData && <Doughnut data={deviceData} options={doughnutOptions} />}
                                </div>
                            </div>
                        </div>

                        {/* ACTIVITY LOG */}
                        <div className="admin-card">
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '1.5rem'
                            }}>
                                <div>
                                    <h3 style={{
                                        fontWeight: 800,
                                        fontSize: '1.1rem',
                                        textTransform: 'uppercase',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <Activity size={20} /> Activity Log
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.25rem', fontWeight: 600 }}>
                                        Recent user interactions
                                    </p>
                                </div>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    background: '#000',
                                    color: '#fff',
                                    padding: '0.25rem 0.75rem',
                                    textTransform: 'uppercase'
                                }}>
                                    Last 5 Events
                                </span>
                            </div>

                            {events.length === 0 ? (
                                <div className="empty-state" style={{ padding: '3rem' }}>
                                    <p>No activity recorded yet.</p>
                                </div>
                            ) : (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                    gap: '1rem'
                                }}>
                                    {events.slice(0, 5).map((event) => (
                                        <ActivityCard key={event.id} event={event} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                </div>
            )}
        </AdminLayout>
    );
}

// ============================================
// SUB-COMPONENTS - Neo-Brutalism Style
// ============================================

function PeriodButton({
    label,
    active,
    onClick
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: '3px solid #000000',
                background: active ? '#FFD700' : '#FFFFFF',
                color: '#000000',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: active ? '3px 3px 0 #000000' : 'none',
                transform: active ? 'translate(-2px, -2px)' : 'none'
            }}
        >
            {label}
        </button>
    );
}

function SectionHeader({ icon: Icon, title, color = '#FFD700' }: { icon: any; title: string; color?: string }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                background: color,
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0 #000000'
            }}>
                <Icon size={20} strokeWidth={2.5} />
            </div>
            <h2 style={{
                fontWeight: 900,
                fontSize: '1.25rem',
                textTransform: 'uppercase',
                letterSpacing: '-0.5px',
                color: '#000000'
            }}>
                {title}
            </h2>
        </div>
    );
}

function StatCard({
    icon: Icon,
    value,
    label,
    colorClass = 'white',
    secondary = false,
    isLive = false
}: {
    icon: any;
    value: number;
    label: string;
    colorClass?: 'yellow' | 'coral' | 'teal' | 'green' | 'white';
    secondary?: boolean;
    isLive?: boolean;
}) {
    return (
        <div className="stat-card" style={{ position: 'relative' }}>
            <div className={`stat-icon ${colorClass}`}>
                <Icon size={28} strokeWidth={2.5} />
            </div>
            <div className="stat-content">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {value.toLocaleString()}
                    {isLive && (
                        <span style={{
                            position: 'relative',
                            display: 'inline-flex',
                            width: '10px',
                            height: '10px'
                        }}>
                            <span style={{
                                animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: '#FF6B6B',
                                opacity: 0.75
                            }}></span>
                            <span style={{
                                position: 'relative',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: '#FF6B6B',
                                border: '2px solid #000'
                            }}></span>
                        </span>
                    )}
                </h3>
                <p>{label}</p>
            </div>
        </div>
    );
}

function ActivityCard({ event }: { event: EventLog }) {
    const getCategoryStyle = (category: string) => {
        switch (category) {
            case 'social':
                return { bg: '#FF6B6B', icon: Users };
            case 'project':
                return { bg: '#FFD700', icon: FolderKanban };
            case 'engagement':
                return { bg: '#4ECDC4', icon: MousePointer };
            default:
                return { bg: '#FFFFFF', icon: Activity };
        }
    };

    const { bg, icon: Icon } = getCategoryStyle(event.event_category);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            padding: '1rem',
            background: 'var(--admin-surface)',
            border: '3px solid var(--admin-border)',
            boxShadow: '4px 4px 0 var(--admin-border)',
            transition: 'all 0.15s ease'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '6px 6px 0 var(--admin-border)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '4px 4px 0 var(--admin-border)';
            }}
        >
            {/* Icon */}
            <div style={{
                width: '40px',
                height: '40px',
                background: bg,
                border: '3px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                <Icon size={18} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    textTransform: 'capitalize',
                    marginBottom: '0.25rem'
                }}>
                    {event.event_action.replace(/_/g, ' ')}
                </p>
                <p style={{
                    fontSize: '0.8rem',
                    opacity: 0.7,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {event.event_label || 'Unknown'}
                </p>
                <p style={{
                    fontSize: '0.7rem',
                    fontFamily: 'monospace',
                    opacity: 0.5,
                    marginTop: '0.5rem',
                    fontWeight: 600
                }}>
                    {new Date(event.created_at).toLocaleString()}
                </p>
            </div>
        </div>
    );
}
