import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Badge slams in with rotation
      tl.fromTo(
        badgeRef.current,
        {
          y: -80,
          opacity: 0,
          scale: 0.5,
          rotation: -20
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: -3,
          duration: 0.7,
          ease: "back.out(2)"
        }
      );

      // 2. Card reveals with clip-path
      tl.fromTo(
        cardRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          opacity: 0
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut"
        },
        "-=0.3"
      );

      // 3. Each paragraph reveals with stagger
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll("p");
        tl.fromTo(
          paragraphs,
          {
            y: 40,
            opacity: 0,
            filter: "blur(10px)"
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out"
          },
          "-=0.4"
        );
      }

      // 4. Highlights animate in separately (color fills)
      const highlights = document.querySelectorAll(".about-card .highlight");
      highlights.forEach((highlight, i) => {
        gsap.fromTo(
          highlight,
          {
            backgroundSize: "0% 100%"
          },
          {
            backgroundSize: "100% 100%",
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: highlight,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            delay: i * 0.1
          }
        );
      });

      // Parallax effect on card when scrolling
      gsap.to(cardRef.current, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-container">

        {/* Title Badge */}
        <div className="relative">
          <h2 ref={badgeRef} className="about-title-badge">ABOUT ME</h2>
        </div>

        {/* Main Content Card */}
        <div ref={cardRef} className="about-card">
          <div ref={textRef} className="about-text">
            <p className="mb-6">
              Hi, I'm <span className="font-black">Fachri Azka</span>.
            </p>

            <p className="mb-6">
              I am a<br className="block md:hidden" /><span className="highlight highlight-yellow mx-1 transform -rotate-1">Software Engineering</span> Student focused on building digital products that actually work.
            </p>

            <p className="mb-6">
              In a world of heavy, over-animated websites, I choose <span className="highlight highlight-cyan mx-1 transform rotate-1">simplicity</span>. I believe a good user experience (UX) isn't about flashy effects—it's about <span className="highlight highlight-pink mx-1">respect</span>. Respect for the user's time, data, and device.
            </p>

            <p>
              My goal is to craft websites that are <span className="highlight highlight-green mx-1">intuitive</span> and accessible. Whether on high-speed WiFi or a slow mobile connection, I ensure my code delivers a <span className="highlight highlight-purple mx-1 transform rotate-2">seamless</span> experience without sacrificing aesthetics.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
