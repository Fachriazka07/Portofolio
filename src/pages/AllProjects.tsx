import { Navbar } from "../components/Navbar";
import { PortfolioShowcase } from "../components/PortfolioShowcase";
import { Footer } from "../components/Footer";
import { useEffect } from "react";

export function AllProjects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f1a]">
      <Navbar />
      <main className="all-projects-spacer">
        <PortfolioShowcase isFullPage={true} />
      </main>
      <Footer />
    </div>
  );
}
