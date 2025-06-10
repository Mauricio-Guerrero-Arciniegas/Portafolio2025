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

const cards = document.querySelectorAll('.about__card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // posición del cursor dentro de la tarjeta
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // rotación X max 10 grados
    const rotateY = ((x - centerX) / centerX) * 10; // rotación Y max 10 grados

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const projectItems = document.querySelectorAll('.project__item');

  const viewer = document.getElementById('fullscreenViewer');
  const viewerImg = document.getElementById('fullscreenImage');
  const closeBtn = document.getElementById('closeViewer');

  // Función para filtrar proyectos
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

  // Abrir imagen pantalla completa al click
  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const altText = item.querySelector('img').alt || 'Proyecto ampliado';

      viewerImg.src = imgSrc;
      viewerImg.alt = altText;
      viewer.style.display = 'flex';

      // Para accesibilidad: enfocar el botón cerrar
      closeBtn.focus();
      // Evitar scroll de fondo
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar vista ampliada
  closeBtn.addEventListener('click', () => {
    viewer.style.display = 'none';
    viewerImg.src = '';
    document.body.style.overflow = '';
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer.style.display === 'flex') {
      viewer.style.display = 'none';
      viewerImg.src = '';
      document.body.style.overflow = '';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const projectItems = document.querySelectorAll('.project__item');
  const viewer = document.getElementById('fullscreenViewer');
  const viewerImg = document.getElementById('fullscreenImage');
  const closeBtn = document.getElementById('closeViewer');
  const overlay = document.getElementById('overlayBackground');

  function closeViewer() {
    viewer.style.display = 'none';
    viewerImg.src = '';
    document.body.style.overflow = '';
  }

  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const altText = item.querySelector('img').alt || 'Proyecto ampliado';

      viewerImg.src = imgSrc;
      viewerImg.alt = altText;
      viewer.style.display = 'flex';

      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', closeViewer);

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer.style.display === 'flex') {
      closeViewer();
    }
  });

  // Cerrar al hacer clic en el fondo
  overlay.addEventListener('click', closeViewer);

  // ✅ Cerrar al hacer clic en la imagen
  viewerImg.addEventListener('click', closeViewer);
});





