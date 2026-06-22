import React from 'react';
import { Search, Compass, Cpu, Layers, ShieldCheck, ArrowLeft, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollPaintStroke from './ui/ScrollPaintStroke';
import { GSAPSplitText, GSAPTilt } from './gsap';

// High-fidelity Inline Text Highlight component (Neobrutalist tag)
const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-[#FFE600] text-text-main px-1.5 py-0.5 border border-text-main shadow-[1px_1px_0px_#171717] font-bold mx-0.5 inline-block">
    {children}
  </span>
);

// Integration Logos
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
    title: 'Research & Constraints Mapping',
    subtitle: 'Extracting boundary limits & operational context',
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
    title: 'Planning & WAF Architecture Mapping',
    subtitle: 'System boundaries & dependency layout templates',
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
    title: 'Orchestrating & Multi-Agent Coordination',
    subtitle: 'Collaborative AI agent logic workflows',
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
    title: 'Low-Level System Implementation',
    subtitle: 'Strict types, transaction safety, and memory management',
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
    title: 'Maintenance & Feedback Iterations',
    subtitle: 'Automated lints, validation gates, and metrics',
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

const PHASE_NAMES = [
  "",
  "RESEARCH",
  "PLANNING",
  "ORCHESTRATION",
  "IMPLEMENTATION",
  "MAINTENANCE"
];

const LifecyclePage: React.FC = () => {
  const [activePhase, setActivePhase] = React.useState(1);

  React.useEffect(() => {
    const handleScroll = () => {
      const stepElements = document.querySelectorAll('[data-step-id]');
      let currentActive = 1;
      let minDistance = Infinity;

      stepElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Target active line at 220px from screen top (clearing the sticky header)
        const distance = Math.abs(rect.top - 220);
        if (distance < minDistance) {
          minDistance = distance;
          currentActive = parseInt(el.getAttribute('data-step-id') || '1', 10);
        }
      });

      setActivePhase(currentActive);
    };

    // Trigger initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background-light graph-paper flex flex-col items-center animate-page-in relative">
      
      {/* Page Header */}
      <div className="w-full max-w-[1200px] px-4 md:px-8 pt-20 pb-6 border-b border-border-color/20 flex flex-col sm:flex-row sm:items-end justify-between z-30 bg-background-light/90 sticky top-0 backdrop-blur-sm">
        <div>
          <Link to="/" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-primary font-bold hover:underline mb-1 group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" /> Back to Home
          </Link>
          <h1 className="font-display italic text-2xl md:text-4xl font-extrabold tracking-tight text-text-main">
            Engineering Lifecycle
          </h1>
        </div>
        <p className="font-mono text-xs text-muted mt-2 sm:mt-0 uppercase tracking-wider">
          How I Build Time, Safety, & Cost
        </p>
      </div>

      {/* Flat List Container */}
      <div className="w-full max-w-[1200px] px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-8 items-start relative">
        
        {/* Left Column: Intro & Cards */}
        <div className="flex-1 flex flex-col gap-10">
          {/* Intro Blueprint block */}
          <div className="bg-surface border-2 border-border-color p-8 shadow-hard relative overflow-hidden" data-aos="fade-up">
            <div className="absolute top-0 right-0 bg-text-main text-surface px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider border-b border-l border-border-color">
              Telemetry Dashboard
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-text-main">
                Continuous Improvement Pipeline
              </span>
            </div>
            <p className="font-sans text-muted text-base leading-relaxed max-w-3xl">
              My development workflow leverages a strict, multi-stage pipeline designed to prevent technical debt before writing the first line of code. By combining thorough requirement analysis with custom Model Context Protocol (MCP) agents, low-level type constraints, and strict automated review loops, I deliver highly secure, scalable architectures with rapid deployment velocities.
            </p>
          </div>

          {/* Steps mapping in flat, large cards */}
          <div className="flex flex-col gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={step.id} 
                data-step-id={step.id}
                className="bg-surface border border-border-color p-6 md:p-8 shadow-hard hover:shadow-hard-hover hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-300 relative group flex flex-col md:flex-row gap-6 items-start"
                data-aos="fade-up"
              >
                {/* Step Badge */}
                <div className="font-mono text-xs text-primary font-bold bg-primary/5 border border-primary/20 p-3 shrink-0 flex items-center justify-center">
                  {step.icon}
                </div>

                {/* Step Content */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-color/10 pb-2">
                    <div>
                      <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest block mb-0.5">
                        PHASE 0{step.id}
                      </span>
                      <h2 className="font-sans font-black text-xl text-text-main leading-tight tracking-tight">
                        {step.title}
                      </h2>
                    </div>
                    <span className="font-mono text-xs font-bold uppercase border border-border-color/20 bg-background-light px-3 py-1 text-text-main h-fit">
                      {step.metric}
                    </span>
                  </div>

                  <p className="font-display italic text-base text-muted font-medium -mt-2 leading-relaxed">
                    {step.subtitle}
                  </p>

                  <div className="font-sans text-sm text-text-main leading-relaxed max-w-3xl">
                    {step.pitchBody}
                  </div>

                  {/* Integrations */}
                  <div className="border-t border-border-color/10 pt-4 mt-2 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] uppercase font-bold text-muted">
                      Core Integrations:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {step.integrations.map((integration, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border-color bg-background-light font-mono text-[10px] font-bold text-text-main shadow-[1.5px_1.5px_0px_#171717]"
                        >
                          {integration.logo}
                          {integration.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Wireframe Panel */}
        <aside className="hidden lg:block w-[280px] shrink-0 sticky top-[160px] self-start z-20">
          <div className="border-2 border-border-color bg-surface p-6 shadow-hard flex flex-col gap-6 relative overflow-hidden">
            {/* Grid Pattern Background for Wireframe Aesthetic */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(#3730A3 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }} />

            {/* Header / Telemetry style */}
            <div className="flex items-center justify-between border-b border-border-color pb-3 z-10">
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#3730A3] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3730A3] animate-pulse" />
                Phase Tracker
              </span>
              <span className="font-mono text-[9px] text-muted">
                SYS.LOC: active
              </span>
            </div>

            {/* Display active phase */}
            <div className="flex flex-col items-center py-4 z-10">
              <div 
                className="font-display text-5xl font-black tracking-tighter leading-none"
                style={{ WebkitTextStroke: '2.5px #3730A3', color: 'transparent' }}
              >
                PHASE
              </div>
              <div className="font-display text-8xl font-black text-[#3730A3] leading-none select-none my-2">
                {String(activePhase).padStart(2, '0')}
              </div>
              <div className="bg-[#3730A3] text-surface font-sans font-black text-sm px-3 py-1 border border-border-color uppercase tracking-wider text-center w-full shadow-[2px_2px_0px_#171717]">
                {PHASE_NAMES[activePhase]}
              </div>
            </div>

            {/* Vertical Flow Diagram */}
            <div className="flex flex-col gap-3 border-t border-border-color pt-4 z-10">
              {PROCESS_STEPS.map((step) => {
                const isActive = step.id === activePhase;
                return (
                  <div key={step.id} className="flex items-center gap-3">
                    {/* Circle / Square Node */}
                    <div className={`w-4 h-4 border-2 flex items-center justify-center font-mono text-[8px] font-bold transition-all duration-300 ${
                      isActive 
                        ? 'border-[#3730A3] bg-[#3730A3] text-surface scale-110 shadow-[1px_1px_0px_#171717]' 
                        : 'border-border-color/40 text-muted bg-background-light'
                    }`}>
                      {step.id}
                    </div>
                    {/* Label */}
                    <span className={`font-mono text-[10px] tracking-tight uppercase font-bold transition-colors duration-300 ${
                      isActive ? 'text-[#3730A3]' : 'text-muted'
                    }`}>
                      {step.title.split(' & ')[0].split(' - ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

      </div>

      {/* Mobile Floating Action Indicator */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <div className="bg-surface border-2 border-border-color p-3 shadow-hard flex flex-col items-center gap-1 min-w-[110px]">
          <span className="font-mono text-[9px] font-bold text-[#3730A3] uppercase">
            PHASE 0{activePhase}
          </span>
          <span className="font-sans font-black text-[10px] uppercase text-text-main bg-[#FFE600] px-1.5 py-0.5 border border-border-color shadow-[1px_1px_0px_#171717]">
            {PHASE_NAMES[activePhase]}
          </span>
        </div>
      </div>

    </div>
  );
};

export default LifecyclePage;
