import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(badgeRef.current, {
        y: 50,
        opacity: 0,
        rotate: -10,
        duration: 0.6,
        ease: "back.out(1.7)"
      })
        .from(textRef.current?.children || [], {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        }, "-=0.3");

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
        <div className="about-card">
          <div ref={textRef} className="about-text">
            <p className="mb-6">
              Hi, I'm <span className="font-black">Fachri Azka</span>.
            </p>

            <p className="mb-6">
              Based in <span className="highlight highlight-pink mx-1">Sumedang, Indonesia</span>,
              I am a <span className="highlight highlight-yellow mx-1 transform -rotate-1">Fullstack Developer</span>
              obsessed with the intersection of logic and creativity. While many developers focus solely on functionality,
              I strive to bridge the gap between robust engineering and <span className="highlight highlight-cyan mx-1 transform rotate-1">immersive UI/UX Design</span>.
            </p>

            <p className="mb-6">
              My toolkit includes <span className="highlight highlight-green mx-1">Next.js, React, and GSAP</span>,
              allowing me to craft websites that are not just functional, but <span className="highlight highlight-purple mx-1 transform rotate-2">visually capturing</span>.
              I treat every project as a challenge to push the boundaries of web performance. Whether it's a complex SaaS dashboard or a playful portfolio,
              I apply strict software engineering standards to ensure the product is maintainable and lightning-fast.
            </p>

            <p>
              I believe in impact over complexity. My goal is to deliver digital solutions that are <span className="highlight highlight-yellow mx-1 transform -rotate-1">raw, honest, and effective</span>—cutting through the noise to deliver real value to users.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
