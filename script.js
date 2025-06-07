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
  toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
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

  // Actualizar textos según idioma, sin animar subtextos para no repetir animación
  for (const key in langData[lang]) {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = langData[lang][key];
    }
  }

  // Cambiar bandera según idioma
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
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVH();
window.addEventListener('resize', setVH);

// Cerrar menú hamburguesa al hacer click en un enlace del menú (solo en móvil)
const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.getElementById('nav-toggle');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 600 && navToggle) {
      navToggle.checked = false;
    }
  });
});

// Scroll entre secciones con rueda, teclado y nav
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main > section');
  let currentSection = 0;
  let isScrolling = false;

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    currentSection = index;
    sections[index].scrollIntoView({ behavior: 'smooth' });

    // Bloquear durante la animación (aprox 1s)
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

  // Navegación con clicks en menú
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = [...sections].findIndex(s => s.id === targetId);
      if (targetSection !== -1) {
        scrollToSection(targetSection);
      }
    });
  });

  // Scroll con rueda del mouse
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
      if (currentSection < sections.length - 1) scrollToSection(currentSection + 1);
    } else if (e.deltaY < 0) {
      if (currentSection > 0) scrollToSection(currentSection - 1);
    }
  }, { passive: false });

  // Scroll con teclado (flechas y page up/down)
  window.addEventListener('keydown', (e) => {
    if (isScrolling) return;

    if (['ArrowDown', 'PageDown'].includes(e.code)) {
      e.preventDefault();
      if (currentSection < sections.length - 1) scrollToSection(currentSection + 1);
    } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
      e.preventDefault();
      if (currentSection > 0) scrollToSection(currentSection - 1);
    }
  });

  // Scroll inicial a la primera sección
  scrollToSection(0);
});
