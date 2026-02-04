import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AllProjects } from "./pages/AllProjects";
import { NotFound } from "./pages/NotFound";
import { Resume } from "./pages/Resume";
import { IntroAnimation } from "./components/IntroAnimation";
import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

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
