import React, { useState } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";
import "./projects.css";

type Category = "all" | "frontend" | "backend" | "fullstack" | "mobile";

type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category?: Exclude<Category, "all"> | "other";
};

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  // Only the three projects you requested
  const allProjects: Project[] = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio website with modern design, animations, and a fast dev workflow.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://xterna1y.github.io/Portfolio/",
      githubUrl: "https://github.com/Xterna1y/Portfolio",
      featured: true,
      category: "frontend",
    },
    {
      id: 2,
      title: "Batuu Customer Portal",
      description: "Customer portal for Batuu Climbing — login, bookings, and customer account management.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://online.batuuclimbing.com/login",
      githubUrl: undefined,
      featured: true,
      category: "frontend",
    },
    {
      id: 3,
      title: "Agents Of Tech Website",
      description: "Marketing & events site for Agents Of Tech — event pages, team, and signups.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: undefined,
      githubUrl: "https://github.com/reo/agents-of-tech",
      featured: false,
      category: "frontend",
    },
  ];

  const categories: Category[] = ["all", "frontend", "backend", "fullstack", "mobile"];

  const filteredProjects =
    activeFilter === "all" ? allProjects : allProjects.filter((p) => p.category === activeFilter);

  const renderEmptyCard = (filterKey: Category) => {
    const label =
      filterKey === "frontend"
        ? "Frontend"
        : filterKey === "backend"
        ? "Backend"
        : filterKey === "fullstack"
        ? "Fullstack"
        : filterKey === "mobile"
        ? "Mobile"
        : "Projects";

    return (
      <div className="project-card empty-card">
        <div className="empty-inner">
          <div className="empty-icon">
            <Filter size={20} />
          </div>
          <h3 className="empty-title">More coming in the future</h3>
          <p className="empty-desc">I'm actively building more {label} projects — check back soon!</p>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">
        <header className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-sub">A selection of my recent work and personal projects</p>
        </header>

        {/* Featured area */}
        <div className="featured-grid">
          {allProjects.filter((p) => p.featured).map((project) => (
            <article key={project.id} className="featured-card">
              <div className="featured-hero">
                <div className="featured-icon"><Filter size={48} /></div>
                <div className="featured-badge">Featured</div>
              </div>

              <div className="featured-body">
                <h3 className="featured-title">{project.title}</h3>
                <p className="featured-desc">{project.description}</p>

                <div className="tech-tags">
                  {project.technologies.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                <div className="featured-actions">
                  {project.liveUrl ? (
                    <a className="btn primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  ) : (
                    <span className="btn ghost">Live Demo</span>
                  )}

                  {project.githubUrl ? (
                    <a className="btn outline" href={project.githubUrl} target="_blank" rel="noreferrer">
                      <Github size={14} /> View Code
                    </a>
                  ) : (
                    <span className="btn ghost">View Code</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Filter buttons */}
        <div className="filters-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              <Filter size={14} />
              {cat === "all" ? "All Projects" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* All projects grid */}
        <div className="projects-grid">
          {filteredProjects.length === 0 ? (
            <div className="grid-placeholder">
              {renderEmptyCard(activeFilter)}
            </div>
          ) : (
            filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-hero">
                  <Filter size={32} />
                </div>

                <div className="project-body">
                  <h4 className="project-title">{project.title}</h4>
                  <p className="project-desc">{project.description}</p>

                  <div className="project-tags">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.liveUrl ? (
                      <a className="icon-btn" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live demo`}>
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="icon-btn muted"><ExternalLink size={14} /></span>
                    )}

                    {project.githubUrl ? (
                      <a className="icon-btn" href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} source`}>
                        <Github size={14} />
                      </a>
                    ) : (
                      <span className="icon-btn muted"><Github size={14} /></span>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
