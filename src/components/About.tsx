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
