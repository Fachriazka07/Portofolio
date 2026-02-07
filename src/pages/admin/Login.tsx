import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, generateAndStoreOTP, verifyOTP } from '../../lib/supabase';
import { Lock, Mail, Loader2, AlertCircle, Eye, EyeOff, ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react';
import emailjs from '@emailjs/browser';
import '../../components/admin/AdminStyles.css';

// Initialize EmailJS
emailjs.init("3smaLC9f1M-IRp8xe");

type LoginStep = 'password' | 'otp';

export function Login() {
    const [step, setStep] = useState<LoginStep>('password');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [userId, setUserId] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialCheck, setInitialCheck] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
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

    // Step 1: Verify password and send OTP
    const handlePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // First verify credentials with Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                // Generate OTP FIRST while still authenticated
                const otp = await generateAndStoreOTP(data.user.id);
                setUserId(data.user.id);

                // NOW sign out - we need OTP verification first
                await supabase.auth.signOut();

                // Send OTP via EmailJS
                await emailjs.send(
                    'service_ad5vyn1',
                    'template_otp_admin', // You need to create this template in EmailJS
                    {
                        to_email: email,
                        otp_code: otp,
                        expires_in: '5 minutes'
                    }
                );

                setStep('otp');
                setSuccess('Verification code sent to your email!');
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

    // Step 2: Verify OTP and complete login
    const handleOTPSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (!userId) throw new Error('Session expired. Please try again.');

            // Verify OTP
            await verifyOTP(userId, otpCode);

            // OTP is valid - now actually sign in
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.session) {
                navigate('/cp-7x9k2m');
            }
        } catch (err: any) {
            console.error('OTP verification error:', err);
            setError(err.message || 'Invalid verification code');
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const handleResendOTP = async () => {
        if (!userId) return;
        setLoading(true);
        setError(null);

        try {
            const otp = await generateAndStoreOTP(userId);

            await emailjs.send(
                'service_ad5vyn1',
                'template_otp_admin',
                {
                    to_email: email,
                    otp_code: otp,
                    expires_in: '5 minutes'
                }
            );

            setSuccess('New verification code sent!');
        } catch (err: any) {
            setError('Failed to resend code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Go back to password step
    const handleBack = () => {
        setStep('password');
        setOtpCode('');
        setError(null);
        setSuccess(null);
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
                            {step === 'password' ? (
                                <Lock size={28} strokeWidth={2.5} />
                            ) : (
                                <KeyRound size={28} strokeWidth={2.5} />
                            )}
                        </div>
                        <div>
                            <h1 style={styles.headerTitle}>
                                {step === 'password' ? 'Admin Access' : 'Verify Code'}
                            </h1>
                            <p style={styles.headerSubtitle}>
                                {step === 'password' ? 'Secured Terminal' : 'Check your email'}
                            </p>
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

                        {success && (
                            <div style={styles.successBox}>
                                <ShieldCheck size={20} style={{ color: '#22C55E', flexShrink: 0 }} />
                                <p style={styles.successText}>{success}</p>
                            </div>
                        )}

                        {step === 'password' ? (
                            // STEP 1: Password Form
                            <form onSubmit={handlePasswordSubmit}>
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
                                            <span>Continue</span>
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
                        ) : (
                            // STEP 2: OTP Verification Form
                            <form onSubmit={handleOTPSubmit}>
                                <p style={styles.otpDescription}>
                                    Enter the 6-digit verification code sent to <strong>{email}</strong>
                                </p>

                                {/* OTP Field */}
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>
                                        <KeyRound size={14} />
                                        Verification Code
                                    </label>
                                    <div style={styles.inputWrapper}>
                                        <KeyRound size={20} style={styles.inputIcon} />
                                        <input
                                            type="text"
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            style={{ ...styles.input, letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.5rem' }}
                                            placeholder="000000"
                                            maxLength={6}
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading || otpCode.length !== 6}
                                    className="btn btn-primary w-full justify-center py-4 text-xl font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 hover:bg-cyan-400 active:scale-95 transition-all duration-200"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            <span>Verifying...</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck size={24} />
                                            <span>Verify & Login</span>
                                        </>
                                    )}
                                </button>

                                {/* Resend & Back */}
                                <div style={styles.otpActions}>
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={loading}
                                        style={styles.resendButton}
                                    >
                                        Resend Code
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        style={styles.backButton}
                                    >
                                        <ArrowLeft size={16} />
                                        Back
                                    </button>
                                </div>
                            </form>
                        )}
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
    successBox: {
        background: '#DCFCE7',
        border: '3px solid #22C55E',
        padding: '1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem'
    },
    successText: {
        fontWeight: 700,
        fontSize: '0.9rem',
        color: '#15803D',
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
    otpDescription: {
        fontSize: '0.95rem',
        color: '#444',
        marginBottom: '1.5rem',
        lineHeight: 1.5
    },
    otpActions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1.5rem',
        paddingTop: '1.5rem',
        borderTop: '2px dashed rgba(0,0,0,0.1)'
    },
    resendButton: {
        background: 'transparent',
        border: 'none',
        color: '#6366F1',
        fontWeight: 700,
        fontSize: '0.9rem',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'transparent',
        border: 'none',
        color: '#000',
        fontWeight: 700,
        fontSize: '0.9rem',
        cursor: 'pointer'
    }
};
