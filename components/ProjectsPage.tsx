// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/frontend-design/SKILL.md
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowLeft, ExternalLink, Terminal, ShieldAlert, Cpu, Image as ImageIcon, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScrollItemProps {
  project: typeof PROJECTS[0];
  index: number;
}

// Map custom screenshot mocks for projects if they exist
const PROJECT_MOCKS: Record<string, string> = {
  "Finals QB": "/finals_qb_preview.png",
  "Live Star Agency": "/livestar_preview.png",
  "LiveStar Portfolio": "/livestar_preview.png",
  "DVLD Licensing System": "/dvld_preview.png"
};

const ProjectScrollItem: React.FC<ScrollItemProps> = ({ project, index }) => {
  const [inView, setInView] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [mediaMode, setMediaMode] = useState<'image' | 'iframe'>('image');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, 
        rootMargin: '50px 0px 50px 0px' 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const hasMockImage = !!PROJECT_MOCKS[project.title] || project.title.toLowerCase().includes('final') || project.title.toLowerCase().includes('live') || project.title.toLowerCase().includes('dvld');
  const mockImagePath = PROJECT_MOCKS[project.title] || (project.title.toLowerCase().includes('final') ? '/finals_qb_preview.png' : project.title.toLowerCase().includes('live') ? '/livestar_preview.png' : '/dvld_preview.png');
  
  const isLiveStar = project.title.toLowerCase().includes('live star') || project.title.toLowerCase().includes('livestar');

  // Render the Right Column Media Panel
  const renderMedia = () => {
    // 1. Live Star Niche: Show Speed Metrics Dashboard instead of iframe
    if (isLiveStar) {
      return (
        <div className="flex flex-col gap-4 p-6 bg-text-main text-surface h-full justify-center">
          <div className="border-b border-surface/20 pb-2 flex justify-between items-center">
            <span className="font-mono text-xs uppercase text-primary font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Speed & Conversion Telemetry
            </span>
            <span className="font-mono text-[9px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-sm">
              OPTIMIZED
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-surface/10 p-3 bg-surface/5 rounded-sm">
              <div className="text-[9px] text-surface/50 font-mono uppercase">MOBILE LOAD SPEED</div>
              <div className="text-2xl font-sans font-black text-green-400 mt-0.5">0.9s</div>
              <div className="text-[9px] text-surface/40">Lighthouse Score: 99</div>
            </div>
            
            <div className="border border-surface/10 p-3 bg-surface/5 rounded-sm">
              <div className="text-[9px] text-surface/50 font-mono uppercase">CONVERSION RATE</div>
              <div className="text-2xl font-sans font-black text-primary mt-0.5">5.0%</div>
              <div className="text-[9px] text-surface/40">Baseline: 2.5% (+100% Leads)</div>
            </div>

            <div className="border border-surface/10 p-3 bg-surface/5 rounded-sm">
              <div className="text-[9px] text-surface/50 font-mono uppercase">COST PER LEAD (CPL)</div>
              <div className="text-2xl font-sans font-black text-green-400 mt-0.5">-50%</div>
              <div className="text-[9px] text-surface/40">From 200 EGP to 100 EGP</div>
            </div>

            <div className="border border-surface/10 p-3 bg-surface/5 rounded-sm">
              <div className="text-[9px] text-surface/50 font-mono uppercase">WordPress Tax</div>
              <div className="text-2xl font-sans font-black text-muted mt-0.5">0 EGP</div>
              <div className="text-[9px] text-surface/40">Eliminated developer fees</div>
            </div>
          </div>

          <div className="border border-surface/10 p-3 bg-surface/5 text-xs font-display italic text-surface/80 rounded-sm leading-relaxed">
            "Improving mobile load speed by a mere 0.1 seconds resulted in a 9.2% increase in average order value and a 35.1% decrease in bounce rate."
          </div>
        </div>
      );
    }

    // 2. Hybrid Image or Iframe rendering (for other projects)
    if (project.link) {
      if (mediaMode === 'image' && hasMockImage) {
        return (
          <div className="relative w-full h-full bg-background-light flex items-center justify-center overflow-hidden">
            <img 
              src={mockImagePath} 
              alt={project.title} 
              className="w-full h-full object-cover object-top opacity-95 group-hover:scale-101 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-main/10 to-transparent pointer-events-none"></div>
          </div>
        );
      }

      // Live App view
      return (
        <div className="w-full h-full relative bg-background-light">
          {inView ? (
            <>
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface z-20">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-mono text-[10px] text-muted">Connecting tunnel...</span>
                </div>
              )}
              <iframe 
                src={project.link} 
                className="w-full h-full border-none bg-surface"
                onLoad={() => setIframeLoaded(true)}
                title={project.title}
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center gap-2">
              <div className="w-6 h-6 border-2 border-muted/20 border-t-muted/40 rounded-full animate-spin"></div>
              <span className="font-mono text-[10px] text-muted">Awaiting connection...</span>
            </div>
          )}
        </div>
      );
    }

    // 3. Fallback when there's no link (Internal architectures / DVLD)
    if (hasMockImage) {
      return (
        <div className="relative w-full h-full bg-background-light flex items-center justify-center overflow-hidden">
          <img 
            src={mockImagePath} 
            alt={project.title} 
            className="w-full h-full object-cover object-top" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text-main/10 to-transparent pointer-events-none"></div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm gap-4 h-full">
        <Terminal size={40} className="text-primary animate-pulse" />
        <div>
          <h3 className="font-sans font-bold text-base text-text-main">Internal Backend Architecture</h3>
          <p className="font-display italic text-xs text-muted mt-1 leading-relaxed">
            This project runs inside secure enterprise environments. The deployment contains database triggers, ADO.NET transactional flows, and strict telemetry diagnostics.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-[80vh] w-full flex items-center justify-center py-10 border-b border-border-color/20 relative"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center px-4 md:px-8">
        
        {/* LEFT: Project Metadata Panel */}
        <div 
          className={`lg:col-span-5 bg-surface border border-border-color p-6 shadow-hard flex flex-col justify-between transition-all duration-500 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 font-bold">
                {project.category || 'System Architecture'}
              </span>
              <span className="font-mono text-xs text-muted">
                PROJECT 0{index + 1}
              </span>
            </div>
            
            <h2 className="font-sans font-black text-2xl text-text-main tracking-tight leading-none">
              {project.title}
            </h2>
            
            <p className="font-sans text-xs text-text-main leading-relaxed mt-1">
              {project.description}
            </p>

            {/* Highlights List */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mt-2">
                <h4 className="font-mono text-[10px] uppercase text-primary font-bold mb-1">Key Highlights</h4>
                <ul className="list-none space-y-1">
                  {project.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-center text-xs font-sans text-muted">
                      <span className="w-1.5 h-1.5 bg-primary mr-1.5 shrink-0"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom Actions and Stack */}
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex flex-wrap gap-1">
              {project.tech.map((tech, tIdx) => (
                <span key={tIdx} className="font-mono text-[9px] px-2 py-0.5 border border-border-color/10 bg-background-light text-text-main">
                  {tech}
                </span>
              ))}
            </div>

            <div className="border-t border-border-color/15 pt-3 flex justify-between items-center">
              {project.link ? (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center justify-center bg-text-main text-surface px-3 py-1.5 border border-border-color font-mono text-[10px] uppercase tracking-wider hover:bg-primary transition-colors cursor-pointer"
                >
                  Open Live App <ExternalLink className="ml-1.5 w-3 h-3" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-muted font-bold">
                  <ShieldAlert size={12} /> Internal System
                </span>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT: Mock Browser Viewport (With Screenshot & Live App Toggle tabs) */}
        <div 
          className={`lg:col-span-7 border border-border-color bg-surface shadow-hard overflow-hidden flex flex-col relative transition-all duration-500 ease-out ${
            inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-98'
          }`}
          style={{ transitionDelay: '50ms' }}
        >
          {/* Mock browser header */}
          <div className="bg-text-main text-surface p-2.5 px-4 flex items-center justify-between border-b border-border-color shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span className="font-mono text-[9px] text-surface/50 ml-3 hidden sm:inline truncate max-w-[200px]">
                {project.link || 'local://system_dashboard'}
              </span>
            </div>
            
            {/* Screenshot vs Live App Toggle tabs (for projects with deployment links, except Live Star) */}
            {project.link && !isLiveStar && (
              <div className="flex border border-surface/20 bg-surface/5 rounded-sm p-0.5 overflow-hidden">
                <button
                  onClick={() => setMediaMode('image')}
                  aria-pressed={mediaMode === 'image'}
                  className={`px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded-sm transition-all flex items-center gap-1 cursor-pointer ${
                    mediaMode === 'image' ? 'bg-surface text-text-main font-bold' : 'text-surface/50 hover:text-surface'
                  }`}
                >
                  <ImageIcon size={10} aria-hidden="true" />
                  Screenshot
                </button>
                <button
                  onClick={() => setMediaMode('iframe')}
                  aria-pressed={mediaMode === 'iframe'}
                  className={`px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider rounded-sm transition-all flex items-center gap-1 cursor-pointer ${
                    mediaMode === 'iframe' ? 'bg-surface text-text-main font-bold' : 'text-surface/50 hover:text-surface'
                  }`}
                >
                  <Globe size={10} aria-hidden="true" />
                  Live App
                </button>
              </div>
            )}
            
            {isLiveStar && (
              <div className="font-mono text-[9px] text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-sm">
                Metric View
              </div>
            )}
          </div>

          {/* Iframe or Image rendering area */}
          <div className="grow relative bg-background-light flex items-center justify-center h-[380px] md:h-[400px] overflow-hidden">
            {renderMedia()}
          </div>

        </div>

      </div>
    </div>
  );
};

const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light graph-paper flex flex-col items-center animate-page-in">
      
      {/* Sticky Top Header */}
      <div className="w-full max-w-[1200px] px-4 md:px-8 pt-20 pb-4 border-b border-border-color/20 flex items-center justify-between z-30 bg-background-light/95 backdrop-blur-sm sticky top-0">
        <div>
          <Link to="/" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-primary font-bold hover:underline mb-1 group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" /> Back to Home
          </Link>
          <h1 className="font-display italic text-2xl md:text-4xl font-extrabold tracking-tight text-text-main">
            Project Showcase
          </h1>
        </div>
        <div className="font-mono text-[10px] text-muted hidden md:block">
          Scroll down to explore all systems
        </div>
      </div>

      {/* Vertical Scroller Wrapper */}
      <div className="w-full flex flex-col items-center" style={{ scrollSnapType: 'y mandatory' }}>
        {PROJECTS.map((project, idx) => (
          <ProjectScrollItem 
            key={idx} 
            project={project} 
            index={idx} 
          />
        ))}
      </div>

      {/* Page Footer Navigation helper */}
      <div className="py-8 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-muted uppercase">End of Portfolio</span>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center bg-text-main text-surface px-5 py-2.5 border border-border-color font-mono text-xs uppercase tracking-wider hover:bg-primary transition-colors shadow-hard"
        >
          Return to Homepage
        </Link>
      </div>

    </div>
  );
};

export default ProjectsPage;
