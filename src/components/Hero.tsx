import { Button } from "./ui/button";
import { MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./styles/Hero.css";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        badgeRef.current,
        { y: -50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
      
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotationX: 90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 0.6, ease: "power3.out" },
        "+=0.1"
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        "+=0.1"
      );

      if (descriptionRef.current) {
        const words = descriptionRef.current.innerText.split(" ");
        descriptionRef.current.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block opacity-0" style="transform: translateY(20px)">${word}</span>`
          )
          .join(" ");

        const wordElements = descriptionRef.current.querySelectorAll("span");

        tl.fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          "+=0.1"
        ).to(
          wordElements,
          {
            opacity: 1,
            y: 0,
            duration: 0.03,
            stagger: 0.04,
            ease: "power2.out",
          },
          "-=0.1"
        );
      }

      if (buttonsRef.current) {
        gsap.set(buttonsRef.current.children, {
          y: 40,
          opacity: 0,
          scale: 0.8,
          rotationX: 45,
        });

        tl.to(
          buttonsRef.current.children,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "+=0.1"
        ).to(
          buttonsRef.current.children,
          {
            y: -5,
            duration: 2,
            stagger: 0.3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
          },
          "+=0.5"
        );
      }
      
      tl.to(
        badgeRef.current,
        {
          y: -8,
          duration: 2.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        },
        "-=2"
      );

      const buttons = buttonsRef.current?.querySelectorAll("button");
      buttons?.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f8f9ff] via-white to-[#f0f7ff] dark:from-[#0a0a12] dark:via-[#0f0f1a] dark:to-[#1a1a2e] pt-20 transition-colors duration-300"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6C63FF]/10 dark:bg-[#6C63FF]/20 rounded-full blur-3xl hero-bg-gradient-1" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00C6FF]/10 dark:bg-[#00C6FF]/20 rounded-full blur-3xl hero-bg-gradient-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#6C63FF]/5 to-[#00C6FF]/5 dark:from-[#6C63FF]/10 dark:to-[#00C6FF]/10 rounded-full blur-3xl hero-bg-gradient-3" />
        <div className="absolute top-10 right-1/3 w-48 h-48 bg-[#FFC857]/8 dark:bg-[#FFC857]/15 rounded-full blur-2xl hero-bg-gradient-1" />
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-[#FF6B6B]/8 dark:bg-[#FF6B6B]/15 rounded-full blur-2xl hero-bg-gradient-2" />
      </div>

      <div className="absolute top-32 right-20 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#00C6FF] opacity-20 dark:opacity-30 hero-decoration-1" />
      <div className="absolute bottom-40 left-32 w-12 h-12 rounded-full bg-[#FFC857]/30 dark:bg-[#FFC857]/40 hero-decoration-2" />
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-br from-[#00C6FF] to-[#6C63FF] rounded-lg opacity-30 dark:opacity-40 hero-decoration-3" />
      <div className="absolute top-1/4 left-16 w-6 h-6 bg-[#FF6B6B]/40 dark:bg-[#FF6B6B]/50 rounded-full hero-decoration-4" />
      <div className="absolute top-3/4 right-32 w-10 h-10 bg-gradient-to-tr from-[#FFC857] to-[#FF6B6B] opacity-25 dark:opacity-35 rounded-lg hero-decoration-5" />
      <div className="absolute top-1/2 left-8 w-14 h-14 bg-[#6C63FF]/20 dark:bg-[#6C63FF]/30 rounded-2xl hero-decoration-6" />
      <div className="absolute bottom-1/3 right-16 w-7 h-7 bg-gradient-to-bl from-[#00C6FF] to-[#6C63FF] opacity-30 dark:opacity-40 rounded-full hero-decoration-7" />
      <div className="absolute top-16 left-1/3 w-9 h-9 bg-[#FFC857]/35 dark:bg-[#FFC857]/45 rounded-lg hero-decoration-8" />
      <div className="absolute bottom-16 left-1/2 w-11 h-11 bg-gradient-to-r from-[#FF6B6B] to-[#FFC857] opacity-25 dark:opacity-35 rounded-2xl hero-decoration-9" />
      <div className="absolute top-2/3 right-8 w-5 h-5 bg-[#00C6FF]/40 dark:bg-[#00C6FF]/50 rounded-full hero-decoration-10" />

      {/* Triangle and diamond shapes */}
      <div className="absolute w-8 h-8 bg-[#6C63FF]/25 dark:bg-[#6C63FF]/35 hero-decoration-11 shape-triangle pos-top-right" />
      <div className="absolute w-6 h-6 bg-[#FFC857]/30 dark:bg-[#FFC857]/40 hero-decoration-12 shape-diamond pos-bottom-left" />
      <div className="absolute w-7 h-7 bg-[#FF6B6B]/25 dark:bg-[#FF6B6B]/35 hero-decoration-1 shape-triangle pos-upper-left" />
      <div className="absolute w-9 h-9 bg-[#00C6FF]/20 dark:bg-[#00C6FF]/30 hero-decoration-2 shape-diamond pos-lower-right" />

      {/* Star shapes */}
      <div className="absolute w-6 h-6 bg-[#FFC857]/35 dark:bg-[#FFC857]/45 hero-decoration-3 shape-star pos-top-center" />
      <div className="absolute w-5 h-5 bg-[#6C63FF]/30 dark:bg-[#6C63FF]/40 hero-decoration-4 shape-star pos-bottom-center" />

      {/* Hexagon shapes */}
      <div className="absolute w-8 h-8 bg-[#00C6FF]/25 dark:bg-[#00C6FF]/35 hero-decoration-5 shape-hexagon pos-middle-right" />
      <div className="absolute w-6 h-6 bg-[#FF6B6B]/30 dark:bg-[#FF6B6B]/40 hero-decoration-6 shape-hexagon pos-lower-left" />

      {/* Plus signs */}
      <div className="absolute w-2 h-4 bg-[#FFC757]/40 dark:bg-[#FFC857]/50 hero-decoration-7 shape-plus pos-scattered-1" />
      <div className="absolute w-5 h-5 bg-[#6C63FF]/35 dark:bg-[#6C63FF]/45 hero-decoration-8 shape-plus pos-safe-bottom-right" />

      {/* Heart shapes */}
      <div className="absolute w-6 h-6 bg-[#FF6B6B]/30 dark:bg-[#FF6B6B]/40 hero-decoration-9 shape-heart pos-floating-1" />

      {/* Lightning bolt */}
      <div className="absolute w-5 h-8 bg-[#FFC857]/35 dark:bg-[#FFC857]/45 hero-decoration-10 shape-lightning pos-scattered-2" />

      {/* Floating particles */}
      <div className="absolute w-2 h-2 bg-[#6C63FF]/50 dark:bg-[#6C63FF]/60 rounded-full hero-decoration-1 pos-scattered-3" />
      <div className="absolute w-1.5 h-1.5 bg-[#00C6FF]/60 dark:bg-[#00C6FF]/70 rounded-full hero-decoration-2 pos-safe-top-left" />
      <div className="absolute w-2.5 h-2.5 bg-[#FFC857]/45 dark:bg-[#FFC857]/55 rounded-full hero-decoration-3 pos-safe-bottom-left" />
      <div className="absolute w-1 h-1 bg-[#FF6B6B]/55 dark:bg-[#FF6B6B]/65 rounded-full hero-decoration-4 pos-bottom-center" />
      <div className="absolute w-1.5 h-1.5 bg-[#6C63FF]/40 dark:bg-[#6C63FF]/50 rounded-full hero-decoration-5 pos-far-left" />
      <div className="absolute w-2 h-2 bg-[#00C6FF]/50 dark:bg-[#00C6FF]/60 rounded-full hero-decoration-6 pos-safe-top-right" />

      {/* Wavy lines */}
      <div className="absolute w-12 h-1 bg-gradient-to-r from-[#6C63FF]/30 to-[#00C6FF]/30 dark:from-[#6C63FF]/40 dark:to-[#00C6FF]/40 hero-decoration-7 wavy-line-1 pos-floating-2" />
      <div className="absolute w-10 h-1 bg-gradient-to-r from-[#FFC857]/35 to-[#FF6B6B]/35 dark:from-[#FFC857]/45 dark:to-[#FF6B6B]/45 hero-decoration-8 wavy-line-2 pos-scattered-4" />

      {/* Spiral elements */}
      <div className="absolute w-8 h-8 border-2 border-[#6C63FF]/25 dark:border-[#6C63FF]/35 rounded-full hero-decoration-9 spiral-1 pos-upper-right" />
      <div className="absolute w-6 h-6 border-2 border-[#FFC857]/30 dark:border-[#FFC857]/40 rounded-full hero-decoration-10 spiral-2 pos-lower-left" />
      <div className="absolute w-5 h-5 bg-[#6C63FF]/30 dark:bg-[#6C63FF]/40 hero-decoration-4 shape-star pos-bottom-center" />

      {/* Additional hexagon shapes */}
      <div className="absolute w-8 h-8 bg-[#FF6B6B]/20 dark:bg-[#FF6B6B]/30 hero-decoration-5 shape-hexagon pos-middle-left" />
      <div className="absolute w-7 h-7 bg-[#00C6FF]/25 dark:bg-[#00C6FF]/35 hero-decoration-6 shape-hexagon pos-center-right" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-20 text-center">
        <div className="space-y-6">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/10 rounded-full shadow-lg shadow-[#6C63FF]/10 dark:shadow-[#6C63FF]/20 mb-4 backdrop-blur-sm opacity-0 badge-no-cursor"
          >
            <Sparkles className="w-4 h-4 text-[#FFC857] sparkles-animated" />
            <span className="text-sm text-gray-900 dark:text-white">
              Hi Dude, Welcome to my Digital {""}
              <span className="playground-highlight">Portofolio</span>
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-gray-900 dark:text-white opacity-0 font-bold tracking-tight"
          >
            I'm{" "}
            <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">
              Fachri
            </span>
          </h1>

          <h2
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 opacity-0 font-medium"
          >
            Fullstack Developer | UI/UX Designer
          </h2>

          <p
            ref={descriptionRef}
            className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto opacity-0 px-4"
          >
            I enjoy building modern websites that blend design and
            functionality. From creating intuitive interfaces to developing
            efficient code, I aim to craft products that not only work great but
            also feel great to use.! ✨
          </p>

          {/* Landing navigation removed; Tabbed layout lives in PortfolioShowcase */}

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4"
          >
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] text-white hover:shadow-lg hover:shadow-[#6C63FF]/30 dark:hover:shadow-[#6C63FF]/50 transition-all duration-300 px-8 py-6 rounded-2xl group button-enhanced"
            >
              Let's Talk
              <MessageCircle className="ml-2 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
            </Button>

            <Button
              onClick={() => {
                // Create a temporary link to download CV
                const link = document.createElement('a');
                link.href = '/cv.pdf'; // Assuming CV file is in public folder
                link.download = 'Fachri_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              variant="outline"
              className="border-2 border-[#6C63FF]/30 dark:border-[#6C63FF]/50 hover:border-[#6C63FF] hover:bg-[#6C63FF]/5 dark:hover:bg-[#6C63FF]/10 transition-all duration-300 px-8 py-6 rounded-2xl text-gray-900 dark:text-white button-outline-enhanced"
            >
              My Resume
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator with bounce animation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
        <div className="w-6 h-10 border-2 border-[#6C63FF]/30 dark:border-[#6C63FF]/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gradient-to-b from-[#6C63FF] to-[#00C6FF] rounded-full" />
        </div>
      </div>
    </section>
  );
}
