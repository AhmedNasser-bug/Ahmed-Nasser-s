const fs = require('fs');

let content = fs.readFileSync('shared.js', 'utf8');

// Remove duplicate prefersReducedMotion
content = content.replace(
`      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Initialize Lenis Smooth Scroll
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;`,
`      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Initialize Lenis Smooth Scroll`
);

// Replace querySelectorAll with event delegation
const oldCode = `          // Smooth scroll for anchor links
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                  e.preventDefault();
                  const target = document.querySelector(this.getAttribute('href'));
                  if(target) {
                      lenis.scrollTo(target);
                  }
              });
          });`;

const newCode = `          // Smooth scroll for anchor links
          document.body.addEventListener('click', function (e) {
              const anchor = e.target.closest('a[href^="#"]');
              if (anchor) {
                  e.preventDefault();
                  const target = document.querySelector(anchor.getAttribute('href'));
                  if (target) {
                      lenis.scrollTo(target);
                  }
              }
          });`;

content = content.replace(oldCode, newCode);

fs.writeFileSync('shared.js', content);
