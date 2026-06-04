import React from 'react';
import { PROFILE, EDUCATION } from '../constants';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative flex h-auto w-full flex-col group/design-root pt-10 pb-20">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 gap-8">
            
            {/* Education Section */}
            <div className="w-full bg-surface border border-border-color shadow-hard p-8 transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-hover" data-aos="fade-up">
              <div className="flex items-center justify-between border-b border-border-color pb-4 mb-6">
                <h2 className="font-display font-semibold text-2xl uppercase tracking-tight text-text-main">Education</h2>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col">
                  <h3 className="font-display font-semibold text-xl text-text-main">{EDUCATION.degree}</h3>
                  <p className="font-display italic text-xl text-muted mt-1">{EDUCATION.institution}</p>
                </div>
                <div className="font-mono text-sm text-text-main bg-background-light px-3 py-1 border border-border-color">
                  {EDUCATION.year}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="w-full bg-surface border border-border-color shadow-hard p-8 transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-hover" data-aos="fade-up" data-aos-delay="100">
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                  <h2 className="font-mono text-sm uppercase text-muted">Get in touch</h2>
                  <a className="font-display font-semibold text-[32px] md:text-[48px] text-text-main border-b-2 border-primary w-fit pb-1 hover:text-primary transition-colors duration-200" href={`mailto:${PROFILE.contact.email}`}>
                    {PROFILE.contact.email}
                  </a>
                </div>
                <div className="flex flex-wrap gap-6 border-t border-border-color pt-6">
                  {PROFILE.contact.linkedin && (
                    <a className="font-mono text-sm uppercase text-text-main hover:text-primary transition-colors flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-offset-4" href={PROFILE.contact.linkedin} target="_blank" rel="noreferrer" title="LinkedIn (opens in a new tab)">
                      LinkedIn
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </a>
                  )}
                  {PROFILE.contact.github && (
                    <a className="font-mono text-sm uppercase text-text-main hover:text-primary transition-colors flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-offset-4" href={PROFILE.contact.github} target="_blank" rel="noreferrer" title="GitHub (opens in a new tab)">
                      GitHub
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </a>
                  )}
                  <div className="font-mono text-sm uppercase text-text-main flex items-center gap-2">
                    {PROFILE.contact.location}
                  </div>
                  <div className="font-mono text-sm uppercase text-text-main flex items-center gap-2">
                    {PROFILE.contact.phone}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;