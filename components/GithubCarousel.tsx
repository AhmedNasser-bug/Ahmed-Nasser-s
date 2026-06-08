// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/gsap-react-best-practices/SKILL.md
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAPTilt, GSAPMagnetic } from './gsap';
import { ExternalLink, Terminal, Copy, Check, ArrowLeft, ArrowRight, GitFork, Star, Code2 } from 'lucide-react';

// Import local images directly to allow Vite to bundle them correctly
import dvldImg from '../src/assets/dvld_preview.png';
import algoImg from '../src/assets/AlgorithmVisualizer.png';
import gameImg from '../src/assets/game_solver.png';

gsap.registerPlugin(ScrollTrigger);

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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<any>(null);

  // Compute active slide index based on overall scroll progress
  const currentIndex = Math.min(
    Math.floor(progress * GITHUB_REPOS.length),
    GITHUB_REPOS.length - 1
  );

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Calculate total horizontal offset mapping
    const getScrollAmount = () => {
      return track.scrollWidth - window.innerWidth;
    };

    // Pin the section and translate the track horizontally based on vertical scroll
    const pinTween = gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.5,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      },
    });

    scrollTriggerRef.current = pinTween.scrollTrigger;

    return () => {
      pinTween.kill();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill(true);
      }
    };
  }, []);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Navigates by scrolling the main page window to match the slide progress trigger targets
  const scrollToSlide = (idx: number) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const scrollDistance = trigger.end - trigger.start;
    const targetScroll = trigger.start + (idx / (GITHUB_REPOS.length - 1)) * scrollDistance;

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    const target = currentIndex === GITHUB_REPOS.length - 1 ? 0 : currentIndex + 1;
    scrollToSlide(target);
  };

  const prevSlide = () => {
    const target = currentIndex === 0 ? GITHUB_REPOS.length - 1 : currentIndex - 1;
    scrollToSlide(target);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen overflow-hidden relative bg-background-light border-b border-border-color/20"
    >
      {/* 1. FIXED HEADER PANEL */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-8 md:pt-12 flex justify-between items-end pointer-events-auto">
          <div>
            <span className="font-mono text-[9px] uppercase bg-primary text-surface px-2 py-0.5 font-bold tracking-widest">
              LABS / CONSTRAINED EXPERIMENTS
            </span>
            <h2 className="font-display italic text-2xl md:text-3xl font-extrabold text-text-main mt-1.5 leading-none">
              GitHub Repository Lab
            </h2>
          </div>
          
          <div className="font-mono text-[10px] text-text-main font-bold hidden sm:block">
            // REPO_INDEX: <span className="text-primary">0{currentIndex + 1}</span> / 0{GITHUB_REPOS.length}
          </div>
        </div>
      </div>

      {/* 2. SLIDING HORIZONTAL TRACK */}
      <div 
        ref={trackRef} 
        className="flex h-full flex-row items-center will-change-transform"
        style={{ width: `${GITHUB_REPOS.length * 100}vw` }}
      >
        {GITHUB_REPOS.map((repo, idx) => (
          <div 
            key={idx} 
            className="w-screen h-full shrink-0 flex items-center justify-center pt-24 pb-20 px-4 md:px-8 select-none"
          >
            {/* The Neobrutalist Repo Card */}
            <div className="w-full max-w-[1100px] border border-text-main bg-surface shadow-hard p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* LEFT: Project Screen Mockup */}
              <div className="lg:col-span-6 h-full">
                <GSAPTilt className="w-full">
                  <div className="border border-text-main bg-background-light p-2 shadow-hard flex flex-col relative overflow-hidden group">
                    
                    {/* Status panel */}
                    <div className="flex justify-between items-center border-b border-text-main pb-1.5 mb-1.5 font-mono text-[9px] text-muted">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span>REPOSITORY: ACTIVE</span>
                      </div>
                      <div>BRANCH: {repo.branch}</div>
                    </div>

                    {/* Screenshot Frame */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-text-main bg-surface flex items-center justify-center">
                      <img 
                        src={repo.image} 
                        alt={repo.title} 
                        className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.03]"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-text-main/10 to-transparent pointer-events-none"></div>
                    </div>

                  </div>
                </GSAPTilt>
              </div>

              {/* RIGHT: Telemetry Details */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2.5">
                  
                  {/* Category Title & GitHub Stats */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[8px] uppercase border border-primary text-primary px-1.5 py-0.5 font-bold">
                        Open Source Lab
                      </span>
                      <h3 className="font-sans font-black text-lg md:text-xl text-text-main mt-1 tracking-tight leading-none">
                        {repo.title}
                      </h3>
                    </div>
                    
                    {/* Stars & Forks Stats */}
                    <div className="flex items-center gap-2 font-mono text-[9px] text-text-main bg-background-light border border-text-main px-1.5 py-0.5 shadow-[2px_2px_0px_#171717]">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {repo.stars}
                      </span>
                      <span className="w-[1px] h-2.5 bg-text-main/20"></span>
                      <span className="flex items-center gap-0.5">
                        <GitFork className="w-3 h-3 text-blue-500" /> {repo.forks}
                      </span>
                    </div>
                  </div>

                  {/* Repo Path */}
                  <span className="font-mono text-xs text-primary font-bold flex items-center gap-1.5">
                    <Code2 size={13} /> ahmednasser-bug/{repo.name}
                  </span>

                  {/* Description */}
                  <p className="font-sans text-[11px] md:text-xs text-text-main leading-relaxed">
                    {repo.description}
                  </p>

                  {/* Key Tech Tags */}
                  <div className="flex flex-wrap gap-1">
                    {repo.tech.map((tag, tIdx) => (
                      <span key={tIdx} className="font-mono text-[8px] px-1.5 py-0.5 border border-border-color/20 bg-background-light text-text-main font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Clone Terminal Block & Button */}
                <div className="flex flex-col gap-3 border-t border-border-color/10 pt-3">
                  
                  {/* Clone Terminal Snippet Box (desktop only for space conservation) */}
                  <div className="bg-text-main text-surface p-2 font-mono text-[9px] hidden md:flex items-center justify-between border border-text-main relative select-text">
                    <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none pr-4">
                      <Terminal size={11} className="text-primary shrink-0" />
                      <span className="text-green-400">$</span>
                      <span>git clone {repo.link}.git</span>
                    </div>
                    <button
                      onClick={() => handleCopy(`git clone ${repo.link}.git`, idx)}
                      className="text-surface/70 hover:text-primary transition-colors cursor-pointer shrink-0 ml-1.5 focus:outline-none"
                      title="Copy clone command"
                    >
                      {copiedIndex === idx ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                    </button>
                  </div>

                  {/* CTA Magnetic Button */}
                  <div className="flex justify-start">
                    <GSAPMagnetic>
                      <a 
                        href={repo.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center bg-text-main text-surface px-3.5 py-1.5 border border-text-main font-mono text-[9px] uppercase tracking-wider hover:bg-primary transition-colors shadow-hard hover:shadow-hard-hover cursor-pointer"
                      >
                        Explore Repository <ExternalLink className="ml-1.5 w-3 h-3" />
                      </a>
                    </GSAPMagnetic>
                  </div>

                </div>

              </div>

            </div>

          </div>
        ))}
      </div>

      {/* 3. FIXED FOOTER PANEL */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 pb-8 flex justify-between items-center pointer-events-auto">
          
          {/* Visual Progress Bar indicator */}
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

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {GITHUB_REPOS.map((_, idx) => (
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

          {/* Magnetic Next/Prev control buttons */}
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
    </div>
  );
};

export default GithubCarousel;
