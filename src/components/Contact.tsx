import { Send, Mail, MapPin, Loader2, Check, AlertCircle } from "lucide-react";
import { FaGithub, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useState, FormEvent, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/ContactBrutalist.css";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/Fachriazka07", color: "#FFD700" }, // Yellow
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/fachriazka07/", color: "#FF6B6B" }, // Pink/Red
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/6282113833833", color: "#A3E635" }, // Lime Green
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/fachriazka-undefined-69553437a", color: "#22D3EE" } // Cyan
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      emailjs.init("3smaLC9f1M-IRp8xe");
    } catch (err) {
      console.error("EmailJS Initialization Failed:", err);
    }
  }, []);

  // GSAP Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(".contact-title-badge", {
        y: -30,
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "back.out(1.7)"
      })
        .from(".contact-heading", {
          y: 20,
          opacity: 0,
          duration: 0.5
        }, "-=0.3")
        .from(formRef.current, {
          x: -50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.2")
        .from(infoRef.current, {
          x: 50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "<"); // Run parallel with form

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      await emailjs.send(
        'service_ad5vyn1',
        'template_efqp0mm',
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          date: new Date().toLocaleString()
        }
      );

      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      console.error('FAILED...', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="contact-container">

        {/* Header */}
        <div className="text-center">
          <div className="contact-title-badge">
            GET IN TOUCH
          </div>
          <h2 className="contact-heading">
            LET'S WORK <span style={{ color: 'var(--highlight-cyan)' }}>TOGETHER</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Left Column: Form */}
          <div ref={formRef} className="contact-form-card">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="contact-label">Your Name</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="contact-input"
                  placeholder="JOHN DOE"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="contact-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="contact-input"
                  placeholder="JOHN@EXAMPLE.COM"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="contact-label">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="contact-textarea"
                  placeholder="TELL ME ABOUT YOUR PROJECT..."
                  rows={5}
                  required
                />
              </div>

              {/* Removed inline alert */}

              <button type="submit" disabled={isLoading} className="contact-btn">
                {isLoading ? (
                  <>Sending <Loader2 className="animate-spin" /></>
                ) : (
                  <>Send Message <Send size={20} /></>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Info & Socials */}
          <div ref={infoRef} className="flex flex-col gap-6">

            {/* Info Card */}
            <div className="contact-info-card">
              <Mail size={32} strokeWidth={2.5} className="contact-info-icon bg-[#FF6B6B] p-1 border-2 border-black dark:border-white" />
              <div>
                <div className="font-bold text-sm uppercase opacity-60 text-black dark:text-gray-300">Email</div>
                <div className="font-black text-lg text-black dark:text-white">fachriazka890@gmail.com</div>
              </div>
            </div>

            <div className="contact-info-card">
              <MapPin size={32} strokeWidth={2.5} className="contact-info-icon bg-[#22D3EE] p-1 border-2 border-black dark:border-white" />
              <div>
                <div className="font-bold text-sm uppercase opacity-60 text-black dark:text-gray-300">Location</div>
                <div className="font-black text-lg text-black dark:text-white">Sumedang, Indonesia</div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="contact-social-grid">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    style={{ "--hover-bg": social.color } as React.CSSProperties}
                  >
                    <Icon size={32} strokeWidth={2} />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* Neo Brutalist Popup/Modal - CSS Class Version */}
      {status.message && (
        <div className="neo-modal-overlay">
          <div className="neo-modal-card">

            <div className="mb-0">
              <h3 className="neo-modal-title">
                {status.type === 'success' ? 'SENT!' : 'ERROR!'}
              </h3>
              <p className="neo-modal-subtitle">
                {status.type === 'success' ? 'Message received.' : status.message}
              </p>
            </div>

            <button
              onClick={() => setStatus({ type: null, message: '' })}
              className="neo-modal-btn"
            >
              {status.type === 'success' ? 'OKAY COOL' : 'TRY AGAIN'}
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
