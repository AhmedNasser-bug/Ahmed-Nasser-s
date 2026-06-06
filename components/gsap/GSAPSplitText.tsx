// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/gsap-react-best-practices/SKILL.md
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GSAPSplitTextProps {
  /** Must be a plain string — this component splits it at render time. */
  children: string;
  /** Split unit granularity. */
  type?: 'words' | 'chars';
  /** Entry animation style. */
  animation?: 'slide-up' | 'fade-in' | 'scale-reveal';
  /** Initial stagger delay in seconds. */
  delay?: number;
  /** Per-token tween duration in seconds. */
  duration?: number;
  /** Extra className forwarded to the outer wrapper. */
  className?: string;
  /**
   * When true the component renders as an inline <span>.
   * When false (default) it renders as a block <div> with display:block.
   * Use `inline` for headings/paragraphs where the text is inline with siblings.
   */
  inline?: boolean;
}

const GSAPSplitText: React.FC<GSAPSplitTextProps> = ({
  children,
  type = 'words',
  animation = 'slide-up',
  delay = 0,
  duration = 0.75,
  className = '',
  inline = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tokens = el.querySelectorAll<HTMLElement>('.gsap-token');
    if (!tokens.length) return;

    // Build fromVars based on animation type
    const fromVars: gsap.TweenVars =
      animation === 'slide-up'
        ? { yPercent: 110, opacity: 0 }
        : animation === 'fade-in'
        ? { opacity: 0 }
        : { scale: 0.5, opacity: 0, yPercent: 40 }; // scale-reveal

    const toVars: gsap.TweenVars = {
      yPercent: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      stagger: type === 'chars' ? 0.03 : 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    };

    const tween = gsap.fromTo(tokens, fromVars, toVars);

    return () => {
      tween.kill();
      tween.scrollTrigger?.kill();
    };
  }, [type, animation, delay, duration, children]);

  // Guard: only accept string children
  if (typeof children !== 'string') {
    console.warn('GSAPSplitText: children must be a plain string.');
    const Tag = inline ? 'span' : ('div' as any);
    return <Tag className={className}>{children}</Tag>;
  }

  const clean = children.trim().replace(/\s+/g, ' ');

  const renderWords = (text: string) =>
    text.split(' ').map((word, wi) => (
      // Each word gets an overflow:hidden clipping box so slide-up exits cleanly
      <span key={wi} className="inline-block overflow-hidden leading-[inherit] align-bottom mr-[0.3em] last:mr-0">
        <span className="gsap-token inline-block will-change-transform">{word}</span>
      </span>
    ));

  const renderChars = (text: string) =>
    text.split(' ').map((word, wi) => (
      <span key={wi} className="inline-block whitespace-nowrap mr-[0.3em] last:mr-0">
        {word.split('').map((char, ci) => (
          <span key={ci} className="inline-block overflow-hidden leading-[inherit] align-bottom">
            <span className="gsap-token inline-block will-change-transform">{char}</span>
          </span>
        ))}
      </span>
    ));

  const Tag = inline ? 'span' : ('div' as any);

  return (
    <Tag
      ref={containerRef}
      className={`inline-block ${className}`}
      aria-label={clean}
    >
      {type === 'chars' ? renderChars(clean) : renderWords(clean)}
    </Tag>
  );
};

export default GSAPSplitText;
