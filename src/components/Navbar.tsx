import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import logo from "../assets/logo.png";
import "./Navbar.css";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;
    const navHeight = 80; // Approx height
    const targetTop = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <nav className={`custom-navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="custom-navbar-inner">
          {/* Hamburger Menu - Visible ONLY on Mobile via CSS */}
          <button
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="hamburger-line"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="hamburger-line"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="hamburger-line"
            />
          </button>

          {/* Brand / Logo Section - Hidden on Mobile via CSS */}
          <button onClick={() => scrollToSection("home")} className="nav-brand">
            <img src={logo} alt="Fachri Azka" className="brand-logo" />
            <span className="brand-text">Fachri Azka</span>
          </button>

          {/* Desktop Navigation - Hidden on Mobile via CSS */}
          <div className="nav-links-container">
            {["Home", "About", "Portofolio", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Portofolio") {
                    if (location.pathname !== "/") {
                      navigate("/");
                      setTimeout(() => scrollToSection("showcase"), 120);
                    } else {
                      scrollToSection("showcase");
                    }
                  } else {
                    const target = item.toLowerCase();
                    scrollToSection(target);
                  }
                }}
                className="nav-link"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="nav-actions">
            {/* Theme Toggle - Always Visible */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              <Sun
                className={`absolute transition-all duration-500 ${
                  isDark ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"
                }`}
                color="#FFC857"
                size={24}
              />
              <Moon
                className={`absolute transition-all duration-500 ${
                  isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0"
                }`}
                color="#6C63FF"
                size={24}
              />
            </button>

            {/* CTA Button - Hidden on Mobile via CSS */}
            <button
              onClick={() => scrollToSection("contact")}
              className="cta-button"
            >
              Let's Work
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`drawer-backdrop ${isMobileMenuOpen ? "open" : ""}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Content */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between w-full flex-shrink-0 pt-2">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Fachri Azka"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#6C63FF]/20 dark:ring-[#6C63FF]/40"
            />
          </div>
          
          {/* Close Button (Animated X) */}
          <button
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <motion.span
              animate={{ rotate: 45, y: 8 }}
              className="hamburger-line"
            />
            <motion.span
              animate={{ opacity: 0 }}
              className="hamburger-line"
            />
            <motion.span
              animate={{ rotate: -45, y: -8 }}
              className="hamburger-line"
            />
          </button>
        </div>

        {/* Drawer Links (Centered Vertically, Left Aligned Text) */}
        <div className="flex flex-col justify-center flex-1 w-full pl-2">
          {["Home", "About", "Portofolio", "Contact"].map((item, index) => (
            <button
              key={item}
              onClick={() => {
                if (item === "Portofolio") {
                  if (location.pathname !== "/") {
                    navigate("/");
                    setTimeout(() => scrollToSection("showcase"), 120);
                  } else {
                    scrollToSection("showcase");
                  }
                } else {
                  const target = item.toLowerCase();
                  scrollToSection(target);
                }
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-3xl font-bold text-gray-900 dark:text-white hover:text-[#6C63FF] dark:hover:text-[#6C63FF] transition-colors relative group w-fit mb-6 last:mb-0"
              style={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)', /* Slide from left */
                transition: `all 0.4s ease ${index * 0.1 + 0.2}s`
              }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] transition-all duration-300 group-hover:w-full rounded-full"></span>
            </button>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="w-full text-left pb-6 pl-2 text-sm text-gray-500 dark:text-gray-400 font-medium flex-shrink-0">
          © 2026 Fachri Azka
        </div>
      </div>
    </>
  );
}
