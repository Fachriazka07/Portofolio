import { Heart, Coffee } from "lucide-react";
import logo from "../assets/logo.webp";
import "./styles/FooterBrutalist.css";
import { useLocation } from "react-router-dom";

export function Footer() {
  const location = useLocation();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };



  return (
    <footer className="footer-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="footer-brand-container">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Fachri Azka Logo" className="footer-logo-img" />
              <h3 className="text-2xl font-black uppercase tracking-tighter text-black dark:text-white">
                Fachri Azka
              </h3>
            </div>
            <p className="text-sm leading-relaxed font-bold opacity-70">
              Fullstack Developer & UI/UX Designer crafting beautiful digital experiences with clean code and creative design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { name: "Home", color: "#FFD700" },      // Yellow
                { name: "About", color: "#22D3EE" },     // Blue/Cyan
                { name: "Portofolio", color: "#A3E635" }, // Green
                { name: "Contact", color: "#c084fc" }    // Purple
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.name.toLowerCase())}
                  className="footer-link text-left"
                  style={{ "--hover-color": link.color } as React.CSSProperties}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div>
            <h4 className="footer-heading">Let's Collaborate</h4>
            <p className="text-sm mb-6 font-bold opacity-70">
              Have an exciting project? Let's turn your ideas into reality together!
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="footer-cta-btn"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © 2026 Fachri Azka. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-5 h-5 footer-heart" fill="currentColor" />
            <span>and</span>
            <Coffee className="w-5 h-5 text-black dark:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}