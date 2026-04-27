## 2026-04-21 - [Added Three.js animations to hero page]\n**Learning:** Learned how to seamlessly incorporate three.js canvas inside an HTML component that behaves exactly as the background to provide a playful interactive experience.\n**Action:** Re-use three.js code snippet for adding 3d background designs on hero pages.

## 2026-04-25 - [IntersectionObserver for Canvas Animations]
**Learning:** Continuous `requestAnimationFrame` loops (like in Three.js) consume CPU/GPU resources even when the canvas is not visible in the viewport.
**Action:** Use `IntersectionObserver` to wrap `requestAnimationFrame` loops, only calling `animate()` when `entry.isIntersecting` is true and using `cancelAnimationFrame()` when it's out of view, thereby optimizing performance.

## 2026-04-27 - [Skip-to-Content & Focus Visibility]
**Learning:** Found that a large single page with lots of navigation/menu items needs a skip-to-content link, and interactive elements didn't always have a clear focus indicator, violating keyboard accessibility guidelines.
**Action:** Always add `.skip-link` immediately after `<body>` and set up global `*:focus-visible` styling when establishing the base layout for multi-section landing pages.
