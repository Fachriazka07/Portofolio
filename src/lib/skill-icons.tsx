/**
 * Simple Icons Mapping for Skills
 * Maps skill names to react-icons/si components with their brand colors
 * 
 * Reference: https://simpleicons.org/
 */

import {
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiVuedotjs,
    SiAngular,
    SiSvelte,
    SiTailwindcss,
    SiBootstrap,
    SiSass,
    SiPhp,
    SiLaravel,
    SiNodedotjs,
    SiExpress,
    SiNestjs,
    SiDjango,
    SiFlask,
    SiFastapi,
    SiRubyonrails,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiRedis,
    SiSupabase,
    SiFirebase,
    SiPrisma,
    SiPython,
    SiGo,
    SiRust,
    SiCplusplus,
    SiSharp,
    SiKotlin,
    SiSwift,
    SiDart,
    SiFlutter,
    SiGit,
    SiGithub,
    SiGitlab,
    SiDocker,
    SiKubernetes,
    SiAmazonwebservices,
    SiGooglecloud,
    SiVercel,
    SiNetlify,
    SiHeroku,
    SiDigitalocean,
    SiLinux,
    SiUbuntu,
    SiFigma,
    SiAdobexd,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiSketch,
    SiFramer,
    SiIntellijidea,
    SiWebstorm,
    SiVim,
    SiNeovim,
    SiJest,
    SiCypress,
    SiSelenium,
    SiWebpack,
    SiVite,
    SiRollupdotjs,
    SiEslint,
    SiPrettier,
    SiNpm,
    SiYarn,
    SiPnpm,
    SiStripe,
    SiPaypal,
    SiShopify,
    SiWordpress,
    SiContentful,
    SiSanity,
    SiStrapi,
    SiGraphql,
    SiApollographql,
    SiSocketdotio,
    SiTrpc,
    SiZod,
    SiShadcnui,
    SiRadixui,
    SiStorybook,
    SiSentry,
    SiDatadog,
    SiNewrelic,
    SiJira,
    SiNotion,
    SiSlack,
    SiDiscord,
    SiTrello,
    SiAsana,
    SiPostman,
    SiInsomnia,
    SiSwagger,
    SiElectron,
    SiTauri,
    SiCapacitor,
    SiIonic,
    SiPwa,
    SiThreedotjs,
    SiGreensock,
    SiChartdotjs,
    SiD3Dotjs,
    SiMapbox,
    SiLeaflet,
    SiGooglemaps,
    SiOpenai,
    SiTensorflow,
    SiPytorch,
    SiHuggingface,
    SiAuth0,
    SiOkta,
    SiClerk,
    SiTwilio,
    SiSendgrid,
    SiMailchimp,
    SiCloudflare,
    SiNginx,
    SiApache,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

export interface SkillIconConfig {
    icon: IconType;
    color: string;
}

/**
 * Maps skill names (lowercase) to their icon and brand color
 */
export const SKILL_ICON_MAP: Record<string, SkillIconConfig> = {
    // Frontend
    'html': { icon: SiHtml5, color: '#E34F26' },
    'html5': { icon: SiHtml5, color: '#E34F26' },
    'css': { icon: SiCss3, color: '#1572B6' },
    'css3': { icon: SiCss3, color: '#1572B6' },
    'javascript': { icon: SiJavascript, color: '#F7DF1E' },
    'js': { icon: SiJavascript, color: '#F7DF1E' },
    'typescript': { icon: SiTypescript, color: '#3178C6' },
    'ts': { icon: SiTypescript, color: '#3178C6' },
    'react': { icon: SiReact, color: '#61DAFB' },
    'react.js': { icon: SiReact, color: '#61DAFB' },
    'reactjs': { icon: SiReact, color: '#61DAFB' },
    'next': { icon: SiNextdotjs, color: '#000000' },
    'next.js': { icon: SiNextdotjs, color: '#000000' },
    'nextjs': { icon: SiNextdotjs, color: '#000000' },
    'vue': { icon: SiVuedotjs, color: '#4FC08D' },
    'vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
    'vuejs': { icon: SiVuedotjs, color: '#4FC08D' },
    'angular': { icon: SiAngular, color: '#DD0031' },
    'svelte': { icon: SiSvelte, color: '#FF3E00' },
    'tailwind': { icon: SiTailwindcss, color: '#06B6D4' },
    'tailwind css': { icon: SiTailwindcss, color: '#06B6D4' },
    'tailwindcss': { icon: SiTailwindcss, color: '#06B6D4' },
    'bootstrap': { icon: SiBootstrap, color: '#7952B3' },
    'sass': { icon: SiSass, color: '#CC6699' },
    'scss': { icon: SiSass, color: '#CC6699' },

    // Backend
    'php': { icon: SiPhp, color: '#777BB4' },
    'laravel': { icon: SiLaravel, color: '#FF2D20' },
    'node': { icon: SiNodedotjs, color: '#339933' },
    'node.js': { icon: SiNodedotjs, color: '#339933' },
    'nodejs': { icon: SiNodedotjs, color: '#339933' },
    'express': { icon: SiExpress, color: '#000000' },
    'express.js': { icon: SiExpress, color: '#000000' },
    'expressjs': { icon: SiExpress, color: '#000000' },
    'nestjs': { icon: SiNestjs, color: '#E0234E' },
    'nest.js': { icon: SiNestjs, color: '#E0234E' },
    'django': { icon: SiDjango, color: '#092E20' },
    'flask': { icon: SiFlask, color: '#000000' },
    'fastapi': { icon: SiFastapi, color: '#009688' },
    'rails': { icon: SiRubyonrails, color: '#CC0000' },
    'ruby on rails': { icon: SiRubyonrails, color: '#CC0000' },

    // Databases
    'mysql': { icon: SiMysql, color: '#4479A1' },
    'postgresql': { icon: SiPostgresql, color: '#4169E1' },
    'postgres': { icon: SiPostgresql, color: '#4169E1' },
    'mongodb': { icon: SiMongodb, color: '#47A248' },
    'mongo': { icon: SiMongodb, color: '#47A248' },
    'redis': { icon: SiRedis, color: '#DC382D' },
    'supabase': { icon: SiSupabase, color: '#3ECF8E' },
    'firebase': { icon: SiFirebase, color: '#FFCA28' },
    'prisma': { icon: SiPrisma, color: '#2D3748' },

    // Languages
    'python': { icon: SiPython, color: '#3776AB' },
    'go': { icon: SiGo, color: '#00ADD8' },
    'golang': { icon: SiGo, color: '#00ADD8' },
    'rust': { icon: SiRust, color: '#000000' },
    'c++': { icon: SiCplusplus, color: '#00599C' },
    'cpp': { icon: SiCplusplus, color: '#00599C' },
    'c#': { icon: SiSharp, color: '#512BD4' },
    'csharp': { icon: SiSharp, color: '#512BD4' },
    'kotlin': { icon: SiKotlin, color: '#7F52FF' },
    'swift': { icon: SiSwift, color: '#F05138' },
    'dart': { icon: SiDart, color: '#0175C2' },

    // Mobile
    'flutter': { icon: SiFlutter, color: '#02569B' },
    'react native': { icon: SiReact, color: '#61DAFB' },
    'react-native': { icon: SiReact, color: '#61DAFB' },
    'capacitor': { icon: SiCapacitor, color: '#119EFF' },
    'ionic': { icon: SiIonic, color: '#3880FF' },

    // DevOps & Cloud
    'git': { icon: SiGit, color: '#F05032' },
    'github': { icon: SiGithub, color: '#181717' },
    'gitlab': { icon: SiGitlab, color: '#FC6D26' },
    'docker': { icon: SiDocker, color: '#2496ED' },
    'kubernetes': { icon: SiKubernetes, color: '#326CE5' },
    'k8s': { icon: SiKubernetes, color: '#326CE5' },
    'aws': { icon: SiAmazonwebservices, color: '#FF9900' },
    'amazon': { icon: SiAmazonwebservices, color: '#FF9900' },
    'gcp': { icon: SiGooglecloud, color: '#4285F4' },
    'google cloud': { icon: SiGooglecloud, color: '#4285F4' },
    'vercel': { icon: SiVercel, color: '#000000' },
    'netlify': { icon: SiNetlify, color: '#00C7B7' },
    'heroku': { icon: SiHeroku, color: '#430098' },
    'digitalocean': { icon: SiDigitalocean, color: '#0080FF' },
    'cloudflare': { icon: SiCloudflare, color: '#F38020' },
    'nginx': { icon: SiNginx, color: '#009639' },
    'apache': { icon: SiApache, color: '#D22128' },

    // OS
    'linux': { icon: SiLinux, color: '#FCC624' },
    'ubuntu': { icon: SiUbuntu, color: '#E95420' },

    // Design
    'figma': { icon: SiFigma, color: '#F24E1E' },
    'adobe xd': { icon: SiAdobexd, color: '#FF61F6' },
    'xd': { icon: SiAdobexd, color: '#FF61F6' },
    'photoshop': { icon: SiAdobephotoshop, color: '#31A8FF' },
    'illustrator': { icon: SiAdobeillustrator, color: '#FF9A00' },
    'sketch': { icon: SiSketch, color: '#F7B500' },
    'framer': { icon: SiFramer, color: '#0055FF' },

    // IDEs
    'intellij': { icon: SiIntellijidea, color: '#000000' },
    'webstorm': { icon: SiWebstorm, color: '#000000' },
    'vim': { icon: SiVim, color: '#019733' },
    'neovim': { icon: SiNeovim, color: '#57A143' },

    // Testing
    'jest': { icon: SiJest, color: '#C21325' },
    'cypress': { icon: SiCypress, color: '#17202C' },
    'selenium': { icon: SiSelenium, color: '#43B02A' },

    // Build Tools
    'webpack': { icon: SiWebpack, color: '#8DD6F9' },
    'vite': { icon: SiVite, color: '#646CFF' },
    'rollup': { icon: SiRollupdotjs, color: '#EC4A3F' },
    'eslint': { icon: SiEslint, color: '#4B32C3' },
    'prettier': { icon: SiPrettier, color: '#F7B93E' },
    'npm': { icon: SiNpm, color: '#CB3837' },
    'yarn': { icon: SiYarn, color: '#2C8EBB' },
    'pnpm': { icon: SiPnpm, color: '#F69220' },

    // Payment
    'stripe': { icon: SiStripe, color: '#008CDD' },
    'paypal': { icon: SiPaypal, color: '#00457C' },

    // CMS & E-commerce
    'shopify': { icon: SiShopify, color: '#7AB55C' },
    'wordpress': { icon: SiWordpress, color: '#21759B' },
    'contentful': { icon: SiContentful, color: '#2478CC' },
    'sanity': { icon: SiSanity, color: '#F03E2F' },
    'strapi': { icon: SiStrapi, color: '#4945FF' },

    // API & Data
    'graphql': { icon: SiGraphql, color: '#E10098' },
    'apollo': { icon: SiApollographql, color: '#311C87' },
    'socket.io': { icon: SiSocketdotio, color: '#010101' },
    'trpc': { icon: SiTrpc, color: '#2596BE' },
    'zod': { icon: SiZod, color: '#3E67B1' },
    'postman': { icon: SiPostman, color: '#FF6C37' },
    'insomnia': { icon: SiInsomnia, color: '#4000BF' },
    'swagger': { icon: SiSwagger, color: '#85EA2D' },

    // UI Libraries
    'shadcn': { icon: SiShadcnui, color: '#000000' },
    'shadcn/ui': { icon: SiShadcnui, color: '#000000' },
    'radix': { icon: SiRadixui, color: '#161618' },
    'radix ui': { icon: SiRadixui, color: '#161618' },
    'storybook': { icon: SiStorybook, color: '#FF4785' },

    // Monitoring
    'sentry': { icon: SiSentry, color: '#362D59' },
    'datadog': { icon: SiDatadog, color: '#632CA6' },
    'newrelic': { icon: SiNewrelic, color: '#008C99' },

    // Collaboration
    'jira': { icon: SiJira, color: '#0052CC' },
    'notion': { icon: SiNotion, color: '#000000' },
    'slack': { icon: SiSlack, color: '#4A154B' },
    'discord': { icon: SiDiscord, color: '#5865F2' },
    'trello': { icon: SiTrello, color: '#0052CC' },
    'asana': { icon: SiAsana, color: '#F06A6A' },

    // Desktop
    'electron': { icon: SiElectron, color: '#47848F' },
    'tauri': { icon: SiTauri, color: '#24C8D8' },

    // Animation & 3D
    'three.js': { icon: SiThreedotjs, color: '#000000' },
    'threejs': { icon: SiThreedotjs, color: '#000000' },
    'gsap': { icon: SiGreensock, color: '#88CE02' },
    'greensock': { icon: SiGreensock, color: '#88CE02' },
    'framer motion': { icon: SiFramer, color: '#0055FF' },
    'chart.js': { icon: SiChartdotjs, color: '#FF6384' },
    'd3': { icon: SiD3Dotjs, color: '#F9A03C' },
    'd3.js': { icon: SiD3Dotjs, color: '#F9A03C' },

    // Maps
    'mapbox': { icon: SiMapbox, color: '#000000' },
    'leaflet': { icon: SiLeaflet, color: '#199900' },
    'google maps': { icon: SiGooglemaps, color: '#4285F4' },

    // AI/ML
    'openai': { icon: SiOpenai, color: '#412991' },
    'tensorflow': { icon: SiTensorflow, color: '#FF6F00' },
    'pytorch': { icon: SiPytorch, color: '#EE4C2C' },
    'hugging face': { icon: SiHuggingface, color: '#FFD21E' },
    'huggingface': { icon: SiHuggingface, color: '#FFD21E' },

    // Auth
    'auth0': { icon: SiAuth0, color: '#EB5424' },
    'okta': { icon: SiOkta, color: '#007DC1' },
    'clerk': { icon: SiClerk, color: '#6C47FF' },

    // Communication
    'twilio': { icon: SiTwilio, color: '#F22F46' },
    'sendgrid': { icon: SiSendgrid, color: '#00B2E3' },
    'mailchimp': { icon: SiMailchimp, color: '#FFE01B' },

    // PWA
    'pwa': { icon: SiPwa, color: '#5A0FC8' },
};

/**
 * Get skill icon config by name
 */
export function getSkillIcon(skillName: string): SkillIconConfig | null {
    const normalized = skillName.toLowerCase().trim();
    return SKILL_ICON_MAP[normalized] || null;
}
