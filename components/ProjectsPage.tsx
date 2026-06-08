// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/gsap-react-best-practices/SKILL.md
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowLeft, ExternalLink, Terminal, ShieldAlert, Cpu, Image as ImageIcon, Globe, Zap, Copy, Check, Star, GitFork, Code2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAPTilt, GSAPMagnetic } from './gsap';

// Import local images directly to allow Vite to bundle them correctly
import dvldImg from '../src/assets/dvld_preview.png';
import algoImg from '../src/assets/AlgorithmVisualizer.png';
import gameImg from '../src/assets/game_solver.png';

gsap.registerPlugin(ScrollTrigger);

interface ExtendedProject {
  title: string;
  category: string;
  tech: string[];
  description: string;
  highlights?: string[];
  link?: string;
  isGithub?: boolean;
  stars?: string;
  forks?: string;
  branch?: string;
  image?: string;
}

// Map custom screenshot mocks for projects if they exist
const PROJECT_MOCKS: Record<string, string> = {
  "Finals QB": "/finals_qb_preview.png",
  "Live Star Agency": "/livestar_preview.png",
  "LiveStar Portfolio": "/livestar_preview.png",
  "DVLD Licensing System": "/dvld_preview.png"
};

// Combine original and open-source GitHub projects into one list (7 + 3 = 10 projects)
const ALL_PROJECTS: ExtendedProject[] = [
  ...PROJECTS.map(p => ({ ...p, isGithub: false })),
  {
    title: "DVLD Licensing System",
    category: "System Architecture",
    tech: ["C#", ".NET WinForms", "T-SQL", "ADO.NET", "Three-Tier Architecture"],
    description: "Fullstack Driver & Vehicle Licensing system structured on a strict three-tier architecture. Features a custom dynamic Data Access Layer builder tool, secure transaction flows, and comprehensive administrative controls.",
    image: dvldImg,
    link: "https://github.com/AhmedNasser-bug/DVLD-System-Project",
    stars: "12",
    forks: "4",
    branch: "master",
    isGithub: true
  },
  {
    title: "Algorithm Performance Visualizer",
    category: "Desktop Tool",
    tech: ["C#", "WinForms", "GDI+", "Benchmark Engine", "Data Analysis"],
    description: "A desktop sandbox for benchmark testing and real-time step visualization of sorting, searching, and graph pathfinding algorithms. Renders high-fidelity telemetry performance charts and comparative analytics.",
    image: algoImg,
    link: "https://github.com/AhmedNasser-bug/Algorithm-Analysis",
    stars: "8",
    forks: "2",
    branch: "main",
    isGithub: true
  },
  {
    title: "AI Algorithmic Game Solver",
    category: "Artificial Intelligence",
    tech: ["Python", "Tkinter", "AI Pathfinding", "Heuristic Search"],
    description: "An AI-driven pathfinding game solver. Utilizes unified graph-solving state algorithms (BFS, DFS, DLS, IDDFS, Hill Climbing) to solve interactive Mazes, Sudoku tables, and the classic 8-Queens constraint problem.",
    image: gameImg,
    link: "https://github.com/AhmedNasser-bug/Algorithmic-Game-solver",
    stars: "6",
    forks: "1",
    branch: "master",
    isGithub: true
  }
];

