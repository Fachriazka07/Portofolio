import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Github, ExternalLink, Code, ArrowRight, Briefcase, GraduationCap, Globe, Server } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Portfolio.css";
import "./styles/Skills.css";
import { getProjects, getSkills, getQualifications, type Project as SupabaseProject, type Skill, type Qualification } from "../lib/supabase";
import { getSkillIcon } from "../lib/skill-icons";
// @ts-ignore
import showcaseData from "../data/showcase.json";
import { useAnalytics } from "../hooks/useAnalytics";

gsap.registerPlugin(ScrollTrigger);

// Fallback project type from JSON 
interface FallbackProject {
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
  const { trackEvent } = useAnalytics();
  const [activeTab, setActiveTab] = useState("Projects");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Data state
  const [projects, setProjects] = useState<SupabaseProject[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Qualification[]>([]);
  const [education, setEducation] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch all data on mount
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [projectsData, skillsData, qualsData] = await Promise.all([
          getProjects(),
          getSkills(),
          getQualifications(),
        ]);

        console.log('[PortfolioShowcase] Fetched projects:', projectsData);
        console.log('[PortfolioShowcase] Fetched skills:', skillsData);
        console.log('[PortfolioShowcase] Fetched qualifications:', qualsData);

        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData.slice(0, 3));
        } else {
          setUsingFallback(true);
        }

        if (skillsData && skillsData.length > 0) {
          setSkills(skillsData);
        }

        if (qualsData && qualsData.length > 0) {
          setExperience(qualsData.filter(q => q.type === 'experience'));
          setEducation(qualsData.filter(q => q.type === 'education'));
        }
      } catch (error) {
        console.error('[PortfolioShowcase] Failed to fetch:', error);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Skills grouped by category
  const frontendSkills = skills.filter(s => s.category === 'frontend');
  const languageSkills = skills.filter(s => s.category === 'languages');
  const backendSkills = skills.filter(s => s.category === 'backend');
  const toolsSkills = skills.filter(s => s.category === 'tools');

  // Fallback projects from JSON
  const fallbackProjects: FallbackProject[] = showcaseData.slice(0, 3);

  const renderSkillIcon = (skillName: string) => {
    const iconConfig = getSkillIcon(skillName);
    if (iconConfig) {
      const IconComponent = iconConfig.icon;
      return <IconComponent size={16} color="#000" className="skill-icon" />;
    }
    return <Briefcase size={16} className="skill-icon" />;
  };

  const tabs = [
    { name: "Projects", color: "var(--highlight-cyan)" },
    { name: "Qualifications", color: "var(--highlight-yellow)" },
    { name: "Tech Stack", color: "var(--highlight-pink)" }
  ];

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(".portfolio-title-badge", { y: -60, opacity: 0, scale: 0.5, rotation: -15 }, { y: 0, opacity: 1, scale: 1, rotation: 2, duration: 0.6, ease: "back.out(2)" });
      tl.fromTo(".portfolio-tab", { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.3");
      tl.fromTo(contentRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const children = contentRef.current.children;
    gsap.killTweensOf(children);
    gsap.fromTo(children, { opacity: 0, y: 40, rotationX: -20, transformOrigin: "top center" }, { opacity: 1, y: 0, rotationX: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" });

    const cards = contentRef.current.querySelectorAll(".browser-card, .skill-card, .qual-column");
    if (cards.length > 0) {
      gsap.fromTo(cards, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)", delay: 0.2 });
    }
  }, [activeTab, loading]);

  const formatDateRange = (start: string | null, end: string | null) => {
    if (!start) return '';
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;
    const formatMonth = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${formatMonth(startDate)} - ${endDate ? formatMonth(endDate) : 'Present'}`;
  };

  return (
    <section ref={sectionRef} id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        <div className="relative mb-8">
          <h2 className="portfolio-title-badge">PORTFOLIO</h2>
        </div>

        <div className="portfolio-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`portfolio-tab ${activeTab === tab.name ? "active" : ""}`}
              style={{ "--hover-color": tab.color } as React.CSSProperties}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div ref={contentRef} className="portfolio-content">
          {/* PROJECTS TAB */}
          {activeTab === "Projects" && (
            <>
              {loading ? (
                <div className="animate-pulse grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-xl" />)}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(usingFallback ? fallbackProjects : projects).map((project: any) => (
                    <div key={project.id} className="browser-card">
                      <div className="browser-header">
                        <div className="browser-dot dot-red" />
                        <div className="browser-dot dot-yellow" />
                        <div className="browser-dot dot-green" />
                        <div className="browser-title-bar">
                          {(project.category || 'project')}://{(project.title || project.judul || '').toLowerCase().replace(/\s/g, '')}
                        </div>
                      </div>
                      <div className="browser-body">
                        <div className="browser-image-container">
                          {/* Supports both Supabase (banner_image) and JSON/Fallback (bannerImage) */}
                          <img
                            src={project.banner_image || project.bannerImage}
                            alt={project.title || project.judul}
                            className="browser-image"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/cccccc?text=No+Image';
                            }}
                          />
                        </div>
                        <div className="browser-content">
                          <h3 className="project-title">{project.title || project.judul}</h3>
                          <p className="project-desc line-clamp-3">{project.description || project.paragraf}</p>
                          <div className="project-tags">
                            {/* Supports both Supabase (tech_stack) and JSON/Fallback (techStack) */}
                            {(project.tech_stack || project.techStack || []).map((tag: string) => (
                              <span key={tag} className="project-tag">{tag}</span>
                            ))}
                          </div>
                          <div className="project-actions">

                            {/* Supports both Supabase (demo_url, github_url) and JSON/Fallback (demo, linkGithub) */}
                            {(project.demo_url || project.demo) && (
                              <a
                                href={project.demo_url || project.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="project-btn btn-primary"
                                onClick={() => trackEvent('project', 'click_project_demo', project.title || project.judul)}
                              >
                                <ExternalLink size={18} /> Visit
                              </a>
                            )}
                            {(project.github_url || project.linkGithub) && (
                              <a
                                href={project.github_url || project.linkGithub}
                                target="_blank"
                                rel="noreferrer"
                                className="project-btn btn-outline"
                                onClick={() => trackEvent('project', 'click_project_code', project.title || project.judul)}
                              >
                                <Github size={18} /> Code
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="portfolio-btn-container">
                <Link to="/projects" className="portfolio-btn-view-all group">
                  View All Projects
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </>
          )}

          {/* QUALIFICATIONS TAB */}
          {activeTab === "Qualifications" && (
            <div className="grid md:grid-cols-2 gap-12">
              <div className="qual-column">
                <div className="qual-header yellow">
                  <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2 text-black">
                    <Briefcase size={28} strokeWidth={2.5} /> Experience
                  </h3>
                </div>
                <div className="qual-card">
                  {experience.length > 0 ? experience.map((exp) => (
                    <div key={exp.id} className="mb-8 last:mb-0">
                      <h4 className="text-2xl font-bold mb-2">{exp.title}</h4>
                      <p className="font-mono text-lg opacity-70 mb-4">{exp.subtitle}</p>
                      <div className="qual-pill green">{formatDateRange(exp.start_date, exp.end_date)}</div>
                      {exp.description && <p className="text-base leading-relaxed qual-border-left cyan">{exp.description}</p>}
                    </div>
                  )) : (
                    <div className="mb-8">
                      <h4 className="text-2xl font-bold mb-2">PKL BPS Sumedang</h4>
                      <p className="font-mono text-lg opacity-70 mb-4">Industrial Placement</p>
                      <div className="qual-pill green">Jul 2025 - Oct 2025</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="qual-column">
                <div className="qual-header yellow">
                  <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2 text-black">
                    <GraduationCap size={28} strokeWidth={2.5} /> Education
                  </h3>
                </div>
                <div className="qual-card space-y-8">
                  {education.length > 0 ? education.map((edu, idx) => (
                    <div key={edu.id} className={idx < education.length - 1 ? "border-b-2 border-dashed border-gray-300 pb-6 dark:border-gray-700" : "pb-2"}>
                      <h4 className="text-xl font-bold">{edu.title}</h4>
                      <p className="font-mono text-sm opacity-70 mb-3">{edu.subtitle}</p>
                      <div className={`qual-pill ${idx === 0 ? 'cyan' : idx === 1 ? 'pink' : 'yellow'}`}>
                        {formatDateRange(edu.start_date, edu.end_date)}
                      </div>
                    </div>
                  )) : (
                    <>
                      <div className="border-b-2 border-dashed border-gray-300 pb-6 dark:border-gray-700">
                        <h4 className="text-xl font-bold">SMKN 1 Sumedang</h4>
                        <p className="font-mono text-sm opacity-70 mb-3">Software Engineering</p>
                        <div className="qual-pill cyan">2023 - 2026</div>
                      </div>
                      <div className="border-b-2 border-dashed border-gray-300 pb-6 dark:border-gray-700">
                        <h4 className="text-xl font-bold">SMPN 2 Sumedang</h4>
                        <p className="font-mono text-sm opacity-70 mb-3">Middle School</p>
                        <div className="qual-pill pink">2020 - 2023</div>
                      </div>
                      <div className="pb-2">
                        <h4 className="text-xl font-bold">SDN Sindangraja</h4>
                        <p className="font-mono text-sm opacity-70 mb-3">Elementary School</p>
                        <div className="qual-pill yellow">2014 - 2020</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TECH STACK TAB */}
          {activeTab === "Tech Stack" && (
            <div className="skills-grid">
              <div className="skill-card frontend">
                <div className="skill-header"><Globe size={24} strokeWidth={2.5} color="black" /> Frontend</div>
                <div className="skill-body">
                  {frontendSkills.length > 0 ? frontendSkills.map(s => (
                    <span key={s.id} className="skill-tag">{renderSkillIcon(s.name)} {s.name}</span>
                  )) : (
                    <>
                      <span className="skill-tag">{renderSkillIcon("React")} React.js</span>
                      <span className="skill-tag">{renderSkillIcon("Next.js")} Next.js</span>
                      <span className="skill-tag">{renderSkillIcon("Tailwind CSS")} Tailwind CSS</span>
                      <span className="skill-tag">{renderSkillIcon("HTML5")} HTML5</span>
                      <span className="skill-tag">{renderSkillIcon("CSS3")} CSS3</span>
                    </>
                  )}
                </div>
              </div>

              <div className="skill-card languages">
                <div className="skill-header"><Code size={24} strokeWidth={2.5} color="black" /> Languages</div>
                <div className="skill-body">
                  {languageSkills.length > 0 ? languageSkills.map(s => (
                    <span key={s.id} className="skill-tag">{renderSkillIcon(s.name)} {s.name}</span>
                  )) : (
                    <>
                      <span className="skill-tag">{renderSkillIcon("TypeScript")} TypeScript</span>
                      <span className="skill-tag">{renderSkillIcon("JavaScript")} JavaScript</span>
                      <span className="skill-tag">{renderSkillIcon("PHP")} PHP</span>
                      <span className="skill-tag">{renderSkillIcon("C#")} C#</span>
                    </>
                  )}
                </div>
              </div>

              <div className="skill-card backend">
                <div className="skill-header"><Server size={24} strokeWidth={2.5} color="black" /> Backend</div>
                <div className="skill-body">
                  {backendSkills.length > 0 ? backendSkills.map(s => (
                    <span key={s.id} className="skill-tag">{renderSkillIcon(s.name)} {s.name}</span>
                  )) : (
                    <>
                      <span className="skill-tag">{renderSkillIcon("Node.js")} Node.js</span>
                      <span className="skill-tag">{renderSkillIcon("Laravel")} Laravel</span>
                      <span className="skill-tag">{renderSkillIcon("MySQL")} MySQL</span>
                    </>
                  )}
                </div>
              </div>

              <div className="skill-card tools">
                <div className="skill-header"><Briefcase size={24} strokeWidth={2.5} color="black" /> Tools & APIs</div>
                <div className="skill-body">
                  {toolsSkills.length > 0 ? toolsSkills.map(s => (
                    <span key={s.id} className="skill-tag">{renderSkillIcon(s.name)} {s.name}</span>
                  )) : (
                    <>
                      <span className="skill-tag">{renderSkillIcon("Git")} Git</span>
                      <span className="skill-tag">{renderSkillIcon("VS Code")} VS Code</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
