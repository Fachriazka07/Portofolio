import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { AllProjects } from "./pages/AllProjects";
import { NotFound } from "./pages/NotFound";
import { Resume } from "./pages/Resume";
import { IntroAnimation } from "./components/IntroAnimation";
import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";

// Admin Pages
import { AuthProvider } from "@/components/admin/AuthProvider";
import { Login } from "@/pages/admin/Login";
import { Dashboard } from "@/pages/admin/Dashboard";
import { Projects } from "@/pages/admin/Projects";
import { Skills } from "@/pages/admin/Skills";
import { Qualifications } from "@/pages/admin/Qualifications";
import { Messages } from "@/pages/admin/Messages";

import { useAnalytics } from "./hooks/useAnalytics";

export default function App() {
  useAnalytics(); // Initialize analytics tracking
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const location = useLocation();

  // Check if current route is admin (secret route for security)
  const isAdminRoute = location.pathname.startsWith('/cp-7x9k2m');

  useEffect(() => {
    // Only show intro on homepage and if not already shown this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro && window.location.pathname === "/") {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
    setIntroComplete(true);
  };

  // Admin routes - no intro, no custom cursor, no smooth scroll
  if (isAdminRoute) {
    return (
      <AuthProvider>
        <Routes>
          <Route path="/cp-7x9k2m/login" element={<Login />} />
          <Route path="/cp-7x9k2m" element={<Dashboard />} />
          <Route path="/cp-7x9k2m/projects" element={<Projects />} />
          <Route path="/cp-7x9k2m/skills" element={<Skills />} />
          <Route path="/cp-7x9k2m/qualifications" element={<Qualifications />} />
          <Route path="/cp-7x9k2m/messages" element={<Messages />} />
        </Routes>
      </AuthProvider>
    );
  }

  // Public routes
  return (
    <SmoothScroll>
      <div className="min-h-screen">
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Intro Animation - only shows on first visit to homepage */}
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

        {/* Main Content - hidden during intro */}
        <div style={{ visibility: introComplete ? "visible" : "hidden" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/portfolio" element={<AllProjects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SmoothScroll>
  );
}
