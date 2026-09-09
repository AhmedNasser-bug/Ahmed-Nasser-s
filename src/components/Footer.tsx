import React from 'react';
import { useLocation } from 'react-router-dom';
import { PROFILE } from '../constants';
import { Mail, Phone, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  const location = useLocation();

  // Dynamic headings depending on page path
  let ctaTitle = "I see you're convinced";
  let ctaSubtitle = "Shall we begin?";

  if (location.pathname === '/about') {
    ctaTitle = "Now you know my story";
    ctaSubtitle = "Let's build something together.";
  } else if (location.pathname === '/projects') {
    ctaTitle = "Interested in these systems?";
    ctaSubtitle = "Let's collaborate.";
  } else if (location.pathname === '/lifecycle') {
    ctaTitle = "Let's align your next project";
    ctaSubtitle = "Get in touch.";
  }

  return (
    <footer id="contact" className="w-full mt-16 flex flex-col items-center">
      {/* Dynamic neobrutalist CTA Section */}
      <section className="w-full py-20 border-t border-border-color bg-background-light relative overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-[800px] px-4 relative z-10 text-center">
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl tracking-tight mb-2 text-text-main">
            {ctaTitle}
          </h2>
          <p className="font-display italic text-2xl text-muted mb-8">
            {ctaSubtitle}
          </p>
          
          {/* Quick link buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {PROFILE.contact.linkedin && (
              <a 
                href={PROFILE.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-text-main text-surface hover:bg-primary transition-colors border-2 border-text-main hover:border-primary px-8 py-3 font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-hard hover:-translate-y-0.5 hover:-translate-x-0.5"
              >
                LinkedIn 
                <svg aria-hidden="true" className="w-4 h-4 ml-1 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            )}
            <a 
              href={`https://wa.me/${PROFILE.contact.phone.replace(/[^0-9]/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-surface text-text-main hover:bg-green-500 hover:text-surface transition-colors border-2 border-border-color hover:border-green-500 px-8 py-3 font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-hard hover:-translate-y-0.5 hover:-translate-x-0.5" aria-label="WhatsApp (opens in a new tab)" title="WhatsApp"
            >
              WhatsApp
              <Phone aria-hidden="true" className="w-4 h-4 ml-1" />
            </a>
            <a 
              href="https://www.upwork.com/freelancers/~01f54fd7d135eb3939" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-surface text-text-main hover:bg-[#14a800] hover:text-surface transition-colors border-2 border-border-color hover:border-[#14a800] px-8 py-3 font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-hard hover:-translate-y-0.5 hover:-translate-x-0.5" aria-label="Upwork (opens in a new tab)" title="Upwork"
            >
              Upwork
              <Code2 aria-hidden="true" className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Direct contact cards */}
          <div className="bg-surface border border-border-color shadow-hard p-6 max-w-[500px] mx-auto text-left flex flex-col gap-4 relative">
            <div className="absolute top-0 right-0 p-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted border-b border-border-color pb-2">Direct Channel</h3>
            
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-surface transition-colors">
                <Mail aria-hidden="true" className="w-5 h-5 text-primary group-hover:text-surface" />
              </div>
              <div>
                <div className="text-xs text-muted font-mono uppercase tracking-wider">Email</div>
                <a href={`mailto:${PROFILE.contact.email}`} className="text-lg font-bold hover:text-primary transition-colors text-text-main">{PROFILE.contact.email}</a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-primary/10 border border-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-surface transition-colors">
                <Phone aria-hidden="true" className="w-5 h-5 text-primary group-hover:text-surface" />
              </div>
              <div>
                <div className="text-xs text-muted font-mono uppercase tracking-wider">Phone</div>
                <a href={`tel:${PROFILE.contact.phone}`} className="text-lg font-bold hover:text-primary transition-colors text-text-main">{PROFILE.contact.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Copyright Footer */}
      <div className="w-full py-8 border-t border-border-color bg-background-light text-center">
        <p className="text-muted text-sm font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} {PROFILE.name}. Engineered in Alexandria.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
