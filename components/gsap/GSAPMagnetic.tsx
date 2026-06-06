// Reference: file:///d:/Study/Programming/Projects/Portfolio%203/Ahmed-Nasser-s/.agents/skills/gsap-react-best-practices/SKILL.md
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GSAPMagneticProps {
  children: React.ReactNode;
  /**
   * Pull intensity — how much of the cursor-distance delta to apply.
   * 0.3 = 30% of the distance. Keep ≤0.5 for subtlety.
   */
  strength?: number;
  /**
   * Capture radius in pixels beyond the element's bounding box.
   * Larger values = wider activation zone.
   */
  radius?: number;
  className?: string;
  /**
   * Pass "inline" to render a <span> wrapper (for inline/text contexts).
   * Default renders a <div>.
   */
  as?: 'div' | 'span';
}

const GSAPMagnetic: React.FC<GSAPMagneticProps> = ({
  children,
  strength = 0.3,
  radius = 80,
  className = '',
  as: Tag = 'div',
}) => {
  const wrapperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius + Math.max(rect.width, rect.height) / 2) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      // Reset position immediately on cleanup
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, radius]);

  return (
    <Tag
      ref={wrapperRef as any}
      className={`inline-block ${className}`}
    >
      {children}
    </Tag>
  );
};

export default GSAPMagnetic;
