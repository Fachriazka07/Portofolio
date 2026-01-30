import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { PortfolioShowcase } from "../components/PortfolioShowcase";

import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Navbar />
      <main className="space-y-0 mb-40">
        <Hero />
        <About />
        {/* Skills section removed */}
        <PortfolioShowcase />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
