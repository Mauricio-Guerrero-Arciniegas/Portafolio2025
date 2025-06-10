// Loader animado y aparición del Hero
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("fade-out");

    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");

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
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
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
    }
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput && langData[lang]["search_placeholder"]) {
    searchInput.placeholder = langData[lang]["search_placeholder"];
  }

  const flagIcon = document.getElementById("flag-icon");
  if (flagIcon) {
    if (lang === "en") {
      flagIcon.src = "assets/flags/es.png";
      flagIcon.alt = "Cambiar a español";
    } else {
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

// Separación de letras para Hero
function splitLettersWithSpecial(selector, specialIndices) {
  const element = document.querySelector(selector);
  const text = element.textContent;
  element.innerHTML = text.split('').map((letter, i) => {
    if (letter === ' ') return ' ';
    if (specialIndices.includes(i)) {
      return `<span class="letter special-letter">${letter}</span>`;
    }
    return `<span class="letter">${letter}</span>`;
  }).join('');
}

splitLettersWithSpecial('.cutout-text', [0, 1, 2]);
splitLettersWithSpecial('.guerrero-text', [0, 1, 2]);

// Tarjetas interactivas
const cards = document.querySelectorAll('.about__card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

// Filtro y búsqueda de proyectos
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const projectItems = document.querySelectorAll('.project__item');

  function filterProjects() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    projectItems.forEach(item => {
      const title = item.getAttribute('data-title').toLowerCase();
      const category = item.getAttribute('data-category');

      const matchesSearch = title.includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

      item.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
    });
  }

  searchInput.addEventListener('input', filterProjects);
  categoryFilter.addEventListener('change', filterProjects);
});

// SCROLL MANAGMENT

const carousel = document.getElementById('projectsCarousel');
const scrollLeftBtn = document.querySelector('.scroll-btn.left');
const scrollRightBtn = document.querySelector('.scroll-btn.right');

scrollLeftBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -300, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });
});

// Vista fullscreen animada para proyectos
document.addEventListener('DOMContentLoaded', () => {
  const projectItems = document.querySelectorAll('.project__item');
  const viewer = document.getElementById('fullscreenViewer');
  const viewerImg = document.getElementById('fullscreenImage');
  const closeBtn = document.getElementById('closeViewer');
  const overlay = document.getElementById('overlayBackground');

  function openViewerWithAnimation(img) {
    const rect = img.getBoundingClientRect();
    const clone = img.cloneNode();

    clone.style.position = 'fixed';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.zIndex = '1000';
    clone.style.transition = 'all 1s ease-in-out';
    clone.style.objectFit = 'fill';
    clone.style.borderRadius = '1rem';

    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.left = '50%';
      clone.style.top = '50%';
      clone.style.transform = 'translate(-50%, -50%)';
      clone.style.width = '90%';
      clone.style.height = '80vh';
      clone.style.borderRadius = '0.5rem';
    });

    clone.addEventListener('transitionend', () => {
      viewerImg.src = img.src;
      viewerImg.alt = img.alt || 'Proyecto ampliado';
      viewer.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.body.removeChild(clone);
      closeBtn.focus();
    }, { once: true });
  }

  function closeViewer() {
    viewer.classList.remove('active');
    viewerImg.src = '';
    document.body.style.overflow = '';
  }

  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openViewerWithAnimation(img);
    });
  });

  closeBtn.addEventListener('click', closeViewer);
  overlay.addEventListener('click', closeViewer);
  viewerImg.addEventListener('click', closeViewer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer.classList.contains('active')) {
      closeViewer();
    }
  });
});

// Botón scrollToTop (puedes llamarlo desde el botón del footer)
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}