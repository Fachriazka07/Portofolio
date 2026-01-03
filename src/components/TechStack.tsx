import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiFigma,
  SiGithub,
  SiVercel,
} from "react-icons/si";

type TechItem = { name: string; Icon: React.ComponentType<{ size?: number }>; color: string };

const frontend: TechItem[] = [
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: SiCss3, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
];

const backendDb: TechItem[] = [
  { name: "Node.js", Icon: SiNodedotjs, color: "#3C873A" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
];

const tools: TechItem[] = [
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "GitHub", Icon: SiGithub, color: "#000000ff" },
  { name: "Vercel", Icon: SiVercel, color: "#000000" },
];

function TechGrid({ title, items }: { title: string; items: TechItem[] }) {
  return (
    <div>
      <h3 className="text-xl mb-4 text-gray-900 dark:text-white">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {items.map(({ name, Icon, color }) => (
          <motion.div
            key={name}
            className="group flex flex-col items-center justify-center rounded-xl border border-white/10 p-4 bg-white/5 dark:bg-white/5"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div
              className="w-16 h-16 flex items-center justify-center rounded-lg shadow-[0_0_20px_rgba(182,245,0,0.15)]"
              style={{ color }}
            >
              <Icon size={40} />
            </div>
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#B6F500] transition-colors">
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  return (
    <section id="tech-stack" className="py-24 bg-white dark:bg-[#0f0f1a]">
      <div className="max-w-6xl mx-auto px-6 lg:px-20">
        <h2 className="text-4xl md:text-5xl mb-10 text-gray-900 dark:text-white">
          <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">Tech Stack</span>
        </h2>
        <div className="space-y-10">
          <TechGrid title="Frontend" items={frontend} />
          <TechGrid title="Backend & Database" items={backendDb} />
          <TechGrid title="Tools" items={tools} />
        </div>
      </div>
    </section>
  );
}