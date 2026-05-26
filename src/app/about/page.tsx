'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';

// Dynamically load client-only WebGL Three.js background with ssr: false
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
});

export default function About() {
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

      {/* About Hero Section */}
      <section className="about-hero section pb-0 relative" id="hero" style={{ minHeight: '100vh' }}>
        <ThreeBackground />

        <div className="container relative z-10">
          <div className="row align-items-center">
            
            {/* Image Column */}
            <div className="col-lg-5 mb-5 mb-lg-0">
              <div className="bio-image position-relative">
                <div className="placeholder-image d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    aspectRatio: '9 / 16',
                    width: '100%',
                    height: 'auto',
                    maxWidth: '400px',
                    margin: '0 auto',
                    background: 'linear-gradient(135deg, #1e3a8a, #0f172a)',
                    border: '1px solid rgba(96, 165, 250, 0.3)',
                    overflow: 'hidden',
                  }}
                >
                  <div className="text-center text-blue-300 w-100 h-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/hero.jpeg" loading="eager" className="img-fluid rounded-3" alt="Portrait of Ahmed Naser" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                </div>
                <div className="bg-blur position-absolute top-0 start-0 w-100 h-100" style={{ background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.15, zIndex: -1 }} aria-hidden="true" />
              </div>
            </div>

            {/* Bio Content Column */}
            <div className="col-lg-7">
              <div className="ps-lg-5">
                <h1 className="about-headline mb-4" style={{ fontSize: '3.2rem', fontWeight: 800, lineHeight: 1.2 }}>
                  Engineering <span className="text-primary">Business Solutions</span> & High-ROI Architecture
                </h1>

                <div className="bio-content">
                  <p className="lead mb-4" style={{ fontSize: '1.25rem' }}>
                    I&apos;m Ahmed - a <span className="text-primary">Technical Consultant & AI Systems Orchestrator</span> solving complex enterprise constraints before the first line of code is written.
                  </p>

                  <p className="mb-4">
                    I am a research-driven developer building robust, scalable software architectures by combining deep systems-level knowledge (C/C++) with bleeding-edge AI orchestration. I don&apos;t just write code; I accelerate development cycles, eliminate scope creep, and prevent technical debt using advanced AI stacks.
                  </p>

                  <div className="d-flex align-items-center mb-4">
                    <div className="border-start border-primary border-3 ps-3">
                      <p className="mb-0 fst-italic">
                        &quot;Translating low-level optimization into measurable business outcomes.&quot;
                      </p>
                    </div>
                  </div>

                  <p>
                    As an AI Systems Evaluator and Technical Consultant, I&apos;ve discovered that <span className="text-primary">great software emerges when strict constraints meet rapid prototyping</span>. Whether reverse-engineering complex backends or drafting precise technical feasibility studies for enterprise budgets, I bridge the gap between low-level performance and high-level business logic.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="personal-touches section m-0" id="main-content" tabIndex={-1}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="section-title mb-5">My Engineering Philosophy</h2>
              <div className="bg-grid position-absolute top-0 start-0 w-100 h-100" aria-hidden="true"></div>

              <div className="position-relative">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="skill-card h-100">
                      <div className="skill-icon mx-auto mb-4">
                        <i className="fas fa-microchip" aria-hidden="true"></i>
                      </div>
                      <h3 className="skill-title text-center">Systems-Level Optimization</h3>
                      <p className="skill-description text-center mb-0">
                        Performance defines user experience. From C/C++ memory management to executing robust algorithms under pressure, I optimize the lowest levels.
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="skill-card h-100">
                      <div className="skill-icon mx-auto mb-4">
                        <i className="fas fa-brain" aria-hidden="true"></i>
                      </div>
                      <h3 className="skill-title text-center">AI-Augmented Architecture</h3>
                      <p className="skill-description text-center mb-0">
                        Leveraging cutting-edge models (Cursor, v0, MCP) to generate systems under 135+ page highly constrained logic rules for maximum security and zero drift.
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="skill-card h-100">
                      <div className="skill-icon mx-auto mb-4">
                        <i className="fas fa-chart-pie" aria-hidden="true"></i>
                      </div>
                      <h3 className="skill-title text-center">Technical Business Consulting</h3>
                      <p className="skill-description text-center mb-0">
                        Translating business requirements into 50+ page technical feasibility studies. Every architecture decision mitigates risk and accelerates project ROI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Skills Section */}
      <section className="extended-skills-section section overflow-visible">
        <div className="bg-grid" aria-hidden="true"></div>
        <div className="bg-blur blur-1 w-50" aria-hidden="true"></div>
        <div className="bg-blur blur-2 w-50" aria-hidden="true"></div>
        <div className="container">
          <h2 className="section-title mb-5">Technical Expertise</h2>

          {/* Blueprint Skills Table — horizontally scrollable on mobile */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -0.75rem' }}>
            <div className="skills-blueprint-table hanwag-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #000', boxShadow: '4px 4px 0 #000', minWidth: '620px' }}>
              
              {/* Column 1: Full-Stack Engineering */}
              <div style={{ borderRight: '1px solid #000' }}>
                <div style={{ background: '#0f172a', color: '#fff', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #000', minHeight: '64px' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Full-Stack Engineering</span>
                  <i className="fas fa-code" style={{ fontSize: '0.85rem', opacity: 0.7 }} aria-hidden="true"></i>
                </div>
                <div style={{ padding: '0 1rem' }}>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>TypeScript</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>React/Next.js</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Node.js</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>PostgreSQL/MongoDB</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Supabase</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>C/C++</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>C#</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Python</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>T-SQL</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>.NET</div>
                  <div style={{ padding: '0.75rem 0', fontSize: '0.9rem' }}>ADO.Net</div>
                </div>
              </div>

              {/* Column 2: AI-Augmented Architecture */}
              <div style={{ borderRight: '1px solid #000' }}>
                <div style={{ background: '#0f172a', color: '#fff', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #000', minHeight: '64px' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI-Augmented Architecture</span>
                  <i className="fas fa-brain" style={{ fontSize: '0.85rem', opacity: 0.7 }} aria-hidden="true"></i>
                </div>
                <div style={{ padding: '0 1rem' }}>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Large-Context AI Orchestration</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Cursor</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>v0</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>MCP</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Qodo</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>CodeRabbit</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Google Stitch</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Speckit</div>
                  <div style={{ padding: '0.75rem 0', fontSize: '0.9rem' }}>Jules</div>
                </div>
              </div>

              {/* Column 3: Systems & Performance */}
              <div style={{ borderRight: '1px solid #000' }}>
                <div style={{ background: '#0f172a', color: '#fff', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #000', minHeight: '64px' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Systems &amp; Performance</span>
                  <i className="fas fa-microchip" style={{ fontSize: '0.85rem', opacity: 0.7 }} aria-hidden="true"></i>
                </div>
                <div style={{ padding: '0 1rem' }}>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>C++ Memory Management</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Algorithmic Optimization</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Low-Latency Execution</div>
                  <div style={{ padding: '0.75rem 0', fontSize: '0.9rem' }}>Automated DOM Querying</div>
                </div>
              </div>

              {/* Column 4: Technical Business Consulting */}
              <div>
                <div style={{ background: '#0f172a', color: '#fff', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #000', minHeight: '64px' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Business Consulting</span>
                  <i className="fas fa-user-tie" style={{ fontSize: '0.85rem', opacity: 0.7 }} aria-hidden="true"></i>
                </div>
                <div style={{ padding: '0 1rem' }}>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>ROI &amp; TCO Analysis</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Technical Feasibility Studies</div>
                  <div style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb', fontSize: '0.9rem' }}>Scope of Work (SOW) Constraints</div>
                  <div style={{ padding: '0.75rem 0', fontSize: '0.9rem' }}>Client Negotiation</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey */}
      <section className="journey-highlights section">
        <div className="container">
          <h2 className="section-title mb-5">My Professional Journey</h2>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="journey-highlight-item skill-card hanwag-fade">
                <div className="d-flex align-items-start mb-3">
                  <div className="skill-icon me-3">
                    <i className="fas fa-medal" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="skill-title">Project planning and Idea <i>Simplification</i> excellence</h3>
                    <div className="experience-badge">University projects</div>
                  </div>
                </div>
                <p className="skill-description">
                  Practically secured <span className="text-primary">1st Place</span> at every University project I lead. I always start with the big picture, deeply analyze using <span className="text-primary">abstraction, divide and conquer</span>, and crack any big idea into its simplest components, allowing me to deliver projects far exceeding expectations.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="journey-highlight-item skill-card hanwag-fade">
                <div className="d-flex align-items-start mb-3">
                  <div className="skill-icon me-3">
                    <i className="fas fa-users-gear" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="skill-title">Technical Leadership</h3>
                    <div className="experience-badge">ICPC PUA Director</div>
                  </div>
                </div>
                <p className="skill-description">
                  As <span className="text-primary">Director & Head Trainer</span> at ICPC PUA, I built a championship program, engineered competition simulations that increased problem-solving speed by <span className="text-primary">40%</span>, and coached teams to rank top inACM ECPC 2025.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="journey-highlight-item skill-card hanwag-fade">
                <div className="d-flex align-items-start mb-3">
                  <div className="skill-icon me-3">
                    <i className="fas fa-road-circle-check" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="skill-title">Real-World System Architecture</h3>
                    <div className="experience-badge">Drivers Licensing System</div>
                  </div>
                </div>
                <p className="skill-description">
                  Engineered a <span className="text-primary">full-stack licensing platform</span> handling 10+ complex workflows. Crystallized my architectural core: complex systems demand simple, maintainable models built cleanly with C# .NET + SQL Server.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="journey-highlight-item skill-card hanwag-fade">
                <div className="d-flex align-items-start mb-3">
                  <div className="skill-icon me-3">
                    <i className="fas fa-brain" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="skill-title">AI-Powered Development</h3>
                    <div className="experience-badge">Outlier Trainer</div>
                  </div>
                </div>
                <p className="skill-description">
                  As an <span className="text-primary">AI Reasoning Trainer</span> fine-tuning frontier models (GPT-4o, Claude 3.5), I gained expert insights into human-like automated behaviors to maximize logic engineering cycles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section section">
        <div className="container">
          <h2 className="section-title mb-5">Education & Professional Development</h2>

          <div className="row justify-content-center">
            
            <div className="col-lg-8 mb-4 education-item hanwag-fade">
              <div className="education-card skill-card p-4 h-100 education-formal" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div className="d-flex align-items-start">
                  <div className="education-icon me-4" style={{ width: '70px', height: '70px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-graduation-cap fa-2x text-primary" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="education-degree mb-2" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--light)' }}>BSc Computer Science</h3>
                    <div className="education-institution text-gray-500 mb-2">Pharos University in Alexandria</div>
                    <div className="education-date mb-3">
                      <span className="badge" style={{ background: 'rgba(37, 99, 235, 0.15)', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontWeight: 600 }}>2023 - 2027</span>
                    </div>
                    <div className="education-details text-gray-500" style={{ lineHeight: 1.7 }}>
                      Fully funded scholarship program with a current GPA of ~3.8. Focus on software architecture, algorithms, data structures, and low-latency system design.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 mb-4 education-item hanwag-fade">
              <div className="education-card skill-card p-4 h-100 education-training">
                <div className="d-flex align-items-start">
                  <div className="education-icon me-4" style={{ width: '60px', height: '60px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fa fa-laptop fa-2x text-blue-300" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="education-degree mb-2" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--light)' }}>ITI’s InnovEgypt Program</h3>
                    <div className="education-institution text-gray-500 mb-2">Information Technology Institute</div>
                    <div className="education-date mb-3">
                      <span className="badge" style={{ background: 'rgba(37, 99, 235, 0.15)', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontWeight: 600 }}>2024</span>
                    </div>
                    <div className="education-details text-gray-500" style={{ lineHeight: 1.7 }}>
                      Introductory training for startups to develop strong collaborative and leadership skills. Initiated and founded a team for a startup product.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 mb-4 education-item hanwag-fade">
              <div className="education-card skill-card p-4 h-100 education-training">
                <div className="d-flex align-items-start">
                  <div className="education-icon me-4" style={{ width: '60px', height: '60px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-laptop-code fa-2x text-blue-300" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="education-degree mb-2" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--light)' }}>Web Design & Branding Diploma</h3>
                    <div className="education-institution text-gray-500 mb-2">National Telecommunication Institute & Career 180</div>
                    <div className="education-date mb-3">
                      <span className="badge" style={{ background: 'rgba(37, 99, 235, 0.15)', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontWeight: 600 }}>2025</span>
                    </div>
                    <div className="education-details text-gray-500" style={{ lineHeight: 1.7 }}>
                      100-hour intensive bootcamp covering frontend development (HTML, CSS, JS, Bootstrap) and personal branding for tech professionals.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 mb-4 education-item hanwag-fade">
              <div className="education-card skill-card p-4 h-100 education-certification" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div className="d-flex align-items-start">
                  <div className="education-icon me-4" style={{ width: '70px', height: '70px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-robot fa-2x text-purple" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="education-degree mb-2" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--light)' }}>AI/ML Engineering Diploma</h3>
                    <div className="education-institution text-gray-500 mb-2">Arabian Academy</div>
                    <div className="education-date mb-3">
                      <span className="badge" style={{ background: 'rgba(37, 99, 235, 0.15)', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontWeight: 600 }}>2025 - Present</span>
                    </div>
                    <div className="education-details text-gray-500" style={{ lineHeight: 1.7 }}>
                      Comprehensive training in AI/ML systems—from foundational algorithms to advanced LLM orchestrations, fine-tunings, and model optimizations.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
