import { useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Qualifications.css";

gsap.registerPlugin(ScrollTrigger);

export function Qualifications() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;
    gsap.from(leftRef.current, {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
    });
    gsap.from(rightRef.current, {
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: rightRef.current, start: "top 80%" },
    });
  }, []);

  const bullet = "before:content-[''] before:w-2 before:h-2 before:bg-[#B6F500] before:rounded-full before:absolute before:left-0 before:top-2";
  const line = "after:content-[''] after:absolute after:left-[3px] after:top-5 after:w-[2px] after:h-full after:bg-[#B6F500]/40";

  // Gradient icons (briefcase & cap) for titles
  const GradientBriefcaseIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-title-brief" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#00C6FF" />
        </linearGradient>
      </defs>
      <rect x="7" y="5" width="10" height="3" rx="1.2" stroke="url(#grad-title-brief)" strokeWidth="2" />
      <rect x="3" y="8" width="18" height="11" rx="2" stroke="url(#grad-title-brief)" strokeWidth="2" />
      <path d="M3 12 H21" stroke="url(#grad-title-brief)" strokeWidth="2" />
    </svg>
  );

  const GradientCapIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-title-cap" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#00C6FF" />
        </linearGradient>
      </defs>
      <path d="M3 9 L12 5 L21 9 L12 13 L3 9Z" stroke="url(#grad-title-cap)" strokeWidth="2" />
      <path d="M6 11 V15 C6 16.1 8.7 17 12 17 C15.3 17 18 16.1 18 15 V11" stroke="url(#grad-title-cap)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <section id="qualifications" className="py-24 bg-white dark:bg-[#0f0f1a]">
      <div className="max-w-6xl mx-auto px-6 lg:px-20">
        <h2 className="text-4xl md:text-5xl mb-10 text-gray-900 dark:text-white">
          <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">Qualifications</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div ref={leftRef}>
            <Card className="qual-card">
              <CardHeader className="qual-header">
                <CardTitle className="qual-title">
                  <span className="qual-title-icon"><GradientBriefcaseIcon size={20} /></span>
                  <span>Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="timeline-list">
                  <li>
                    <div className="item-title">Freelance Web Developer (Fiverr)</div>
                    <div className="item-sub">2025 - Present</div>
                  </li>
                  <li>
                    <div className="item-title">PKL BPS Sumedang</div>
                    <div className="item-sub">July 2025 - October 2025</div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div ref={rightRef}>
            <Card className="qual-card">
              <CardHeader className="qual-header">
                <CardTitle className="qual-title">
                  <span className="qual-title-icon"><GradientCapIcon size={20} /></span>
                  <span>Education</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="timeline-list">
                  <li>
                    <div className="item-title">SMKN 1 Sumedang — RPL / Software Engineering</div>
                    <div className="item-sub">2023 - 2026</div>
                  </li>
                  <li>
                    <div className="item-title">SMPN 2 Sumedang</div>
                    <div className="item-sub">2020 - 2023</div>
                  </li>
                  <li>
                    <div className="item-title">SDN Sindangraja</div>
                    <div className="item-sub">2014 - 2020</div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}