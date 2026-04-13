// Activate Hanwag animations
document.addEventListener('DOMContentLoaded', function () {
    const hanwagElements = document.querySelectorAll('.hanwag-fade');
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
