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
];
function chooseOffCanvasText() {
  const offCanvasText = document.getElementById("offcanvasNavbarLabel");
  if (offCanvasText) {
    offCanvasText.innerHTML = possible_texts[
      getRandomInt(0, possible_texts.length - 1)
    ];
  }
}

// Activate Hanwag animations
        document.addEventListener('DOMContentLoaded', function () {
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