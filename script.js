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
        void nameTitle.offsetHeight;
        nameTitle.classList.add("visible");
      }

      const subtexts = document.querySelectorAll(".section__hero .subtext");
      subtexts.forEach((el, i) => {
        setTimeout(() => {
          void el.offsetHeight;
          el.classList.add("visible");
        }, 400 * (i + 1));
      });
    }, 200);
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

  // Actualizar textos
  for (const key in langData[lang]) {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = langData[lang][key];
    }
  }

  // Mostrar bandera del idioma al que se cambiará
  const flagIcon = document.getElementById("flag-icon");
  if (flagIcon) {
    if (lang === "en") {
      flagIcon.src = "assets/flags/es.png";
      flagIcon.alt = "Cambiar a español";
    } else if (lang === "es") {
      flagIcon.src = "assets/flags/en.png";
      flagIcon.alt = "Switch to English";
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

// Ajustar altura viewport
// En script.js (o inline script)
function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVh);
window.addEventListener('load', setVh);
setVh();


// Cerrar menú en móvil
const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.getElementById('nav-toggle');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 600 && navToggle) {
      navToggle.checked = false;
    }
  });
});

// Scroll por secciones
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main > section');
  let currentSection = 0;
  let isScrolling = false;

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    currentSection = index;
    sections[index].scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

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

  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  }, { passive: false });

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

  scrollToSection(0);
});

function splitLettersWithSpecial(selector, specialIndices) {
  const element = document.querySelector(selector);
  const text = element.textContent;
  element.innerHTML = text.split('').map((letter, i) => {
    if (letter === ' ') return ' ';
    // Si el índice está en specialIndices, aplica clase 'special-letter'
    if (specialIndices.includes(i)) {
      return `<span class="letter special-letter">${letter}</span>`;
    }
    return `<span class="letter">${letter}</span>`;
  }).join('');
}

// Para Mauricio: queremos efecto en letras 5,6,7 que son "c"(5),"i"(6),"o"(7)
splitLettersWithSpecial('.cutout-text', [0,1,2]);

// Para Guerrero: queremos efecto en letras 0,1,2 que son "G"(0),"u"(1),"e"(2)
splitLettersWithSpecial('.guerrero-text', [0,1,2]);