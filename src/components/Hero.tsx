import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Palette, Gamepad } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
// @ts-ignore
import avatarImage from "../assets/avatar.webp";
import "./styles/Hero.css";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    const isIntroPlaying = !hasSeenIntro && window.location.pathname === "/";
    const animationDelay = isIntroPlaying ? 4000 : 0;

    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Main timeline for entrance animations
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Badge drops in with bounce
        tl.fromTo(
          badgeRef.current,
          { y: -80, opacity: 0, scale: 0.5, rotation: -15 },
          { y: 0, opacity: 1, scale: 1, rotation: -2, duration: 0.7, ease: "back.out(2)" }
        );

        // 2. Split the title into lines and animate each
        if (titleRef.current) {

          // Animate the whole title with a dramatic entrance
          tl.fromTo(
            titleRef.current,
            {
              y: 120,
              opacity: 0,
              rotationX: -45,
              transformOrigin: "center bottom"
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 0.8,
              ease: "power4.out"
            },
            "-=0.3"
          );
        }

        // 3. Subtitle slides in with highlight animation
        tl.fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0, clipPath: "inset(0 100% 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.6 },
          "-=0.4"
        );

        // 4. Underline draws in
        tl.fromTo(
          ".hero-underline",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.5, ease: "power2.inOut" },
          "-=0.3"
        );

        // 5. Description fades up
        if (descriptionRef.current) {
          tl.fromTo(
            descriptionRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.2"
          );
        }

        // 6. Buttons stagger in with pop effect
        if (buttonsRef.current) {
          tl.fromTo(
            buttonsRef.current.children,
            { y: 40, opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.15,
              ease: "back.out(1.5)"
            },
            "-=0.2"
          );
        }

        // 7. Social icons pop in one by one
        if (socialsRef.current) {
          tl.fromTo(
            socialsRef.current.children,
            { y: 30, opacity: 0, scale: 0, rotation: -180 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "back.out(2)"
            },
            "-=0.3"
          );
        }

        // 8. Image container reveals with mask effect
        if (imageContainerRef.current) {
          const frame = imageContainerRef.current.querySelector(".hero-image-frame");
          const stickers = imageContainerRef.current.querySelectorAll(".hero-sticker");

          tl.fromTo(
            frame,
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
            "-=0.6"
          );

          // Stickers fly in with elastic bounce
          tl.fromTo(
            stickers,
            { scale: 0, opacity: 0, rotation: -45 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "elastic.out(1, 0.5)"
            },
            "-=0.4"
          );
        }

        // 9. Scroll indicator bounces in
        tl.fromTo(
          ".hero-nav-dots",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.2"
        );

        // === PARALLAX & SCROLL EFFECTS ===

        // Parallax on stickers when scrolling
        gsap.to(".sticker-code", {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });

        gsap.to(".sticker-design", {
          yPercent: -80,
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5
          }
        });

        gsap.to(".sticker-data", {
          yPercent: -60,
          rotation: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8
          }
        });

        // Note: Removed hero content fade out to prevent text disappearing on scroll back

      }, heroRef);

      return () => ctx.revert();
    }, animationDelay);

    return () => clearTimeout(timeoutId);
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
        <div ref={badgeRef} className="hero-col-badge">
          <div className="hero-badge">
            <span className="text-2xl animate-bounce">👋</span>
            <span className="text-xl font-bold font-sans">Hi there!</span>
          </div>
        </div>
        <div className="hero-col-text">
          <div className="w-full">
            <h1 ref={titleRef} className="hero-title">
              <span>I'm</span> <br />
              Fachri <br />
              Azka.
            </h1>
            <div className="hero-subtitle-container">
              <h2 ref={subtitleRef} className="hero-subtitle">
                Fullstack Developer & <span className="hero-highlight">UI/UX Designer</span>
              </h2>
              <div className="hero-underline"></div>
            </div>
          </div>
          <p ref={descriptionRef} className="hero-description text-lg md:text-2xl max-w-3xl font-bold leading-relaxed font-sans mt-4 text-left">
            "I build modern websites that blend design and functionality."
          </p>
          <div ref={buttonsRef} className="hero-btn-container">
            <button
              onClick={() => scrollToSection("contact")}
              className="hero-btn-primary"
            >
              Get in Touch
            </button>

            <a
              href="/resume"
              className="hero-btn-secondary"
            >
              My Resume
            </a>
          </div>
          <div ref={socialsRef} className="hero-social-container">
            {[
              { icon: <FaGithub className="w-6 h-6" />, label: "Github", link: "https://github.com/Fachriazka07" },
              { icon: <FaInstagram className="w-6 h-6" />, label: "Instagram", link: "https://www.instagram.com/fachriazka07/" },
              { icon: <FaLinkedin className="w-6 h-6" />, label: "LinkedIn", link: "https://www.linkedin.com/in/fachriazka-undefined-69553437a" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-box"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <div
            className="hero-nav-dots"
            onClick={() => scrollToSection("about")}
            role="button"
            tabIndex={0}
          >
            ↓ SCROLL TO EXPLORE ↓
          </div>

        </div>
        <div className="hero-col-image">
          <div ref={imageContainerRef} className="hero-image-container">
            <div className="hero-sticker sticker-code">
              <Code className="w-8 h-8" />
            </div>
            <div className="hero-sticker sticker-design">
              <Palette className="w-8 h-8" />
            </div>
            <div className="hero-sticker sticker-data">
              <Gamepad className="w-8 h-8" />
            </div>
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
