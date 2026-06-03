import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowRight, Terminal, ExternalLink } from 'lucide-react';

const getBentoClasses = (size?: string) => {
  switch (size) {
    case 'large':
      return 'md:col-span-2 md:row-span-2';
    case 'wide':
      return 'md:col-span-2 md:row-span-1';
    case 'tall':
      return 'md:col-span-1 md:row-span-2';
    case 'small':
    default:
      return 'md:col-span-1 md:row-span-1';
  }
};

const IframePreview: React.FC<{ url: string }> = ({ url }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' } // Load when it's 400px away from viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ transform: 'translateZ(0)', contain: 'paint layout' }}
    >
      {isLoaded && (
        <iframe 
          src={url} 
          className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none border-none opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          style={{ willChange: 'transform, opacity' }}
        />
      )}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none"></div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative flex h-auto w-full flex-col group/design-root pt-20 pb-10">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
            
            <div className="mb-12" data-aos="fade-up">
              <h2 className="font-display italic text-3xl font-medium tracking-tight border-b border-border-color pb-4 inline-block pr-12 text-text-main">Project Showcase</h2>
              <p className="font-mono text-sm text-muted mt-4 uppercase tracking-widest">Architectural Implementations</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(280px,auto)] gap-6 grid-flow-dense">
              {PROJECTS.map((project, idx) => {
                const bentoClass = getBentoClasses(project.bentoSize);
                const isLarge = project.bentoSize === 'large';
                const isTall = project.bentoSize === 'tall';
                
                return (
                  <article 
                    key={idx}
                    className={`bg-surface border border-border-color flex flex-col group hover:bg-background-light transition-all duration-300 shadow-hard hover:shadow-hard-hover hover:-translate-y-1 hover:-translate-x-1 ${bentoClass}`}
                    data-aos="fade-up"
                    data-aos-delay={(idx % 4) * 100}
                  >
                    <div className={`${isLarge || isTall ? 'h-48 md:h-64' : 'h-40'} bg-surface border-b border-border-color relative flex items-center justify-center overflow-hidden shrink-0`} style={{ backgroundImage: 'linear-gradient(to right, #F0F0F0 1px, transparent 1px), linear-gradient(to bottom, #F0F0F0 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
                      {project.link ? (
                        <IframePreview url={project.link} />
                      ) : (
                        <>
                          <Terminal className="text-text-main relative z-10 w-12 h-12 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-50 pointer-events-none"></div>
                        </>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-sans font-semibold group-hover:text-primary transition-colors text-text-main`}>
                          {project.title}
                        </h3>
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors p-1">
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                      
                      <p className={`text-text-main leading-relaxed mb-6 flex-grow ${isLarge ? 'text-lg' : 'text-base'}`}>
                        {project.description}
                      </p>
                      
                      <div className="mt-auto">
                        <div className="mb-6 flex flex-wrap gap-2">
                          {project.tech.map((tech, tIdx) => (
                            <span key={tIdx} className={`font-mono text-xs px-2 py-1 ${tIdx === 0 ? 'bg-text-main text-surface' : 'border border-border-color bg-surface text-text-main'}`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        {project.link ? (
                          <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center font-mono text-sm text-primary font-medium hover:underline underline-offset-4 decoration-primary decoration-2 group/link cursor-pointer">
                            View Deployment 
                            <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        ) : (
                          <span className="inline-flex items-center font-mono text-sm text-muted font-medium">
                            Internal Project
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;