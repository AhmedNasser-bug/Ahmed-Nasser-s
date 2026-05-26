'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  videoSrc: string;
  badge: string;
  problem: string;
  impact: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "DVLD System",
    description: "Driver and Vehicle Licensing Department management solution",
    url: "https://github.com/AhmedNasser-bug/DVLD-System-Project",
    category: "dotnet",
    tags: ["C#", ".NET", "MSSQL", "T-SQL", "ADO.NET", "WinForms"],
    videoSrc: "https://example.com/dvld-system-demo.mp4",
    badge: "C# .NET",
    problem: "Manual licensing processes caused delays and errors",
    impact: "Automated workflows reduced processing time by 40%"
  },
  {
    id: 2,
    title: "Twinkies Store Management",
    description: "E-commerce solution with inventory and sales analytics",
    url: "https://github.com/AhmedNasser-bug/Twinkies-Store-Management-App",
    category: "dotnet",
    tags: ["C#", ".NET", "Three-Tier Architecture", "SQL Database"],
    badge: "Full Stack",
    videoSrc: "https://example.com/twinkies-store-demo.mp4",
    problem: "Needed scalable solution for growing business",
    impact: "Increased sales by 25% with inventory optimization"
  },
  {
    id: 3,
    title: "Algorithm Analysis",
    description: "Algorithm performance visualization and comparison tool",
    url: "https://github.com/AhmedNasser-bug/Algorithm-Analysis",
    category: "algorithms",
    tags: ["C#", "WinForms", "Data Visualization", "Complexity Analysis"],
    badge: "Data Visualization",
    videoSrc: "https://example.com/algorithm-analysis-demo.mp4",
    problem: "Difficulty understanding algorithm performance characteristics",
    impact: "Visual comparisons improved learning outcomes by 35%"
  },
  {
    id: 4,
    title: "Algorithmic Game Solver",
    description: "Solver for Sudoku, 8 Queens, and maze pathfinding",
    url: "https://github.com/AhmedNasser-bug/Algorithmic-Game-solver",
    category: "python",
    tags: ["Python", "Algorithms", "Pathfinding", "Problem Solving"],
    badge: "Python",
    videoSrc: "https://example.com/game-solver-demo.mp4",
    problem: "Complex puzzle solving required specialized knowledge",
    impact: "Created extensible framework adopted by CS department"
  }
];

export default function ProjectShowcase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search input on "/"
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          const rect = searchInputRef.current.getBoundingClientRect();
          if (rect.top < 0 || rect.bottom > window.innerHeight) {
            searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }

      // Clear search & filter on "Escape"
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        e.preventDefault();
        handleClearFilters();
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);


  // Filter projects
  const filteredProjects = projectsData.filter(project => {
    const query = searchQuery.toLowerCase().trim();
    const matchesCategory = selectedCategory === 'all' || 
      project.category.includes(selectedCategory) ||
      (selectedCategory === 'algorithms' && project.tags.some(tag => tag.toLowerCase().includes('algorithm')));

    const matchesSearch = query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Calculate announcement for screen readers
  let announcementMsg = `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} found`;
  if (selectedCategory !== 'all') {
    announcementMsg += ` in ${selectedCategory} category`;
  }
  if (searchQuery) {
    announcementMsg += ` matching "${searchQuery}"`;
  }

  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title hanwag-fade">Project Showcase</h2>

        {/* Project Filter Controls */}
        <div className="filter-controls mb-5">
          <div className="filter-search">
            <label htmlFor="project-search" className="visually-hidden">Search projects by name or technology</label>
            <div className="position-relative w-100">
              <input
                ref={searchInputRef}
                type="search"
                id="project-search"
                placeholder="Search projects..."
                aria-label="Search projects by name or technology"
                aria-controls="projects-grid"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <kbd className="position-absolute top-50 translate-middle-y end-0 me-3 bg-secondary text-white border-0 px-2 py-1 rounded shadow-sm" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', pointerEvents: 'none' }} aria-hidden="true">/</kbd>
            </div>
          </div>

          <div className="filter-buttons" role="group" aria-label="Filter projects by category">
            {['all', 'dotnet', 'python', 'algorithms'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                aria-controls="projects-grid"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'All' : cat === 'dotnet' ? '.NET' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* A11y Announcements */}
        <div role="status" aria-live="polite" aria-atomic="true" className="visually-hidden">
          {announcementMsg}
        </div>

        {/* Grid Container */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid" id="projects-grid" aria-live="polite">
            {filteredProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                style={{ textDecorationLine: 'none' }}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} project on GitHub (opens in a new tab)`}
                title={`View ${project.title} project on GitHub`}
              >
                <div className="project-card hanwag-fade" data-category={project.category}>
                  <div className="project-visual">
                    <div className="project-media">
                      <video
                        aria-label={`Project demonstration for ${project.title}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="project-video"
                        src={project.videoSrc}
                        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect fill='%230f172a' width='800' height='450'/%3E%3Cpath fill='%231e293b' d='M0,0 L800,450 M800,0 L0,450' stroke='%232563eb' stroke-width='1'/%3E%3C/svg%3E"
                      />
                      <div className="project-overlay" aria-hidden="true" />
                    </div>
                    <span className="project-type-badge badge-code">{project.badge}</span>
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{project.title}<span className="visually-hidden"> (opens in a new tab)</span></h3>
                    <p className="project-description">{project.description}</p>

                    <div className="tech-stack" role="list" aria-label="Technologies used">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tech-tag" role="listitem" title={`${tag} technology`}>{tag}</span>
                      ))}
                    </div>

                    <div className="project-impact">
                      <i className="fas fa-lightbulb impact-icon" aria-hidden="true" />
                      <p>Problem: {project.problem}</p>
                      <p>Impact: {project.impact}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          /* Empty State */
                    <div id="projects-empty-state" className="text-center py-5 bg-dark rounded-3 border border-secondary p-5 my-4" aria-hidden="false" aria-live="polite">
            <i className="fas fa-search fa-3x mb-4 text-primary" aria-hidden="true" />
            <h3 className="h4 mb-2 text-white">No projects found</h3>
            <p className="text-secondary mb-4 fs-5">We couldn&apos;t find any projects matching your current filters. Try clearing them to see more.</p>
            <button type="button" className="btn btn-primary px-4 py-2 fw-bold" onClick={handleClearFilters}>
              <i className="fas fa-times me-2" aria-hidden="true"></i> Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
