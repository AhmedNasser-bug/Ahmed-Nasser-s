import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProcessHomeSection from './components/ProcessHomeSection';
import AboutPreview from './components/About';
import AboutPage from './components/AboutPage';
import LifecyclePage from './components/LifecyclePage';
import Projects from './components/Projects';
import ProjectsPage from './components/ProjectsPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import Preloader from './components/ui/Preloader';

const Home = () => (
  <div className="animate-page-in">
    <Hero />
    <Skills />
    <ProcessHomeSection />
    <AboutPreview />
    <Projects />
  </div>
);

const App: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll initialization and AOS bindings until loading completes
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = '';

    // Initialize Lenis for premium smooth scrolling
    let lenis: Lenis | null = null;
    let rafId: number;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      (window as any).lenis = lenis;

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }

    // Initialize AOS after component mount to ensure elements exist in DOM
    const AOS = (window as any).AOS;
    if (AOS) {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
        mirror: false,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
      
      // Force refresh to catch any late-rendering elements
      setTimeout(() => {
        AOS.refresh();
      }, 500);
    }

    // Scroll to top on route change smoothly
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [location.pathname, isLoading]); // Re-run when pathname changes or loading completes

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute z-[100] bg-text-main text-surface px-4 py-2" tabIndex={0}>
        Skip to content
      </a>

      {/* 1. Neobrutalist Page Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* 2. Main application wrapper with smooth entrance transition */}
      <div
        className={`min-h-screen flex flex-col overflow-x-clip transition-opacity duration-1000 ease-in-out ${
          isLoading ? 'opacity-0 max-h-screen overflow-hidden' : 'opacity-100'
        }`}
      >
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/lifecycle" element={<LifecyclePage />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default App;