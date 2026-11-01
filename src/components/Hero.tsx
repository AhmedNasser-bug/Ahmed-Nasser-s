import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PROFILE } from '../constants';
import { GSAPSplitText, GSAPReveal } from './gsap';

// ES Module asset imports
import finalsQbImage from '../assets/finals-qb.png';
import livestarImage from '../assets/livestar.png';
import dvldImage from '../assets/dvld_preview.png';

interface CarouselItem {
  image: string;
  title: string;
  metric: string;
  description: string;
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    image: finalsQbImage,
    title: 'Finals-Qb Quiz Platform',
    metric: 'WAF Infinite Scaling',
    description: 'Mastery Quiz Engine engineered with strategy patterns, Zod validation boundaries, and metacognitive diagnostics aligning with WAF pillars.'
  },
  {
    image: livestarImage,
    title: 'Live Star Conversion Funnel',
    metric: 'Double Lead Vol. | Halved CPL',
    description: 'High-conversion, mobile-first agency landing page leveraging advanced web telemetry and responsive interface optimization.'
  },
  {
    image: dvldImage,
    title: 'DVLD Enterprise Dashboard',
    metric: '10+ Complex Workflows',
    description: 'Custom full-stack licensing platform built from scratch in C# .NET + SQL Server to enforce strict regulatory data integrity.'
  }
];

const ProjectCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  };

  return (
    <div
      className="relative border border-border-color bg-surface shadow-hard hover:shadow-hard-hover transition-all duration-300 w-full overflow-hidden flex flex-col pointer-events-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative w-full aspect-[16/10] bg-background-light overflow-hidden border-b border-border-color">
        {CAROUSEL_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out flex items-center justify-center ${
              idx === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
            }`}
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
            <div className="absolute top-3 left-3 bg-text-main text-surface px-2 py-1 font-mono text-[10px] uppercase border border-border-color tracking-wider z-20 shadow-hard">
              {item.metric}
            </div>
          </div>
        ))}
        
        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-surface hover:bg-text-main hover:text-surface border border-border-color p-2 transition-all z-20 cursor-pointer shadow-hard focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label="Previous Project"
          title="Previous Project"
        >
          <ChevronLeft aria-hidden="true" size={16} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-surface hover:bg-text-main hover:text-surface border border-border-color p-2 transition-all z-20 cursor-pointer shadow-hard focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          aria-label="Next Project"
          title="Next Project"
        >
          <ChevronRight aria-hidden="true" size={16} />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-2 min-h-[125px]">
        <h4 className="font-sans font-bold text-lg text-text-main tracking-tight">{CAROUSEL_ITEMS[current].title}</h4>
        <p className="font-display italic text-base text-text-main/80 leading-relaxed">{CAROUSEL_ITEMS[current].description}</p>
        
        {/* Indicators */}
        <div className="flex gap-2 mt-2 justify-end" role="tablist" aria-label="Carousel Slides">
          {CAROUSEL_ITEMS.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === current}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 border border-border-color transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                idx === current ? 'bg-primary' : 'bg-surface'
              }`}
              aria-label={`Slide ${idx + 1}`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative flex h-auto w-full flex-col group/design-root pt-10 pb-10">
      <div className="layout-container flex h-full grow flex-col relative z-10 pointer-events-none">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5 pointer-events-auto">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
            
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start py-10">
              <div className="flex flex-col gap-8" data-aos="fade-right">
                <div className="space-y-4">
                  <h3 className="font-mono text-sm uppercase tracking-widest text-primary font-bold">
                    <GSAPSplitText type="words" animation="slide-up">
                      System Architect
                    </GSAPSplitText>
                  </h3>
                  <h1 className="font-sans font-semibold text-5xl md:text-6xl tracking-[-0.02em] leading-[1.1] text-text-main">
                    <GSAPSplitText type="chars" animation="slide-up" delay={0.15}>
                      Full-Stack &
                    </GSAPSplitText>
                    <br/>
                    <GSAPSplitText type="chars" animation="slide-up" delay={0.35}>
                      AI Engineer.
                    </GSAPSplitText>
                  </h1>
                </div>
                <p className="font-display text-xl text-text-main font-semibold leading-relaxed max-w-md">
                  {PROFILE.tagline}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="#projects" className="flex items-center justify-center bg-text-main text-surface px-6 py-3 border border-border-color font-mono text-sm uppercase tracking-wide hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-hard-hover transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                    View Work
                  </a>
                  <a href={`mailto:${PROFILE.contact.email}`} className="flex items-center justify-center bg-surface text-text-main px-6 py-3 border border-border-color font-mono text-sm uppercase tracking-wide shadow-hard hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-hard-hover hover:text-primary transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">
                    Contact Me
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-6" data-aos="fade-left" data-aos-delay="200">
                <div className="border-b-2 border-border-color pb-2">
                  <h2 className="font-display italic text-3xl md:text-4xl font-extrabold tracking-tight text-text-main leading-tight">
                    <GSAPSplitText type="words" animation="slide-up" delay={0.25}>
                      Build Anything Faster and Safer
                    </GSAPSplitText>
                  </h2>
                </div>
                
                {/* Reveal panel mask on the project carousel */}
                <GSAPReveal direction="right" duration={1.1} delay={0.1}>
                  <div>
                    <ProjectCarousel />
                  </div>
                </GSAPReveal>
              </div>
            </main>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;