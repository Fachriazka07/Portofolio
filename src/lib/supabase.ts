import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ===================
// TYPE DEFINITIONS
// ===================

export interface Project {
    id: string;
    title: string;
    description: string | null;
    banner_image: string | null;
    aspect: 'landscape' | 'portrait';
    tech_stack: string[];
    github_url: string | null;
    demo_url: string | null;
    category: 'website' | 'mobile' | 'desktop';
    display_order: number;
    is_visible: boolean;
    created_at: string;
    updated_at: string;
}

export interface Skill {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'languages' | 'tools';
    icon_slug: string | null;
    display_order: number;
    is_visible: boolean;
    created_at: string;
}

export interface Qualification {
    id: string;
    type: 'education' | 'experience';
    title: string;
    subtitle: string | null;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    display_order: number;
    is_visible: boolean;
    created_at: string;
}

// ===================
// API FUNCTIONS
// ===================

// Projects

// For admin - get ALL projects
export const getAllProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data as Project[];
};

// For public portfolio - only visible projects
export const getProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data as Project[];
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();

    if (error) throw error;
    return data as Project;
};

export const updateProject = async (id: string, updates: Partial<Project>) => {
    const { data, error } = await supabase
        .from('projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Project;
};

export const deleteProject = async (id: string) => {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// ===================
// PROJECT IMAGE STORAGE
// ===================

const PROJECT_IMAGE_BUCKET = 'project-image';

/**
 * Upload project image to Supabase Storage
 * @returns Public URL of uploaded image
 */
export const uploadProjectImage = async (file: File): Promise<string> => {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    // Upload file
    const { error: uploadError } = await supabase.storage
        .from(PROJECT_IMAGE_BUCKET)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (uploadError) {
        console.error('[Storage] Upload error:', uploadError);
        throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(PROJECT_IMAGE_BUCKET)
        .getPublicUrl(filePath);

    console.log('[Storage] Upload success:', publicUrl);
    return publicUrl;
};

/**
 * Delete project image from Supabase Storage
 * @param imageUrl Full public URL of the image
 */
export const deleteProjectImage = async (imageUrl: string): Promise<void> => {
    // Extract file path from URL
    // URL format: https://xxx.supabase.co/storage/v1/object/public/project-image/projects/filename.ext
    const urlParts = imageUrl.split(`${PROJECT_IMAGE_BUCKET}/`);
    if (urlParts.length < 2) {
        console.warn('[Storage] Invalid image URL, skipping delete:', imageUrl);
        return;
    }

    const filePath = urlParts[1];

    const { error } = await supabase.storage
        .from(PROJECT_IMAGE_BUCKET)
        .remove([filePath]);

    if (error) {
        console.error('[Storage] Delete error:', error);
        // Don't throw - deletion failure shouldn't block other operations
    } else {
        console.log('[Storage] Deleted:', filePath);
    }
};

// Skills

// For admin - get ALL skills
export const getAllSkills = async () => {
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data as Skill[];
};

// For public - only visible skills
export const getSkills = async () => {
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data as Skill[];
};

export const createSkill = async (skill: Omit<Skill, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
        .from('skills')
        .insert(skill)
        .select()
        .single();

    if (error) throw error;
    return data as Skill;
};

export const updateSkill = async (id: string, updates: Partial<Skill>) => {
    const { data, error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Skill;
};

export const deleteSkill = async (id: string) => {
    const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// Qualifications

// For admin - get ALL qualifications
export const getAllQualifications = async () => {
    const { data, error } = await supabase
        .from('qualifications')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data as Qualification[];
};

// For public - only visible qualifications
export const getQualifications = async () => {
    const { data, error } = await supabase
        .from('qualifications')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data as Qualification[];
};

export const createQualification = async (qual: Omit<Qualification, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
        .from('qualifications')
        .insert(qual)
        .select()
        .single();

    if (error) throw error;
    return data as Qualification;
};

export const updateQualification = async (id: string, updates: Partial<Qualification>) => {
    const { data, error } = await supabase
        .from('qualifications')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Qualification;
};

export const deleteQualification = async (id: string) => {
    const { error } = await supabase
        .from('qualifications')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// ===================
// CONTACT MESSAGES
// ===================

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export const getContactMessages = async () => {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as ContactMessage[];
};

export const createContactMessage = async (message: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>) => {
    const { error } = await supabase
        .from('contact_messages')
        .insert(message);

    if (error) throw error;
    return { success: true };
};

export const deleteContactMessage = async (id: string) => {
    const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// ===================
// AUTH FUNCTIONS
// ===================

export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
};

export const onAuthStateChange = (callback: (session: any) => void) => {
    return supabase.auth.onAuthStateChange((_event, session) => {
        callback(session);
    });
};

// ===================
// OTP FUNCTIONS (2FA)
// ===================

/**
 * Generate a 6-digit OTP and store it in the database
 * OTP expires in 5 minutes
 */
export const generateAndStoreOTP = async (userId: string): Promise<string> => {
    // Generate 6-digit random code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiry to 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // Delete any existing OTPs for this user first
    await supabase
        .from('admin_otp')
        .delete()
        .eq('user_id', userId);

    // Insert new OTP
    const { error } = await supabase
        .from('admin_otp')
        .insert({
            user_id: userId,
            otp_code: otpCode,
            expires_at: expiresAt
        });

    if (error) throw error;
    return otpCode;
};

/**
 * Verify OTP code for a user
 * Returns true if valid, throws error if invalid/expired
 */
export const verifyOTP = async (userId: string, code: string): Promise<boolean> => {
    const { data, error } = await supabase
        .from('admin_otp')
        .select('*')
        .eq('user_id', userId)
        .eq('otp_code', code)
        .single();

    if (error || !data) {
        throw new Error('Invalid verification code');
    }

    // Check if expired
    if (new Date(data.expires_at) < new Date()) {
        // Delete expired OTP
        await supabase.from('admin_otp').delete().eq('id', data.id);
        throw new Error('Verification code has expired');
    }

    // OTP is valid - delete it (single use)
    await supabase.from('admin_otp').delete().eq('id', data.id);

    return true;
};

/**
 * Clean up all expired OTPs (optional maintenance function)
 */
export const cleanupExpiredOTPs = async () => {
    await supabase
        .from('admin_otp')
        .delete()
        .lt('expires_at', new Date().toISOString());
};