const ProjectCard: React.FC<{
  project: ExtendedProject;
  index: number;
  isActive: boolean;
}> = ({ project, index, isActive }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [mediaMode, setMediaMode] = useState<'image' | 'iframe'>('image');
  const [copied, setCopied] = useState(false);

  // Auto reset media mode to image if card becomes inactive
  useEffect(() => {
    if (!isActive) {
      setMediaMode('image');
      setIframeLoaded(false);
    }
  }, [isActive]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasMockImage = !!PROJECT_MOCKS[project.title] || project.title.toLowerCase().includes('final') || project.title.toLowerCase().includes('live') || project.title.toLowerCase().includes('dvld') || !!project.image;
  
  const mockImagePath = project.image || PROJECT_MOCKS[project.title] || (project.title.toLowerCase().includes('final') ? '/finals_qb_preview.png' : project.title.toLowerCase().includes('live') ? '/livestar_preview.png' : '/dvld_preview.png');
  
  const isLiveStar = project.title.toLowerCase().includes('live star') || project.title.toLowerCase().includes('livestar');

  const renderMedia = () => {
    if (isLiveStar) {
      return (
        <div className="flex flex-col gap-3 p-4 md:p-6 bg-text-main text-surface h-full justify-center">
          <div className="border-b border-surface/20 pb-1.5 flex justify-between items-center">
            <span className="font-mono text-[9px] uppercase text-primary font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              Speed & Conversion Telemetry
            </span>
            <span className="font-mono text-[9px] text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-sm">
              OPTIMIZED
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-surface/10 p-2 bg-surface/5 rounded-sm">
              <div className="text-[8px] text-surface/50 font-mono uppercase">MOBILE LOAD SPEED</div>
              <div className="text-lg font-sans font-black text-green-400 mt-0.5">0.9s</div>
              <div className="text-[8px] text-surface/40">Lighthouse: 99</div>
            </div>
            
            <div className="border border-surface/10 p-2 bg-surface/5 rounded-sm">
              <div className="text-[8px] text-surface/50 font-mono uppercase">CONVERSION RATE</div>
              <div className="text-lg font-sans font-black text-primary mt-0.5">5.0%</div>
              <div className="text-[8px] text-surface/40">Baseline: 2.5% (+100%)</div>
            </div>

            <div className="border border-surface/10 p-2 bg-surface/5 rounded-sm">
              <div className="text-[8px] text-surface/50 font-mono uppercase">COST PER LEAD</div>
              <div className="text-lg font-sans font-black text-green-400 mt-0.5">-50%</div>
              <div className="text-[8px] text-surface/40">Reduced by half</div>
            </div>

            <div className="border border-surface/10 p-2 bg-surface/5 rounded-sm">
              <div className="text-[8px] text-surface/50 font-mono uppercase">WordPress Tax</div>
              <div className="text-lg font-sans font-black text-muted mt-0.5">0 EGP</div>
              <div className="text-[8px] text-surface/40">No developer fees</div>
            </div>
          </div>

          <div className="border border-surface/10 p-2.5 bg-surface/5 text-[10px] font-display italic text-surface/80 rounded-sm leading-normal">
            "Improving mobile load speed by a mere 0.1 seconds resulted in a 9.2% increase in average order value."
          </div>
        </div>
      );
    }

    if (project.isGithub) {
      return (
        <div className="relative w-full h-full bg-background-light flex items-center justify-center overflow-hidden">
          <img 
            src={mockImagePath} 
            alt={project.title} 
            className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700" 
            draggable={false}
          />
          <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.02]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-text-main/10 to-transparent pointer-events-none"></div>
        </div>
      );
    }

    if (project.link) {
      if (mediaMode === 'image' && hasMockImage) {
        return (
          <div className="relative w-full h-full bg-background-light flex items-center justify-center overflow-hidden">
            <img 
              src={mockImagePath} 
              alt={project.title} 
              className="w-full h-full object-cover object-top opacity-95" 
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-main/10 to-transparent pointer-events-none"></div>
          </div>
        );
      }

      return (
        <div className="w-full h-full relative bg-background-light">
          {isActive ? (
            <>
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-surface z-20">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-mono text-[9px] text-muted">Connecting tunnel...</span>
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
            <div className="absolute inset-0 bg-surface flex flex-col items-center justify-center gap-1.5">
              <div className="w-5 h-5 border-2 border-muted/20 border-t-muted/40 rounded-full animate-spin"></div>
              <span className="font-mono text-[9px] text-muted">Awaiting connection...</span>
            </div>
          )}
        </div>
      );
    }

    if (hasMockImage) {
      return (
        <div className="relative w-full h-full bg-background-light flex items-center justify-center overflow-hidden">
          <img 
            src={mockImagePath} 
            alt={project.title} 
            className="w-full h-full object-cover object-top" 
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text-main/10 to-transparent pointer-events-none"></div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center p-6 text-center max-w-xs gap-3 h-full">
        <Terminal size={32} className="text-primary animate-pulse" />
        <div>
          <h3 className="font-sans font-bold text-sm text-text-main">Internal Backend Architecture</h3>
          <p className="font-display italic text-[11px] text-muted mt-1 leading-normal">
            This project runs inside secure enterprise environments. The deployment contains database triggers and strict telemetry diagnostics.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 h-full items-center select-none">
      
      {/* Left Column: Metadata */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full max-h-[60vh] gap-3">
        <div className="flex flex-col gap-2">
          
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 font-bold">
              {project.category || 'System Architecture'}
            </span>
            <span className="font-mono text-[9px] text-muted font-bold">
              PROJECT 0{index + 1}
            </span>
          </div>

          <h2 className="font-sans font-black text-xl md:text-2xl text-text-main tracking-tight leading-none">
            {project.title}
          </h2>

          {/* GitHub Stats */}
          {project.isGithub && (
            <div className="flex items-center gap-2 font-mono text-[9px] text-primary font-bold">
              <Code2 size={12} /> ahmednasser-bug/{project.title.replace(/\s+/g, '-')}
              <span className="text-text-main/20">|</span>
              <span className="flex items-center gap-0.5 text-text-main">
                <Star size={10} className="text-yellow-500 fill-yellow-500" /> {project.stars}
              </span>
              <span className="flex items-center gap-0.5 text-text-main">
                <GitFork size={10} className="text-blue-500" /> {project.forks}
              </span>
            </div>
          )}

          <p className="font-sans text-[11px] md:text-xs text-text-main leading-relaxed">
            {project.description}
          </p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && !project.isGithub && (
            <div>
              <h4 className="font-mono text-[9px] uppercase text-primary font-bold mb-0.5">Key Highlights</h4>
              <ul className="list-none space-y-0.5">
                {project.highlights.slice(0, 3).map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-center text-[11px] font-sans text-muted">
                    <span className="w-1 h-1 bg-primary mr-1.5 shrink-0"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Clone Snippet for GitHub Project */}
          {project.isGithub && (
            <div className="bg-text-main text-surface p-2 font-mono text-[8px] flex items-center justify-between border border-text-main select-text mt-1">
              <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pr-3">
                <Terminal size={10} className="text-primary shrink-0" />
                <span className="text-green-400">$</span>
                <span>git clone {project.link}.git</span>
              </div>
              <button
                onClick={() => handleCopy(`git clone ${project.link}.git`)}
                className="text-surface/75 hover:text-primary cursor-pointer shrink-0"
              >
                {copied ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
              </button>
            </div>
          )}
        </div>

        {/* Tech Stack & Action buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex flex-wrap gap-1">
            {project.tech.map((tag, tIdx) => (
              <span key={tIdx} className="font-mono text-[8px] px-1.5 py-0.5 border border-border-color/10 bg-background-light text-text-main font-semibold">
                {tag}
              </span>
            ))}
          </div>

          <div className="border-t border-border-color/15 pt-2">
            {project.link ? (
              <GSAPMagnetic>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center justify-center bg-text-main text-surface px-3 py-1.5 border border-border-color font-mono text-[9px] uppercase tracking-wider hover:bg-primary transition-colors cursor-pointer"
                >
                  {project.isGithub ? "Explore Repository" : "Open Live App"} <ExternalLink className="ml-1.5 w-3 h-3" />
                </a>
              </GSAPMagnetic>
            ) : (
              <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase text-muted font-bold">
                <ShieldAlert size={11} /> Internal System
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Right Column: Media viewport */}
      <div className="lg:col-span-7 border border-border-color bg-surface shadow-hard overflow-hidden flex flex-col relative h-[280px] md:h-[320px] lg:h-[380px]">
        <div className="bg-text-main text-surface p-2 px-3 flex items-center justify-between border-b border-border-color shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            <span className="font-mono text-[8px] text-surface/50 ml-2 truncate max-w-[150px] hidden sm:inline">
              {project.link || 'local://system_dashboard'}
            </span>
          </div>

          {project.link && !isLiveStar && !project.isGithub && (
            <div className="flex border border-surface/20 bg-surface/5 p-0.5 overflow-hidden rounded-sm">
              <button
                onClick={() => setMediaMode('image')}
                className={`px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  mediaMode === 'image' ? 'bg-surface text-text-main font-bold' : 'text-surface/50 hover:text-surface'
                }`}
              >
                Mockup
              </button>
              <button
                onClick={() => setMediaMode('iframe')}
                className={`px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  mediaMode === 'iframe' ? 'bg-surface text-text-main font-bold' : 'text-surface/50 hover:text-surface'
                }`}
              >
                Live
              </button>
            </div>
          )}
        </div>

        <div className="grow relative bg-background-light flex items-center justify-center overflow-hidden">
          {renderMedia()}
        </div>
      </div>

    </div>
  );
};

const ProjectsPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<any>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  // Calculate active index based on scroll progress
  const currentIndex = Math.min(
    Math.floor(progress * ALL_PROJECTS.length),
    ALL_PROJECTS.length - 1
  );

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardRefs.current;
    if (!container || cards.length === 0) return;

    // Set initial position: slide 0 is visible, all others start below
    gsap.set(cards.slice(1), { yPercent: 100, opacity: 0 });

    const scrollDistance = (cards.length - 1) * window.innerHeight * 1.2;

    // Build the scrubbed timeline mapping scroll directly to slide index translations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.5,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      },
    });

    cards.forEach((card, idx) => {
      if (idx === cards.length - 1) return;

      // Animate current card out and next card in at the same timeline time block
      tl.to(card, {
        yPercent: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, idx)
      .to(cards[idx + 1], {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      }, idx);
    });

    scrollTriggerRef.current = tl.scrollTrigger;

    return () => {
      tl.kill();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill(true);
      }
    };
  }, []);

  const scrollToSlide = (idx: number) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const scrollDistance = trigger.end - trigger.start;
    const targetScroll = trigger.start + (idx / (ALL_PROJECTS.length - 1)) * scrollDistance;

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    const target = currentIndex === ALL_PROJECTS.length - 1 ? 0 : currentIndex + 1;
    scrollToSlide(target);
  };

  const prevSlide = () => {
    const target = currentIndex === 0 ? ALL_PROJECTS.length - 1 : currentIndex - 1;
    scrollToSlide(target);
  };

  return (
    <div className="min-h-screen bg-background-light graph-paper flex flex-col items-center">
      
      {/* Pinned Viewport Container */}
      <div 
        ref={containerRef}
        className="w-full h-screen relative flex flex-col justify-between overflow-hidden"
      >
        
        {/* 1. FIXED TOP HEADER PANEL */}
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-8 flex justify-between items-end z-20">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-primary font-bold hover:underline mb-1 group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" /> Back to Home
            </Link>
            <h1 className="font-display italic text-2xl md:text-3xl font-extrabold tracking-tight text-text-main leading-none">
              Project Showcase
            </h1>
          </div>
          
          <div className="font-mono text-[10px] text-text-main font-bold">
            // TELEMETRY: <span className="text-primary">0{currentIndex + 1}</span> / 0{ALL_PROJECTS.length}
          </div>
        </div>

        {/* 2. CARD DECK AREA */}
        <div 
          ref={deckRef}
          className="w-full max-w-[1200px] mx-auto px-4 md:px-8 grow flex items-center justify-center relative my-4"
        >
          <div className="w-full h-[70vh] md:h-[75vh] border border-text-main bg-surface shadow-hard relative overflow-hidden">
            {ALL_PROJECTS.map((project, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full bg-surface overflow-hidden"
                style={{ zIndex: ALL_PROJECTS.length - idx }}
              >
                {/* Reveal wrap */}
                <GSAPTilt className="w-full h-full">
                  <ProjectCard 
                    project={project} 
                    index={idx} 
                    isActive={currentIndex === idx} 
                  />
                </GSAPTilt>
              </div>
            ))}
          </div>
        </div>

        {/* 3. FIXED BOTTOM CONTROLS PANEL */}
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-8 flex justify-between items-center z-20">
          
          {/* Progress bar */}
          <div className="flex items-center gap-4 grow max-w-[200px]">
            <div className="h-1 bg-text-main/10 border border-text-main w-full overflow-hidden relative">
              <div 
                className="h-full bg-primary transition-all duration-100 ease-out"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
            <span className="font-mono text-[9px] text-text-main font-bold shrink-0">
              {Math.round(progress * 100)}%
            </span>
          </div>

          {/* Bullets */}
          <div className="flex gap-1.5 md:gap-2">
            {ALL_PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className={`w-2 h-2 border border-text-main transition-all ${
                  currentIndex === idx ? 'bg-primary scale-110' : 'bg-surface hover:bg-muted/10'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Magnetic Arrows */}
          <div className="flex gap-2">
            <GSAPMagnetic>
              <button
                onClick={prevSlide}
                className="p-1.5 border border-text-main bg-surface text-text-main hover:bg-background-light shadow-[2px_2px_0px_#171717] hover:shadow-[3px_3px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#171717] cursor-pointer transition-all focus:outline-none"
                aria-label="Previous Project"
              >
                <ArrowLeft size={13} />
              </button>
            </GSAPMagnetic>
            <GSAPMagnetic>
              <button
                onClick={nextSlide}
                className="p-1.5 border border-text-main bg-surface text-text-main hover:bg-background-light shadow-[2px_2px_0px_#171717] hover:shadow-[3px_3px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#171717] cursor-pointer transition-all focus:outline-none"
                aria-label="Next Project"
              >
                <ArrowRight size={13} />
              </button>
            </GSAPMagnetic>
          </div>

        </div>

      </div>

      {/* 4. FOOTER RETURN BLOCK */}
      <div 
        ref={footerRef}
        className="w-full min-h-[30vh] flex flex-col items-center justify-center bg-background-light border-t border-border-color/20 py-12"
      >
        <span className="font-mono text-[9px] text-muted uppercase tracking-wider">End of Lab Projects</span>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center bg-text-main text-surface px-6 py-3 border border-border-color font-mono text-xs uppercase tracking-wider hover:bg-primary transition-colors shadow-hard mt-3 cursor-pointer"
        >
          Return to Homepage
        </Link>
      </div>

    </div>
  );
};

export default ProjectsPage;
