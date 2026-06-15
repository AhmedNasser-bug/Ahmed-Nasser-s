// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/threejs-fundamentals/SKILL.md
import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, Cpu, Layers, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import ScrollPaintStroke from './ui/ScrollPaintStroke';
import { GSAPSplitText, GSAPMagnetic, GSAPTilt } from './gsap';

// High-fidelity Inline Text Highlight component (Neobrutalist tag)
const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-[#FFE600] text-text-main px-1.5 py-0.5 border border-text-main shadow-[1px_1px_0px_#171717] font-bold mx-0.5 inline-block">
    {children}
  </span>
);

// Inline Custom SVGs for Integration Logos
const GoogleSearchLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.63-.35-1.33-.35-2.09z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

const GoogleAnalyticsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#F4B400]" aria-hidden="true">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
  </svg>
);

const AzureLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#0078D4]" aria-hidden="true">
    <path d="M0 17.584l8.6-4.966 6.168-10.706h-5.168L0 17.584z M14.832 1.912L9.56 12.618h8.368l5.24-10.706h-8.336z M22.7 17.584l-4.264-10.706h-6.432l9.316 12.01v-1.304z" />
  </svg>
);

const WAFBlueprintLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-[#3730A3]" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeDasharray="2 2" />
  </svg>
);

const AntigravityLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-[#3730A3]" aria-hidden="true">
    <path d="M3 12h18M12 3v18" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const StitchLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-[#4F46E5]" aria-hidden="true">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const MCPLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-[#10B981]" aria-hidden="true">
    <rect x="16" y="16" width="6" height="6" />
    <rect x="2" y="16" width="6" height="6" />
    <rect x="9" y="2" width="6" height="6" />
    <path d="M12 8v8M5 16v-4h14v4" />
  </svg>
);

const CSharpLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#35007E]" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-3.63 8.358c1.332-1.331 3.238-1.503 4.67-.406l-.914 1.344c-.792-.614-1.896-.531-2.585.158-.948.948-.948 2.502 0 3.45.689.689 1.793.772 2.585.158l.914 1.344c-1.432 1.097-3.338.925-4.67-.406-1.748-1.748-1.748-4.595 0-6.342zm8.692 4.642h-1.488v1.488h-1.07V13h-1.487v-1.07h1.488V10.44h1.07v1.488h1.488V13z" />
  </svg>
);

const NetLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-[#512BD4]" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
  </svg>
);

const SQLServerLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-[#CC292B]" aria-hidden="true">
    <path d="M4 6c0 1.66 3.58 3 8 3s8-1.34 8-3-3.58-3-8-3-8 1.34-8 3zM4 12c0 1.66 3.58 3 8 3s8-1.34 8-3M4 18c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    <path d="M4 6v12M20 6v12" />
  </svg>
);

const VercelLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#171717]" aria-hidden="true">
    <path d="M24 22.5H0L12 1.5L24 22.5Z" />
  </svg>
);

const QodoLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-[#4F46E5]" aria-hidden="true">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const JulesLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-[#059669]" aria-hidden="true">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

interface Integration {
  name: string;
  logo: React.ReactNode;
}

interface ProcessStep {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  pitchHeader: string;
  pitchBody: React.ReactNode;
  metric: string;
  integrations: Integration[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Research',
    subtitle: 'Extracting constraints & context',
    icon: <Search className="w-5 h-5" />,
    pitchHeader: 'Live Star Business Case Niche',
    pitchBody: (
      <>
        We study requirements to build <Highlight>high-conversion autonomous digital growth engines</Highlight>.
        Analyzing <Highlight>135+ pages of documentation</Highlight> allows us to <Highlight>isolate conversion friction</Highlight>,
        reduce Customer Acquisition Cost (CAC) by <Highlight>50%</Highlight>, and target specific regional opportunities.
      </>
    ),
    metric: '135+ Pages Analyzed',
    integrations: [
      { name: 'Google Search Console', logo: <GoogleSearchLogo /> },
      { name: 'Analytics Telemetry', logo: <GoogleAnalyticsLogo /> }
    ]
  },
  {
    id: 2,
    title: 'Planning',
    subtitle: 'Architectural blueprints & WAF',
    icon: <Compass className="w-5 h-5" />,
    pitchHeader: 'Finals-Qb Structural Boundary',
    pitchBody: (
      <>
        Aligning architecture to <Highlight>Azure Well-Architected Framework (WAF)</Highlight> pillars.
        Decoupling high-scale strategies (<Highlight>strategy patterns for quiz modes, polymorphic renders</Highlight>)
        from consolidated stable views keeps developer velocity high and code maintainable.
      </>
    ),
    metric: '5 WAF Pillars Aligned',
    integrations: [
      { name: 'Microsoft Azure', logo: <AzureLogo /> },
      { name: 'WAF Architecture Map', logo: <WAFBlueprintLogo /> }
    ]
  },
  {
    id: 3,
    title: 'Orchestrating',
    subtitle: 'Multi-agent developer systems',
    icon: <Cpu className="w-5 h-5" />,
    pitchHeader: 'Custom MCP & Agent Coordination',
    pitchBody: (
      <>
        Configuring collaborative agent teams with <Highlight>Antigravity, Stitch, and custom Model Context Protocol (MCP)</Highlight> servers.
        The agents interact with databases, browser DevTools, and git repositories to execute changes with <Highlight>surgical precision</Highlight>.
      </>
    ),
    metric: 'Custom MCP Tooling',
    integrations: [
      { name: 'Antigravity Orchestration', logo: <AntigravityLogo /> },
      { name: 'Stitch Studio Designer', logo: <StitchLogo /> },
      { name: 'Model Context Protocol', logo: <MCPLogo /> }
    ]
  },
  {
    id: 4,
    title: 'Implementation',
    subtitle: 'Absolute engineering foundations',
    icon: <Layers className="w-5 h-5" />,
    pitchHeader: 'DVLD Transactional License System',
    pitchBody: (
      <>
        Deploying <Highlight>low-level robustness</Highlight>.
        The handmade Driver & Vehicle Licensing Department (DVLD) solution in <Highlight>C# .NET + SQL Server</Highlight> abstracts
        <Highlight>10+ government workflows</Highlight> with absolute data integrity and transactional safety.
      </>
    ),
    metric: '10+ Bureaucratic Workflows',
    integrations: [
      { name: 'C# Language Core', logo: <CSharpLogo /> },
      { name: '.NET Application Framework', logo: <NetLogo /> },
      { name: 'MS SQL Server Database', logo: <SQLServerLogo /> }
    ]
  },
  {
    id: 5,
    title: 'Maintenance',
    subtitle: 'Continuous feedback & quality checks',
    icon: <ShieldCheck className="w-5 h-5" />,
    pitchHeader: 'Jules Teams Architecture',
    pitchBody: (
      <>
        Securing the lifecycle. Deployments are backed by automated tests, <Highlight>Qodo lints</Highlight>,
        and <Highlight>Vercel reviews</Highlight>. The <Highlight>Jules suggestions agent</Highlight> loops back to verify changes,
        preventing regressions and keeping compilation statuses clean.
      </>
    ),
    metric: 'Multi-Agent Quality Loop',
    integrations: [
      { name: 'Vercel Edge Platform', logo: <VercelLogo /> },
      { name: 'Qodo Code Quality lints', logo: <QodoLogo /> },
      { name: 'Jules feedback agent', logo: <JulesLogo /> }
    ]
  }
];

const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isLockedRef = useRef(false);
  const activeStepRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const isUserScrollingManual = useRef(false);
  const lastScrollY = useRef(0);

  const clearManualScrollTimeout = useRef<number | null>(null);

  // Refs for tracking wheel momentum and preventing rapid skipping of steps (trackpad filter)
  const lastWheelTimeRef = useRef(0);
  const ignoreDirectionRef = useRef<'down' | 'up' | null>(null);

  // SNAP_OFFSET shifts the snapped position 50px lower so the bottom of the section rises 50px higher in the viewport.
  const SNAP_OFFSET = 50;

  // Sync refs to avoid stale closures in window event listeners
  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  // Track if scroll event is triggered by manual user inputs (touch, keydown, wheel) or programmatic scrolls
  useEffect(() => {
    const markManualScroll = () => {
      isUserScrollingManual.current = true;
      if (clearManualScrollTimeout.current) {
        window.clearTimeout(clearManualScrollTimeout.current);
      }
      clearManualScrollTimeout.current = window.setTimeout(() => {
        isUserScrollingManual.current = false;
      }, 150);
    };

    window.addEventListener('wheel', markManualScroll, { passive: true });
    window.addEventListener('touchmove', markManualScroll, { passive: true });
    window.addEventListener('keydown', markManualScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', markManualScroll);
      window.removeEventListener('touchmove', markManualScroll);
      window.removeEventListener('keydown', markManualScroll);
      if (clearManualScrollTimeout.current) {
        window.clearTimeout(clearManualScrollTimeout.current);
      }
    };
  }, []);

  // Intercept local anchor link clicks (e.g., in headers or navigation) to prevent scroll lock hijacking
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && (href.startsWith('#') || href.includes('#'))) {
          // Disable scroll snap for programmatic navigation to local anchors
          isTransitioningRef.current = true;
          setIsLocked(false);
          
          const lenis = (window as any).lenis;
          if (lenis) lenis.start();

          setTimeout(() => {
            isTransitioningRef.current = false;
            lastScrollY.current = window.scrollY;
          }, 1200); // Hold flag for Lenis scroll duration
        }
      }
    };

    window.addEventListener('click', handleLinkClick, { capture: true });
    return () => window.removeEventListener('click', handleLinkClick, { capture: true });
  }, []);

  // Window scroll hook: snaps and locks scroll when section boundary is crossed
  useEffect(() => {
    const handleScroll = () => {
      const lenis = (window as any).lenis;
      
      // Do NOT snap if a link transition is running or the user is not manually scrolling
      if (!lenis || isTransitioningRef.current || !isUserScrollingManual.current) {
        lastScrollY.current = window.scrollY;
        return;
      }

      const sectionTop = getSectionTop();
      const lockScrollY = sectionTop + SNAP_OFFSET;
      
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const lastY = lastScrollY.current;
      lastScrollY.current = currentScrollY;

      // If already locked, skip snap checks
      if (isLockedRef.current) return;

      // 1. Entering from Above (scrolling down):
      if (scrollingDown && lastY < lockScrollY && currentScrollY >= lockScrollY) {
        lenis.scrollTo(lockScrollY, { immediate: true });
        lenis.stop();
        setIsLocked(true);
        setActiveStep(0);
      }
      // 2. Entering from Below (scrolling up):
      else if (!scrollingDown && lastY > lockScrollY && currentScrollY <= lockScrollY) {
        lenis.scrollTo(lockScrollY, { immediate: true });
        lenis.stop();
        setIsLocked(true);
        setActiveStep(4);
      }
    };

    const getSectionTop = () => {
      const container = containerRef.current;
      if (!container) return 0;
      let top = 0;
      let curr: HTMLElement | null = container;
      while (curr) {
        top += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      return top;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    lastScrollY.current = window.scrollY;

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Event handlers to intercept gestures and step through developer phases
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isLockedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        handleScrollTransition(e.deltaY);
      }
    };

    const touchStartY = { current: 0 };
    const handleTouchStart = (e: TouchEvent) => {
      if (isLockedRef.current) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isLockedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        const currentY = e.touches[0].clientY;
        const diffY = touchStartY.current - currentY;

        // Swiping threshold (40px delta triggers step change)
        if (Math.abs(diffY) > 40) {
          handleScrollTransition(diffY);
          touchStartY.current = currentY;
        }
      }
    };

    const handleScrollTransition = (deltaY: number) => {
      const lenis = (window as any).lenis;
      if (!lenis) return;

      const now = Date.now();
      const timeDiff = now - lastWheelTimeRef.current;
      lastWheelTimeRef.current = now;

      // Trackpad inert momentum filter: If there has been a pause of more than 200ms, reset the ignore direction
      if (timeDiff > 200) {
        ignoreDirectionRef.current = null;
      }

      const direction = deltaY > 0 ? 'down' : 'up';

      // Ignore event if it is in the direction we are currently locking out (avoids multiple steps in one scroll)
      if (ignoreDirectionRef.current === direction) {
        return;
      }

      // Lock out subsequent events in this direction for this gesture stream
      ignoreDirectionRef.current = direction;

      const currentStep = activeStepRef.current;

      if (direction === 'down') {
        // Scroll down gesture -> go forward
        if (currentStep < 4) {
          setActiveStep(currentStep + 1);
        } else {
          // Beyond step 5 -> unlock scroll down
          unlockScroll(lenis, 'down');
        }
      } else {
        // Scroll up gesture -> go backward
        if (currentStep > 0) {
          setActiveStep(currentStep - 1);
        } else {
          // Beyond step 1 -> unlock scroll up
          unlockScroll(lenis, 'up');
        }
      }
    };

    const unlockScroll = (lenis: any, direction: 'down' | 'up') => {
      isTransitioningRef.current = true;
      setIsLocked(false);
      lenis.start();

      const container = containerRef.current;
      if (!container) return;
      
      let sectionTop = 0;
      let curr: HTMLElement | null = container;
      while (curr) {
        sectionTop += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }

      const lockScrollY = sectionTop + SNAP_OFFSET;

      // Scroll smoothly past the snapping coordinate threshold to clear it
      const targetScrollY = direction === 'down' ? lockScrollY + 150 : lockScrollY - 150;
      lenis.scrollTo(targetScrollY, { duration: 0.8, easing: (t: number) => t * (2 - t) });

      // Hold transitional flag to prevent immediate snapping during exit scroll
      setTimeout(() => {
        isTransitioningRef.current = false;
        lastScrollY.current = window.scrollY;
      }, 850);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  // Sync scroll lock and active step immediately on timeline button clicks
  const handleStepClick = (idx: number) => {
    const lenis = (window as any).lenis;
    if (!lenis) {
      setActiveStep(idx);
      return;
    }

    const container = containerRef.current;
    if (!container) return;
    
    let sectionTop = 0;
    let curr: HTMLElement | null = container;
    while (curr) {
      sectionTop += curr.offsetTop;
      curr = curr.offsetParent as HTMLElement | null;
    }

    const lockScrollY = sectionTop + SNAP_OFFSET;

    if (isLocked) {
      setActiveStep(idx);
    } else {
      isTransitioningRef.current = true;
      setIsLocked(true);
      lenis.stop();
      lenis.scrollTo(lockScrollY, { immediate: true });
      setActiveStep(idx);
      
      setTimeout(() => {
        isTransitioningRef.current = false;
        lastScrollY.current = window.scrollY;
      }, 100);
    }
  };

  // Check if a node card is active in the current developer phase step
  const isNodeActive = (nodeId: string) => {
    if (activeStep === 0) return ['project-mgr', 'stitch-designer'].includes(nodeId);
    if (activeStep === 1) return ['stitch-designer', 'ai-studio'].includes(nodeId);
    if (activeStep === 2) return ['ai-studio', 'antigravity-agent'].includes(nodeId);
    if (activeStep === 3) return ['antigravity-agent', 'chrome-devtools'].includes(nodeId);
    if (activeStep === 4) return ['engineering-mgr', 'jules-suggestions'].includes(nodeId);
    return false;
  };

  // Compute CSS class matching active/inactive blueprint node states (No gray text!)
  const getNodeClass = (nodeId: string) => {
    const active = isNodeActive(nodeId);
    return `transition-all duration-300 p-2.5 px-3.5 border relative ${
      active 
        ? 'border-2 border-primary bg-primary/10 shadow-[4px_4px_0px_#171717] -translate-x-[2px] -translate-y-[2px] font-bold text-text-main' 
        : 'border-border-color/20 bg-surface/80 text-text-main/70'
    }`;
  };

  const isArrowActive = activeStep >= 2;

  return (
    <section 
      id="process" 
      ref={containerRef} 
      className="relative flex h-auto w-full flex-col pt-12 pb-10 border-t border-border-color"
    >
      {/* Background Decorative Grids */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#E5E5E5_1px,transparent_1px),linear-gradient(to_bottom,#E5E5E5_1px,transparent_1px)] bg-[size:40px_40px] opacity-25 pointer-events-none" 
        aria-hidden="true" 
      />
      
      <div className="layout-container flex h-full grow flex-col relative z-10">
        <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
            
            {/* Section Header */}
            <div className="mb-6 border-b border-border-color pb-4">
              <h2 className="font-display italic text-3xl md:text-5xl font-extrabold tracking-tight text-text-main">
                <GSAPSplitText type="words" animation="slide-up">
                  How I Engineer
                </GSAPSplitText>{' '}
                <ScrollPaintStroke>Time, Safety, and Cost</ScrollPaintStroke>
              </h2>
              <p className="font-mono text-sm text-primary font-bold mt-2.5 uppercase tracking-widest">
                The System Orchestrator's Lifecycle {isLocked && "• (LOCKED)"}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Step Selector */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <h3 className="font-mono text-xs uppercase tracking-widest text-text-main font-bold mb-1">
                  Select a phase to pitch
                </h3>
                <div className="flex flex-col gap-2.5">
                  {PROCESS_STEPS.map((step, idx) => {
                    const isStepActive = activeStep === idx;
                    return (
                      <GSAPMagnetic key={step.id} strength={0.18} tolerance={30} className="w-full">
                        <button
                          onClick={() => handleStepClick(idx)}
                          aria-current={isStepActive ? 'step' : undefined}
                          className={`w-full text-left p-3.5 border transition-all duration-300 flex items-start gap-4 shadow-hard hover:shadow-hard-hover cursor-pointer relative group focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                            isStepActive 
                              ? 'border-2 border-primary bg-surface -translate-y-[2px] -translate-x-[2px] shadow-hard-hover' 
                              : 'border-border-color/30 bg-surface/75 hover:bg-background-light'
                          }`}
                        >
                          {/* Neobrutalist left border stripe on active step button */}
                          {isStepActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
                          )}

                          {/* Neobrutalist square active indicator tag */}
                          {isStepActive && (
                            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary border border-text-main animate-pulse" />
                          )}

                          <div className={`p-1.5 border border-border-color transition-colors ${
                            isStepActive ? 'bg-primary text-surface' : 'bg-background-light text-text-main'
                          }`}>
                            {step.icon}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`font-mono text-xs font-bold ${isStepActive ? 'text-primary' : 'text-text-main'}`}>
                                STEP 0{step.id}
                              </span>
                              <span className="font-mono text-[10px] uppercase bg-background-light border border-border-color px-2 py-0.5 text-text-main font-bold relative">
                                {isStepActive ? (
                                  <ScrollPaintStroke active={true} color="text-primary">
                                    {step.metric}
                                  </ScrollPaintStroke>
                                ) : (
                                  step.metric
                                )}
                              </span>
                            </div>
                            <h4 className="font-sans font-extrabold text-base text-text-main mt-0.5 group-hover:text-primary transition-colors">
                              {step.title}
                            </h4>
                            <p className="font-display italic text-xs text-text-main font-semibold mt-0.5 leading-normal truncate">
                              {step.subtitle}
                            </p>
                          </div>
                        </button>
                      </GSAPMagnetic>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Detailed Pitch and AI Orchestration Flowchart blueprint */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                
                {/* Active Pitch Card */}
                <div className="bg-surface border-2 border-border-color p-5 shadow-hard relative">
                  <div className="absolute top-0 right-0 bg-text-main text-surface px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider border-b border-l border-border-color">
                    Active Pitch
                  </div>
                  
                  <h4 className="font-mono text-xs uppercase text-primary font-extrabold tracking-wider mb-1.5">
                    {PROCESS_STEPS[activeStep].title} Integration
                  </h4>
                  
                  <h3 className="font-sans font-extrabold text-xl text-text-main mb-3 tracking-tight leading-snug">
                    <ScrollPaintStroke key={activeStep} active={true} color="text-primary">
                      {PROCESS_STEPS[activeStep].pitchHeader}
                    </ScrollPaintStroke>
                  </h3>
                  
                  {/* Highlighted copy text */}
                  <div className="font-sans text-[14px] text-text-main leading-relaxed mb-4">
                    {PROCESS_STEPS[activeStep].pitchBody}
                  </div>

                  {/* Service Integration Badges */}
                  <div className="flex flex-wrap gap-2 mb-4 border-b border-border-color/10 pb-3">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-text-main self-center mr-1">
                      Integrations:
                    </span>
                    {PROCESS_STEPS[activeStep].integrations.map((integration, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-border-color bg-background-light font-mono text-[10px] font-bold text-text-main shadow-[2px_2px_0px_#171717] hover:-translate-y-0.5 transition-transform"
                      >
                        {integration.logo}
                        {integration.name}
                      </span>
                    ))}
                  </div>
                  
                  <div className="border-t border-border-color/30 pt-3 flex justify-between items-center">
                    <span className="font-display italic text-xs text-text-main font-semibold">
                      Ensuring development acceleration and zero technical debt.
                    </span>
                    <a 
                      href="#projects" 
                      className="inline-flex items-center gap-1 font-mono text-xs uppercase text-primary font-bold hover:underline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                    >
                      Verify Work <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* AI Orchestration Flowchart Visualization */}
                <GSAPTilt maxTilt={10} perspective={900}>
                  <div className="border-2 border-border-color bg-surface shadow-hard p-4 flex flex-col gap-3 relative">
                    <div className="border-b border-border-color pb-2 flex items-center justify-between">
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-text-main flex items-center gap-2 font-bold">
                        <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                        AI Orchestration Team Blueprint
                      </h4>
                      <span className="font-mono text-[9px] bg-primary/10 border border-primary/20 px-2 py-0.5 text-primary font-bold uppercase">
                        Reference Workflow
                      </span>
                    </div>

                    {/* Nodes Grid representing the blueprint pipeline */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs font-mono">
                      <div className={getNodeClass('project-mgr')}>
                        {isNodeActive('project-mgr') && (
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary border border-text-main animate-pulse" />
                        )}
                        <div className="text-[9px] text-primary font-semibold mb-0.5">Product</div>
                        <div className="font-bold text-[11px]">Project Mgr</div>
                      </div>
                      
                      <div className={getNodeClass('stitch-designer')}>
                        {isNodeActive('stitch-designer') && (
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary border border-text-main animate-pulse" />
                        )}
                        <div className="text-[9px] text-primary font-semibold mb-0.5">UI/UX</div>
                        <div className="font-bold text-[11px]">Stitch Designer</div>
                      </div>

                      <div className={getNodeClass('ai-studio')}>
                        {isNodeActive('ai-studio') && (
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary border border-text-main animate-pulse" />
                        )}
                        <div className="text-[9px] text-primary font-semibold mb-0.5">Builder</div>
                        <div className="font-bold text-[11px]">AI Studio</div>
                      </div>

                      <div className={getNodeClass('engineering-mgr')}>
                        {isNodeActive('engineering-mgr') && (
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary border border-text-main animate-pulse" />
                        )}
                        <div className="text-[9px] text-primary font-semibold mb-0.5">Quality</div>
                        <div className="font-bold text-[11px]">Engineering Mgr</div>
                      </div>
                    </div>

                    {/* Flow Arrow Indicator */}
                    <div className="flex justify-center my-0 transition-all duration-300">
                      <svg 
                        className={`w-5 h-5 transition-all duration-300 ${
                          isArrowActive 
                            ? 'text-primary scale-110 stroke-[2.5px] animate-bounce' 
                            : 'text-text-main stroke-2'
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs font-mono">
                      
                      {/* Active Developer Agent */}
                      <div className={getNodeClass('antigravity-agent')}>
                        {isNodeActive('antigravity-agent') && (
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary border border-text-main animate-pulse" />
                        )}
                        <div className="text-[9px] text-primary font-semibold mb-0.5">Active Coder</div>
                        <div className="text-[11px]">Antigravity Agent</div>
                      </div>

                      {/* Chrome DevTools */}
                      <div className={getNodeClass('chrome-devtools')}>
                        {isNodeActive('chrome-devtools') && (
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary border border-text-main animate-pulse" />
                        )}
                        <div className="text-[9px] text-primary font-semibold mb-0.5">Testing Pipeline</div>
                        <div className="text-[11px]">Chrome DevTools</div>
                      </div>

                      {/* Jules Suggestions */}
                      <div className={getNodeClass('jules-suggestions')}>
                        {isNodeActive('jules-suggestions') && (
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary border border-text-main animate-pulse" />
                        )}
                        <div className="text-[9px] text-primary font-semibold mb-0.5">Feedback Loop</div>
                        <div className="text-[11px]">Jules suggestions</div>
                      </div>
                    </div>

                    <p className="font-display italic text-[11px] text-text-main font-semibold text-center mt-1 leading-relaxed">
                      By feeding highly detailed specs to the Antigravity Agent, the code is auto-submitted, manually and robotically checked in Chrome, and finalized with Jules suggestions, ensuring a flawless production lifecycle.
                    </p>
                  </div>
                </GSAPTilt>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
