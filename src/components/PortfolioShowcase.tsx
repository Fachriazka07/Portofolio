import { useMemo, useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import showcaseData from "../data/showcase.json";
import "./PortfolioTabs.css";
import "./PortfolioShowcase.css";
// Gradient SVG icons (tanpa lingkaran), stroke/fill diwarnai gradien ungu-biru
function GradientCodeIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-code" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#00C6FF" />
        </linearGradient>
      </defs>
      <path d="M8 5 L4 12 L8 19" stroke="url(#grad-code)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 5 L20 12 L16 19" stroke="url(#grad-code)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4 L12 20" stroke="url(#grad-code)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
    </svg>
  );
}

function GradientCapIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-cap" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#00C6FF" />
        </linearGradient>
      </defs>
      <path d="M3 9 L12 5 L21 9 L12 13 L3 9Z" fill="url(#grad-cap)" opacity="0.25" />
      <path d="M3 9 L12 5 L21 9 L12 13 L3 9Z" stroke="url(#grad-cap)" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M6 11 V15 C6 16.1 8.7 17 12 17 C15.3 17 18 16.1 18 15 V11" stroke="url(#grad-cap)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function GradientAtomIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-atom" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#00C6FF" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="3" fill="url(#grad-atom)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="url(#grad-atom)" strokeWidth="2.6" />
      <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="url(#grad-atom)" strokeWidth="2.6" />
      <path d="M4 6 C8 9, 16 9, 20 6" stroke="url(#grad-atom)" strokeWidth="2.4" opacity="0.35" />
      <path d="M4 18 C8 15, 16 15, 20 18" stroke="url(#grad-atom)" strokeWidth="2.4" opacity="0.35" />
    </svg>
  );
}

// Small gradient briefcase icon for Qualifications title
function GradientBriefcaseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-title-brief" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#00C6FF" />
        </linearGradient>
      </defs>
      <rect x="7" y="5" width="10" height="3" rx="1.2" stroke="url(#grad-title-brief)" strokeWidth="2" />
      <rect x="3" y="8" width="18" height="11" rx="2" stroke="url(#grad-title-brief)" strokeWidth="2" />
      <path d="M3 12 H21" stroke="url(#grad-title-brief)" strokeWidth="2" />
    </svg>
  );
}

type ShowcaseItem = {
  id: number;
  judul: string;
  paragraf: string;
  bannerImage: string;
  techStack: string[];
  linkGithub?: string;
  category?: string;
  demo?: string;
};

