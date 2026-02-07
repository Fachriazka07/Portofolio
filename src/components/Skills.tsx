import { useEffect, useState } from 'react';
import LogoLoop from "./ui/LogoLoop";
import { getSkills, type Skill } from '../lib/supabase';
import { getSkillIcon } from '../lib/skill-icons';
import { Code2 } from 'lucide-react';

// Fallback data jika Supabase fetch gagal
const FALLBACK_SKILLS = [
  { id: '1', name: 'HTML5', category: 'frontend', icon_slug: null, display_order: 1, is_visible: true, created_at: '' },
  { id: '2', name: 'CSS3', category: 'frontend', icon_slug: null, display_order: 2, is_visible: true, created_at: '' },
  { id: '3', name: 'JavaScript', category: 'languages', icon_slug: null, display_order: 3, is_visible: true, created_at: '' },
  { id: '4', name: 'React', category: 'frontend', icon_slug: null, display_order: 4, is_visible: true, created_at: '' },
  { id: '5', name: 'Tailwind CSS', category: 'frontend', icon_slug: null, display_order: 5, is_visible: true, created_at: '' },
  { id: '6', name: 'PHP', category: 'backend', icon_slug: null, display_order: 6, is_visible: true, created_at: '' },
  { id: '7', name: 'Node.js', category: 'backend', icon_slug: null, display_order: 7, is_visible: true, created_at: '' },
  { id: '8', name: 'MySQL', category: 'backend', icon_slug: null, display_order: 8, is_visible: true, created_at: '' },
  { id: '9', name: 'PostgreSQL', category: 'backend', icon_slug: null, display_order: 9, is_visible: true, created_at: '' },
  { id: '10', name: 'GitHub', category: 'tools', icon_slug: null, display_order: 10, is_visible: true, created_at: '' },
  { id: '11', name: 'Docker', category: 'tools', icon_slug: null, display_order: 11, is_visible: true, created_at: '' },
  { id: '12', name: 'Vercel', category: 'tools', icon_slug: null, display_order: 12, is_visible: true, created_at: '' },
  { id: '13', name: 'Figma', category: 'tools', icon_slug: null, display_order: 13, is_visible: true, created_at: '' },
] as Skill[];

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();

        if (data && data.length > 0) {
          setSkills(data);
        } else {
          setSkills(FALLBACK_SKILLS);
        }
      } catch (err) {
        console.error('[Skills] Failed to fetch:', err);
        setError(true);
        setSkills(FALLBACK_SKILLS);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Generate logo nodes from skills data
  const techLogos = skills.map((skill) => {
    const iconConfig = getSkillIcon(skill.name);

    if (iconConfig) {
      const IconComponent = iconConfig.icon;
      return {
        node: <IconComponent color={iconConfig.color} size={56} />,
        title: skill.name,
      };
    }

    // Fallback for skills without icons
    return {
      node: <Code2 color="#888" size={56} />,
      title: skill.name,
    };
  });

  // Still loading
  if (loading) {
    return (
      <section id="skills" className="min-h-[60vh] flex items-center justify-center py-20 overflow-hidden">
        <div className="w-full" style={{ height: "220px", position: "relative" }}>
          {/* Loading placeholder */}
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-[60vh] flex items-center justify-center py-20 overflow-hidden">
      <div className="w-full" style={{ height: "220px", position: "relative" }}>
        <LogoLoop
          logos={techLogos}
          speed={90}
          direction="right"
          logoHeight={64}
          gap={56}
          pauseOnHover
          scaleOnHover
          fadeOut={false}
          ariaLabel="Skills logos"
        />
      </div>
    </section>
  );
}

export default Skills;