import React from 'react';
import { ArrowRight, Activity, Search, Compass, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollPaintStroke from './ui/ScrollPaintStroke';
import { GSAPSplitText, GSAPTilt } from './gsap';

const ProcessHomeSection: React.FC = () => {
  return (
    <section id="process-home" className="relative flex h-auto w-full flex-col pt-16 pb-16 border-t border-border-color">
      {/* Background Decorative Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#E5E5E5_1px,transparent_1px),linear-gradient(to_bottom,#E5E5E5_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="layout-container flex h-full grow flex-col relative z-10">
        <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: The Big Question */}
              <div className="lg:col-span-7 flex flex-col gap-6" data-aos="fade-right">
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                  System Orchestration Methodology
                </span>
                
                <h2 className="font-display italic text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main leading-tight">
                  How do I engineer <br />
                  <ScrollPaintStroke>Time, Safety, & Cost?</ScrollPaintStroke>
                </h2>
                
                <p className="font-sans text-muted text-base md:text-lg leading-relaxed max-w-xl">
                  Building complex systems requires more than just writing code. I align every architecture decision with strict business outcomes, risk mitigation guidelines, and the Azure Well-Architected Framework (WAF) pillars. 
                </p>

                <div className="mt-4">
                  <Link 
                    to="/lifecycle"
                    className="inline-flex items-center justify-center bg-text-main text-surface hover:bg-primary border-2 border-border-color px-8 py-4 font-mono text-sm uppercase tracking-wider shadow-hard hover:shadow-hard-hover hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200"
                  >
                    Explore My Engineering Lifecycle
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Telemetry Flow Preview */}
              <div className="lg:col-span-5" data-aos="fade-left">
                <GSAPTilt maxTilt={6} perspective={1000}>
                  <div className="border-2 border-border-color bg-surface shadow-hard p-6 flex flex-col gap-4 relative">
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    
                    <h3 className="font-mono text-xs uppercase tracking-widest text-text-main font-bold border-b border-border-color pb-2 mb-2">
                      Pipeline Overview
                    </h3>

                    {/* Compact Phase Indicator Nodes */}
                    <div className="flex flex-col gap-3 font-sans text-xs font-medium" role="list">
                      <div className="flex items-center gap-3 p-2 border border-border-color/10 bg-background-light" role="listitem">
                        <div className="p-1 bg-primary/10 border border-primary/20 text-primary shrink-0">
                          <Search size={14} />
                        </div>
                        <div>
                          <div className="font-mono text-[9px] text-muted">PHASE 01</div>
                          <div className="font-bold text-text-main">Research & Constraints Isolate</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-2 border border-border-color/10 bg-background-light" role="listitem">
                        <div className="p-1 bg-primary/10 border border-primary/20 text-primary shrink-0">
                          <Compass size={14} />
                        </div>
                        <div>
                          <div className="font-mono text-[9px] text-muted">PHASE 02</div>
                          <div className="font-bold text-text-main">Architectural Planning & WAF Alignment</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-2 border border-border-color/10 bg-background-light" role="listitem">
                        <div className="p-1 bg-primary/10 border border-primary/20 text-primary shrink-0">
                          <Cpu size={14} />
                        </div>
                        <div>
                          <div className="font-mono text-[9px] text-muted">PHASE 03</div>
                          <div className="font-bold text-text-main">Multi-Agent Developer Systems</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-2 border border-border-color/10 bg-background-light opacity-50" role="listitem">
                        <div className="p-1 bg-muted/15 border border-muted/20 text-muted shrink-0">
                          <Layers size={14} />
                        </div>
                        <div>
                          <div className="font-mono text-[9px] text-muted">PHASE 04</div>
                          <div className="font-bold text-text-main">Low-Level System Implementation</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-muted text-right mt-2">
                      <Link to="/lifecycle" className="text-primary hover:underline font-bold inline-flex items-center gap-1">
                        View Detailed Blueprint <ArrowRight size={10} />
                      </Link>
                    </div>
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

export default ProcessHomeSection;
