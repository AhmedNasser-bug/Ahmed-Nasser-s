## 2026-04-21 - [Added Three.js animations to hero page]\n**Learning:** Learned how to seamlessly incorporate three.js canvas inside an HTML component that behaves exactly as the background to provide a playful interactive experience.\n**Action:** Re-use three.js code snippet for adding 3d background designs on hero pages.

## 2026-04-25 - [IntersectionObserver for Canvas Animations]
**Learning:** Continuous `requestAnimationFrame` loops (like in Three.js) consume CPU/GPU resources even when the canvas is not visible in the viewport.
**Action:** Use `IntersectionObserver` to wrap `requestAnimationFrame` loops, only calling `animate()` when `entry.isIntersecting` is true and using `cancelAnimationFrame()` when it's out of view, thereby optimizing performance.

## 2026-04-27 - [Swapped about page hero column order on desktop]
**Learning:** This app uses Bootstrap 5 grid layout (e.g., `col-lg-5`, `col-lg-7`) for its structure. We can safely alter the visual order of elements on different screen sizes using responsive ordering classes (like `order-lg-2`, `order-lg-1`) without modifying the DOM order, maintaining intended structure for mobile devices and screen readers.
**Action:** When reordering components based on screen sizes in this project, use Bootstrap's responsive `order-*` classes instead of changing HTML element order or writing custom CSS media queries.
