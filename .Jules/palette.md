## 2026-04-21 - [Added Three.js animations to hero page]\n**Learning:** Learned how to seamlessly incorporate three.js canvas inside an HTML component that behaves exactly as the background to provide a playful interactive experience.\n**Action:** Re-use three.js code snippet for adding 3d background designs on hero pages.

## 2026-04-25 - [IntersectionObserver for Canvas Animations]
**Learning:** Continuous `requestAnimationFrame` loops (like in Three.js) consume CPU/GPU resources even when the canvas is not visible in the viewport.
**Action:** Use `IntersectionObserver` to wrap `requestAnimationFrame` loops, only calling `animate()` when `entry.isIntersecting` is true and using `cancelAnimationFrame()` when it's out of view, thereby optimizing performance.
## 2024-04-27 - [Global Focus State Support]
**Learning:** The project was missing a unified visible focus state for keyboard navigation. We needed a generic fallback since this project uses vanilla CSS with Bootstrap but lacks an overriding focus visibility strategy.
**Action:** Added global `*:focus-visible` style in `style.css` using the existing `--primary` variable to ensure screen readers and keyboard users can track their position across all interactive elements.
