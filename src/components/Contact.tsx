import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Github, Linkedin, Instagram, ExternalLink, Send, Mail, MapPin, Loader2, Check, AlertCircle } from "lucide-react";
import { useState, useEffect, useRef, FormEvent } from "react";
import gsap from "gsap";
import emailjs from '@emailjs/browser';
import "./styles/Hero.css";
import "./styles/PortfolioShowcase.css";
import "./styles/ContactModal.css";
import "./styles/ContactLoader.css";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#", gradient: "from-[#6C63FF] to-[#8B82FF]" },
  { icon: Instagram, label: "Instagram", href: "#", gradient: "from-[#00C6FF] to-[#00A8E6]" },
  { icon: ExternalLink, label: "Fiverr", href: "#", gradient: "from-[#FFC857] to-[#FFB347]" },
  { icon: Linkedin, label: "LinkedIn", href: "#", gradient: "from-[#6C63FF] to-[#00C6FF]" }
];

export function Contact() {
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      // 1. Kirim Email via EmailJS
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

      // 2. Kirim WhatsApp via Backend SendWA
      await sendWhatsApp();

      // Jika sukses keduanya
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: "", email: "", message: "" });

      // Animate popup
      setTimeout(() => {
        if (popupRef.current) {
          gsap.fromTo(popupRef.current,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
          );
        }
      }, 100);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
      console.error('FAILED...', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendWhatsApp = async () => {
    try {
      const response = await fetch('http://localhost:3001/send-wa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) {
        console.error('WhatsApp sending failed:', result);
      } else {
        console.log('WhatsApp sent successfully:', result);
      }
    } catch (error) {
      console.error('Error sending WhatsApp:', error);
    }
  };

  useEffect(() => {
    // Initialize EmailJS explicitly
    try {
      emailjs.init("3smaLC9f1M-IRp8xe");
      console.log("EmailJS Initialized");
    } catch (err) {
      console.error("EmailJS Initialization Failed:", err);
    }

    if (circle1Ref.current) {
      gsap.to(circle1Ref.current, {
        x: gsap.utils.random(-40, 40),
        y: gsap.utils.random(-30, 30),
        scale: gsap.utils.random(0.95, 1.15),
        duration: gsap.utils.random(6, 10),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 1.2),
      });
    }
    if (circle2Ref.current) {
      gsap.to(circle2Ref.current, {
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-40, 40),
        scale: gsap.utils.random(0.9, 1.2),
        duration: gsap.utils.random(5, 9),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 1.2),
      });
    }
    if (shapesRef.current) {
      const container = shapesRef.current;
      const elements = container.querySelectorAll(".ps-shape");
      elements.forEach((el) => {
        const dx = gsap.utils.random(-40, 40);
        const dy = gsap.utils.random(-30, 30);
        const rot = gsap.utils.random(-180, 180);
        const dur = gsap.utils.random(3, 7);
        gsap.to(el, { x: `+=${dx}`, y: `+=${dy}`, rotation: rot, duration: dur, yoyo: true, repeat: -1, ease: "sine.inOut", delay: gsap.utils.random(0, 1.5) });
        if (Math.random() < 0.6) {
          gsap.to(el, { scale: gsap.utils.random(0.9, 1.15), duration: gsap.utils.random(2, 5), yoyo: true, repeat: -1, ease: "power1.inOut" });
        }
      });
    }
  }, []);

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-32 bg-white dark:bg-[#0f0f1a] relative overflow-hidden transition-colors duration-300">
      <div ref={circle1Ref} className="absolute top-0 right-0 w-96 h-96 bg-[#6C63FF]/10 dark:bg-[#6C63FF]/15 rounded-full blur-3xl" />
      <div ref={circle2Ref} className="absolute bottom-0 left-0 w-96 h-96 bg-[#00C6FF]/10 dark:bg-[#00C6FF]/15 rounded-full blur-3xl" />
      <div ref={shapesRef} className="ps-decorations">
        <div className="ps-shape ps-purple shape-diamond pos-top-right hero-decoration-5" style={{ width: 26, height: 26 }} />
        <div className="ps-shape ps-cyan shape-triangle pos-bottom-left hero-decoration-8" style={{ width: 22, height: 22 }} />
        <div className="ps-shape ps-lime shape-hexagon pos-middle-right hero-decoration-7" style={{ width: 24, height: 24 }} />
        <div className="ps-shape ps-yellow shape-star pos-scattered-3 hero-decoration-10" style={{ width: 18, height: 18 }} />
      </div>
      
      <div className="max-w-5xl mx-auto px-6 lg:px-20 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6C63FF]/10 to-[#00C6FF]/10 dark:from-[#6C63FF]/20 dark:to-[#00C6FF]/20 rounded-full mb-4">
            <span className="w-2 h-2 bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] rounded-full animate-pulse" />
            <span className="text-sm text-gray-900 dark:text-white">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-5xl mb-4 text-gray-900 dark:text-white font-bold">Let's Work <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">Together</span></h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Have a project in mind? Drop me a message and let's create something amazing!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1a2e] dark:to-[#1a1a2e]/80 rounded-3xl p-8 shadow-lg border-2 border-gray-100 dark:border-white/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-gray-200 dark:border-white/10 focus:border-[#6C63FF] dark:focus:border-[#6C63FF] rounded-2xl transition-colors bg-white dark:bg-white/5 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-2 border-gray-200 dark:border-white/10 focus:border-[#6C63FF] dark:focus:border-[#6C63FF] rounded-2xl transition-colors bg-white dark:bg-white/5 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-2 border-gray-200 dark:border-white/10 focus:border-[#6C63FF] dark:focus:border-[#6C63FF] rounded-2xl transition-colors min-h-[150px] bg-white dark:bg-white/5 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] text-white hover:shadow-lg hover:shadow-[#6C63FF]/30 dark:hover:shadow-[#6C63FF]/50 transition-all duration-300 hover:scale-105 py-6 rounded-2xl group disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 loading-content">
                    <span>Sending...</span>
                    <Loader2 className="w-5 h-5 spinner-icon" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1a2e] dark:to-[#1a1a2e]/80 rounded-3xl p-8 shadow-lg border-2 border-gray-100 dark:border-white/5 space-y-6">
              <h3 className="text-2xl text-gray-900 dark:text-white">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-2xl hover:shadow-lg dark:hover:shadow-[#6C63FF]/10 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#8B82FF] flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div className="text-sm text-gray-900 dark:text-white">fachriazka890@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-2xl hover:shadow-lg dark:hover:shadow-[#00C6FF]/10 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C6FF] to-[#00A8E6] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                    <div className="text-sm text-gray-900 dark:text-white">Sumedang, Indonesia</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#1a1a2e] dark:to-[#1a1a2e]/80 rounded-3xl p-8 shadow-lg border-2 border-gray-100 dark:border-white/5">
              <h3 className="text-2xl mb-6 text-gray-900 dark:text-white">Connect With Me</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-white/5 rounded-2xl hover:shadow-lg dark:hover:shadow-[#6C63FF]/10 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {status.message && (
        <div className="modal-overlay">
          <div ref={popupRef} className="modal-content">
            <div className={`modal-icon-wrapper ${status.type === 'success' ? 'success' : 'error'}`}>
              {status.type === 'success' ? (
                <Check className="w-12 h-12 text-white" strokeWidth={5} />
              ) : (
                <AlertCircle className="w-12 h-12 text-white" strokeWidth={3} />
              )}
            </div>
            
            <div className="modal-body">
              <h3 className="modal-title">
                {status.type === 'success' ? 'Thank You!' : 'Error'}
              </h3>
              <p className="modal-message">
                {status.type === 'success' ? 'Your details has been successfully submitted. Thanks!' : status.message}
              </p>
              
              <button
                onClick={() => setStatus({ type: null, message: '' })}
                className={`modal-button ${status.type === 'success' ? 'success' : 'error'}`}
              >
                {status.type === 'success' ? 'Continue' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
