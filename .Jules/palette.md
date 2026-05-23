## 2026-04-21 - [Added Three.js animations to hero page]\n**Learning:** Learned how to seamlessly incorporate three.js canvas inside an HTML component that behaves exactly as the background to provide a playful interactive experience.\n**Action:** Re-use three.js code snippet for adding 3d background designs on hero pages.

## 2026-04-25 - [IntersectionObserver for Canvas Animations]
**Learning:** Continuous `requestAnimationFrame` loops (like in Three.js) consume CPU/GPU resources even when the canvas is not visible in the viewport.
**Action:** Use `IntersectionObserver` to wrap `requestAnimationFrame` loops, only calling `animate()` when `entry.isIntersecting` is true and using `cancelAnimationFrame()` when it's out of view, thereby optimizing performance.
## 2024-05-01 - [Prefers Reduced Motion Check]
**Learning:** IntersectionObserver animations can trigger motion sickness. Always check for `prefers-reduced-motion: reduce` and bypass animations by immediately applying active classes if true.
**Action:** When adding scroll animations (like .hanwag-fade), wrap the observer initialization in a `window.matchMedia` check.
## 2024-04-27 - [Global Focus State Support]
**Learning:** The project was missing a unified visible focus state for keyboard navigation. We needed a generic fallback since this project uses vanilla CSS with Bootstrap but lacks an overriding focus visibility strategy.
**Action:** Added global `*:focus-visible` style in `style.css` using the existing `--primary` variable to ensure screen readers and keyboard users can track their position across all interactive elements.
## 2026-05-12 - [Contact Links and A11y]
**Learning:** Found several opportunities to improve accessibility (skip-to-content links, descriptive alt text, hiding decorative icons with `aria-hidden`) and micro-interactions (clickable phone/email links via `tel:` and `mailto:`) that significantly improve user experience for both standard and assistive tech users without requiring large structural changes.
**Action:** Always verify that icon-only buttons have both `aria-label` and `title` attributes, ensure external links have `target="_blank" rel="noopener noreferrer"`, and convert plain text contact details to actionable links.
## 2026-05-13 - [Skip-to-Content Targeting]
**Learning:** The skip-to-content links were navigating to the hero section which contains a complex 3D animation, forcing screen readers and keyboard users to navigate through the animation they are trying to skip.
**Action:** Ensure skip-to-content links target the actual main content area (e.g. `#skills` or `#main-content`) directly bypassing heavy visual sections.

## 2026-05-13 - [Decorative Elements and Screen Readers]
**Learning:** Decorative background grids and blurs created screen reader noise because they were empty `<div>`s lacking ARIA roles.
**Action:** Always add `aria-hidden="true"` to visual-only elements that don't contain content to improve screen reader flow.

## 2026-05-13 - [ARIA Label Overrides Inner Text]
**Learning:** When using both `aria-label` and inner text (e.g. `<span class="visually-hidden">`) on an anchor element, the screen reader prioritizes the `aria-label` and ignores the inner text.
**Action:** Append screen reader instructions like '(opens in a new tab)' directly to the `aria-label` string instead of injecting hidden span elements.

