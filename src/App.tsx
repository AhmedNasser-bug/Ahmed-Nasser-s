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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | null = null;
    let rafId: number;

    // Initialize Lenis for premium smooth scrolling only if user doesn't prefer reduced motion
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

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

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
      {/* 1. Neobrutalist Page Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* 2. Main application wrapper with smooth entrance transition */}
      <main 
        className={`min-h-screen overflow-x-clip transition-opacity duration-1000 ease-in-out ${
          isLoading ? 'opacity-0 max-h-screen overflow-hidden' : 'opacity-100'
        }`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-surface focus:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">Skip to content</a>
        <Header />
        <div id="main-content" tabIndex={-1} className="focus:outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/lifecycle" element={<LifecyclePage />} />
          </Routes>
        </div>
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
};

export default App;