[Output truncated for brevity]

## 2026-05-23 - [Clipboard API Feedback]
**Learning:** Using `navigator.clipboard.writeText` silently is a poor user experience, leaving the user unsure if the action succeeded.
**Action:** When implementing copy-to-clipboard functionality, temporarily provide semantic and visual feedback (e.g., swapping to a checkmark icon and changing `aria-label`/`title` to "Copied!" for 2 seconds) to assure both sighted and screen reader users of success.

## 2026-05-23 - [Skip-to-Content Target Focusability]
**Learning:** Clicking a skip-to-content anchor visually scrolls to the target ID, but if the target (like a `<main>` or `<section>`) is not focusable by default, the next `Tab` press will start focusing elements from the top of the page again.
**Action:** Always add `tabindex="-1"` to the target element of a skip-to-content link so it can programmatically receive keyboard focus.
## 2026-05-26 - [Skip-to-Content Link Targeting and React Accessibility Fixes]
**Learning:** When adding skip-to-content links, ensuring the target element has an `id` and `tabIndex={-1}` is crucial for programmatic focus. React requires camelCase attributes like `crossOrigin` and `referrerPolicy`. Additionally, extracting aria-live announcements from `useEffect` directly into render scope prevents unnecessary cascading re-renders.
**Action:** Verify that skip-to-content links resolve to valid, focusable `id`s. Ensure standard HTML attributes are converted to their React equivalents. Compute purely derived state synchronously rather than using `useEffect`.

## 2026-08-22 - [Groundedness and JSX Validation]
**Learning:** The 'cat' command in the bash sandbox environment frequently truncates output on larger files (like React components), leading to unverified assumptions about JSX structures and failing plan reviews (Groundedness Rule).
**Action:** Use `grep -A 10 -B 10 'keyword'` or the `read_file` tool to reliably inspect and verify exact DOM elements before proposing targeted accessibility improvements.

## 2025-03-03 - [Carousel Accessibility Fallbacks]
**Learning:** For continuous or timed events like auto-rotating carousels, providing `onMouseEnter` and `onFocus` handlers to pause the auto-advancement gives users (especially screen reader and keyboard navigators) the required time to consume the changing content before it advances.
**Action:** Always pair `setInterval` hooks for carousels with a state variable (e.g., `isPaused`) tied to mouse hover and keyboard focus events on the container.