## 2026-05-14 - [Dual ARIA-label and Title Pattern]
**Learning:** For interactive elements (like icon-only buttons or ambiguous external links), screen reader users benefit from `aria-label`, but mouse users relying on visual cues miss this context if there's no visible text.
**Action:** Use a dual pattern by providing both `aria-label` (for screen readers) and a matching `title` attribute (for native browser tooltips on hover) to ensure an equitable UX for all interaction types.
## 2026-05-15 - [A11y/UX Improvements]
**Learning:** Found multiple opportunities to enhance keyboard accessibility and screen reader experience:
- Interactive JS elements missing semantic anchor equivalents (e.g. `onclick="window.location.href"` instead of `<a>`) affect native interactions.
- Tech stack elements rendered visually as lists need explicit `role="list"` and `role="listitem"` to be read semantically by screen readers.
- Animations using smooth scrolling (like Lenis) must verify `prefers-reduced-motion` to support vestibular disorders.
**Action:** Always favor semantic tags (like `<a>` for navigation). Add focus indicators (`focus-visible` states) to interactive components to support keyboard navigation. Respect system preferences for reduced motion on heavy scroll animations.
## 2026-05-13 - [Respecting prefers-reduced-motion for Video and Scroll]
**Learning:** Found that users who enabled `prefers-reduced-motion: reduce` in their OS were still forced to endure smooth-scrolling animations (via Lenis) and autoplaying background videos, triggering potential accessibility issues.
**Action:** Always wrap continuous scroll libraries and `<video autoplay>` initialization logic in a `window.matchMedia('(prefers-reduced-motion: reduce)')` check, gracefully degrading to default native scroll and paused/controlled video playback.
## 2026-05-18 - [Event Delegation for Smooth Scroll]
**Learning:** Attaching event listeners inside a loop (like `querySelectorAll('a[href^="#"]').forEach`) creates multiple closures and incurs O(N) memory and CPU overhead.
**Action:** Use event delegation by attaching a single listener to a common ancestor (e.g., `document.body`) and using `e.target.closest('a[href^="#"]')` to determine the target. This reduces attachment overhead to O(1).
## 2024-05-17 - [Security: Subresource Integrity (SRI) on CDNs]
**Learning:** Loading external libraries via CDNs without Subresource Integrity (SRI) exposes the site to supply chain attacks. If a CDN is compromised, a malicious script could be served instead of the expected library, leading to Cross-Site Scripting (XSS) and data exfiltration.
**Action:** When adding external scripts or stylesheets from CDNs (like Bootstrap, FontAwesome, Lenis), always generate and include cryptographic hashes using the `integrity` attribute along with `crossorigin="anonymous"`. Verify correct implementation by checking the browser console for SRI validation errors during local testing.
## 2026-05-18 - [Security: Pinned CDN and SRI]
**Learning:** Unpinned CDN links without Subresource Integrity (SRI) expose the site to arbitrary code execution if the CDN is compromised, and unexpected layout breaks due to silent updates.
**Action:** Always pin third-party library versions in CDN URLs and generate/apply SRI hashes (`integrity` attribute) along with `crossorigin="anonymous"` to ensure script integrity.

## 2024-05-24 - Dual-Pattern Accessibility & Visually-Hidden Spans
**Learning:** For icon-only or generic-text links ("Get Quote"), relying purely on `aria-label` is not enough for mouse users, and relying on visual text isn't always possible. Applying a "dual-pattern" (`aria-label` for screen readers and `title` for visual tooltips) creates an equitable UX. Additionally, when providing auxiliary screen reader context for card links, using a visually-hidden `<span>` inside the content is more robust than wrapping the entire card in an `aria-label` that completely overrides inner text content.
**Action:** Always implement the dual `aria-label` and `title` pattern on ambiguous interactive elements. When building complex interactive cards, favor placing visually hidden text inside the DOM over placing an overriding `aria-label` on the wrapper.
## 2026-05-22 - [Accessible Filter Grid Patterns] \n **Learning:** Using  dynamically on filter toggles paired with  on the target grid provides excellent context for screen readers when filtering content, while an empty state prevents confusion when queries yield no results.\n **Action:** Standardize applying  to dynamically updating containers (like search/filter result grids) and always wire  to active tabs/filters.
## 2026-05-22 - [Accessible Filter Grid Patterns]
**Learning:** Using `aria-pressed` dynamically on filter toggles paired with `aria-live="polite"` on the target grid provides excellent context for screen readers when filtering content, while an empty state prevents confusion when queries yield no results.
**Action:** Standardize applying `aria-live="polite"` to dynamically updating containers (like search/filter result grids) and always wire `aria-pressed` to active tabs/filters.
