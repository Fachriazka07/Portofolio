/**
 * Skill Icon Resolver
 * Resolves skill names to SimpleIcons slugs for automatic icon display
 */

// Known skill name to SimpleIcons slug mappings
const SKILL_MAPPINGS: Record<string, string> = {
    // Frontend
    'react': 'react',
    'react.js': 'react',
    'reactjs': 'react',
    'next.js': 'nextdotjs',
    'nextjs': 'nextdotjs',
    'vue': 'vuedotjs',
    'vue.js': 'vuedotjs',
    'angular': 'angular',
    'svelte': 'svelte',
    'tailwind': 'tailwindcss',
    'tailwind css': 'tailwindcss',
    'tailwindcss': 'tailwindcss',
    'bootstrap': 'bootstrap',
    'html': 'html5',
    'html5': 'html5',
    'css': 'css',
    'css3': 'css',
    'sass': 'sass',
    'scss': 'sass',

    // Languages
    'javascript': 'javascript',
    'js': 'javascript',
    'typescript': 'typescript',
    'ts': 'typescript',
    'python': 'python',
    'java': 'java',
    'c#': 'sharp',
    'csharp': 'sharp',
    'c++': 'cplusplus',
    'cpp': 'cplusplus',
    'go': 'go',
    'golang': 'go',
    'rust': 'rust',
    'php': 'php',
    'ruby': 'ruby',
    'swift': 'swift',
    'kotlin': 'kotlin',
    'dart': 'dart',

    // Backend & Databases
    'node': 'nodedotjs',
    'node.js': 'nodedotjs',
    'nodejs': 'nodedotjs',
    'express': 'express',
    'express.js': 'express',
    'laravel': 'laravel',
    'django': 'django',
    'flask': 'flask',
    'fastapi': 'fastapi',
    'spring': 'spring',
    'mysql': 'mysql',
    'postgresql': 'postgresql',
    'postgres': 'postgresql',
    'mongodb': 'mongodb',
    'mongo': 'mongodb',
    'redis': 'redis',
    'sqlite': 'sqlite',
    'sql server': 'sqlserver',
    'mssql': 'sqlserver',
    'supabase': 'supabase',
    'firebase': 'firebase',

    // Mobile
    'flutter': 'flutter',
    'react native': 'react',
    'ionic': 'ionic',
    'capacitor': 'capacitor',

    // Tools & DevOps
    'git': 'git',
    'github': 'github',
    'gitlab': 'gitlab',
    'docker': 'docker',
    'kubernetes': 'kubernetes',
    'k8s': 'kubernetes',
    'aws': 'amazonaws',
    'gcp': 'googlecloud',
    'azure': 'microsoftazure',
    'vercel': 'vercel',
    'netlify': 'netlify',
    'heroku': 'heroku',
    'figma': 'figma',
    'vscode': 'vscode',
    'vs code': 'vscode',
    'visual studio code': 'vscode',
    'postman': 'postman',
    'insomnia': 'insomnia',

    // Payment & APIs
    'stripe': 'stripe',
    'paypal': 'paypal',
    'midtrans': 'midtrans',

    // Others
    'graphql': 'graphql',
    'rest': 'json',
    'webpack': 'webpack',
    'vite': 'vite',
    'npm': 'npm',
    'yarn': 'yarn',
    'pnpm': 'pnpm',
};

/**
 * Resolves a skill name to a SimpleIcons slug
 * Returns the slug if found, otherwise null
 */
export function resolveIconSlug(skillName: string): string | null {
    const normalized = skillName.toLowerCase().trim();

    // Direct lookup
    if (SKILL_MAPPINGS[normalized]) {
        return SKILL_MAPPINGS[normalized];
    }

    // Try to find partial match
    for (const [key, slug] of Object.entries(SKILL_MAPPINGS)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return slug;
        }
    }

    // Auto-generate slug (remove dots, spaces, special chars)
    const autoSlug = normalized
        .replace(/\./g, 'dot')
        .replace(/\s+/g, '')
        .replace(/[^a-z0-9]/g, '');

    return autoSlug || null;
}

/**
 * Get the SimpleIcons CDN URL for a skill
 */
export function getSkillIconUrl(skillName: string, color: string = '000000'): string {
    const slug = resolveIconSlug(skillName);
    if (!slug) {
        return ''; // Return empty, component should show fallback
    }
    return `https://cdn.simpleicons.org/${slug}/${color}`;
}

/**
 * Check if a skill has a known icon
 */
export function hasKnownIcon(skillName: string): boolean {
    const normalized = skillName.toLowerCase().trim();
    return !!SKILL_MAPPINGS[normalized];
}
