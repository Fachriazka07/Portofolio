import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Github, ExternalLink, SlidersHorizontal, Image } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { getProjects, type Project } from "../lib/supabase";
// Import main Portfolio styles for the cards
import "../components/styles/Portfolio.css";
// Import page specific styles
import "../components/styles/AllProjects.css";

export function AllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects(); // Fetches only visible projects
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    window.scrollTo(0, 0);
  }, []);

  // Extract unique categories from data + 'All'
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [projects]);

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = filter === "All" || project.category === filter;
      const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.tech_stack.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, filter, search]);

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
                else if (cat === "mobile") activeColor = "var(--highlight-pink)";

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
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="archive-grid">
              {filteredProjects.map((project) => (
                // Reusing standard browser-card structure from Portfolio.css
                <div key={project.id} className="browser-card">
                  {/* Browser Header */}
                  <div className="browser-header">
                    <div className="browser-dot dot-red" />
                    <div className="browser-dot dot-yellow" />
                    <div className="browser-dot dot-green" />
                    <div className="browser-title-bar">
                      {project.category}://{project.title.toLowerCase().replace(/\s/g, '')}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="browser-body">
                    <div className="browser-image-container">
                      {project.banner_image ? (
                        <img
                          src={project.banner_image}
                          alt={project.title}
                          className="browser-image"
                          onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/cccccc?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                          <Image size={48} />
                        </div>
                      )}
                    </div>

                    <div className="browser-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-desc line-clamp-3">{project.description}</p>

                      <div className="project-tags">
                        {project.tech_stack.map((tag) => (
                          <span key={tag} className="project-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="project-actions">
                        {project.demo_url && (
                          <a href={project.demo_url} target="_blank" rel="noreferrer" className="project-btn btn-primary">
                            <ExternalLink size={18} /> Visit
                          </a>
                        )}
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noreferrer" className="project-btn btn-outline">
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
