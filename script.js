const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const savedTheme = localStorage.getItem("theme") || "dark";

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  if (themeToggle && themeLabel) {
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
  }
}

setTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const filterButtons = document.querySelectorAll("[data-filter]");
const filterableItems = document.querySelectorAll("[data-tags]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    filterableItems.forEach((item) => {
      const tags = item.dataset.tags.split(" ");
      item.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

const preview = document.querySelector(".project-preview");
const previewImage = preview?.querySelector("img");
const previewRows = document.querySelectorAll(".project-row[data-preview]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (preview && previewImage && !reducedMotion) {
  previewRows.forEach((row) => {
    row.addEventListener("pointerenter", () => {
      previewImage.src = row.dataset.preview;
      preview.classList.add("is-visible");
    });

    row.addEventListener("pointermove", (event) => {
      preview.style.setProperty("--preview-x", `${event.clientX + 24}px`);
      preview.style.setProperty("--preview-y", `${event.clientY - 18}px`);
    });

    row.addEventListener("pointerleave", () => {
      preview.classList.remove("is-visible");
    });
  });
}
