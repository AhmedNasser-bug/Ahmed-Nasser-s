1. **Header Navigation & Skip-to-Content Link**:
   - Add a visually hidden skip-to-content link in `Header.tsx` as the first element (`<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute ...">Skip to content</a>`).
   - Wrap the main navigation links in a `<nav aria-label="Main Navigation">` instead of just a `div`.

2. **Main Content Target & Structure**:
   - In `App.tsx`, add `id="main-content"` and `tabIndex={-1}` to the `<main>` element so the skip-link works.
   - In `Hero.tsx`, change the nested `<main>` element (which shouldn't be inside `<section>` nor inside another `<main>`) to a `<div className="grid...">`.

3. **ProjectsPage Toggle Buttons**:
   - In `ProjectsPage.tsx`, the 'Screenshot' and 'Live App' toggle buttons lack state communication. Add `aria-pressed={mediaMode === 'image'}` and `aria-pressed={mediaMode === 'iframe'}` respectively.

4. **Misleading Interactive Elements (cursor-pointer)**:
   - In `ProjectsPage.tsx` (line 343), remove `cursor-pointer` from the outer GitHub card `div` because it's not a button or link itself (the actual interactive element is the nested `a` tag).
   - In `Projects.tsx` (line 82), remove `cursor-pointer` from the `article` tag since the card itself is not interactive, only its inner links.

5. **Icon-only / External Link Accessibility**:
   - In `Projects.tsx` (line 129) and `ProjectsPage.tsx` (line 240, 411), add `title` with matching text if the link opens in a new tab (for external links) and ensure `aria-label` includes "(opens in a new tab)" if they don't already have it. Wait, line 240 has text "Open Live App". Line 411 has "View on GitHub". If they have `target="_blank"`, they need `aria-label="... (opens in a new tab)"`.

6. **Pre-commit Steps**:
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
