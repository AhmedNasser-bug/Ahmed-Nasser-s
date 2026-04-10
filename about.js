function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Activate Hanwag animations and Lenis
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize Lenis Smooth Scroll
            if (typeof Lenis !== 'undefined') {
                const lenis = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
                    smoothWheel: true
                });

                function raf(time) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }

                requestAnimationFrame(raf);
            }
            
            const hanwagElements = document.querySelectorAll('.hanwag-fade');
            const hanwagObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('hanwag-active');
                    }
                });
            }, { threshold: 0.1 });

            hanwagElements.forEach(el => {
                hanwagObserver.observe(el);
            });
        });


        var possible_texts = [
  "It's a beautiful day outside, isn't it?",
  "Don't you just adore the joy of creation?",
  "I won't stop until I reach my goals.",
  "Only those who attempt the absurd can achieve the impossible.” – Albert Einstein ",
  "Feel free to contact me anytime anyway you like!",
];
function chooseOffCanvasText() {
  const offCanvasText = document.getElementById("offcanvasNavbarLabel");
  if (offCanvasText) {
    offCanvasText.textContent = possible_texts[
      getRandomInt(0, possible_texts.length - 1)
    ];
  }
}