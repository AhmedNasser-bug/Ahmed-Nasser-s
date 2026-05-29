'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const possibleTexts = [
  "It's a beautiful day outside, isn't it?",
  "Don't you just adore the joy of creation?",
  "I won't stop until I reach my goals.",
  "Only those who attempt the absurd can achieve the impossible. – Albert Einstein",
  "Feel free to contact me anytime anyway you like!",
  "I do not know how, but i certainly will."
];

export default function Header() {
  const pathname = usePathname();
  const [navLabel, setNavLabel] = useState("Navigation");

  const handleToggleMenu = () => {
    const randomIndex = Math.floor(Math.random() * possibleTexts.length);
    setNavLabel(possibleTexts[randomIndex]);
  };

  return (
    <>
      {/* Floating Navigation Controls */}
      <div className="fixed-top p-sm-4 p-3 d-flex justify-content-between align-items-start" style={{ pointerEvents: 'none', zIndex: 1040 }}>
        <div className="d-flex flex-column gap-3" style={{ pointerEvents: 'auto' }}>
          <a className="btn btn-hero d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', padding: 0 }} aria-label="Contact Section" title="Contact Section" href="#contact"><span className="fa fa-phone" aria-hidden="true"></span></a>
          <a className="btn btn-hero d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', padding: 0 }} aria-label="GitHub Profile (opens in a new tab)" title="GitHub Profile" href="https://github.com/AhmedNasser-bug" target="_blank" rel="noopener noreferrer"><span className="fa-brands fa-github" aria-hidden="true"></span><i className="fas fa-external-link-alt position-absolute" style={{ fontSize: '0.5em', top: '4px', right: '4px' }} aria-hidden="true"></i></a>
        </div>
        
        <button className="btn btn-hero d-flex align-items-center gap-2 px-3 py-2" style={{ fontWeight: 600, pointerEvents: 'auto' }} type="button" aria-label="Toggle Navigation Menu" title="Toggle Navigation Menu" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" onClick={handleToggleMenu}>
          <span className="fa fa-bars" aria-hidden="true"></span> <span className="d-none d-sm-inline">MENU</span>
        </button>
      </div>

      {/* Offcanvas Navigation Menu */}
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-label="Main Navigation Menu">
        <div className="offcanvas-header border-bottom border-dark">
          <h2 className="offcanvas-title h5 m-0" aria-hidden="true">{navLabel}</h2>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close navigation menu" title="Close navigation menu"></button>
        </div>
        <div className="offcanvas-body">
          <nav aria-label="Main Navigation">
            <ul className="nav flex-column gap-3 mt-4">
              <li className="nav-item">
                <Link className={`nav-link fs-5 ${pathname === '/' ? 'active fw-bold' : ''}`} aria-current={pathname === '/' ? 'page' : undefined} href="/" data-bs-dismiss="offcanvas">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link fs-5 ${pathname === '/about' ? 'active fw-bold' : ''}`} aria-current={pathname === '/about' ? 'page' : undefined} href="/about" data-bs-dismiss="offcanvas">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
