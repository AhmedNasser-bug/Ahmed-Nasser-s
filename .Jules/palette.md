## 2026-04-21 - [Added Three.js animations to hero page]\n**Learning:** Learned how to seamlessly incorporate three.js canvas inside an HTML component that behaves exactly as the background to provide a playful interactive experience.\n**Action:** Re-use three.js code snippet for adding 3d background designs on hero pages.

## 2026-04-25 - [IntersectionObserver for Canvas Animations]
**Learning:** Continuous `requestAnimationFrame` loops (like in Three.js) consume CPU/GPU resources even when the canvas is not visible in the viewport.
**Action:** Use `IntersectionObserver` to wrap `requestAnimationFrame` loops, only calling `animate()` when `entry.isIntersecting` is true and using `cancelAnimationFrame()` when it's out of view, thereby optimizing performance.
