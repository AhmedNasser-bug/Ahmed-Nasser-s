function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var possible_texts = [
  "It's a beautiful day outside, isn't it?",
  "Don't you just adore the joy of creation?",
  "I won't stop until I reach my goals.",
  "Only those who attempt the absurd can achieve the impossible.” – Albert Einstein ",
  "Feel free to contact me anytime anyway you like!",
  "I do not know how, but i certainly will."
];

function chooseOffCanvasText() {
  if (typeof document !== 'undefined') {
    const offCanvasText = document.getElementById("offcanvasNavbarLabel");
    if (offCanvasText) {
      offCanvasText.textContent = possible_texts[
        getRandomInt(0, possible_texts.length - 1)
      ];
    }
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Initialize Lenis Smooth Scroll
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (typeof Lenis !== 'undefined' && window.innerWidth >= 768 && !prefersReducedMotion) {
          const lenis = new Lenis({
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              smoothWheel: true
          });

          let rafId;
          function raf(time) {
              lenis.raf(time);
              rafId = requestAnimationFrame(raf);
          }

          rafId = requestAnimationFrame(raf);

          // Disable lenis when not visible
          document.addEventListener('visibilitychange', () => {
              if (document.hidden) {
                  cancelAnimationFrame(rafId);
              } else {
                  rafId = requestAnimationFrame(raf);
              }
          });

          // Smooth scroll for anchor links
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                  e.preventDefault();
                  const target = document.querySelector(this.getAttribute('href'));
                  if(target) {
                      lenis.scrollTo(target);
                  }
              });
          });
      }
  });
}

/**
 * Debounce function to limit the rate at which a function can fire.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getRandomInt, debounce };
}
