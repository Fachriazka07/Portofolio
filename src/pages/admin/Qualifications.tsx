import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
    getQualifications,
    createQualification,
    updateQualification,
    deleteQualification,
    type Qualification
} from '../../lib/supabase';
import { Plus, Pencil, Trash2, X, GraduationCap, Briefcase } from 'lucide-react';
import '../../components/admin/AdminStyles.css';

type QualificationForm = Omit<Qualification, 'id' | 'created_at'>;

const emptyForm: QualificationForm = {
    type: 'education',
    title: '',
    subtitle: '',
    start_date: null,
    end_date: null,
    description: '',
    display_order: 0,
    is_visible: true,
};

export function Qualifications() {
    const [qualifications, setQualifications] = useState<Qualification[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<QualificationForm>(emptyForm);
    const [saving, setSaving] = useState(false);

    const fetchQualifications = async () => {
        try {
            const data = await getQualifications();
            setQualifications(data);
        } catch (error) {
            console.error('Failed to fetch qualifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQualifications();
    }, []);

    const openModal = (qual?: Qualification) => {
        if (qual) {
            setEditingId(qual.id);
            setForm({
                type: qual.type,
                title: qual.title,
                subtitle: qual.subtitle || '',
                start_date: qual.start_date,
                end_date: qual.end_date,
                description: qual.description || '',
                display_order: qual.display_order,
                is_visible: qual.is_visible,
            });
        } else {
            setEditingId(null);
            setForm(emptyForm);
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (editingId) {
                await updateQualification(editingId, form);
            } else {
                await createQualification(form);
            }
            await fetchQualifications();
            closeModal();
        } catch (error) {
            console.error('Failed to save qualification:', error);
            alert('Failed to save qualification');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this qualification?')) return;

        try {
            await deleteQualification(id);
            await fetchQualifications();
        } catch (error) {
            console.error('Failed to delete qualification:', error);
            alert('Failed to delete qualification');
        }
    };

    const formatDate = (date: string | null) => {
        if (!date) return 'Present';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Group by type
    const education = qualifications.filter(q => q.type === 'education');
    const experience = qualifications.filter(q => q.type === 'experience');

    return (
        <AdminLayout>
            <div className="page-header">
                <h1 className="page-title">Qualifications</h1>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <Plus size={18} />
                    Add Entry
                </button>
            </div>

            {loading ? (
                <div className="admin-loading" style={{ minHeight: '300px' }}>
                    <div className="loading-spinner" />
                </div>
            ) : qualifications.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <GraduationCap size={40} />
                    </div>
                    <h3>No qualifications yet</h3>
                    <p>Add your education and experience</p>
                    <button className="btn btn-primary" onClick={() => openModal()}>
                        <Plus size={18} />
                        Add Entry
                    </button>
                </div>
            ) : (
                <div className="qualifications-grid">
                    {/* Experience */}
                    <div className="admin-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: 40,
                                height: 40,
                                background: 'var(--admin-primary)',
                                border: '3px solid var(--admin-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Briefcase size={20} />
                            </div>
                            <h3 style={{ fontWeight: 800, textTransform: 'uppercase' }}>Experience</h3>
                        </div>

                        {experience.length === 0 ? (
                            <p style={{ opacity: 0.7 }}>No experience entries yet</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {experience.map(qual => (
                                    <div
                                        key={qual.id}
                                        style={{
                                            padding: '1rem',
                                            border: '2px solid var(--admin-border)',
                                            background: 'var(--admin-bg)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{qual.title}</h4>
                                                {qual.subtitle && (
                                                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>{qual.subtitle}</p>
                                                )}
                                                <p style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.5rem' }}>
                                                    {formatDate(qual.start_date)} - {formatDate(qual.end_date)}
                                                </p>
                                            </div>
                                            <div className="table-actions">
                                                <button className="btn btn-small btn-secondary" onClick={() => openModal(qual)}>
                                                    <Pencil size={14} />
                                                </button>
                                                <button className="btn btn-small btn-danger" onClick={() => handleDelete(qual.id)}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Education */}
                    <div className="admin-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: 40,
                                height: 40,
                                background: 'var(--admin-accent)',
                                border: '3px solid var(--admin-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <GraduationCap size={20} />
                            </div>
                            <h3 style={{ fontWeight: 800, textTransform: 'uppercase' }}>Education</h3>
                        </div>

                        {education.length === 0 ? (
                            <p style={{ opacity: 0.7 }}>No education entries yet</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {education.map(qual => (
                                    <div
                                        key={qual.id}
                                        style={{
                                            padding: '1rem',
                                            border: '2px solid var(--admin-border)',
                                            background: 'var(--admin-bg)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{qual.title}</h4>
                                                {qual.subtitle && (
                                                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>{qual.subtitle}</p>
                                                )}
                                                <p style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.5rem' }}>
                                                    {formatDate(qual.start_date)} - {formatDate(qual.end_date)}
                                                </p>
                                            </div>
                                            <div className="table-actions">
                                                <button className="btn btn-small btn-secondary" onClick={() => openModal(qual)}>
                                                    <Pencil size={14} />
                                                </button>
                                                <button className="btn btn-small btn-danger" onClick={() => handleDelete(qual.id)}>
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">{editingId ? 'Edit Entry' : 'New Entry'}</h2>
                            <button className="modal-close" onClick={closeModal}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Type *</label>
                                    <select
                                        className="form-select"
                                        value={form.type}
                                        onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                                    >
                                        <option value="education">Education</option>
                                        <option value="experience">Experience</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Title *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="e.g. Software Engineer, SMKN 1 Sumedang"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Subtitle</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={form.subtitle || ''}
                                        onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                                        placeholder="e.g. Software Engineering, Internship"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Start Date</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={form.start_date || ''}
                                            onChange={(e) => setForm({ ...form, start_date: e.target.value || null })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">End Date</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={form.end_date || ''}
                                            onChange={(e) => setForm({ ...form, end_date: e.target.value || null })}
                                        />
                                        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.25rem' }}>
                                            Leave empty for "Present"
                                        </p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-textarea"
                                        value={form.description || ''}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        placeholder="Optional description..."
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Display Order</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={form.display_order}
                                            onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Visible</label>
                                        <select
                                            className="form-select"
                                            value={form.is_visible ? 'true' : 'false'}
                                            onChange={(e) => setForm({ ...form, is_visible: e.target.value === 'true' })}
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
