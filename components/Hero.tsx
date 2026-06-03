import React from 'react';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { PROFILE } from '../constants';
import ThreeBackground from './ThreeBackground';

const Hero: React.FC = () => {
  return (
    <section className="relative flex h-auto w-full flex-col group/design-root pt-10 pb-10">
      <ThreeBackground />
      <div className="layout-container flex h-full grow flex-col relative z-10 pointer-events-none">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5 pointer-events-auto">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
            
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start py-10">
              <div className="flex flex-col gap-8" data-aos="fade-right">
                <div className="space-y-4">
                  <h3 className="font-mono text-sm uppercase tracking-widest text-primary">System Architect</h3>
                  <h1 className="font-sans font-semibold text-5xl md:text-6xl tracking-[-0.02em] leading-[1.1] text-text-main">
                    Full-Stack &<br/>AI Engineer.
                  </h1>
                </div>
                <p className="font-display text-xl text-muted leading-relaxed max-w-md">
                  {PROFILE.tagline}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="#projects" className="flex items-center justify-center bg-text-main text-surface px-6 py-3 border border-border-color font-mono text-sm uppercase tracking-wide hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-hard-hover transition-all duration-200">
                    View Work
                  </a>
                  <a href={`mailto:${PROFILE.contact.email}`} className="flex items-center justify-center bg-surface text-text-main px-6 py-3 border border-border-color font-mono text-sm uppercase tracking-wide shadow-hard hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-hard-hover hover:text-primary transition-all duration-200">
                    Contact Me
                  </a>
                </div>
              </div>

              <div className="bg-surface border border-border-color shadow-hard hover:shadow-hard-hover transition-shadow duration-300 transform hover:-translate-y-1 hover:-translate-x-1 relative" data-aos="fade-left" data-aos-delay="200">
                <div className="border-b border-border-color bg-text-main p-4">
                  <h2 className="font-mono text-surface text-sm uppercase tracking-widest flex items-center gap-2">
                    <Terminal size={18} />
                    Engineering Philosophy
                  </h2>
                </div>
                <div className="flex flex-col">
                  <div className="p-6 border-b border-border-color group hover:bg-background-light transition-colors">
                    <div className="flex gap-4 items-start">
                      <span className="font-mono text-primary text-sm mt-1">01</span>
                      <div>
                        <h3 className="font-sans font-semibold text-lg text-text-main mb-2">Architectural Clarity</h3>
                        <p className="font-display italic text-lg text-muted">Architectural clarity over cleverness. Systems should be readable before they are writeable.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-b border-border-color group hover:bg-background-light transition-colors">
                    <div className="flex gap-4 items-start">
                      <span className="font-mono text-primary text-sm mt-1">02</span>
                      <div>
                        <h3 className="font-sans font-semibold text-lg text-text-main mb-2">Predictable Systems</h3>
                        <p className="font-display italic text-lg text-muted">Predictable, type-safe, and tested systems. Logic must be verifiable at compile time.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 group hover:bg-background-light transition-colors">
                    <div className="flex gap-4 items-start">
                      <span className="font-mono text-primary text-sm mt-1">03</span>
                      <div>
                        <h3 className="font-sans font-semibold text-lg text-text-main mb-2">AI Multiplier</h3>
                        <p className="font-display italic text-lg text-muted">AI as a multiplier, not a crutch. Automate the mundane, but engineer the core manually.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;