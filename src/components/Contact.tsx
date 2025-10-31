import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Github, Linkedin, Instagram, ExternalLink, Send, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#", gradient: "from-[#6C63FF] to-[#8B82FF]" },
  { icon: Instagram, label: "Instagram", href: "#", gradient: "from-[#00C6FF] to-[#00A8E6]" },
  { icon: ExternalLink, label: "Fiverr", href: "#", gradient: "from-[#FFC857] to-[#FFB347]" },
  { icon: Linkedin, label: "LinkedIn", href: "#", gradient: "from-[#6C63FF] to-[#00C6FF]" }
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <section id="contact" className="py-32 bg-white dark:bg-[#0f0f1a] relative overflow-hidden transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6C63FF]/5 dark:bg-[#6C63FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00C6FF]/5 dark:bg-[#00C6FF]/10 rounded-full blur-3xl" />
      
      <div className="max-w-5xl mx-auto px-6 lg:px-20 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6C63FF]/10 to-[#00C6FF]/10 dark:from-[#6C63FF]/20 dark:to-[#00C6FF]/20 rounded-full mb-4">
            <span className="w-2 h-2 bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] rounded-full animate-pulse" />
            <span className="text-sm text-gray-900 dark:text-white">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white">Let's Work <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">Together</span></h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
                className="w-full bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] text-white hover:shadow-lg hover:shadow-[#6C63FF]/30 dark:hover:shadow-[#6C63FF]/50 transition-all duration-300 hover:scale-105 py-6 rounded-2xl group"
              >
                Send Message
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
    </section>
  );
}