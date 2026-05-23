function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const possible_texts = [
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
          document.body.addEventListener('click', function (e) {
              const anchor = e.target.closest('a[href^="#"]');
              if (anchor) {
                  e.preventDefault();
                  const target = document.querySelector(anchor.getAttribute('href'));
                  if (target) {
                      lenis.scrollTo(target);
                  }
              }
          });
      }

      // Hanwag scrolling effect (PR #9 refactor)
      const hanwagObserver = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                      entry.target.classList.add("hanwag-active");
                      hanwagObserver.unobserve(entry.target);
                  }
              });
          },
          {
              threshold: 0.15,
              rootMargin: "0px 0px -100px 0px",
          }
      );

      document.querySelectorAll(".hanwag-fade").forEach((section) => {
          hanwagObserver.observe(section);
      });

      // Video optimization - only load when in viewport (PR #9 refactor)
      const videoObserver = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                      const video = entry.target.querySelector("video");
                      if (video) {
                          const dataSrc = video.getAttribute("data-src");
                          if (dataSrc) {
                              video.src = dataSrc;
                              video.removeAttribute("data-src");
                          }
                          videoObserver.unobserve(entry.target);
                      }
                  }
              });
          },
          { threshold: 0.1 }
      );

      document.querySelectorAll(".project-card").forEach((card) => {
          videoObserver.observe(card);
      });

      // Update video sources to use data-src for lazy loading (PR #9 refactor)
      document.querySelectorAll(".project-video").forEach((video) => {
          const src = video.getAttribute("src");
          if (src) {
              video.removeAttribute("src");
              video.setAttribute("data-src", src);
              video.poster =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"%3E%3Crect fill="%230f172a" width="800" height="450"/%3E%3Cpath fill="%231e293b" d="M0,0 L800,450 M800,0 L0,450" stroke="%232563eb" stroke-width="1"/%3E%3C/svg%3E';
          }
      });
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

function copyToClipboard(buttonElement, textToCopy) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      const icon = buttonElement.querySelector('i');
      if (icon) {
        icon.className = 'fas fa-check';
        const originalTitle = buttonElement.getAttribute('title');
        buttonElement.setAttribute('title', 'Copied!');
        buttonElement.setAttribute('aria-label', 'Copied!');

        setTimeout(() => {
          icon.className = 'fas fa-copy';
          buttonElement.setAttribute('title', originalTitle);
          buttonElement.setAttribute('aria-label', originalTitle);
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getRandomInt, debounce, copyToClipboard };
}

/**
 * Initialize Project Filter & Search System
 * Provides category filtering and text search for project cards
 */
function initProjectFilter() {
  const searchInput = document.getElementById('project-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!searchInput || !filterButtons.length || !projectCards.length) {
    return;
  }

  // Keyboard shortcut to focus search input
  document.addEventListener('keydown', (e) => {
    if (e.key === '/') {
      // Don't focus if user is already typing in an input or textarea
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
      searchInput.focus();
    }
  });
  
  let activeFilter = 'all';
  
  // Add transition to project cards for smooth filtering
  projectCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
  
  // Filter button handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      
      // Update active state
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      
      applyFilters(activeFilter, searchInput.value);
    });
    
    // Keyboard navigation support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
  
  // Search input handler (debounced)
  searchInput.addEventListener('input', debounce(() => {
    applyFilters(activeFilter, searchInput.value);
  }, 300));

  // Clear search on Escape key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      searchInput.value = '';
      const allFilterBtn = Array.from(filterButtons).find(btn => btn.dataset.filter === 'all');
      if (allFilterBtn) {
        allFilterBtn.click();
      } else {
        applyFilters('all', '');
      }
      searchInput.blur();
    }
  });

  const emptyState = document.getElementById('projects-empty-state');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');

  if (clearFiltersBtn) {
    const handleClear = () => {
      searchInput.value = '';
      const allFilterBtn = Array.from(filterButtons).find(btn => btn.dataset.filter === 'all');
      if (allFilterBtn) {
        allFilterBtn.click();
      } else {
        applyFilters('all', '');
      }
    };

    clearFiltersBtn.addEventListener('click', handleClear);
    clearFiltersBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClear();
      }
    });
  }
  
  function applyFilters(category, searchTerm) {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    let visibleCount = 0;
    
    projectCards.forEach(card => {
      const cardCategory = card.dataset.category || '';
      const cardTags = card.dataset.tags || '';
      const cardText = card.textContent.toLowerCase();
      
      // Check category match
      const matchesCategory = category === 'all' || 
        cardCategory.includes(category) ||
        (category === 'algorithms' && (cardCategory.includes('algorithm') || cardTags.includes('algorithm')));
      
      // Check search term match (in tags, title, or description)
      const matchesSearch = normalizedSearch === '' || 
        cardText.includes(normalizedSearch) ||
        cardTags.toLowerCase().includes(normalizedSearch);
      
      // Apply visibility to the parent link wrapper
      const isVisible = matchesCategory && matchesSearch;
      const parentLink = card.closest('.project-link');
      
      if (parentLink) {
        parentLink.style.display = isVisible ? 'flex' : 'none';
        parentLink.setAttribute('aria-hidden', !isVisible);
      } else {
        card.style.display = isVisible ? 'flex' : 'none';
        card.setAttribute('aria-hidden', !isVisible);
      }

      if (isVisible) {
        visibleCount++;
      }
    });
    
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.remove('visually-hidden');
        emptyState.setAttribute('aria-hidden', 'false');
      } else {
        emptyState.classList.add('visually-hidden');
        emptyState.setAttribute('aria-hidden', 'true');
      }
    }

    // Announce filter results to screen readers
    announceFilterResults(projectCards, category, normalizedSearch);
  }
  
  function announceFilterResults(cards, category, searchTerm) {
    const visibleCount = Array.from(cards).filter(card => 
      card.getAttribute('aria-hidden') !== 'true'
    ).length;
    
    let announcement = `${visibleCount} project${visibleCount !== 1 ? 's' : ''} found`;
    
    if (category !== 'all') {
      announcement += ` in ${category} category`;
    }
    
    if (searchTerm) {
      announcement += ` matching "${searchTerm}"`;
    }
    
    // Create live region announcement
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'visually-hidden';
    liveRegion.textContent = announcement;
    
    document.body.appendChild(liveRegion);
    
    setTimeout(() => {
      liveRegion.remove();
    }, 1000);
  }
}

// Initialize on DOM ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initProjectFilter);
}
