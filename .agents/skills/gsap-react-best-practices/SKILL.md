---
name: gsap-react-best-practices
description: Best practices for integrating GSAP (GreenSock) animations inside React 19 / Vite applications, emphasizing clean composition, virtual DOM hygiene, event listener cleanup, and avoiding layout corruption.
---

# GSAP React Best Practices

Integrating GreenSock (GSAP) animations cleanly in React without causing virtual DOM corruption, layout shifts, or memory leaks.

## Core Directives

### 1. Maintain Virtual DOM Hygiene (CRITICAL)
- **NEVER** use `innerHTML` or direct DOM manipulation to modify elements managed by React (such as splitting text into chars/words). Overwriting React's children causes reconciliation crashes, spacing errors (e.g., words collapsing together as `HowIEngineer` with no spaces), and accessibility/SEO issues.
- **DO** use React-safe text splitting: split strings at the JSX/render level, map over them to output React spans, and animate those spans using GSAP selector queries or refs.

### 2. Avoid Ref Collisions & Fragile Clones
- **NEVER** use `React.cloneElement` to attach a single ref to a child when multiple wrappers might be nested. This causes ref collisions, overrides classNames/styles, and changes layout properties (like changing `display: flex` elements to `inline-block`).
- **DO** use simple, predictable wrapper elements (like `<span>` for inline text, `<div>` for block structures) and attach the ref to the wrapper. Pass layout-prescriptive classNames (such as `inline-block`, `w-full`, `h-full`) to the wrappers so they don't break flex/grid parent positioning.

### 3. Ensure Strict Cleanups
- **ALWAYS** clean up all tweens, timelines, and ScrollTrigger instances on unmount. Unreleased ScrollTriggers or hovering event listeners will leak memory, block garbage collection, and trigger multiple animation handlers on page transitions.
- **DO** return a cleanup function in `useEffect` or utilize `@gsap/react` hooks (if installed) that automatically kill tweens and ScrollTrigger instances.

---

## Code Examples

### 1. Staggered Text Reveal (SplitText)

#### ❌ Incorrect (DOM Mutating)
```tsx
// Wipes out React DOM elements, merges text into "HowIEngineer" (no spaces)
useEffect(() => {
  const el = ref.current;
  const tokens = el.textContent.split(' ');
  el.innerHTML = ''; // Wipes out React virtual DOM!
  tokens.forEach(t => {
    el.innerHTML += `<span>${t}</span>`;
  });
  gsap.fromTo('.token', { y: 20 }, { y: 0 });
}, []);
```

#### ✅ Correct (React Composition)
```tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const GSAPSplitText: React.FC<{ children: string; delay?: number }> = ({ children, delay = 0 }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.gsap-word');
    const anim = gsap.fromTo(words, 
      { yPercent: 100, opacity: 0 },
      { 
        yPercent: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.05, 
        delay, 
        ease: 'power3.out' 
      }
    );

    return () => {
      anim.kill();
    };
  }, [children, delay]);

  // Split string at render level, retaining spaces in HTML safely
  const words = children.split(' ');

  return (
    <span ref={containerRef} className="inline-block overflow-hidden vertical-align-top">
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <span className="gsap-word inline-block origin-bottom">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};
```

### 2. Physics Mouse Proximity Pull (Magnetic wrapper)

#### ❌ Incorrect (Mutating Child Props)
```tsx
// Modifies child className and overrides layout settings to inline-block
return React.cloneElement(children, {
  ref: containerRef,
  className: `${children.props.className} inline-block`
});
```

#### ✅ Correct (Safe Wrapper Div)
```tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const GSAPMagnetic: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({
  children,
  strength = 0.35,
  className = '',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;
      const distanceX = e.clientX - elX;
      const distanceY = e.clientY - elY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < 120) {
        xTo(distanceX * strength);
        yTo(distanceY * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={wrapperRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};
```
