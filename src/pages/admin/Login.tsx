import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, Loader2, AlertCircle, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';
import '../../components/admin/AdminStyles.css';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialCheck, setInitialCheck] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                navigate('/cp-7x9k2m');
            }
            setInitialCheck(false);
        };
        checkSession();
    }, [navigate]);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.session) {
                navigate('/cp-7x9k2m');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            let message = 'Failed to login';
            if (err.message === 'Invalid login credentials') {
                message = 'Invalid email or password. Please try again.';
            } else {
                message = err.message || 'An unexpected error occurred.';
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (initialCheck) {
        return (
            <div className="login-page" style={styles.loadingContainer}>
                <Loader2 className="animate-spin" size={48} style={{ color: '#FFD700' }} />
                <p style={styles.loadingText}>Checking Security...</p>
            </div>
        );
    }

    return (
        <div className="login-page" style={styles.container}>
            {/* Subtle Grid Background */}
            <div style={styles.gridOverlay} />

            {/* Decorative Shapes */}
            <div style={{ ...styles.shape, ...styles.shapeYellow }} />
            <div style={{ ...styles.shape, ...styles.shapeTeal }} />
            <div style={{ ...styles.shape, ...styles.shapeCoral }} />

            {/* Login Card */}
            <div style={styles.cardWrapper}>
                {/* Shadow Layer */}
                <div style={styles.cardShadow} />

                {/* Main Card */}
                <div style={styles.card}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={styles.headerIcon}>
                            <Lock size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 style={styles.headerTitle}>Admin Access</h1>
                            <p style={styles.headerSubtitle}>Secured Terminal</p>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div style={styles.content}>
                        {error && (
                            <div style={styles.errorBox}>
                                <AlertCircle size={20} style={{ color: '#FF6B6B', flexShrink: 0 }} />
                                <p style={styles.errorText}>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            {/* Email Field */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <Mail size={14} />
                                    Email Address
                                </label>
                                <div style={styles.inputWrapper}>
                                    <Mail size={20} style={styles.inputIcon} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={styles.input}
                                        placeholder="admin@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <Lock size={14} />
                                    Password
                                </label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={20} style={styles.inputIcon} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ ...styles.input, paddingRight: '3.5rem' }}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={styles.eyeButton}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary w-full justify-center py-4 text-xl font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 hover:bg-cyan-400 active:scale-95 transition-all duration-200"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        <span>Verifying...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Authorize</span>
                                    </>
                                )}
                            </button>

                            {/* Footer */}
                            <div style={styles.footer}>
                                <a href="/" style={styles.backLink}>
                                    <ArrowLeft size={16} />
                                    Back to Site
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================
// STYLES - Neo-Brutalism
// ============================================
const styles: { [key: string]: React.CSSProperties } = {
    loadingContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        background: '#FFFEF0'
    },
    loadingText: {
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontSize: '0.85rem',
        opacity: 0.5,
        color: '#000'
    },
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        background: '#FFFEF0'
    },
    gridOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
    },
    shape: {
        position: 'absolute',
        border: '4px solid #000',
        boxShadow: '8px 8px 0 #000'
    },
    shapeYellow: {
        top: '10%',
        left: '8%',
        width: '80px',
        height: '80px',
        background: '#FFD700',
        transform: 'rotate(-12deg)'
    },
    shapeTeal: {
        bottom: '15%',
        right: '10%',
        width: '100px',
        height: '100px',
        background: '#4ECDC4',
        transform: 'rotate(12deg)'
    },
    shapeCoral: {
        top: '25%',
        right: '15%',
        width: '50px',
        height: '50px',
        background: '#FF6B6B',
        transform: 'rotate(45deg)'
    },
    cardWrapper: {
        position: 'relative',
        width: '100%',
        maxWidth: '420px'
    },
    cardShadow: {
        position: 'absolute',
        inset: 0,
        background: '#000',
        transform: 'translate(8px, 8px)'
    },
    card: {
        position: 'relative',
        background: '#FFFFFF',
        border: '4px solid #000',
        overflow: 'hidden'
    },
    header: {
        background: '#FFD700',
        borderBottom: '4px solid #000',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    headerIcon: {
        width: '56px',
        height: '56px',
        background: '#FFFFFF',
        border: '3px solid #000',
        boxShadow: '4px 4px 0 #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: '1.75rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '-1px',
        margin: 0,
        color: '#000'
    },
    headerSubtitle: {
        fontSize: '0.85rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        opacity: 0.7,
        margin: 0,
        color: '#000'
    },
    content: {
        padding: '2rem'
    },
    errorBox: {
        background: '#FEE2E2',
        border: '3px solid #FF6B6B',
        padding: '1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem'
    },
    errorText: {
        fontWeight: 700,
        fontSize: '0.9rem',
        color: '#B91C1C',
        margin: 0
    },
    formGroup: {
        marginBottom: '1.5rem'
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: 800,
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '0.5rem',
        color: '#000'
    },
    inputWrapper: {
        position: 'relative'
    },
    inputIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 0.4,
        color: '#000'
    },
    input: {
        width: '100%',
        padding: '1rem 1rem 1rem 3rem',
        fontSize: '1rem',
        fontWeight: 600,
        border: '3px solid #000',
        background: '#FFFFFF',
        outline: 'none',
        transition: 'all 0.15s ease',
        boxSizing: 'border-box'
    },
    eyeButton: {
        position: 'absolute',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'transparent',
        border: 'none',
        opacity: 0.4,
        cursor: 'pointer',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000'
    },
    submitButton: {
        width: '100%',
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        background: '#FFD700',
        color: '#000',
        border: '3px solid #000',
        boxShadow: '6px 6px 0 #000',
        transition: 'all 0.15s ease',
        marginTop: '0.5rem'
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1.5rem',
        paddingTop: '1.5rem',
        borderTop: '2px dashed rgba(0,0,0,0.1)'
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        fontWeight: 700,
        color: '#000',
        textDecoration: 'none',
        transition: 'color 0.15s ease'
    },
    version: {
        fontSize: '0.7rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        opacity: 0.3,
        color: '#000'
    }
};
