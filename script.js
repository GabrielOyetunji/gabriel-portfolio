const root = document.documentElement;
const modeToggle = document.querySelector(".mode-toggle");
const savedTheme = localStorage.getItem("theme") || "dark";

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  if (modeToggle) {
    modeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    modeToggle.querySelector("strong").textContent = theme;
  }
}

setTheme(savedTheme);

modeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const filterButtons = document.querySelectorAll("[data-filter]");
const filterableCards = document.querySelectorAll("[data-tags]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    filterableCards.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      card.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

const canvas = document.querySelector("#signal-canvas");
const context = canvas?.getContext("2d");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let particles = [];
let width = 0;
let height = 0;
let animationFrame = 0;

function resizeCanvas() {
  if (!canvas || !context) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(42, Math.min(92, Math.floor(width / 18)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.32,
    vy: (Math.random() - 0.5) * 0.32,
    r: Math.random() * 1.8 + 0.8,
  }));
}

function drawSignalField() {
  if (!canvas || !context) return;
  context.clearRect(0, 0, width, height);

  const isLight = root.dataset.theme === "light";
  context.fillStyle = isLight ? "rgba(15, 118, 110, 0.72)" : "rgba(52, 231, 209, 0.84)";
  context.strokeStyle = isLight ? "rgba(15, 118, 110, 0.15)" : "rgba(52, 231, 209, 0.14)";

  particles.forEach((particle, index) => {
    if (!prefersReducedMotion) {
      particle.x += particle.vx;
      particle.y += particle.vy;
    }

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    context.beginPath();
    context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    context.fill();

    for (let j = index + 1; j < particles.length; j += 1) {
      const other = particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 125) {
        context.globalAlpha = 1 - distance / 125;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.stroke();
        context.globalAlpha = 1;
      }
    }
  });

  animationFrame = requestAnimationFrame(drawSignalField);
}

if (canvas && context) {
  resizeCanvas();
  drawSignalField();
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      drawSignalField();
    }
  });
}
