// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/gsap-react-best-practices/SKILL.md
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = 'up' | 'down' | 'left' | 'right';

interface GSAPRevealProps {
  children: React.ReactNode;
  /**
   * Direction the clip-mask enters from.
   * 'up'   → content reveals from bottom to top  (default)
   * 'right'→ content reveals from left to right
   */
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  /**
   * Extra class forwarded to the wrapper div.
   * The wrapper is position:relative with overflow:hidden.
   * Do NOT set fixed width/height here — it inherits from the parent grid/flex cell.
   */
  className?: string;
}

/** Initial (hidden) clip-path strings by entry direction. */
const CLIP_HIDDEN: Record<RevealDirection, string> = {
  up:    'inset(100% 0% 0% 0%)',
  down:  'inset(0% 0% 100% 0%)',
  left:  'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};

const CLIP_VISIBLE = 'inset(0% 0% 0% 0%)';

const GSAPReveal: React.FC<GSAPRevealProps> = ({
  children,
  direction = 'up',
  duration = 0.9,
  delay = 0,
  className = '',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Start hidden immediately via JS so there's no flash-of-content before anim
    gsap.set(el, { clipPath: CLIP_HIDDEN[direction] });

    const tween = gsap.to(el, {
      clipPath: CLIP_VISIBLE,
      duration,
      delay,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      tween.scrollTrigger?.kill();
      // Ensure element is visible even if unmounted before anim completes
      gsap.set(el, { clipPath: CLIP_VISIBLE, clearProps: 'clipPath' });
    };
  }, [direction, duration, delay]);

  return (
    /**
     * ⚠️ Layout note:
     * This wrapper must NOT add width/height constraints on its own.
     * It relies on the parent flex/grid cell for sizing.
     * `h-full` ensures it fills the grid cell so the child card doesn't collapse.
     */
    <div
      ref={wrapperRef}
      className={`h-full ${className}`}
      // SSR-safe: set the initial hidden state inline so no flash occurs
      // (GSAP's gsap.set() call in useEffect overrides this before paint)
      style={{ clipPath: CLIP_HIDDEN[direction] }}
    >
      {children}
    </div>
  );
};

export default GSAPReveal;
