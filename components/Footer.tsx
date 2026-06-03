import React from 'react';
import { PROFILE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-border-color bg-background-light">
        <div className="container mx-auto px-6 text-center">
            <p className="text-muted text-sm font-mono uppercase tracking-widest">
                © {new Date().getFullYear()} {PROFILE.name}. Engineered in Alexandria.
            </p>
        </div>
    </footer>
  );
};

export default Footer;
