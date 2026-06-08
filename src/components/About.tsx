import React from 'react';
import { BIO, EXPERIENCE } from '../constants';
import { GitCommit, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <section id="about" className="relative flex h-auto w-full flex-col group/design-root overflow-x-hidden pt-24 pb-12">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between" data-aos="fade-up">
              <div>
                <h2 className="font-display italic text-3xl font-medium tracking-tight border-b border-border-color pb-4 inline-block pr-12 text-text-main">Professional Journey</h2>
                <p className="font-display italic text-[20px] text-muted mt-6 max-w-[600px]">{BIO.content}</p>
              </div>
              <Link to="/about" className="inline-flex items-center font-mono text-sm text-primary font-medium hover:underline underline-offset-4 decoration-primary decoration-2 mt-4 md:mt-0 group/link whitespace-nowrap">
                Read Full Details
                <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] gap-x-2 md:gap-x-6 px-4">
              {EXPERIENCE.slice(0, 3).map((exp, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center pt-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                    <div className={`w-[12px] h-[12px] border border-border-color z-10 relative ${idx === 0 ? 'bg-primary' : 'bg-surface'}`}></div>
                    <div className={`w-[1px] h-full grow mt-2 ${idx === 2 ? 'bg-transparent' : 'bg-border-color'}`}></div>
                  </div>
                  <div className="flex flex-1 flex-col py-4 mb-8" data-aos="fade-left" data-aos-delay={idx * 100}>
                    <div className="bg-surface border border-border-color shadow-hard p-6 transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-hard-hover">
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                        <h3 className="text-text-main text-2xl font-semibold font-sans">{exp.role} <span className="text-muted font-normal">@ {exp.organization}</span></h3>
                        <span className="font-mono text-[13px] text-muted mt-1 md:mt-0 uppercase">{exp.period}</span>
                      </div>
                      <ul className="list-none space-y-3 mb-6">
                        {exp.achievements.slice(0, 2).map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start">
                            <GitCommit className="text-text-main w-4 h-4 mr-2 mt-1 shrink-0" />
                            <span className="text-[16px] leading-relaxed font-sans">{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;