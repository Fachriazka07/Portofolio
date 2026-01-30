import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AspectRatio } from "./ui/aspect-ratio";
import showcaseData from "../data/showcase.json";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export function Showcase() {
  const [limit, setLimit] = useState(6);
  const items: ShowcaseItem[] = useMemo(() => showcaseData as ShowcaseItem[], []);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-card]");
        gsap.set(cards, { opacity: 0, y: 30 });

        cards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card as Element,
            start: "top 80%",
            onEnter: () => {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              });
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="showcase" className="py-32 bg-white dark:bg-[#0f0f1a] relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-20 left-20 w-40 h-40 bg-[#6C63FF]/5 dark:bg-[#6C63FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#00C6FF]/5 dark:bg-[#00C6FF]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6C63FF]/10 to-[#00C6FF]/10 dark:from-[#6C63FF]/20 dark:to-[#00C6FF]/20 rounded-full mb-4">
            <span className="w-2 h-2 bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] rounded-full animate-pulse" />
            <span className="text-sm text-gray-900 dark:text-white">Showcase</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white">Showcase <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">Projects</span></h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Kumpulan proyek terpilih yang saya kerjakan.</p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.slice(0, limit).map((project, idx) => (
            <motion.div
              key={project.id}
              data-card
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="group bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1a2e] dark:to-[#1a1a2e]/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#B6F500]/20 transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-white/10"
            >
              <AspectRatio ratio={project.aspect === "portrait" ? 9 / 16 : project.aspect === "square" ? 1 : 16 / 9} className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.bannerImage}
                  alt={project.judul}
                  className="max-w-full max-h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-br from-[#6C63FF] to-[#00C6FF] opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-3`}>
                  {project.demo && (
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl gap-2" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" /> Demo
                      </a>
                    </Button>
                  )}
                  {project.linkGithub && (
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 rounded-xl gap-2" asChild>
                      <a href={project.linkGithub} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" /> Code
                      </a>
                    </Button>
                  )}
                </div>
              </AspectRatio>

              <div className="p-6 space-y-4">
                <h3 className="text-xl group-hover:bg-gradient-to-r group-hover:from-[#B6F500] group-hover:to-[#B6F500] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-gray-900 dark:text-white">
                  {project.judul}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.paragraf}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-white/10 dark:to-white/5 hover:border-[#B6F500] hover:bg-[#B6F500]/10 border rounded-lg text-gray-900 dark:text-white"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            className="border-2 border-[#B6F500]/40 hover:border-[#B6F500] hover:bg-[#B6F500]/10 transition-colors"
            onClick={() => setLimit((prev) => (prev > 6 ? 6 : Math.min(items.length, prev + 6)))}
          >
            {limit > 6 ? "See less" : "See more"}
          </Button>
        </div>
      </div>
    </section>
  );
}