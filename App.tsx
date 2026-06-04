import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProcessTimeline from './components/ProcessTimeline';
import AboutPreview from './components/About';
import AboutPage from './components/AboutPage';
import Projects from './components/Projects';
import ProjectsPage from './components/ProjectsPage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ui/ScrollToTop';

const Home = () => (
  <div className="animate-page-in" id="main-content" tabIndex={-1}>
    <Hero />
    <Skills />
    <ProcessTimeline />
    <AboutPreview />
    <Projects />
    <Contact />
  </div>
);

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis for premium smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    (window as any).lenis = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

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
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [location.pathname]); // Re-initialize or handle scroll on route change

  return (
    <main className="min-h-screen overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-text-main text-surface px-4 py-2 font-mono text-sm border-2 border-primary outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
      >
        Skip to main content
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default App;