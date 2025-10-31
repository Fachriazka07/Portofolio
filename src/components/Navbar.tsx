import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import logo from "../assets/logo.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
    <motion.nav
      className={`fixed z-50 transition-none ${
        isScrolled
          ? "bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border border-white/10 dark:border-gray-700/20 shadow-lg"
          : "bg-transparent backdrop-blur-none border-none shadow-none"
      }`}
      style={{
        top: isScrolled ? "32px" : "24px",
        left: "50%",
        width: isScrolled ? "25%" : "100%",
        transform: `translateX(-50%) scale(${isScrolled ? 0.95 : 1})`,
        borderRadius: isScrolled ? "9999px" : "0px",
        willChange: "transform, width, border-radius",
        transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div
        className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isScrolled ? "px-6 py-3" : "max-w-full"
        }`}
        style={
          !isScrolled
            ? {
                paddingLeft: "125px",
                paddingRight: "125px",
              }
            : {}
        }
      >
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isScrolled ? "px-0 py-0" : "px-32 py-10"
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isScrolled ? "h-12 gap-4" : "h-20"
            }`}
          >
            {/* Logo - Always on the left */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 group"
            >
              <motion.img
                src={logo}
                alt="Fachri Azka"
                className="rounded-full object-cover ring-2 ring-[#6C63FF]/20 dark:ring-[#6C63FF]/40"
                initial={{
                  width: 50,
                  height: 50,
                  scale: 1,
                }}
                animate={{
                  width: isScrolled ? 28 : 40,
                  height: isScrolled ? 28 : 40,
                  scale: 1,
                }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  mass: 1,
                  duration: 0.6,
                }}
              />
              <AnimatePresence>
                {!isScrolled && (
                  <motion.span
                    className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent text-xl font-semibold"
                    initial={{ opacity: 0, scale: 0, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: "auto" }}
                    exit={{ opacity: 0, scale: 0, width: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                      mass: 1,
                      duration: 0.7,
                    }}
                  >
                    Fachri Azka
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Centered Navigation */}
            <div
              className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isScrolled
                  ? "flex-1 flex justify-center"
                  : "absolute left-1/2 transform -translate-x-1/2"
              }`}
            >
              <div className="hidden md:flex items-center gap-1">
                {["Home", "About","portofolio", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative rounded-xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group ${
                      isScrolled
                        ? "px-3 py-1.5 text-sm text-gray-900 dark:text-white"
                        : "px-4 py-2 text-gray-900 dark:text-white hover:bg-gradient-to-r hover:from-[#6C63FF]/10 hover:to-[#00C6FF]/10 dark:hover:from-[#6C63FF]/20 dark:hover:to-[#00C6FF]/20"
                    }`}
                  >
                    <span className="relative z-10">{item}</span>
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] transition-all duration-300 group-hover:w-8 ${
                        isScrolled ? "bottom-0" : "bottom-1"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Theme toggle and Let's Work button */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle Icons Only */}
              <button
                onClick={toggleTheme}
                className={`relative hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center ${
                  isScrolled ? "w-6 h-6" : "w-6 h-6"
                }`}
                aria-label="Toggle theme"
              >
                <Sun
                  className={`absolute text-[#FFC857] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isScrolled ? "w-5 h-5" : "w-6 h-6"
                  } ${
                    isDark
                      ? "opacity-0 rotate-180 scale-0"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <Moon
                  className={`absolute text-[#6C63FF] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isScrolled ? "w-5 h-5" : "w-6 h-6"
                  } ${
                    isDark
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-180 scale-0"
                  }`}
                />
              </button>

              {/* Let's Work Button - Hidden when scrolled */}
              <button
                onClick={() => scrollToSection("contact")}
                className={`bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] text-white font-medium transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-lg hover:shadow-[#6C63FF]/25 hover:scale-105 ${
                  isScrolled
                    ? "opacity-0 scale-0 w-0 overflow-hidden"
                    : "opacity-100 scale-100"
                }`}
                style={{
                  width: isScrolled ? "0px" : "145px",
                  height: "40px",
                  borderRadius: "10px",
                }}
              >
                Let's Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
