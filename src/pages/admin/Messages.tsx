import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getContactMessages, deleteContactMessage, type ContactMessage } from '../../lib/supabase';
import { Mail, Trash2, Clock, MessageSquare, Copy, Check, X, Send } from 'lucide-react';
import '../../components/admin/AdminStyles.css';

export function Messages() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [copied, setCopied] = useState(false);
    const [replyModal, setReplyModal] = useState(false);

    const fetchMessages = async () => {
        try {
            const data = await getContactMessages();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            await deleteContactMessage(id);
            await fetchMessages();
            if (selectedMessage?.id === id) {
                setSelectedMessage(null);
            }
        } catch (error) {
            console.error('Failed to delete message:', error);
            alert('Failed to delete message');
        }
    };

    const copyEmail = async (email: string) => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout>
            <div className="page-header">
                <h1 className="page-title">Messages</h1>
                <span style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--admin-primary)',
                    border: '2px solid var(--admin-border)',
                    fontWeight: 700
                }}>
                    {messages.length} total
                </span>
            </div>

            {loading ? (
                <div className="admin-loading" style={{ minHeight: '300px' }}>
                    <div className="loading-spinner" />
                </div>
            ) : messages.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <Mail size={40} />
                    </div>
                    <h3>No messages yet</h3>
                    <p>Messages from your contact form will appear here</p>
                </div>
            ) : (
                <div className="messages-grid">
                    {/* Message List */}
                    <div className="admin-card message-list-card" style={{ padding: 0, overflow: 'auto' }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                style={{
                                    padding: '1rem',
                                    borderBottom: '2px solid var(--admin-border)',
                                    cursor: 'pointer',
                                    background: selectedMessage?.id === msg.id ? 'var(--admin-primary)' : 'transparent',
                                    transition: 'background 0.15s ease',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', gap: '1rem' }}>
                                    <strong style={{ fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {msg.name}
                                    </strong>
                                    <span style={{ fontSize: '0.75rem', opacity: 0.7, flexShrink: 0 }}>
                                        {formatDate(msg.created_at)}
                                    </span>
                                </div>
                                <p style={{
                                    fontSize: '0.85rem',
                                    opacity: 0.8,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {msg.message}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Message Detail */}
                    <div className="admin-card message-detail-card">
                        {selectedMessage ? (
                            <>
                                <div className="message-detail-header">
                                    <div>
                                        <h2 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                                            {selectedMessage.name}
                                        </h2>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                <Mail size={14} />
                                                {selectedMessage.email}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                <Clock size={14} />
                                                {formatDate(selectedMessage.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="message-actions">
                                        <button
                                            className="btn btn-primary btn-small"
                                            onClick={() => setReplyModal(true)}
                                        >
                                            <Send size={14} />
                                            <span>Reply</span>
                                        </button>
                                        <button
                                            className="btn btn-danger btn-small"
                                            onClick={() => handleDelete(selectedMessage.id)}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div style={{
                                    padding: '1.5rem',
                                    background: 'var(--admin-bg)',
                                    border: '2px solid var(--admin-border)',
                                    lineHeight: 1.7,
                                    wordBreak: 'break-word'
                                }}>
                                    {selectedMessage.message}
                                </div>
                            </>
                        ) : (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '300px',
                                opacity: 0.5
                            }}>
                                <MessageSquare size={48} />
                                <p style={{ marginTop: '1rem' }}>Select a message to view</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Reply Modal */}
            {replyModal && selectedMessage && (
                <div className="modal-overlay" onClick={() => setReplyModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="modal-header">
                            <h2 className="modal-title">Reply to {selectedMessage.name}</h2>
                            <button className="modal-close" onClick={() => setReplyModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
                                Copy email address to reply via your email client:
                            </p>

                            <div style={{
                                display: 'flex',
                                gap: '0.5rem',
                                padding: '1rem',
                                background: 'var(--admin-bg)',
                                border: '3px solid var(--admin-border)',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontWeight: 700, wordBreak: 'break-all' }}>
                                    {selectedMessage.email}
                                </span>
                                <button
                                    className="btn btn-primary btn-small"
                                    onClick={() => copyEmail(selectedMessage.email)}
                                    style={{ flexShrink: 0 }}
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <p style={{ fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                                    Original Message:
                                </p>
                                <div style={{
                                    padding: '1rem',
                                    background: 'var(--admin-bg)',
                                    border: '2px solid var(--admin-border)',
                                    fontSize: '0.9rem',
                                    maxHeight: '150px',
                                    overflow: 'auto'
                                }}>
                                    {selectedMessage.message}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setReplyModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
