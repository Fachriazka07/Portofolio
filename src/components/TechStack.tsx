import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { getSkills, type Skill } from '../lib/supabase';
import { getSkillIcon } from '../lib/skill-icons';
import { Code2 } from 'lucide-react';

type TechItem = {
  name: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
};

// Fallback data jika Supabase fetch gagal
const FALLBACK_DATA = {
  frontend: [
    { name: "HTML5", color: "#E34F26" },
    { name: "CSS3", color: "#1572B6" },
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "React", color: "#61DAFB" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Tailwind CSS", color: "#38BDF8" },
  ],
  backend: [
    { name: "Node.js", color: "#3C873A" },
    { name: "PHP", color: "#777BB4" },
    { name: "MySQL", color: "#4479A1" },
    { name: "PostgreSQL", color: "#336791" },
  ],
  languages: [
    { name: "TypeScript", color: "#3178C6" },
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "PHP", color: "#777BB4" },
  ],
  tools: [
    { name: "Figma", color: "#F24E1E" },
    { name: "GitHub", color: "#181717" },
    { name: "Vercel", color: "#000000" },
  ],
};

function TechGrid({ title, items, color }: { title: string; items: TechItem[]; color: string }) {
  if (items.length === 0) return null;

  return (
    <div className="p-6 rounded-xl" style={{ backgroundColor: color }}>
      <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {items.map(({ name, Icon, color: iconColor }) => (
          <motion.div
            key={name}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-black shadow-[3px_3px_0_black]"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon size={20} color={iconColor} />
            <span className="font-medium text-gray-900">{name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function skillsToTechItems(skills: Skill[]): TechItem[] {
  return skills.map((skill) => {
    const iconConfig = getSkillIcon(skill.name);

    if (iconConfig) {
      return {
        name: skill.name,
        Icon: iconConfig.icon,
        color: iconConfig.color,
      };
    }

    // Fallback icon
    return {
      name: skill.name,
      Icon: Code2 as React.ComponentType<{ size?: number; color?: string }>,
      color: '#888888',
    };
  });
}

function fallbackToTechItems(items: { name: string; color: string }[]): TechItem[] {
  return items.map((item) => {
    const iconConfig = getSkillIcon(item.name);

    if (iconConfig) {
      return {
        name: item.name,
        Icon: iconConfig.icon,
        color: iconConfig.color,
      };
    }

    return {
      name: item.name,
      Icon: Code2 as React.ComponentType<{ size?: number; color?: string }>,
      color: item.color,
    };
  });
}

export function TechStack() {
  const [frontendSkills, setFrontendSkills] = useState<TechItem[]>([]);
  const [backendSkills, setBackendSkills] = useState<TechItem[]>([]);
  const [languageSkills, setLanguageSkills] = useState<TechItem[]>([]);
  const [toolsSkills, setToolsSkills] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();

        if (data && data.length > 0) {
          // Group skills by category
          const frontend = data.filter(s => s.category === 'frontend');
          const backend = data.filter(s => s.category === 'backend');
          const languages = data.filter(s => s.category === 'languages');
          const tools = data.filter(s => s.category === 'tools');

          setFrontendSkills(skillsToTechItems(frontend));
          setBackendSkills(skillsToTechItems(backend));
          setLanguageSkills(skillsToTechItems(languages));
          setToolsSkills(skillsToTechItems(tools));
        } else {
          console.warn('[TechStack] No data from Supabase, using fallback');
          setFrontendSkills(fallbackToTechItems(FALLBACK_DATA.frontend));
          setBackendSkills(fallbackToTechItems(FALLBACK_DATA.backend));
          setLanguageSkills(fallbackToTechItems(FALLBACK_DATA.languages));
          setToolsSkills(fallbackToTechItems(FALLBACK_DATA.tools));
        }
      } catch (error) {
        console.error('[TechStack] Failed to fetch:', error);
        // Use fallback data
        setFrontendSkills(fallbackToTechItems(FALLBACK_DATA.frontend));
        setBackendSkills(fallbackToTechItems(FALLBACK_DATA.backend));
        setLanguageSkills(fallbackToTechItems(FALLBACK_DATA.languages));
        setToolsSkills(fallbackToTechItems(FALLBACK_DATA.tools));
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="tech-stack" className="py-24 bg-[#FFFEF0]">
        <div className="max-w-6xl mx-auto px-6 lg:px-20">
          <h2 className="text-4xl md:text-5xl font-black mb-10 text-gray-900">
            Tech Stack
          </h2>
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-200 rounded-xl"></div>
            <div className="h-48 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tech-stack" className="py-24 bg-[#FFFEF0]">
      <div className="max-w-6xl mx-auto px-6 lg:px-20">
        <h2 className="text-4xl md:text-5xl font-black mb-10 text-gray-900">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TechGrid title="FRONTEND" items={frontendSkills} color="#7DD3FC" />
          <TechGrid title="LANGUAGES" items={languageSkills} color="#FDE047" />
          <TechGrid title="BACKEND" items={backendSkills} color="#FCA5A5" />
          <TechGrid title="TOOLS & APIS" items={toolsSkills} color="#BEF264" />
        </div>
      </div>
    </section>
  );
}