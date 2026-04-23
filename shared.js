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
  const offCanvasText = document.getElementById("offcanvasNavbarLabel");
  if (offCanvasText) {
    offCanvasText.textContent = possible_texts[
      getRandomInt(0, possible_texts.length - 1)
    ];
  }
}

document.addEventListener('DOMContentLoaded', () => {
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

    // Hanwag scrolling effect
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

    // Video optimization - only load when in viewport
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

    // Update video sources to use data-src for lazy loading
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
