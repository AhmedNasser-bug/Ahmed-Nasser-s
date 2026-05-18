🔒 Secure Lenis CDN import with Subresource Integrity (SRI)

🎯 **What:**
Added Subresource Integrity (SRI) attributes (`integrity` and `crossorigin="anonymous"`) to the `@studio-freight/lenis` CDN script tag in `index.html`.

⚠️ **Risk:**
Loading unpinned external scripts from a CDN without SRI exposes the application to supply chain attacks. If the CDN or the package on the CDN is compromised, malicious code could be injected into the website, potentially leading to Cross-Site Scripting (XSS), data theft, or complete compromise of the client-side session.

🛡️ **Solution:**
Generated a SHA-384 hash of the specific version of `lenis.min.js` (`1.0.42`) and added the `integrity` attribute. This guarantees that the browser will only execute the script if its contents perfectly match the expected hash. The `crossorigin="anonymous"` attribute is required for CORS to allow the browser to verify the hash.

This change prevents unauthorized modification of the script from impacting users.
