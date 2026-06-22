import React from 'react';
import { Github, Linkedin, Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PROFILE } from '../constants';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-color bg-surface px-6 py-4 shadow-hard sticky top-4 z-50 mx-4 md:mx-10 lg:mx-20 max-w-[1200px] xl:mx-auto">
      <div className="flex items-center gap-4 text-text-main">
        <Link to="/" className="flex items-center gap-4 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
          <div className="size-5 text-primary">
            <Terminal size={20} />
          </div>
          <h2 className="text-text-main font-display text-xl font-bold leading-tight hidden sm:block">{PROFILE.name}</h2>
          <h2 className="text-text-main font-display text-xl font-bold leading-tight sm:hidden">Ahmed</h2>
        </Link>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-6 font-mono text-sm uppercase tracking-wider">
          <Link to="/" className={`transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${location.pathname === '/' ? 'text-primary font-bold' : 'text-text-main hover:text-primary'}`}>
            Home
          </Link>
          <Link to="/projects" className={`transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${location.pathname === '/projects' ? 'text-primary font-bold' : 'text-text-main hover:text-primary'}`}>
            Projects
          </Link>
          <Link to="/lifecycle" className={`transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${location.pathname === '/lifecycle' ? 'text-primary font-bold' : 'text-text-main hover:text-primary'}`}>
            Lifecycle
          </Link>
          <Link to="/about" className={`transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${location.pathname === '/about' ? 'text-primary font-bold' : 'text-text-main hover:text-primary'}`}>
            About
          </Link>
          <div className="w-[1px] h-4 bg-border-color/30 hidden md:block"></div>
          
          {PROFILE.contact.github && (
            <a className="flex items-center gap-2 text-text-main hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 hidden md:inline-block" href={PROFILE.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={16} />
            </a>
          )}
          {PROFILE.contact.linkedin && (
            <a className="flex items-center gap-2 text-text-main hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 hidden md:inline-block" href={PROFILE.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
          )}
          
          <a className="text-surface bg-text-main hover:bg-primary px-4 py-2 hover:shadow-hard-hover transition-all -my-2 border border-border-color focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 hidden md:inline-block" href={location.pathname === '/' ? '#contact' : '/#contact'}>
            Contact
          </a>
          
          <div className="md:hidden flex items-center gap-4">
             <Link to="/projects" className={`transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${location.pathname === '/projects' ? 'text-primary font-bold' : 'text-text-main'}`}>
                Projects
             </Link>
             <Link to="/lifecycle" className={`transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${location.pathname === '/lifecycle' ? 'text-primary font-bold' : 'text-text-main'}`}>
                Lifecycle
             </Link>
             <Link to="/about" className={`transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${location.pathname === '/about' ? 'text-primary font-bold' : 'text-text-main'}`}>
                About
             </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
