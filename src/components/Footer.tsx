import { Heart, Coffee } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = ["Home", "About", "Skills", "Experience", "Projects", "Services", "Contact"];

  return (
    <footer className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] text-white relative overflow-hidden">
      {/* Gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-[#6C63FF] via-[#00C6FF] to-[#6C63FF]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl mb-4">
              Fachri <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">Azka</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Fullstack Developer & UI/UX Designer crafting beautiful digital experiences with clean code and creative design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link.toLowerCase())}
                  className="text-left text-white/60 hover:text-[#6C63FF] transition-colors duration-200 text-sm"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div>
            <h4 className="mb-4">Let's Collaborate</h4>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              Have an exciting project? Let's turn your ideas into reality together!
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] text-white rounded-2xl hover:shadow-lg hover:shadow-[#6C63FF]/30 transition-all duration-300 hover:scale-105 text-sm"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © 2025 Fachri Azka. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-[#6C63FF] animate-pulse" fill="currentColor" />
            <span>and</span>
            <Coffee className="w-4 h-4 text-[#FFC857]" />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6C63FF]/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C6FF]/5 rounded-full blur-3xl" />
    </footer>
  );
}