type TechItem = { name: string; Icon: React.ComponentType<{ size?: number }>; color: string };
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
  { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
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

export function PortfolioShowcase() {
  const items: ShowcaseItem[] = useMemo(() => showcaseData as ShowcaseItem[], []);
  const [limit, setLimit] = useState(6);
  const [activeTab, setActiveTab] = useState<string>("projects");
  const sectionRef = useRef<HTMLElement>(null);

  const bullet = "before:content-[''] before:w-2 before:h-2 before:bg-[#B6F500] before:rounded-full before:absolute before:left-0 before:top-2";
  const line = "after:content-[''] after:absolute after:left-[3px] after:top-5 after:w-[2px] after:h-full after:bg-[#B6F500]/40";

  // GSAP animations for Projects: on refresh, scroll, and tab change
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (activeTab !== "projects") return;
    const ctx = gsap.context(() => {
      const btnSel = ".see-more-btn";
      const btnEl = sectionRef.current?.querySelector(btnSel);

      if (btnEl && ScrollTrigger.isInViewport(btnEl)) {
        gsap.from(btnSel, { opacity: 0, x: -16, duration: 0.5, ease: "power2.out" });
      }

      gsap.from(btnSel, {
        opacity: 0,
        x: -16,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: { trigger: btnSel, start: "top 95%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab, limit]);
  return (
    <section ref={sectionRef} id="showcase" className="py-24 bg-white dark:bg-[#0f0f1a] relative overflow-hidden">
      <div className="absolute top-20 left-20 w-40 h-40 bg-[#6C63FF]/5 dark:bg-[#6C63FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#00C6FF]/5 dark:bg-[#00C6FF]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl mb-3 text-gray-900 dark:text-white">Portfolio <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">Showcase</span></h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">Explore my journey through projects, qualifications, and technical expertise. Each section represents a milestone in my continuous learning path.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-8">
          <div className="flex justify-center mt-2">
            <TabsList className="portfolio-tabs">
              <TabsTrigger value="projects" className="portfolio-tab-trigger" data-variant="purple">
                <div className="tab-content-wrap">
                  <span className="tab-icon"><GradientCodeIcon size={40} /></span>
                  <span className="tab-label">Projects</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="qualifications" className="portfolio-tab-trigger" data-variant="lime">
                <div className="tab-content-wrap">
                  <span className="tab-icon"><GradientCapIcon size={40} /></span>
                  <span className="tab-label">Qualifications</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="tech" className="portfolio-tab-trigger" data-variant="cyan">
                <div className="tab-content-wrap">
                  <span className="tab-icon"><GradientAtomIcon size={40} /></span>
                  <span className="tab-label">Tech Stack</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "projects" && (
              <TabsContent value="projects" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.slice(0, limit).map((project) => (
                      <motion.div
                        key={project.id}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="project-card group bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1a2e] dark:to-[#1a1a2e]/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#B6F500]/20 transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-white/10"
                      >
                        <div className="relative overflow-hidden h-48">
                          <ImageWithFallback src={project.bannerImage} alt={project.judul} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF] to-[#00C6FF] opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-3">
                            {project.demo && (
                              <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl gap-2" asChild>
                                <a href={project.demo} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /> Demo</a>
                              </Button>
                            )}
                            {project.linkGithub && (
                              <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl gap-2" asChild>
                                <a href={project.linkGithub} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4" /> Code</a>
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="p-6 space-y-4">
                          <h3 className="text-xl group-hover:bg-gradient-to-r group-hover:from-[#B6F500] group-hover:to-[#B6F500] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-gray-900 dark:text-white">{project.judul}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.paragraf}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-white/10 dark:to-white/5 hover:border-[#B6F500] hover:bg-[#B6F500]/10 border rounded-lg text-gray-900 dark:text-white">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="projects-actions">
                    <Button variant="outline" className="see-more-btn" onClick={() => setLimit((prev) => (prev > 6 ? 6 : Math.min(items.length, prev + 6)))}>
                      {limit > 6 ? "See less" : "See more"}
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "qualifications" && (
              <TabsContent value="qualifications" className="mt-8">
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    <div>
                      <Card className="qual-card">
                        <CardHeader className="qual-header">
                          <CardTitle className="qual-title">
                            <span className="qual-title-icon"><GradientBriefcaseIcon size={20} /></span>
                            <span>Experience</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="timeline-list">
                            <li>
                              <div className="item-title text-black dark:text-white">Freelance Web Developer (Fiverr)</div>
                              <div className="item-sub text-black dark:text-gray-300">2025 - Present</div>
                            </li>
                            <li>
                              <div className="item-title text-black dark:text-white">PKL BPS Sumedang</div>
                              <div className="item-sub text-black dark:text-gray-300">July 2025 - October 2025</div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div> 

                    <div>
                      <Card className="qual-card">
                        <CardHeader className="qual-header">
                          <CardTitle className="qual-title">
                            <span className="qual-title-icon"><GradientCapIcon size={20} /></span>
                            <span>Education</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="timeline-list">
                            <li>
                              <div className="item-title text-black dark:text-white">SMKN 1 Sumedang — RPL / Software Engineering</div>
                              <div className="item-sub text-black dark:text-gray-300">2023 - 2026</div>
                            </li>
                            <li>
                              <div className="item-title text-black dark:text-white">SMPN 2 Sumedang</div>
                              <div className="item-sub text-black dark:text-gray-300">2020 - 2023</div>
                            </li>
                            <li>
                              <div className="item-title text-black dark:text-white">SDN Sindangraja</div>
                              <div className="item-sub text-black dark:text-gray-300">2014 - 2020</div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "tech" && (
              <TabsContent value="tech" className="mt-8">
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="space-y-10">
                    <TechGrid title="Frontend" items={frontend} />
                    <TechGrid title="Backend & Database" items={backendDb} />
                    <TechGrid title="Tools" items={tools} />
                  </div>
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
}