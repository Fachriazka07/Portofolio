import { useEffect, useState, useRef } from 'react';
// Re-import triggering
import { AdminLayout } from '@/components/admin/AdminLayout';
import {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage,
    deleteProjectImage,
    type Project
} from '../../lib/supabase';
import { Plus, Pencil, Trash2, X, FolderKanban, ExternalLink, Github, Upload, Image } from 'lucide-react';
import '../../components/admin/AdminStyles.css';

type ProjectForm = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

const emptyForm: ProjectForm = {
    title: '',
    description: '',
    banner_image: '',
    aspect: 'landscape',
    tech_stack: [],
    github_url: '',
    demo_url: '',
    category: 'website',
    display_order: 0,
    is_visible: true,
};

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<ProjectForm>(emptyForm);
    const [techInput, setTechInput] = useState('');
    const [saving, setSaving] = useState(false);

    // Image upload state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchProjects = async () => {
        try {
            const data = await getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const openModal = (project?: Project) => {
        if (project) {
            setEditingId(project.id);
            setForm({
                title: project.title,
                description: project.description || '',
                banner_image: project.banner_image || '',
                aspect: project.aspect,
                tech_stack: project.tech_stack || [],
                github_url: project.github_url || '',
                demo_url: project.demo_url || '',
                category: project.category,
                display_order: project.display_order,
                is_visible: project.is_visible,
            });
            // Set existing image as preview
            if (project.banner_image) {
                setImagePreview(project.banner_image);
            }
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
        setTechInput('');
        setImageFile(null);
        setImagePreview(null);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be less than 5MB');
            return;
        }

        setImageFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setForm({ ...form, banner_image: '' });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            let finalImageUrl = form.banner_image;
            const oldImageUrl = editingId ? projects.find(p => p.id === editingId)?.banner_image : null;

            // Upload new image if selected
            if (imageFile) {
                setUploading(true);
                console.log('[Projects] Uploading image...');
                finalImageUrl = await uploadProjectImage(imageFile);
                console.log('[Projects] Upload complete:', finalImageUrl);
                setUploading(false);

                // Delete old image if replacing
                if (oldImageUrl && oldImageUrl.includes('supabase')) {
                    console.log('[Projects] Deleting old image...');
                    await deleteProjectImage(oldImageUrl);
                }
            }

            const projectData = { ...form, banner_image: finalImageUrl };

            if (editingId) {
                await updateProject(editingId, projectData);
            } else {
                await createProject(projectData);
            }

            await fetchProjects();
            closeModal();
        } catch (error: any) {
            console.error('Failed to save project:', error);
            alert(`Failed to save project: ${error?.message || 'Unknown error'}`);
        } finally {
            setSaving(false);
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            // Delete image from storage first
            const project = projects.find(p => p.id === id);
            if (project?.banner_image?.includes('supabase')) {
                await deleteProjectImage(project.banner_image);
            }

            await deleteProject(id);
            await fetchProjects();
        } catch (error) {
            console.error('Failed to delete project:', error);
            alert('Failed to delete project');
        }
    };

    const addTech = () => {
        if (techInput.trim() && !form.tech_stack.includes(techInput.trim())) {
            setForm({ ...form, tech_stack: [...form.tech_stack, techInput.trim()] });
            setTechInput('');
        }
    };

    const removeTech = (tech: string) => {
        setForm({ ...form, tech_stack: form.tech_stack.filter(t => t !== tech) });
    };

    return (
        <AdminLayout>
            <div className="page-header">
                <h1 className="page-title">Projects</h1>
                <button className="btn btn-primary" onClick={() => openModal()}>
                    <Plus size={18} />
                    Add Project
                </button>
            </div>

            {/* Table */}
            {loading ? (
                <div className="admin-loading" style={{ minHeight: '300px' }}>
                    <div className="loading-spinner" />
                </div>
            ) : projects.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <FolderKanban size={40} />
                    </div>
                    <h3>No projects yet</h3>
                    <p>Add your first project to get started</p>
                    <button className="btn btn-primary" onClick={() => openModal()}>
                        <Plus size={18} />
                        Add Project
                    </button>
                </div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Tech Stack</th>
                                <th>Visible</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td>
                                        {project.banner_image ? (
                                            <img
                                                src={project.banner_image}
                                                alt={project.title}
                                                style={{
                                                    width: '60px',
                                                    height: '40px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px'
                                                }}
                                            />
                                        ) : (
                                            <div style={{
                                                width: '60px',
                                                height: '40px',
                                                background: '#f0f0f0',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Image size={16} style={{ opacity: 0.4 }} />
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <strong>{project.title}</strong>
                                    </td>
                                    <td>
                                        <span className="tag">{project.category}</span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                                            {project.tech_stack?.slice(0, 3).map(tech => (
                                                <span key={tech} className="tag" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.tech_stack?.length > 3 && (
                                                <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>
                                                    +{project.tech_stack.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{ color: project.is_visible ? 'green' : 'gray' }}>
                                            {project.is_visible ? '✓ Yes' : '✗ No'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            {project.demo_url && (
                                                <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn btn-small btn-secondary">
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                            {project.github_url && (
                                                <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-small btn-secondary">
                                                    <Github size={14} />
                                                </a>
                                            )}
                                            <button className="btn btn-small btn-secondary" onClick={() => openModal(project)}>
                                                <Pencil size={14} />
                                            </button>
                                            <button className="btn btn-small btn-danger" onClick={() => handleDelete(project.id)}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <div className="modal-header">
                            <h2 className="modal-title">{editingId ? 'Edit Project' : 'New Project'}</h2>
                            <button className="modal-close" onClick={closeModal}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Title *</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-textarea"
                                        value={form.description || ''}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Category</label>
                                        <select
                                            className="form-select"
                                            value={form.category}
                                            onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                                        >
                                            <option value="website">Website</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="desktop">Desktop</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Aspect</label>
                                        <select
                                            className="form-select"
                                            value={form.aspect}
                                            onChange={(e) => setForm({ ...form, aspect: e.target.value as any })}
                                        >
                                            <option value="landscape">Landscape</option>
                                            <option value="portrait">Portrait</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Image Upload Section */}
                                <div className="form-group">
                                    <label className="form-label">Banner Image</label>

                                    {imagePreview ? (
                                        <div style={{
                                            position: 'relative',
                                            marginBottom: '0.5rem',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            border: '1px solid var(--border-color)'
                                        }}>
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                style={{
                                                    width: '100%',
                                                    maxHeight: '200px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                style={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                    background: 'rgba(0,0,0,0.7)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '28px',
                                                    height: '28px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            style={{
                                                border: '2px dashed var(--border-color)',
                                                borderRadius: '8px',
                                                padding: '2rem',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                transition: 'border-color 0.2s',
                                                background: 'var(--bg-secondary)'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                                        >
                                            <Upload size={32} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                                            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>
                                                Click to upload image
                                            </p>
                                            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', opacity: 0.5 }}>
                                                PNG, JPG, WebP up to 5MB
                                            </p>
                                        </div>
                                    )}

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        style={{ display: 'none' }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Tech Stack</label>
                                    <div className="tags-container">
                                        {form.tech_stack.map(tech => (
                                            <span key={tech} className="tag">
                                                {tech}
                                                <button type="button" className="tag-remove" onClick={() => removeTech(tech)}>
                                                    <X size={14} />
                                                </button>
                                            </span>
                                        ))}
                                        <input
                                            type="text"
                                            className="tags-input"
                                            value={techInput}
                                            onChange={(e) => setTechInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                            placeholder="Type and press Enter..."
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">GitHub URL</label>
                                        <input
                                            type="url"
                                            className="form-input"
                                            value={form.github_url || ''}
                                            onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Demo URL</label>
                                        <input
                                            type="url"
                                            className="form-input"
                                            value={form.demo_url || ''}
                                            onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                                        />
                                    </div>
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
                                <button type="submit" className="btn btn-primary" disabled={saving || uploading}>
                                    {uploading ? 'Uploading...' : saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
