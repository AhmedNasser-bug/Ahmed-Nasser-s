## 2024-05-24 - Interactive Element Focus Styles
**Learning:** Found that custom focus styles were missing for keyboard navigation on interactive elements like links and buttons. Adding a custom focus-visible style with a distinct outline makes it much clearer to keyboard users where they are on the page. Also learned that for complex interactive elements like project cards, managing focus at the card level (`:focus-within`) while hiding the internal anchor's default focus ring provides a cleaner experience without losing accessibility.
**Action:** Always ensure that custom focus states (`:focus-visible`) are provided when removing or modifying default browser outlines, especially for custom card layouts.

## 2024-05-24 - Decorative Icons Accessibility
**Learning:** FontAwesome icons used decoratively (like in skill cards or buttons with visible text) were missing `aria-hidden="true"`. Screen readers might try to announce these, creating noise.
**Action:** Always append `aria-hidden="true"` to decorative `<i>` or `<span>` icon elements.

## 2024-05-24 - ARIA Labels on Identical Action Buttons
**Learning:** Multiple "Get Quote" buttons existed for different services without unique context for screen reader users. Added `aria-label="Get a quote for this service"` to provide better context, though a more specific label (e.g., "Get a quote for Database Design") would be even better in a dynamic setup.
**Action:** Ensure action buttons that appear multiple times with the same text (like "Read more", "Get quote") have distinct aria-labels or context.

## 2024-05-24 - Decorative Geometric Shapes
**Learning:** Adding colorful geometric shapes using CSS and `clip-path` for modern design required careful consideration for screen readers. Using `aria-hidden="true"` on purely decorative `<div>` tags ensures that assistive technologies don't treat them as empty semantic containers.
**Action:** Always append `aria-hidden="true"` to purely decorative div elements used for visual flair (e.g., shapes, background grids).
