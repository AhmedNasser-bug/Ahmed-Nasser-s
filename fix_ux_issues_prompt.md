Please implement the following micro-UX and accessibility improvements to the codebase:

**1. Fix "Get Quote" Call-to-Action Buttons (index.html)**
*   **Issue:** The "Get Quote" buttons in the Services section currently do nothing when clicked and lack context for screen readers.
*   **Location:** `index.html` (around lines 496, 508, and 520, inside the `<div class="service-card">` elements).
*   **Action:** Update the HTML to add an `onclick` handler to smoothly scroll to the contact section, and an `aria-label` providing context.
*   **Code Example:**
    Change `<button class="service-cta">Get Quote</button>` to:
    `<button class="service-cta" onclick="window.location.href='#contact'" aria-label="Get Quote for [Service Name]">Get Quote</button>` (Replace `[Service Name]` with the actual service title, e.g., "Full-Stack .NET").

**2. Polish "Know more about me" Link (index.html)**
*   **Issue:** The call-to-action link uses plain text arrows (`-->`) which is unpolished.
*   **Location:** `index.html` (around line 708, inside the `.cta-content` div).
*   **Action:** Capitalize the text and replace the text arrow with a FontAwesome icon that matches the site's styling.
*   **Code Example:**
    Change `<a href="about.html" class="cta-button mx-1 my-3 intense-button">know more about me --></a>` to:
    `<a href="about.html" class="cta-button mx-1 my-3 intense-button">Know more about me <i class="fas fa-arrow-right ms-2" aria-hidden="true"></i></a>`

**3. Add Missing ARIA Labels to Navigation Buttons (index.html & about.html)**
*   **Issue:** Icon-only buttons or links must have descriptive labels for screen readers.
*   **Location:** Check the `.fixed-top` navigation area in both HTML files.
*   **Action:** Ensure that any `<button>` or `<a>` tag that relies solely on a FontAwesome icon (e.g., `<span class="fa fa-phone"></span>`) has an appropriate `aria-label` attribute (e.g., `aria-label="Contact"`). *Note: Some of these may already be present, please verify.*

**4. External Links Security (index.html)**
*   **Issue:** Links opening in a new tab (`target="_blank"`) should include `rel="noopener noreferrer"` to prevent Reverse Tabnabbing.
*   **Location:** Look for `<a ... target="_blank">` tags throughout `index.html` (especially in the Projects section).
*   **Action:** Ensure `rel="noopener noreferrer"` is present on all external links.

Please implement these changes and verify them visually or via standard HTML parsing tests.