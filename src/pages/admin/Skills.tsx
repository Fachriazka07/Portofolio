import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
    getAllSkills,
    createSkill,
    updateSkill,
    deleteSkill,
    type Skill
} from '../../lib/supabase';
import { resolveIconSlug, getSkillIconUrl } from '../../lib/icon-resolver';
import { Plus, X, Wrench } from 'lucide-react';
import '../../components/admin/AdminStyles.css';

type SkillForm = Omit<Skill, 'id' | 'created_at'>;

const emptyForm: SkillForm = {
    name: '',
    category: 'frontend',
    icon_slug: null,
    display_order: 0,
    is_visible: true,
};

const categories = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'languages', label: 'Languages' },
    { value: 'tools', label: 'Tools & APIs' },
];

export function Skills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<SkillForm>(emptyForm);
    const [saving, setSaving] = useState(false);
    const [iconPreview, setIconPreview] = useState<string | null>(null);

    const fetchSkills = async () => {
        try {
            const data = await getAllSkills();
            setSkills(data);
        } catch (error) {
            console.error('Failed to fetch skills:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    // Auto-resolve icon when name changes
    useEffect(() => {
        if (form.name) {
            const slug = resolveIconSlug(form.name);
            setForm(prev => ({ ...prev, icon_slug: slug }));
            if (slug) {
                setIconPreview(getSkillIconUrl(form.name));
            } else {
                setIconPreview(null);
            }
        }
    }, [form.name]);

    const openModal = (skill?: Skill) => {
        if (skill) {
            setEditingId(skill.id);
            setForm({
                name: skill.name,
                category: skill.category,
                icon_slug: skill.icon_slug,
                display_order: skill.display_order,
                is_visible: skill.is_visible,
            });
            if (skill.icon_slug) {
                setIconPreview(`https://cdn.simpleicons.org/${skill.icon_slug}/000000`);
            }
        } else {
            setEditingId(null);
            setForm(emptyForm);
            setIconPreview(null);
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingId(null);
        setForm(emptyForm);
        setIconPreview(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            console.log('[Skills] Saving skill:', form);
            if (editingId) {
                const result = await updateSkill(editingId, form);
                console.log('[Skills] Update result:', result);
            } else {
                const result = await createSkill(form);
                console.log('[Skills] Create result:', result);
            }
            await fetchSkills();
            closeModal();
        } catch (error: any) {
            console.error('[Skills] Failed to save skill:', error);
            console.error('[Skills] Error details:', error?.message || error);
            alert(`Failed to save skill: ${error?.message || 'Unknown error'}`);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            await deleteSkill(id);
            await fetchSkills();
        } catch (error) {
            console.error('Failed to delete skill:', error);
            alert('Failed to delete skill');
        }
    };

    // Group skills by category
    const groupedSkills = categories.map(cat => ({
        ...cat,
        skills: skills.filter(s => s.category === cat.value)
    }));

    return (
        <AdminLayout>
            <div className="page-header">
                <h1 className="page-title">Skills</h1>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <Plus size={18} />
                    Add Skill
                </button>
            </div>

            {loading ? (
                <div className="admin-loading" style={{ minHeight: '300px' }}>
                    <div className="loading-spinner" />
                </div>
            ) : skills.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <Wrench size={40} />
                    </div>
                    <h3>No skills yet</h3>
                    <p>Add your skills to display on your portfolio</p>
                    <button className="btn btn-primary" onClick={() => openModal()}>
                        <Plus size={18} />
                        Add Skill
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {groupedSkills.map(group => (
                        group.skills.length > 0 && (
                            <div key={group.value} className="admin-card">
                                <h3 style={{ fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase' }}>
                                    {group.label}
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    {group.skills.map(skill => (
                                        <div
                                            key={skill.id}
                                            className="tag"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem 0.75rem',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => openModal(skill)}
                                        >
                                            {skill.icon_slug && (
                                                <img
                                                    src={`https://cdn.simpleicons.org/${skill.icon_slug}/000000`}
                                                    alt={skill.name}
                                                    style={{ width: 18, height: 18 }}
                                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                                />
                                            )}
                                            {skill.name}
                                            <button
                                                className="tag-remove"
                                                onClick={(e) => { e.stopPropagation(); handleDelete(skill.id); }}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">{editingId ? 'Edit Skill' : 'New Skill'}</h2>
                            <button className="modal-close" onClick={closeModal}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Skill Name *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="e.g. Python, React, Docker"
                                        required
                                    />
                                    <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>
                                        💡 Icon will be auto-detected from the name
                                    </p>
                                </div>

                                {/* Icon Preview */}
                                <div className="form-group">
                                    <label className="form-label">Icon Preview</label>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        border: '2px dashed var(--admin-border)',
                                        background: 'var(--admin-bg)'
                                    }}>
                                        {iconPreview ? (
                                            <>
                                                <img
                                                    src={iconPreview}
                                                    alt="Icon preview"
                                                    style={{ width: 40, height: 40 }}
                                                    onError={() => setIconPreview(null)}
                                                />
                                                <span style={{ fontWeight: 600 }}>✓ Icon found: {form.icon_slug}</span>
                                            </>
                                        ) : (
                                            <span style={{ opacity: 0.7 }}>No icon detected (will use fallback)</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category *</label>
                                    <select
                                        className="form-select"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
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
