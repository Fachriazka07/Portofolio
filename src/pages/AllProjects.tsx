import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Github, ExternalLink, SlidersHorizontal } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
// Import main Portfolio styles for the cards
import "../components/styles/Portfolio.css";
// Import page specific styles
import "../components/styles/AllProjects.css";

// @ts-ignore
import showcaseData from "../data/showcase.json";

interface Project {
  id: number;
  judul: string;
  paragraf: string;
  bannerImage: string;
  techStack: string[];
  linkGithub?: string;
  demo?: string;
  category: string;
  aspect?: string;
}

export function AllProjects() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extract unique categories from data + 'All'
  const categories = useMemo(() => {
    const cats = new Set(showcaseData.map((p: Project) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return showcaseData.filter((project: Project) => {
      const matchesCategory = filter === "All" || project.category === filter;
      const matchesSearch = project.judul.toLowerCase().includes(search.toLowerCase()) ||
        project.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="archive-spacer">
        <div className="archive-container">

          {/* HEADER */}
          <header className="archive-header">
            <Link to="/" className="btn-back">
              <ArrowLeft size={20} /> Back to Home
            </Link>
            <h1 className="archive-title">
              Project <span style={{ color: 'var(--highlight-cyan)' }}>Archive</span>
            </h1>
          </header>

          {/* CONTROLS */}
          <div className="archive-controls">
            {/* Search */}
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search projects..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="search-icon" size={20} />
            </div>

            {/* Filters */}
            <div className="filter-group">
              {categories.map((cat: any) => {
                // Determine color based on category
                let activeColor = "var(--highlight-cyan)";
                if (cat === "All") activeColor = "var(--highlight-green)";
                else if (cat === "website") activeColor = "var(--highlight-cyan)";
                else if (cat === "desktop") activeColor = "var(--highlight-yellow)";
                else if (cat === "web") activeColor = "var(--highlight-pink)";

                return (
                  <button
                    key={cat}
                    className={`filter-btn ${filter === cat ? 'active' : ''}`}
                    onClick={() => setFilter(cat)}
                    style={{ "--active-color": activeColor } as React.CSSProperties}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* GRID */}
          {filteredProjects.length > 0 ? (
            <div className="archive-grid">
              {filteredProjects.map((project: Project) => (
                // Reusing standard browser-card structure from Portfolio.css
                <div key={project.id} className="browser-card">
                  {/* Browser Header */}
                  <div className="browser-header">
                    <div className="browser-dot dot-red" />
                    <div className="browser-dot dot-yellow" />
                    <div className="browser-dot dot-green" />
                    <div className="browser-title-bar">
                      {project.category}://{project.judul.toLowerCase().replace(/\s/g, '')}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="browser-body">
                    <div className="browser-image-container">
                      <img
                        src={project.bannerImage}
                        alt={project.judul}
                        className="browser-image"
                      />
                    </div>

                    <div className="browser-content">
                      <h3 className="project-title">{project.judul}</h3>
                      <p className="project-desc line-clamp-3">{project.paragraf}</p>

                      <div className="project-tags">
                        {project.techStack.map((tag: string) => (
                          <span key={tag} className="project-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="project-actions">
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noreferrer" className="project-btn btn-primary">
                            <ExternalLink size={18} /> Visit
                          </a>
                        )}
                        {project.linkGithub && (
                          <a href={project.linkGithub} target="_blank" rel="noreferrer" className="project-btn btn-outline">
                            <Github size={18} /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="archive-empty">
              <SlidersHorizontal size={48} className="mx-auto mb-4" />
              <p>No projects found matching your criteria.</p>
              <button
                className="mt-4 underline font-bold"
                onClick={() => { setFilter("All"); setSearch(""); }}
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
