## 2026-05-01 - [FontAwesome and Tailwind CDN blocking]
**Learning:** Loading FontAwesome script and Tailwind CDN significantly delays script evaluation and blocks main thread rendering, preventing a high Lighthouse score.
**Action:** Replace FontAwesome icons with inline SVGs and precompile Tailwind CSS to a static file to avoid runtime script evaluation blocking the main thread.

## 2026-05-01 - [Bootstrap unused CSS]
**Learning:** Bootstrap CSS was 95% unused and caused render blocking.
**Action:** Translate used Bootstrap classes to Tailwind, generate a compiled static Tailwind CSS file, and remove Bootstrap entirely.
