import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MessageCircle, Code, Terminal, Save, Github, Linkedin, Instagram, Palette, Gamepad } from "lucide-react";
// @ts-ignore
import avatarImage from "../assets/avatar.jpg";
import "./styles/Hero.css";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Badge Animation
      tl.fromTo(
        badgeRef.current,
        { y: -50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

      // Title Animation
      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0, rotationX: 90 },
        { y: 0, opacity: 1, rotationX: 0, duration: 0.6, ease: "power3.out" },
        "+=0.1"
      );

      // Subtitle Animation
      tl.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        "+=0.1"
      );

      // Description Animation
      if (descriptionRef.current) {
        gsap.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.2 });
      }

      // Buttons Animation
      if (buttonsRef.current) {
        gsap.fromTo(
          buttonsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out" }
        );
      }
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
    <section ref={heroRef} id="home" className="hero-section">
      <div className="hero-grid">

        {/* Left Column: Text Content */}
        <div className="hero-col-text">

          {/* Sticky Note Badge */}
          <div ref={badgeRef} className="hero-badge">
            <span className="text-2xl animate-bounce">👋</span>
            <span className="text-xl font-bold font-sans">Hi there!</span>
          </div>

          {/* Main Headings */}
          <div className="w-full">
            <h1 ref={titleRef} className="hero-title">
              <span>I'm</span> <br />
              Fachri <br />
              Azka.
            </h1>

            {/* Subtitle */}
            <div className="hero-subtitle-container">
              <h2 ref={subtitleRef} className="hero-subtitle">
                Fullstack Developer & <span className="hero-highlight">UI/UX Designer</span>
              </h2>
              <div className="hero-underline"></div>
            </div>
          </div>

          {/* Description */}
          <p ref={descriptionRef} className="text-lg md:text-2xl max-w-3xl font-bold leading-relaxed opacity-0 font-sans mt-4 text-left">
            "I build modern websites that blend design and functionality."
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="hero-btn-container">
            <button
              onClick={() => scrollToSection("contact")}
              className="hero-btn-primary"
            >
              Get in Touch
            </button>

            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/cv.pdf';
                link.download = 'Fachri_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="hero-btn-secondary"
            >
              My Resume
            </button>
          </div>

          {/* Social Icons */}
          <div className="hero-social-container">
            {[
              { icon: <Github className="w-6 h-6" />, label: "Github", link: "#" },
              { icon: <Instagram className="w-6 h-6" />, label: "Instagram", link: "#" },
              { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", link: "#" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                className="hero-social-box"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Nav Dots */}
          <div
            className="hero-nav-dots"
            onClick={() => scrollToSection("about")}
            role="button"
            tabIndex={0}
          >
            ↓ SCROLL TO EXPLORE ↓
          </div>

        </div>

        {/* Right Column: Avatar/Image */}
        <div className="hero-col-image">
          <div className="hero-image-container">

            {/* Floating Stickers (Decorations) */}
            <div className="hero-sticker sticker-code">
              <Code className="w-8 h-8" />
            </div>
            <div className="hero-sticker sticker-design">
              <Palette className="w-8 h-8" />
            </div>
            <div className="hero-sticker sticker-data">
              <Gamepad className="w-8 h-8" />
            </div>

            {/* Image Frame */}
            <div className="hero-image-frame">
              <img
                src={avatarImage}
                alt="Fachri Azka"
                className="hero-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Fachri+Azka&background=random&size=400";
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
