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

  const emptyState = document.getElementById('projects-empty-state');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      searchInput.value = '';
      const allFilterBtn = Array.from(filterButtons).find(btn => btn.dataset.filter === 'all');
      if (allFilterBtn) {
        allFilterBtn.click();
      } else {
        applyFilters('all', '');
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
