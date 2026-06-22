// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/frontend-design/SKILL.md
import React from 'react';
import { ArrowRight, ExternalLink, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GSAPSplitText, GSAPReveal, GSAPTilt } from './gsap';

interface FeaturedProject {
  title: string;
  subtitle: string;
  image: string;
  tech: string[];
  pitch: string;
  link?: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: "Finals QB",
    subtitle: "Interactive Prep Engine",
    image: "/assets/finals-qb.png",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    pitch: "A complete neobrutalist interactive study ecosystem. Employs advanced state synchronization, clientside telemetry, and rapid quiz generation to help students optimize preparation and study paths for final exams.",
    link: "https://finals-qb.vercel.app/"
  },
  {
    title: "Live Star Agency Landing Page",
    subtitle: "Strategic Business Case & CRO Multiplier",
    image: "/assets/livestar.png",
    tech: ["React", "Framer Motion", "Tailwind CSS", "Vite", "Lenis Scroll"],
    pitch: "A conversion rate optimization (CRO) engine built after analyzing 135+ pages of regional market constraints. Engineered to double baseline conversion rates (2.5% to 5.0%), halving acquisition costs (CPL down to 100 EGP) on a fixed 50k EGP budget, while completely bypassing annual CMS maintenance fees.",
    link: "https://livestar.agency"
  },
  {
    title: "DVLD Licensing System",
    subtitle: "Handmade Giant Full-Stack Solution",
    image: "/assets/dvld_preview.png",
    tech: ["C# .NET 4.7", "SQL Server", "ADO.NET", "T-SQL", "Desktop/WinForms"],
    pitch: "A comprehensive, high-integrity Driver and Vehicle Licensing Department platform engineered from scratch. Manages 10+ core administrative licensing workflows (from vision tests and theory exams to international permits). Implements strict transactional safety, relational integrity, and custom database telemetry.",
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative flex h-auto w-full flex-col pt-20 pb-16">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
            
            {/* Section Header */}
            <div className="mb-12 flex flex-col sm:flex-row justify-between sm:items-end border-b border-border-color pb-4" data-aos="fade-up">
              <div>
                <h2 className="font-display italic text-3xl font-medium tracking-tight text-text-main">
                  <GSAPSplitText type="words" animation="slide-up">
                    Premium Highlights
                  </GSAPSplitText>
                </h2>
                <p className="font-mono text-sm text-muted mt-2 uppercase tracking-widest">
                  High-Impact Implementations
                </p>
              </div>
              <Link 
                to="/projects" 
                className="inline-flex items-center gap-2 font-mono text-sm uppercase text-primary font-bold hover:underline mt-4 sm:mt-0 group"
              >
                View Full Portfolio 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURED_PROJECTS.map((project, idx) => (
                <GSAPReveal direction="up" duration={0.85} delay={idx * 0.15} key={idx}>
                  <div className="h-full flex flex-col">
                    <GSAPTilt maxTilt={8} perspective={1000}>
                      <article 
                        className="bg-surface border border-border-color flex flex-col group hover:bg-background-light transition-shadow duration-300 shadow-hard hover:shadow-hard-hover h-full cursor-pointer"
                      >
                        {/* Mock Screenshot Section */}
                        <div className="h-48 bg-background-light border-b border-border-color relative flex items-center justify-center overflow-hidden shrink-0">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface/30 to-transparent pointer-events-none"></div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-sans font-extrabold group-hover:text-primary transition-colors text-text-main leading-tight">
                                {project.title}
                              </h3>
                              <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider block mt-1">
                                {project.subtitle}
                              </span>
                            </div>
                            {project.link && (
                              <a href={project.link} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors p-1" aria-label="External Link">
                                <ExternalLink size={18} />
                              </a>
                            )}
                          </div>
                          
                          <p className="text-text-main leading-relaxed mb-6 flex-grow font-sans text-sm mt-3">
                            {project.pitch}
                          </p>
                          
                          <div className="mt-auto">
                            {/* Tech Stack Tags */}
                            <div className="mb-6 flex flex-wrap gap-2">
                              {project.tech.map((tech, tIdx) => (
                                <span key={tIdx} className={`font-mono text-[10px] px-2 py-0.5 border ${
                                  tIdx === 0 ? 'bg-text-main text-surface border-text-main' : 'border-border-color/30 bg-background-light text-text-main'
                                }`}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                            
                            {project.link ? (
                              <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center font-mono text-xs uppercase text-primary font-bold hover:underline group/link">
                                View Live Deployment 
                                <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                              </a>
                            ) : (
                              <span className="inline-flex items-center font-mono text-xs uppercase text-muted font-bold gap-1">
                                <ShieldAlert size={14} /> Desktop/Internal Platform
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    </GSAPTilt>
                  </div>
                </GSAPReveal>
              ))}
            </div>

            {/* Bottom Large CTA */}
            <div className="mt-12 text-center" data-aos="fade-up">
              <Link 
                to="/projects"
                className="inline-flex items-center justify-center bg-text-main text-surface px-8 py-4 border-2 border-border-color font-mono text-sm uppercase tracking-wider hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-hard-hover transition-all duration-200 shadow-hard"
              >
                Explore Full Interactive Portfolio
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;