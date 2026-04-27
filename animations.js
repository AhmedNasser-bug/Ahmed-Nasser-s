// Video optimization - only load when in viewport

document.addEventListener("DOMContentLoaded", function () {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target.querySelector("video");
          if (video) {
            video.src = video.getAttribute("data-src");
            video.removeAttribute("data-src");
          }
          videoObserver.unobserve(entry.target);
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
    video.removeAttribute("src");
    video.setAttribute("data-src", src);
    video.poster =
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"%3E%3Crect fill="%230f172a" width="800" height="450"/%3E%3Cpath fill="%231e293b" d="M0,0 L800,450 M800,0 L0,450" stroke="%232563eb" stroke-width="1"/%3E%3C/svg%3E';
  });
});

// Canvas animations removed for blueprint aesthetic.
document.addEventListener('DOMContentLoaded', () => {

  // Hanwag scrolling effect
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("hanwag-active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  document.querySelectorAll(".hanwag-fade").forEach((section) => {
    observer.observe(section);
  });
});
