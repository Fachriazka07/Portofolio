// @ts-ignore
import meImage from "../assets/me.webp";
import { Github, Instagram, Music } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// CountUp component with animation
function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={countRef} className="text-3xl">
      {count}+
    </div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorRef1 = useRef<HTMLDivElement>(null);
  const decorRef2 = useRef<HTMLDivElement>(null);
  const decorRef3 = useRef<HTMLDivElement>(null);
  const decorRef4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [titleRef.current, textRef.current, cardsRef.current, imageRef.current],
        {
          opacity: 0,
          y: 50,
        }
      );

      gsap.set(
        [
          decorRef1.current,
          decorRef2.current,
          decorRef3.current,
          decorRef4.current,
        ],
        {
          opacity: 0,
          scale: 0,
          rotation: 0,
        }
      );

      // Create timeline for entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate decorative elements first
      tl.to(
        [
          decorRef1.current,
          decorRef2.current,
          decorRef3.current,
          decorRef4.current,
        ],
        {
          opacity: 1,
          scale: 1,
          rotation: 360,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      )
        // Then animate content
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        );

      // Floating animation for decorative elements
      gsap.to(decorRef1.current, {
        y: -20,
        rotation: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      gsap.to(decorRef2.current, {
        y: 15,
        rotation: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      gsap.to(decorRef3.current, {
        x: 10,
        y: -10,
        rotation: 20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });

      gsap.to(decorRef4.current, {
        x: -15,
        y: 20,
        rotation: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center justify-center py-20 bg-white dark:bg-[#0f0f1a] relative overflow-hidden transition-colors duration-300"
    >
      {/* Enhanced Decorative elements */}
      <div
        ref={decorRef1}
        className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#6C63FF]/20 to-[#00C6FF]/20 dark:from-[#6C63FF]/30 dark:to-[#00C6FF]/30 rounded-3xl rotate-12 backdrop-blur-sm border border-white/10"
      />
      <div
        ref={decorRef2}
        className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-[#FFC857]/20 to-[#FF6B6B]/20 dark:from-[#FFC857]/30 dark:to-[#FF6B6B]/30 rounded-full backdrop-blur-sm border border-white/10"
      />

      {/* New playful decorative elements */}
      <div
        ref={decorRef3}
        className="absolute top-1/4 left-20 w-16 h-16 bg-gradient-to-br from-[#4ECDC4]/20 to-[#44A08D]/20 dark:from-[#4ECDC4]/30 dark:to-[#44A08D]/30 rounded-2xl rotate-45 backdrop-blur-sm border border-white/10"
      />
      <div
        ref={decorRef4}
        className="absolute bottom-1/3 right-20 w-20 h-20 bg-gradient-to-br from-[#A8E6CF]/20 to-[#88D8A3]/20 dark:from-[#A8E6CF]/30 dark:to-[#88D8A3]/30 rounded-full backdrop-blur-sm border border-white/10"
      />

      {/* Additional floating shapes */}
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-gradient-to-br from-[#FFD93D]/30 to-[#FF6B6B]/30 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-gradient-to-br from-[#6C5CE7]/30 to-[#A29BFE]/30 rounded-full animate-bounce" />
      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-gradient-to-br from-[#00B894]/30 to-[#00CEC9]/30 rounded-lg rotate-12 animate-pulse" />

      <div className="max-w-6xl mx-auto px-6 lg:px-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6C63FF]/10 to-[#00C6FF]/10 dark:from-[#6C63FF]/20 dark:to-[#00C6FF]/20 rounded-full">
              <span className="w-2 h-2 bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] rounded-full animate-pulse" />
              <span className="text-sm text-gray-900 dark:text-white">
                About Me
              </span>
            </div>

            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl text-gray-900 dark:text-white"
            >
              Behind the{" "}
              <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">
                Code
              </span>
            </h2>

            <div
              ref={textRef}
              className="space-y-4 text-gray-600 dark:text-gray-300"
            >
              <p>
                Hi, I’m Fachri — a Fullstack Developer and UI/UX Designer who
                focuses on creating clean, functional, and user-centered digital
                experiences. I enjoy designing intuitive interfaces and turning
                them into seamless, modern websites. My work blends a minimalist
                modern style with a touch of playfulness, reflecting both
                creativity and professionalism.
              </p>
            </div>

            <div ref={cardsRef} className="grid grid-cols-3 gap-4 pt-6">
              <a
                href="https://github.com/fachriazka07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-[#24292e]/5 to-[#24292e]/10 dark:from-[#24292e]/10 dark:to-[#24292e]/20 rounded-2xl hover:shadow-2xl dark:hover:shadow-[#24292e]/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:rotate-1 cursor-pointer group/card backdrop-blur-sm border border-white/5 hover:border-[#24292e]/20"
              >
                <Github className="w-8 h-8 text-[#24292e] dark:text-white transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-12" />
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    GitHub
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Fachriazka07
                  </div>
                </div>
              </a>

              <a
                href="https://instagram.com/fachriazka07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-[#E4405F]/5 to-[#E4405F]/10 dark:from-[#E4405F]/10 dark:to-[#E4405F]/20 rounded-2xl hover:shadow-2xl dark:hover:shadow-[#E4405F]/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:-rotate-1 cursor-pointer group/card backdrop-blur-sm border border-white/5 hover:border-[#E4405F]/20"
              >
                <Instagram className="w-8 h-8 text-[#E4405F] transition-all duration-300 group-hover/card:scale-110 group-hover/card:-rotate-12" />
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Instagram
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Fachriazka07
                  </div>
                </div>
              </a>

              <a
                href="https://open.spotify.com/playlist/6l68CiD2WM6nmiw0pn0hft?si=632291ae78114c74"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-[#1DB954]/5 to-[#1DB954]/10 dark:from-[#1DB954]/10 dark:to-[#1DB954]/20 rounded-2xl hover:shadow-2xl dark:hover:shadow-[#1DB954]/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:rotate-2 cursor-pointer group/card backdrop-blur-sm border border-white/5 hover:border-[#1DB954]/20"
              >
                <Music className="w-8 h-8 text-[#1DB954] transition-all duration-300 group-hover/card:scale-110 group-hover/card:rotate-180" />
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Spotify
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Playlist
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div ref={imageRef} className="relative group order-1 md:order-2">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#6C63FF]/20 to-[#00C6FF]/20 dark:from-[#6C63FF]/30 dark:to-[#00C6FF]/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
            <div className="relative">
              <img
                src={meImage}
                alt="Fachri Azka"
                className="relative rounded-3xl shadow-2xl w-full h-auto aspect-[3/4] md:h-[500px] object-cover ring-4 ring-white dark:ring-[#1a1a2e]"
                width={375}
                height={500}
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#6C63FF] to-[#00C6FF] rounded-3xl flex items-center justify-center shadow-xl animate-float">
                <div className="text-center text-white">
                  <CountUp end={3} duration={2500} />
                  <div className="text-xs">Project Passed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
