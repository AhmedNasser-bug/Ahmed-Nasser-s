// Activate Hanwag animations
document.addEventListener('DOMContentLoaded', function () {
    const hanwagElements = document.querySelectorAll('.hanwag-fade');

    // Check for user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // If reduced motion is preferred, immediately show elements without observer
        hanwagElements.forEach(el => {
            el.classList.add('hanwag-active');
        });
        return;
    }

    const hanwagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('hanwag-active');
                hanwagObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    hanwagElements.forEach(el => {
        hanwagObserver.observe(el);
    });
});
