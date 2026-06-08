// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/react-best-practices/SKILL.md
import React, { useState, useRef, useEffect } from 'react';
import { GSAPTilt, GSAPMagnetic, GSAPReveal } from './gsap';
import { ExternalLink, Terminal, Copy, Check, ArrowLeft, ArrowRight, GitFork, Star, Code2 } from 'lucide-react';

// Import local images directly to allow Vite to bundle them correctly
import dvldImg from '../src/assets/dvld_preview.png';
import algoImg from '../src/assets/AlgorithmVisualizer.png';
import gameImg from '../src/assets/game_solver.png';

interface GithubRepo {
  name: string;
  title: string;
  tech: string[];
  description: string;
  image: string;
  link: string;
  stars: string;
  forks: string;
  branch: string;
}

const GITHUB_REPOS: GithubRepo[] = [
  {
    name: "DVLD-System-Project",
    title: "DVLD Licensing System",
    tech: ["C#", ".NET WinForms", "T-SQL", "ADO.NET", "Three-Tier Architecture"],
    description: "Fullstack Driver & Vehicle Licensing system structured on a strict three-tier architecture. Features a custom dynamic Data Access Layer builder tool, secure transaction flows, and comprehensive administrative controls.",
    image: dvldImg,
    link: "https://github.com/AhmedNasser-bug/DVLD-System-Project",
    stars: "12",
    forks: "4",
    branch: "master"
  },
  {
    name: "Algorithm-Analysis",
    title: "Algorithm Performance Visualizer",
    tech: ["C#", "WinForms", "GDI+", "Benchmark Engine", "Data Analysis"],
    description: "A desktop sandbox for benchmark testing and real-time step visualization of sorting, searching, and graph pathfinding algorithms. Renders high-fidelity telemetry performance charts and comparative analytics.",
    image: algoImg,
    link: "https://github.com/AhmedNasser-bug/Algorithm-Analysis",
    stars: "8",
    forks: "2",
    branch: "main"
  },
  {
    name: "Algorithmic-Game-solver",
    title: "AI Algorithmic Game Solver",
    tech: ["Python", "Tkinter", "AI Pathfinding", "Heuristic Search"],
    description: "An AI-driven pathfinding game solver. Utilizes unified graph-solving state algorithms (BFS, DFS, DLS, IDDFS, Hill Climbing) to solve interactive Mazes, Sudoku tables, and the classic 8-Queens constraint problem.",
    image: gameImg,
    link: "https://github.com/AhmedNasser-bug/Algorithmic-Game-solver",
    stars: "6",
    forks: "1",
    branch: "master"
  }
];

const GithubCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Drag / Swipe Ref States
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef<number | null>(null);
  const isDragging = useRef(false);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === GITHUB_REPOS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? GITHUB_REPOS.length - 1 : prev - 1));
  };

  // Drag / Touch Handlers
  const handleDragStart = (clientX: number) => {
    dragStartPos.current = clientX;
    isDragging.current = true;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current || dragStartPos.current === null) return;
    const diff = dragStartPos.current - clientX;
    
    // Swipe left (next) or swipe right (prev) if drag distance > 80px
    if (diff > 80) {
      nextSlide();
      isDragging.current = false;
      dragStartPos.current = null;
    } else if (diff < -80) {
      prevSlide();
      isDragging.current = false;
      dragStartPos.current = null;
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    dragStartPos.current = null;
  };

  return (
    <div 
      className="min-h-[90vh] w-full flex items-center justify-center py-12 border-b border-border-color/20 relative select-none bg-background-light"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="w-full max-w-[1200px] px-4 md:px-8 flex flex-col gap-6">
        
        {/* Main Section Header */}
        <GSAPReveal direction="right" duration={0.8}>
          <div className="flex items-end justify-between border-b border-text-main pb-4">
            <div>
              <span className="font-mono text-[9px] uppercase bg-primary text-surface px-2 py-0.5 font-bold tracking-widest">
                LABS / CONSTRAINED EXPERIMENTS
              </span>
              <h2 className="font-display italic text-2xl md:text-4xl font-extrabold text-text-main mt-1.5">
                GitHub Repository Lab
              </h2>
            </div>
            
            {/* Slide Telemetry Counter */}
            <div className="font-mono text-xs text-text-main font-bold hidden sm:block">
              // REPO_INDEX: <span className="text-primary">0{currentIndex + 1}</span> / 0{GITHUB_REPOS.length}
            </div>
          </div>
        </GSAPReveal>

        {/* Carousel Frame Wrapper */}
        <div className="relative w-full overflow-hidden border border-text-main bg-surface shadow-hard p-4 md:p-8">
          
          {/* Carousel Slider Window */}
          <div 
            ref={trackRef}
            className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => {
              if (e.buttons === 1) handleDragMove(e.clientX);
            }}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {/* Horizontal Slide Track */}
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {GITHUB_REPOS.map((repo, idx) => (
                <div key={idx} className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
                  
                  {/* LEFT: Project Blueprint Mockup Screen */}
                  <div className="lg:col-span-7 h-full">
                    <GSAPTilt className="w-full">
                      <div className="border border-text-main bg-background-light p-2.5 shadow-hard flex flex-col relative overflow-hidden group">
                        
                        {/* Interactive Status Bar */}
                        <div className="flex justify-between items-center border-b border-text-main pb-2 mb-2 font-mono text-[9px] text-muted">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>REPOSITORY STATUS: ACTIVE</span>
                          </div>
                          <div>BRANCH: {repo.branch}</div>
                        </div>

                        {/* Screenshot Visual Screen */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden border border-text-main bg-surface flex items-center justify-center">
                          <img 
                            src={repo.image} 
                            alt={repo.title} 
                            className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
                            draggable={false}
                          />
                          {/* CRT Screen Scanline Overlay */}
                          <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03]"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-text-main/10 to-transparent pointer-events-none"></div>
                        </div>

                      </div>
                    </GSAPTilt>
                  </div>

                  {/* RIGHT: Telemetry Metadata */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full gap-5">
                    
                    <div className="flex flex-col gap-3">
                      
                      {/* Title & GitHub Stats */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-[9px] uppercase border border-primary text-primary px-2 py-0.5 font-bold">
                            Open Source
                          </span>
                          <h3 className="font-sans font-black text-xl md:text-2xl text-text-main mt-1 tracking-tight leading-none">
                            {repo.title}
                          </h3>
                        </div>
                        
                        {/* Stars & Forks Stats */}
                        <div className="flex items-center gap-2.5 font-mono text-[10px] text-text-main bg-background-light border border-text-main px-2 py-1 shadow-[2px_2px_0px_#171717]">
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {repo.stars}
                          </span>
                          <span className="w-[1px] h-3 bg-text-main/20"></span>
                          <span className="flex items-center gap-0.5">
                            <GitFork className="w-3 h-3 text-blue-500" /> {repo.forks}
                          </span>
                        </div>
                      </div>

                      {/* Repo Name */}
                      <span className="font-mono text-xs text-primary font-bold flex items-center gap-1.5">
                        <Code2 size={14} /> ahmednasser-bug/{repo.name}
                      </span>

                      {/* Description */}
                      <p className="font-sans text-xs text-text-main leading-relaxed mt-1">
                        {repo.description}
                      </p>

                      {/* Key Tech Tags */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {repo.tech.map((tag, tIdx) => (
                          <span key={tIdx} className="font-mono text-[9px] px-2 py-0.5 border border-border-color/20 bg-background-light text-text-main font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Clone Terminal Block & Button */}
                    <div className="flex flex-col gap-3.5 border-t border-border-color/10 pt-4">
                      
                      {/* Copy Terminal Line */}
                      <div className="bg-text-main text-surface p-2.5 font-mono text-[10px] flex items-center justify-between border border-text-main relative select-text">
                        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none pr-4">
                          <Terminal size={12} className="text-primary shrink-0" />
                          <span className="text-green-400">$</span>
                          <span>git clone {repo.link}.git</span>
                        </div>
                        <button
                          onClick={() => handleCopy(`git clone ${repo.link}.git`, idx)}
                          className="text-surface/70 hover:text-primary transition-colors cursor-pointer shrink-0 ml-1.5 focus:outline-none"
                          title="Copy clone command"
                        >
                          {copiedIndex === idx ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                        </button>
                      </div>

                      {/* CTA Magnetic Button */}
                      <div className="flex justify-start">
                        <GSAPMagnetic>
                          <a 
                            href={repo.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center bg-text-main text-surface px-4 py-2 border border-text-main font-mono text-[10px] uppercase tracking-wider hover:bg-primary transition-colors shadow-hard hover:shadow-hard-hover cursor-pointer"
                          >
                            Explore Repository <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
                          </a>
                        </GSAPMagnetic>
                      </div>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls Overlay */}
          <div className="flex justify-between items-center mt-6 border-t border-text-main/10 pt-4">
            
            {/* Bullet Slide Indicator dots */}
            <div className="flex gap-2">
              {GITHUB_REPOS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 border border-text-main transition-all ${
                    currentIndex === idx ? 'bg-primary scale-110' : 'bg-surface hover:bg-muted/10'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next Magnetic Nav Buttons */}
            <div className="flex gap-2">
              <GSAPMagnetic>
                <button
                  onClick={prevSlide}
                  className="p-2 border border-text-main bg-surface text-text-main hover:bg-background-light shadow-[2px_2px_0px_#171717] hover:shadow-[3px_3px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#171717] cursor-pointer transition-all focus:outline-none"
                  aria-label="Previous Project"
                >
                  <ArrowLeft size={14} />
                </button>
              </GSAPMagnetic>
              <GSAPMagnetic>
                <button
                  onClick={nextSlide}
                  className="p-2 border border-text-main bg-surface text-text-main hover:bg-background-light shadow-[2px_2px_0px_#171717] hover:shadow-[3px_3px_0px_#171717] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#171717] cursor-pointer transition-all focus:outline-none"
                  aria-label="Next Project"
                >
                  <ArrowRight size={14} />
                </button>
              </GSAPMagnetic>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default GithubCarousel;
