import LogoLoop from "./ui/LogoLoop";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiPhp,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiGithub,
  SiDocker,
  SiVercel,
  SiFigma,
} from "react-icons/si";

const techLogos = [
  { node: <SiHtml5 color="#E34F26" size={56} />, title: "HTML" },
  { node: <SiCss3 color="#1572B6" size={56} />, title: "CSS" },
  { node: <SiJavascript color="#F7DF1E" size={56} />, title: "JavaScript" },
  { node: <SiReact color="#61DAFB" size={56} />, title: "React" },
  { node: <SiTailwindcss color="#06B6D4" size={56} />, title: "Tailwind CSS" },
  { node: <SiPhp color="#777BB4" size={56} />, title: "PHP" },
  { node: <SiNodedotjs color="#339933" size={56} />, title: "Node.js" },
  { node: <SiMysql color="#4479A1" size={56} />, title: "MySQL" },
  { node: <SiPostgresql color="#336791" size={56} />, title: "PostgreSQL" },
  { node: <SiGithub color="#181717" size={56} />, title: "GitHub" },
  { node: <SiDocker color="#2496ED" size={56} />, title: "Docker" },
  { node: <SiVercel color="#000000" size={56} />, title: "Vercel" },
  { node: <SiFigma color="#F24E1E" size={56} />, title: "Figma" },
];

export function Skills() {
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