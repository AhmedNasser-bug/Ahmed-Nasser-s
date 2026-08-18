import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const INITIALIZATION_LOGS = [
  'Booting Antigravity Developer Stack...',
  'Resolving Model Context Protocols (MCP)...',
  'Initializing Three.js WebGL Constellation Engine...',
  'Mounting Stitch UI Design tokens...',
  'Loading Personal Credentials & Profile constants...',
  'Decoupling strategy patterns for Quiz adapters...',
  'Compiling government-safe DVLD transactional workflows...',
  'Validating production build routes (Vercel checks)...',
  'Analyzing mobile-first CRO telemetry (135+ pages)...',
  'Syncing Jules suggestions quality assurance feedback...',
  'All engineering engines operational. Ready.'
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [activeLog, setActiveLog] = useState(INITIALIZATION_LOGS[0]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Simulate Progress Bar (0 to 100 over ~1500ms)
    const startTime = Date.now();
    const duration = 1600; 

    let animationFrameId: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(pct);

      // 2. Rotate Monospace Telemetry Logs based on progress bracket
      const logIndex = Math.min(
        Math.floor((pct / 100) * INITIALIZATION_LOGS.length),
        INITIALIZATION_LOGS.length - 1
      );
      setActiveLog(INITIALIZATION_LOGS[logIndex]);

      if (pct < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Once progress hits 100%, hold briefly, then trigger fade-out transition
        setTimeout(() => {
          setIsFading(true);
          // Complete full fade-out before unmounting component
          setTimeout(() => {
            onComplete();
          }, 650);
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background-light transition-all duration-500 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100'
      }`}
      style={{
        // WebGL-friendly clipping mask for visual slide-up reveal
        clipPath: isFading ? 'polygon(0 0, 100% 0, 100% 0, 0 0)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: 'all 600ms cubic-bezier(0.85, 0, 0.15, 1)'
      }}
    >
      {/* Repeating Graph Paper Background Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#E5E5E5_1px,transparent_1px),linear-gradient(to_bottom,#E5E5E5_1px,transparent_1px)] bg-[size:40px_40px] opacity-25 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col gap-6">
        {/* Header Telemetry */}
        <div className="flex justify-between items-end border-b border-border-color pb-3">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              SYSTEM INITIALIZE
            </h2>
            <span className="font-sans font-extrabold text-lg text-text-main tracking-tight mt-1 block">
              Ahmed Nasser Portfolio
            </span>
          </div>
          <span className="font-mono text-3xl font-extrabold text-primary">
            {progress}%
          </span>
        </div>

        {/* Dynamic Telemetry Log Line */}
        <div className="h-12 flex items-center bg-[#E0E7FF]/40 border border-primary/20 px-4 py-2 font-mono text-[11px] text-text-main shadow-[2px_2px_0px_rgba(55,48,163,0.1)]" aria-live="polite">
          <span className="text-primary font-bold mr-2" aria-hidden="true">&gt;</span>
          <span className="animate-pulse">{activeLog}</span>
        </div>

        {/* Neobrutalist Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="relative h-6 w-full bg-surface border-2 border-border-color shadow-hard overflow-hidden"
        >
          <div 
            className="h-full bg-primary border-r-2 border-border-color transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Footnote telemetry */}
        <div className="flex justify-between items-center font-mono text-[10px] text-text-main/60 uppercase">
          <span>PORT: 3000</span>
          <span>SPEED: MAX_VELOCITY</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
