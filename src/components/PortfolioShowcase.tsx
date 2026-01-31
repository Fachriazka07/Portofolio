import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Github, ExternalLink, Code, ArrowRight, Briefcase, GraduationCap, Globe, Server } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Portfolio.css";
import "./styles/Skills.css"; // Import new Skills styles
// @ts-ignore
import showcaseData from "../data/showcase.json";

gsap.registerPlugin(ScrollTrigger);

// ... (Interface Project remains unchanged) ...

// Type definition for Project Data
interface Project {
  id: number;
  judul: string;
  paragraf: string;
  bannerImage: string;
  techStack: string[];
  linkGithub?: string;
  demo?: string;
  category: string;
  aspect?: string;
}

export function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState("Projects");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Always limit to 3 for the homepage showcase
  const visibleProjects = showcaseData.slice(0, 3);

  const getSkillIcon = (skill: string) => {
    const iconClass = "skill-icon";
    // SimpleIcons CDN (Monochrome Black)
    const simpleIcon = (slug: string) => <img src={`https://cdn.simpleicons.org/${slug}/000000`} className={iconClass} alt={skill} />;

    // DevIcons CDN (Colored -> Mixed to Black via CSS)
    const devIcon = (path: string) => <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`} className={`${iconClass} force-mono`} alt={skill} />;

    switch (skill) {
      case "React.js": return simpleIcon("react");
      case "Next.js": return simpleIcon("nextdotjs");
      case "Tailwind CSS": return simpleIcon("tailwindcss");
      case "HTML5": return simpleIcon("html5");
      case "CSS3": return devIcon("css3/css3-original.svg"); // Changed to DevIcon
      case "TypeScript": return simpleIcon("typescript");
      case "JavaScript": return simpleIcon("javascript");
      case "PHP": return simpleIcon("php");
      case "C#": return devIcon("csharp/csharp-original.svg"); // Changed to DevIcon
      case "Node.js": return simpleIcon("nodedotjs");
      case "Laravel": return simpleIcon("laravel");
      case "MySQL": return simpleIcon("mysql");
      case "SQL Server": return devIcon("microsoftsqlserver/microsoftsqlserver-plain.svg"); // Changed to DevIcon
      case "Git": return simpleIcon("git");
      case "VS Code": return devIcon("vscode/vscode-original.svg"); // Changed to DevIcon
      case "Stripe": return simpleIcon("stripe");
      case "SQL": return <Briefcase className={iconClass} />;
      default: return <Briefcase className={iconClass} />;
    }
  };

  const tabs = [
    { name: "Projects", color: "var(--highlight-cyan)" },
    { name: "Qualifications", color: "var(--highlight-yellow)" },
    { name: "Tech Stack", color: "var(--highlight-pink)" }
  ];

  // Initial Entrance Animation (Disabled for tabs - causing visibility issues)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate content, not tabs
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Tab Switch Animation
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    // Animate content children when tab changes
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeTab]);

  return (
    <section ref={sectionRef} id="portfolio" className="portfolio-section">
      <div className="portfolio-container">

        {/* Title Section */}
        <div className="relative mb-8">
          <h2 className="portfolio-title-badge">PORTFOLIO</h2>
        </div>

        {/* RETRO TABS Nav */}
        <div className="portfolio-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`portfolio-tab ${activeTab === tab.name ? "active" : ""}`}
              style={{
                "--hover-color": tab.color
              } as React.CSSProperties}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* FOLDER CONTENT AREA */}
        <div ref={contentRef} className="portfolio-content">

          {/* PROJECTS TAB */}
          {activeTab === "Projects" && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProjects.map((project: Project) => (
                  <div key={project.id} className="browser-card">
                    {/* Browser Header */}
                    <div className="browser-header">
                      <div className="browser-dot dot-red" />
                      <div className="browser-dot dot-yellow" />
                      <div className="browser-dot dot-green" />
                      <div className="browser-title-bar">
                        {project.category}://{project.judul.toLowerCase().replace(/\s/g, '')}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="browser-body">
                      <div className="browser-image-container">
                        <img
                          src={project.bannerImage}
                          alt={project.judul}
                          className="browser-image"
                        />
                      </div>

                      <div className="browser-content">
                        <h3 className="project-title">{project.judul}</h3>
                        <p className="project-desc line-clamp-3">{project.paragraf}</p>

                        <div className="project-tags">
                          {project.techStack.map((tag: string) => (
                            <span key={tag} className="project-tag">{tag}</span>
                          ))}
                        </div>

                        <div className="project-actions">
                          {project.demo && (
                            <a href={project.demo} target="_blank" rel="noreferrer" className="project-btn btn-primary">
                              <ExternalLink size={18} /> Visit
                            </a>
                          )}
                          {project.linkGithub && (
                            <a href={project.linkGithub} target="_blank" rel="noreferrer" className="project-btn btn-outline">
                              <Github size={18} /> Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Projects Link */}
              <div className="portfolio-btn-container">
                <Link
                  to="/projects"
                  className="portfolio-btn-view-all group"
                >
                  View All Projects
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </>
          )}

          {/* QUALIFICATIONS TAB */}
          {activeTab === "Qualifications" && (
            <div className="grid md:grid-cols-2 gap-12">

              {/* Experience Column */}
              <div className="qual-column">
                {/* Header Box */}
                <div className="qual-header yellow">
                  <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2 text-black">
                    <Briefcase size={28} strokeWidth={2.5} />
                    Experience
                  </h3>
                </div>

                {/* Content Card */}
                <div className="qual-card">

                  {/* Experience Item */}
                  <div className="mb-8 last:mb-0">
                    <h4 className="text-2xl font-bold mb-2">PKL BPS Sumedang</h4>
                    <p className="font-mono text-lg opacity-70 mb-4">Industrial Placement</p>

                    <div className="qual-pill green">
                      Jul 2025 - Oct 2025
                    </div>

                    <p className="text-base leading-relaxed qual-border-left cyan">
                      Assisted in data processing, created automated scripts for data entry, and maintained internal software systems for the statistics bureau.
                    </p>
                  </div>

                </div>
              </div>

              {/* Education Column */}
              <div className="qual-column">
                {/* Header Box */}
                <div className="qual-header yellow">
                  <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2 text-black">
                    <GraduationCap size={28} strokeWidth={2.5} />
                    Education
                  </h3>
                </div>

                {/* Content Card */}
                <div className="qual-card space-y-8">

                  {/* Edu Item 1 */}
                  <div className="border-b-2 border-dashed border-gray-300 pb-6 last:border-0 dark:border-gray-700">
                    <h4 className="text-xl font-bold">SMKN 1 Sumedang</h4>
                    <p className="font-mono text-sm opacity-70 mb-3">Software Engineering</p>
                    <div className="qual-pill cyan">
                      2023 - 2026
                    </div>
                  </div>

                  {/* Edu Item 2 */}
                  <div className="border-b-2 border-dashed border-gray-300 pb-6 last:border-0 dark:border-gray-700">
                    <h4 className="text-xl font-bold">SMPN 2 Sumedang</h4>
                    <p className="font-mono text-sm opacity-70 mb-3">Middle School</p>
                    <div className="qual-pill pink">
                      2020 - 2023
                    </div>
                  </div>

                  {/* Edu Item 3 */}
                  <div className=" pb-2">
                    <h4 className="text-xl font-bold">SDN Sindangraja</h4>
                    <p className="font-mono text-sm opacity-70 mb-3">Elementary School</p>
                    <div className="qual-pill yellow">
                      2014 - 2020
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TECH STACK TAB */}
          {activeTab === "Tech Stack" && (
            <div className="skills-grid">

              {/* Frontend Card */}
              <div className="skill-card frontend">
                <div className="skill-header">
                  <Globe size={24} strokeWidth={2.5} color="black" />
                  Frontend
                </div>
                <div className="skill-body">
                  <span className="skill-tag">{getSkillIcon("React.js")} React.js</span>
                  <span className="skill-tag">{getSkillIcon("Next.js")} Next.js</span>
                  <span className="skill-tag">{getSkillIcon("Tailwind CSS")} Tailwind CSS</span>
                  <span className="skill-tag">{getSkillIcon("HTML5")} HTML5</span>
                  <span className="skill-tag">{getSkillIcon("CSS3")} CSS3</span>
                </div>
              </div>

              {/* Languages Card */}
              <div className="skill-card languages">
                <div className="skill-header">
                  <Code size={24} strokeWidth={2.5} color="black" />
                  Languages
                </div>
                <div className="skill-body">
                  <span className="skill-tag">{getSkillIcon("TypeScript")} TypeScript</span>
                  <span className="skill-tag">{getSkillIcon("JavaScript")} JavaScript</span>
                  <span className="skill-tag">{getSkillIcon("PHP")} PHP</span>
                  <span className="skill-tag">{getSkillIcon("C#")} C#</span>
                  <span className="skill-tag">{getSkillIcon("SQL")} SQL</span>
                </div>
              </div>

              {/* Backend Card */}
              <div className="skill-card backend">
                <div className="skill-header">
                  <Server size={24} strokeWidth={2.5} color="black" />
                  Backend
                </div>
                <div className="skill-body">
                  <span className="skill-tag">{getSkillIcon("Node.js")} Node.js</span>
                  <span className="skill-tag">{getSkillIcon("Laravel")} Laravel</span>
                  <span className="skill-tag">{getSkillIcon("MySQL")} MySQL</span>
                  <span className="skill-tag">{getSkillIcon("SQL Server")} SQL Server</span>
                </div>
              </div>

              {/* Tools Card (Combined DB & Tools) */}
              <div className="skill-card tools">
                <div className="skill-header">
                  <Briefcase size={24} strokeWidth={2.5} color="black" />
                  Tools & APIs
                </div>
                <div className="skill-body">
                  <span className="skill-tag">{getSkillIcon("Git")} Git</span>
                  <span className="skill-tag">{getSkillIcon("VS Code")} VS Code</span>
                  <span className="skill-tag">{getSkillIcon("Stripe")} Stripe</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
