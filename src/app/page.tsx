'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import ProjectShowcase from '@/components/ProjectShowcase';
import ContactSection from '@/components/ContactSection';
import Link from 'next/link';

// Dynamically load client-only WebGL Three.js background with ssr: false
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
});

export default function Home() {
  // Activate Hanwag scroll animations on client mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(".hanwag-fade").forEach((section) => {
        section.classList.add("hanwag-active");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hanwag-active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    document.querySelectorAll(".hanwag-fade").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="tw-hero graph-paper overflow-x-hidden pt-[5rem] relative" id="hero" style={{ minHeight: '100vh' }}>
        <ThreeBackground />

        <div className="relative flex h-auto w-full flex-col z-10">
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
              <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
                
                {/* Main Split Section */}
                <main id="main-content" tabIndex={-1} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center py-10 min-h-[calc(100vh-10rem)] outline-none">
                  
                  {/* Left Column: Hero Intro */}
                  <div className="flex flex-col gap-8">
                    <div className="space-y-4">
                      <h3 className="font-mono text-sm uppercase tracking-widest text-primary font-bold">Ahmed Nasser</h3>
                      <h1 className="font-sans font-semibold text-5xl md:text-6xl tracking-[-0.02em] leading-[1.1] text-[#171717]">
                        Full-Stack &amp;<br/>AI Engineer.
                      </h1>
                    </div>
                    <p className="font-display text-xl text-[#4a4a4a] leading-relaxed max-w-md">
                      I don&apos;t just write code; I engineer business solutions. Slashing timelines and eliminating technical debt via deep systems-level knowledge and bleeding-edge AI orchestration.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <a href="https://github.com/AhmedNasser-bug" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-[#171717] text-white px-6 py-3 border border-[#171717] rounded-sm font-mono text-sm uppercase tracking-wide hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-hard-hover focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#171717] focus-visible:outline-none transition-all duration-200" style={{ textDecoration: 'none' }} aria-label="View GitHub (opens in a new tab)" title="View GitHub">
                        View GitHub<i className="fas fa-external-link-alt ms-2" style={{ fontSize: '0.8em' }} aria-hidden="true"></i>
                      </a>
                      <a href="#projects" className="flex items-center justify-center bg-white text-[#171717] px-6 py-3 border border-[#171717] rounded-sm font-mono text-sm uppercase tracking-wide shadow-hard hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-hard-hover hover:text-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#171717] focus-visible:outline-none transition-all duration-200" style={{ textDecoration: 'none' }} aria-label="View Projects" title="View Projects">
                        View Projects
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Philosophy Box */}
                  <div className="bg-white border border-[#171717] rounded-sm shadow-hard hover:shadow-hard-hover transition-shadow duration-300 transform hover:-translate-y-1 hover:-translate-x-1 relative">
                    <div className="border-b border-[#171717] bg-[#171717] p-4">
                      <h2 className="font-mono text-white text-sm uppercase tracking-widest flex items-center gap-2 m-0">
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">terminal</span>
                        Engineering Philosophy
                      </h2>
                    </div>
                    <div className="flex flex-col" role="list">
                      {/* Tenet 1 */}
                      <div className="p-6 border-b border-[#171717] group hover:bg-[#FAFAFA] transition-colors" role="listitem">
                        <div className="flex gap-4 items-start">
                          <span className="font-mono text-primary text-sm mt-1">01</span>
                          <div>
                            <h3 className="font-sans font-semibold text-lg text-[#171717] mb-2 mt-0">Architectural Clarity</h3>
                            <p className="font-display italic text-lg text-[#4a4a4a] m-0">Architectural clarity over cleverness. Systems should be readable before they are writeable.</p>
                          </div>
                        </div>
                      </div>
                      {/* Tenet 2 */}
                      <div className="p-6 border-b border-[#171717] group hover:bg-[#FAFAFA] transition-colors" role="listitem">
                        <div className="flex gap-4 items-start">
                          <span className="font-mono text-primary text-sm mt-1">02</span>
                          <div>
                            <h3 className="font-sans font-semibold text-lg text-[#171717] mb-2 mt-0">Predictable Systems</h3>
                            <p className="font-display italic text-lg text-[#4a4a4a] m-0">Predictable, type-safe, and tested systems. Logic must be verifiable at compile time.</p>
                          </div>
                        </div>
                      </div>
                      {/* Tenet 3 */}
                      <div className="p-6 group hover:bg-[#FAFAFA] transition-colors" role="listitem">
                        <div className="flex gap-4 items-start">
                          <span className="font-mono text-primary text-sm mt-1">03</span>
                          <div>
                            <h3 className="font-sans font-semibold text-lg text-[#171717] mb-2 mt-0">AI Multiplier</h3>
                            <p className="font-display italic text-lg text-[#4a4a4a] m-0">AI as a multiplier, not a crutch. Automate the mundane, but engineer the core manually.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </main>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section" id="skills" style={{ overflow: 'visible' }} tabIndex={-1}>
        <div className="bg-grid" aria-hidden="true"></div>
        <div className="bg-blur blur-2 w-100 h-25" aria-hidden="true"></div>

        <div className="container">
          <h2 className="section-title hanwag-fade">Technical Expertise</h2>

          <div className="row g-4" role="list">
            <div className="col-md-6 col-lg-3 hanwag-fade" role="listitem">
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-microchip" aria-hidden="true"></i>
                </div>
                <h3 className="skill-title">AI Orchestration</h3>
                <p className="skill-description">Architecting large-context AI environments (100k+ tokens) using Cursor, v0, MCP, and Qodo to accelerate execution.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 hanwag-fade" role="listitem">
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-laptop-code" aria-hidden="true"></i>
                </div>
                <h3 className="skill-title">Full-Stack Architect</h3>
                <p className="skill-description">TypeScript, Next.js, Node.js, and C#. Designing secure interfaces and scalable backends backed by PostgreSQL.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 hanwag-fade" role="listitem">
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-layer-group" aria-hidden="true"></i>
                </div>
                <h3 className="skill-title">Systems Optimization</h3>
                <p className="skill-description">C/C++ memory management, low-latency execution, and heavy algorithmic efficiency for complex data flows.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 hanwag-fade" role="listitem">
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-chart-line" aria-hidden="true"></i>
                </div>
                <h3 className="skill-title">Technical Consulting</h3>
                <p className="skill-description">Translating requirements into ROI. Drafting 50+ page feasibility studies for enterprise-scalable system budgets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="section" id="experience">
        <div className="container">
          <h2 className="section-title hanwag-fade">Work Experience</h2>

          <div role="list" className="d-flex flex-column gap-4">
          <div className="hanwag-fade" role="listitem">
            <div className="experience-card">
              <span className="experience-badge">2023-Present</span>
              <h3 className="experience-title">Technical Consultant & Full-Stack Architect</h3>
              <p className="experience-company">Freelance | Enterprise Solutions</p>
              <ul className="experience-list">
                <li>Architected highly constrained AI environments with massive system-level contexts (135+ pages) to eliminate scope creep.</li>
                <li>Drafted data-driven technical feasibility studies for enterprise projects up to 500M EGP.</li>
                <li>Engineered and deployed strict, secure end-to-end management systems from scratch.</li>
              </ul>
            </div>
          </div>

          <div className="hanwag-fade" role="listitem">
            <div className="experience-card">
              <span className="experience-badge">2023-2024</span>
              <h3 className="experience-title">AI Systems Trainer & Evaluator</h3>
              <p className="experience-company">Outlier & DataAnnotation</p>
              <ul className="experience-list">
                <li>Fine-tuned frontier models (GPT-4o, Claude 3.5) on complex algorithmic reasoning.</li>
                <li>Optimized AI-generated code architectures across expansive commercial tech stacks.</li>
                <li>Gained proprietary insights into human-like automated development behaviors.</li>
              </ul>
            </div>
          </div>

          <div className="hanwag-fade" role="listitem">
            <div className="experience-card">
              <span className="experience-badge">2025-Present</span>
              <h3 className="experience-title">President & Head of Trainers</h3>
              <p className="experience-company">ICPC PUA | Algorithmic Leadership</p>
              <ul className="experience-list">
                <li>Lead algorithm developers emphasizing extreme code efficiency and space-time complexity scaling.</li>
                <li>Secured 1st place in university ranking at ACM ECPC 2025 through strategic problem-solving optimization.</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section overflow-visible" id="services">
        <div className="bg-grid" aria-hidden="true"></div>
        <div className="bg-blur blur-1 w-75 h-25" aria-hidden="true"></div>

        <div className="container">
          <h2 className="section-title hanwag-fade">Development Services</h2>

          <div className="row g-4" role="list">
            <div className="col-md-6 col-lg-4 hanwag-fade" role="listitem">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-layer-group" aria-hidden="true"></i>
                </div>
                <h3 className="service-title">Full-Stack .NET</h3>
                <p className="service-description">End-to-end solutions with scalable architecture and optimized databases</p>
                <a href="#contact" className="service-cta text-decoration-none d-inline-block text-center" aria-label="Get a quote for Full-Stack .NET" title="Get a quote for Full-Stack .NET">Get Quote</a>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 hanwag-fade" role="listitem">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-database" aria-hidden="true"></i>
                </div>
                <h3 className="service-title">Database Design</h3>
                <p className="service-description">Reliable database architecture with SQL Server optimization</p>
                <a href="#contact" className="service-cta text-decoration-none d-inline-block text-center" aria-label="Get a quote for Database Design" title="Get a quote for Database Design">Get Quote</a>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 hanwag-fade" role="listitem">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-cogs" aria-hidden="true"></i>
                </div>
                <h3 className="service-title">Algorithmic Solutions</h3>
                <p className="service-description">Complex problem solving with optimized algorithms</p>
                <a href="#contact" className="service-cta text-decoration-none d-inline-block text-center" aria-label="Get a quote for Algorithmic Solutions" title="Get a quote for Algorithmic Solutions">Get Quote</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <ProjectShowcase />

      {/* Direct contact secondary cta */}
      <div className="text-center py-4">
        <Link href="/about" className="cta-button mx-1 my-3 intense-button" aria-label="Navigate to About page to know more about me" title="Know more about me">
          Know more about me <i className="fas fa-arrow-right ms-2" aria-hidden="true"></i>
        </Link>
      </div>

      {/* Contact & CTA Section */}
      <ContactSection />
    </>
  );
}
