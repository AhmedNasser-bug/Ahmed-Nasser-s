// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/gsap-react-best-practices/SKILL.md
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GSAPTiltProps {
  children: React.ReactNode;
  /**
   * Maximum rotation angle in degrees.
   * Keep ≤12 to avoid unnatural distortion on cards.
   */
  maxTilt?: number;
  /**
   * 3D perspective depth in pixels.
   * Higher = flatter 3D effect. 800–1200 is a sweet spot.
   */
  perspective?: number;
  /**
   * Extra className forwarded to the wrapper div.
   * The wrapper is display:contents-aware so it passes layout to its child.
   * 
   * ⚠️ The wrapper sets position:relative + transform-style:preserve-3d.
   * Do NOT nest another tilt inside this — it will conflict.
   */
  className?: string;
}

const GSAPTilt: React.FC<GSAPTiltProps> = ({
  children,
  maxTilt = 8,
  perspective = 1000,
  className = '',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Normalize 0→1 across the card surface
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotX = (py - 0.5) * -maxTilt;
      const rotY = (px - 0.5) * maxTilt;

      gsap.to(el, {
        rotationX: rotX,
        rotationY: rotY,
        scale: 1.025,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { rotationX: 0, rotationY: 0, scale: 1, clearProps: 'transform' });
    };
  }, [maxTilt, perspective]);

  return (
    /**
     * Layout contract:
     * - h-full ensures the tilt wrapper fills its grid/flex cell.
     * - perspective is applied via CSS so the parent context sets the 3D stage.
     * - transformStyle preserve-3d is needed for children to exist in 3D space.
     * - DO NOT use Tailwind `hover:` transforms on the direct child — they will 
     *   conflict with the GSAP rotationX/Y transform matrix.
     */
    <div
      ref={wrapperRef}
      className={`h-full ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default GSAPTilt;
