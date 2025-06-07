window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("fade-out");

    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");

      // Mostrar el título con animación suave
      const nameTitle = document.querySelector(".section__hero .name");
      if (nameTitle) {
        // Forzar repaint para Safari
        void nameTitle.offsetHeight;
        nameTitle.classList.add("visible");
      }

      // Animar los textos secundarios con delay progresivo solo al cargar (no al cambiar idioma)
      const subtexts = document.querySelectorAll(".section__hero .subtext");
      subtexts.forEach((el, i) => {
        setTimeout(() => {
          // Forzar repaint para Safari
          void el.offsetHeight;
          el.classList.add("visible");
        }, 400 * (i + 1));
      });
    }, 100);
  }, 3500);
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

// Multilenguaje con bandera
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
      // No animar textos secundarios aquí para no repetir animación al cambiar idioma
    }
  }

  const flagIcon = document.getElementById("flag-icon");
  if (flagIcon) {
    if (lang === "en") {
      flagIcon.src = "assets/flags/en.png";
      flagIcon.alt = "English flag";
    } else if (lang === "es") {
      flagIcon.src = "assets/flags/es.png";
      flagIcon.alt = "Spanish flag";
    }
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

// Ajustar altura viewport para mobile
function setVh() {
  document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
}
window.addEventListener("resize", setVh);
setVh();

// Cerrar menú hamburguesa al hacer click en un enlace del menú (solo en móvil)
const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.getElementById('nav-toggle');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 600) {
      navToggle.checked = false;
    }
  });
});
