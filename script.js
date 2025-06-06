window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    // Agrega clase para hacer fadeout el loader
    loader.classList.add("fade-out");

    // Esperar que termine la transición (600ms) para ocultar y mostrar contenido
    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("loading");
      document.body.classList.add("loaded"); // activa fadein contenido

      // Mostrar el título con animación suave un poco después
      const nameTitle = document.querySelector(".section__hero .name");
      if (nameTitle) {
        setTimeout(() => {
          nameTitle.classList.add("visible");
        }, 300);
      }
    }, 200);
  }, 2500);
});

// Modo oscuro
const toggleBtn = document.getElementById("dark-mode-toggle");

function updateDarkModeIcon() {
  toggleBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  updateDarkModeIcon();
});

updateDarkModeIcon();

// Multilenguaje
let langData = {};
let currentLang = localStorage.getItem("lang") || "en";

async function loadLang() {
  try {
    const res = await fetch("lang.json");
    langData = await res.json();
    setLang(currentLang);
  } catch (error) {
    console.error("Error loading language file:", error);
  }
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  for (const key in langData[lang]) {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = langData[lang][key];
    }
  }

  const langBtn = document.getElementById("btnLang");
  if (langBtn) {
    langBtn.textContent = lang === "en" ? "ES" : "EN";
  }
}

function toggleLang() {
  const newLang = currentLang === "en" ? "es" : "en";
  setLang(newLang);
}

const langBtn = document.getElementById("btnLang");
if (langBtn) {
  langBtn.addEventListener("click", toggleLang);
}

loadLang();