const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const themeButtons = document.querySelectorAll("[data-theme-value]");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeValue === theme));
  });
}

setTheme(savedTheme || "dark");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.themeValue));
});

const terminalOutput = document.querySelector("#terminal-output");
const terminalForm = document.querySelector("#terminal-form");
const terminalInput = document.querySelector("#terminal-input");
const shortcutButtons = document.querySelectorAll("[data-command]");

const commandResponses = {
  whoami: [
    "Gabriel Oyetunji",
    "backend python developer working across APIs, data systems, AI tooling, and product builds",
  ],
  projects: [
    "public: flight-booking-api, ds_task_1ab, uvvis-spectrophotometer-app, breast-cancer-classifier, stgcn-recognition",
    "private/in-progress: mandatecheck, website builds, backend product systems",
  ],
  stack: [
    "backend: FastAPI, Django REST Framework, Flask, PostgreSQL, Redis, Docker",
    "ai/data: PyTorch, TensorFlow, Pinecone, OCR, pandas, Streamlit",
    "frontend/product: React, Vite, responsive UI, dashboards, dark interfaces",
  ],
  now: [
    "building: private websites, product dashboards, backend platforms, better case notes",
    "direction: less template portfolio, more living developer workbench",
  ],
  contact: ["email: gabrieloyetunji25@gmail.com", "github: github.com/GabrielOyetunji"],
  help: ["commands: whoami, projects, stack, now, contact, clear"],
};

function writeTerminal(command) {
  const normalized = command.trim().toLowerCase();
  if (!normalized) return;

  if (normalized === "clear") {
    terminalOutput.innerHTML = "";
    return;
  }

  const response = commandResponses[normalized] || [
    `command not found: ${normalized}`,
    "try: help",
  ];

  const commandLine = document.createElement("p");
  commandLine.innerHTML = `<span>$</span> ${normalized}`;
  terminalOutput.appendChild(commandLine);

  response.forEach((line) => {
    const outputLine = document.createElement("p");
    outputLine.className = "terminal-line";
    outputLine.textContent = line;
    terminalOutput.appendChild(outputLine);
  });

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  writeTerminal(terminalInput.value);
  terminalInput.value = "";
});

shortcutButtons.forEach((button) => {
  button.addEventListener("click", () => writeTerminal(button.dataset.command));
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
