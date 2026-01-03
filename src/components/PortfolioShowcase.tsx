import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AspectRatio } from "./ui/aspect-ratio";
import showcaseData from "../data/showcase.json";
import "./styles/PortfolioTabs.css";
import "./styles/PortfolioShowcase.css";
import "./styles/Hero.css";

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
  aspect?: "portrait" | "landscape" | "square" | "auto";
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
  { name: "GitHub", Icon: SiGithub, color: "#000000ff" },
  { name: "Vercel", Icon: SiVercel, color: "#000000" },
];

function TechGrid({ title, items }: { title: string; items: TechItem[] }) {
  return (
    <div className="tech-category-section">
      <h3 className="tech-section-title text-xl text-gray-900 dark:text-white font-semibold">{title}</h3>
      <div className="tech-grid">
        {items.map(({ name, Icon, color }) => (
          <div
            key={name}
            className="tech-card group hover:scale-105 transition-transform duration-300"
          >
            <div
              className="tech-icon-wrapper"
              style={{ color }}
            >
              <Icon size={40} />
            </div>
            <span className="tech-name">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioShowcase({ isFullPage = false }: { isFullPage?: boolean }) {
  const navigate = useNavigate();
  const items: ShowcaseItem[] = useMemo(() => showcaseData as ShowcaseItem[], []);
  const [limit, setLimit] = useState(isFullPage ? items.length : 3);
  const [activeTab, setActiveTab] = useState<string>("projects");
  const sectionRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  const bullet = "before:content-[''] before:w-2 before:h-2 before:bg-[#B6F500] before:rounded-full before:absolute before:left-0 before:top-2";
  const line = "after:content-[''] after:absolute after:left-[3px] after:top-5 after:w-[2px] after:h-full after:bg-[#B6F500]/40";

  // GSAP animations for Projects: on refresh, scroll, and tab change
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const list = document.querySelector(".portfolio-tabs") as HTMLElement | null;
    const activeTrigger = list?.querySelector(".portfolio-tab-trigger[data-state='active']") as HTMLElement | null;
    if (!list || !activeTrigger || !indicatorRef.current) return;
    const left = activeTrigger.offsetLeft;
    const width = activeTrigger.offsetWidth;
    const variant = activeTrigger.getAttribute("data-variant") || "purple";
    const bgMap: Record<string, string> = {
      purple: "linear-gradient(135deg, rgba(108,99,255,0.35), rgba(0,198,255,0.25))",
      lime: "linear-gradient(135deg, rgba(182,245,0,0.35), rgba(0,198,255,0.20))",
      cyan: "linear-gradient(135deg, rgba(0,198,255,0.35), rgba(108,99,255,0.25))",
    };
    gsap.set(indicatorRef.current, { background: bgMap[variant] });
    gsap.to(indicatorRef.current, { left, width, duration: 0.35, ease: "power3.out" });
    gsap.fromTo(activeTrigger, { scale: 0.98 }, { scale: 1.02, duration: 0.25, ease: "power2.out" });

    // Content animation with GSAP
    const activeContent = document.querySelector(`.tab-content-area[data-state='active']`);
    if (activeContent) {
      gsap.fromTo(
        activeContent,
        { opacity: 0, y: 20, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.5, 
          ease: "back.out(1.7)", // Sedikit overshoot untuk efek pop yang halus
          clearProps: "all" // Bersihkan props setelah animasi agar tidak mengganggu interaksi
        }
      );
      
      // Stagger animation for children items if they exist
      const childItems = activeContent.querySelectorAll('.project-card, .qual-card, .tech-category-section');
      if (childItems.length > 0) {
        gsap.fromTo(
          childItems,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4, 
            stagger: 0.1, 
            ease: "power2.out",
            delay: 0.1
          }
        );
      }
    }
  }, [activeTab]);
  useEffect(() => {
    const container = shapesRef.current;
    if (!container) return;
    const elements = container.querySelectorAll(".ps-shape");
    elements.forEach((el) => {
      const dx = gsap.utils.random(-40, 40);
      const dy = gsap.utils.random(-30, 30);
      const rot = gsap.utils.random(-180, 180);
      const dur = gsap.utils.random(3, 7);
      gsap.to(el, { x: `+=${dx}`, y: `+=${dy}`, rotation: rot, duration: dur, yoyo: true, repeat: -1, ease: "sine.inOut", delay: gsap.utils.random(0, 1.5) });
      if (Math.random() < 0.6) {
        gsap.to(el, { scale: gsap.utils.random(0.9, 1.15), duration: gsap.utils.random(2, 5), yoyo: true, repeat: -1, ease: "power1.inOut" });
      }
    });
  }, []);
  return (
    <section ref={sectionRef} id="showcase" className="min-h-screen py-24 bg-white dark:bg-[#0f0f1a] relative overflow-hidden">
      <div className="absolute top-20 left-20 w-40 h-40 bg-[#6C63FF]/12 dark:bg-[#6C63FF]/15 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#00C6FF]/12 dark:bg-[#00C6FF]/15 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-[#B6F500]/12 dark:bg-[#B6F500]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-8 w-28 h-28 bg-[#FFC857]/14 dark:bg-[#FFC857]/22 rounded-full blur-3xl" />
      <div ref={shapesRef} className="ps-decorations">
        <div className="ps-shape ps-purple shape-diamond pos-top-right hero-decoration-5" style={{ width: 28, height: 28 }} />
        <div className="ps-shape ps-cyan shape-triangle pos-bottom-left hero-decoration-8" style={{ width: 22, height: 22 }} />
        <div className="ps-shape ps-lime shape-hexagon pos-middle-right hero-decoration-12" style={{ width: 26, height: 26 }} />
        <div className="ps-shape ps-yellow shape-star pos-top-center hero-decoration-10" style={{ width: 20, height: 20 }} />
        <div className="ps-shape ps-purple shape-plus pos-scattered-1 hero-decoration-4" style={{ width: 18, height: 18 }} />
        <div className="ps-shape ps-cyan shape-diamond pos-scattered-2 hero-decoration-3" style={{ width: 24, height: 24 }} />
        <div className="ps-shape ps-lime shape-triangle pos-scattered-3 hero-decoration-6" style={{ width: 16, height: 16 }} />
        <div className="ps-shape ps-yellow shape-hexagon pos-floating-1 hero-decoration-7" style={{ width: 30, height: 30 }} />
        <div className="ps-shape ps-purple shape-heart pos-safe-bottom-right hero-decoration-13" style={{ width: 28, height: 28 }} />
        <div className="ps-shape ps-cyan shape-plus pos-safe-top-left hero-decoration-15" style={{ width: 20, height: 20 }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl mb-3 text-gray-900 dark:text-white font-bold">Portfolio <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">Showcase</span></h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 px-4">Explore my journey through projects, qualifications, and technical expertise. Each section represents a milestone in my continuous learning path.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {!isFullPage && (
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
                <span ref={indicatorRef} className="tabs-active-indicator" />
              </TabsList>
            </div>
          )}

          <div>
            {activeTab === "projects" && (
              <TabsContent value="projects" className="tab-content-area">
                <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {items.slice(0, limit).map((project) => (
                    <div
                      key={project.id}
                      className="project-card group bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1a2e] dark:to-[#1a1a2e]/80 rounded-[20px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#B6F500]/20 transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-white/10"
                    >
                      <AspectRatio ratio={16 / 9} className="relative overflow-hidden">
            <ImageWithFallback
              src={project.bannerImage}
              alt={project.judul}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                project.aspect === "portrait" ? "object-top" : "object-center"
              }`}
            />
          </AspectRatio>


                        <div className="p-6 space-y-4">
                          <h3 className="text-xl group-hover:bg-gradient-to-r group-hover:from-[#B6F500] group-hover:to-[#B6F500] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-gray-900 dark:text-white">{project.judul}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.paragraf}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="secondary" className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-white/10 dark:to-white/5 hover:border-[#B6F500] hover:bg-[#B6F500]/10 border rounded-lg text-gray-900 dark:text-white">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!isFullPage && items.length > 3 && (
                    <div className="projects-actions">
                      <Button 
                        variant="outline" 
                        className="see-more-btn" 
                        onClick={() => navigate("/projects")}
                      >
                        See more
                      </Button>
                    </div>
                  )}
              </TabsContent>
            )}

            {activeTab === "qualifications" && (
              <TabsContent value="qualifications" className="tab-content-area">
                <div className="qualifications-grid grid md:grid-cols-2 gap-12 items-stretch">
                    <div>
                      <Card className="qual-card h-full">
                        <CardHeader className="qual-header pb-6">
                          <CardTitle className="qual-title flex items-center gap-4 text-2xl">
                            <span className="qual-title-icon"><GradientBriefcaseIcon size={32} /></span>
                            <span>Experience</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="qual-content-area">
                          <ul className="timeline-list">
                            <li>
                              <div className="timeline-item-title text-lg font-semibold text-gray-900 dark:text-white">PKL BPS Sumedang</div>
                              <div className="item-sub text-base text-gray-600 dark:text-gray-400">July 2025 - October 2025</div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div> 

                    <div>
                      <Card className="qual-card h-full">
                        <CardHeader className="qual-header pb-6">
                          <CardTitle className="qual-title flex items-center gap-4 text-2xl">
                            <span className="qual-title-icon"><GradientCapIcon size={32} /></span>
                            <span>Education</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="qual-content-area">
                          <ul className="timeline-list">
                            <li>
                              <div className="timeline-item-title text-lg font-semibold text-gray-900 dark:text-white">SMKN 1 Sumedang — RPL / Software Engineering</div>
                              <div className="item-sub text-base text-gray-600 dark:text-gray-400">2023 - 2026</div>
                            </li>
                            <li>
                              <div className="timeline-item-title text-lg font-semibold text-gray-900 dark:text-white">SMPN 2 Sumedang</div>
                              <div className="item-sub text-base text-gray-600 dark:text-gray-400">2020 - 2023</div>
                            </li>
                            <li>
                              <div className="timeline-item-title text-lg font-semibold text-gray-900 dark:text-white">SDN Sindangraja</div>
                              <div className="item-sub text-base text-gray-600 dark:text-gray-400">2014 - 2020</div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
              </TabsContent>
            )}

            {activeTab === "tech" && (
              <TabsContent value="tech" className="tab-content-area">
                <div>
                  <TechGrid title="Frontend" items={frontend} />
                  <TechGrid title="Backend & Database" items={backendDb} />
                  <TechGrid title="Tools" items={tools} />
                </div>
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
