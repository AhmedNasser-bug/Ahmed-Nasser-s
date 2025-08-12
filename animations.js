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

// Initialize Three.js for hero background
document.addEventListener("DOMContentLoaded", () => {
  // Canvas setup
  const canvas = document.getElementById("heroCanvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();
  window.addEventListener("resize", setCanvasSize);

  // Particle system
  const particles = [];
  const particleCount = 150;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: `rgba(59, 130, 246, ${Math.random() * 0.2 + 0.05})`,
    });
  }

  // Animation loop
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Reset particles that go off screen
      if (particle.x > canvas.width || particle.x < 0) particle.speedX *= -1;
      if (particle.y > canvas.height || particle.y < 0) particle.speedY *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  // Hanwag scrolling effect
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("hanwag-active");
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

