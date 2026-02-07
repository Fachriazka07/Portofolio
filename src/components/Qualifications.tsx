import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getQualifications, type Qualification } from "../lib/supabase";
import "./styles/Qualifications.css";

gsap.registerPlugin(ScrollTrigger);

// Fallback data jika Supabase error
const FALLBACK_EXPERIENCE: Qualification[] = [
  {
    id: '1',
    type: 'experience',
    title: 'PKL BPS Sumedang',
    subtitle: 'Industrial Placement',
    start_date: '2025-07-01',
    end_date: '2025-10-01',
    description: null,
    display_order: 1,
    is_visible: true,
    created_at: ''
  },
];

const FALLBACK_EDUCATION: Qualification[] = [
  { id: '2', type: 'education', title: 'SMKN 1 Sumedang', subtitle: 'Software Engineering', start_date: '2023-07-01', end_date: '2026-06-01', description: null, display_order: 1, is_visible: true, created_at: '' },
  { id: '3', type: 'education', title: 'SMPN 2 Sumedang', subtitle: 'Middle School', start_date: '2020-07-01', end_date: '2023-06-01', description: null, display_order: 2, is_visible: true, created_at: '' },
  { id: '4', type: 'education', title: 'SDN Sindangraja', subtitle: 'Elementary School', start_date: '2014-07-01', end_date: '2020-06-01', description: null, display_order: 3, is_visible: true, created_at: '' },
];

export function Qualifications() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [experience, setExperience] = useState<Qualification[]>([]);
  const [education, setEducation] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQualifications();
        console.log('[Qualifications] Fetched from Supabase:', data);

        if (data && data.length > 0) {
          setExperience(data.filter(q => q.type === 'experience'));
          setEducation(data.filter(q => q.type === 'education'));
        } else {
          console.warn('[Qualifications] No data, using fallback');
          setExperience(FALLBACK_EXPERIENCE);
          setEducation(FALLBACK_EDUCATION);
        }
      } catch (error) {
        console.error('[Qualifications] Failed to fetch:', error);
        setExperience(FALLBACK_EXPERIENCE);
        setEducation(FALLBACK_EDUCATION);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading || !leftRef.current || !rightRef.current) return;

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
  }, [loading]);

  const formatDateRange = (start: string | null, end: string | null) => {
    if (!start) return '';
    const startYear = new Date(start).getFullYear();
    const endYear = end ? new Date(end).getFullYear() : 'Present';
    return `${startYear} - ${endYear}`;
  };

  // Gradient icons
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

  if (loading) {
    return (
      <section id="qualifications" className="py-24 bg-white dark:bg-[#0f0f1a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-20">
          <h2 className="text-4xl md:text-5xl mb-10 text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6FF] bg-clip-text text-transparent">Qualifications</span>
          </h2>
          <div className="animate-pulse grid md:grid-cols-2 gap-8">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </section>
    );
  }

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
                  {experience.length > 0 ? (
                    experience.map((exp) => (
                      <li key={exp.id}>
                        <div className="item-title">{exp.title}</div>
                        <div className="item-sub">{formatDateRange(exp.start_date, exp.end_date)}</div>
                      </li>
                    ))
                  ) : (
                    <li><div className="item-sub">No experience added yet</div></li>
                  )}
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
                  {education.length > 0 ? (
                    education.map((edu) => (
                      <li key={edu.id}>
                        <div className="item-title">{edu.title}{edu.subtitle ? ` — ${edu.subtitle}` : ''}</div>
                        <div className="item-sub">{formatDateRange(edu.start_date, edu.end_date)}</div>
                      </li>
                    ))
                  ) : (
                    <li><div className="item-sub">No education added yet</div></li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}