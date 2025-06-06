// Referencias a botones
const toggleBtn = document.getElementById('dark-mode-toggle');
const langBtn = document.getElementById('btnLang');

function updateDarkModeIcon() {
  if (document.body.classList.contains('dark-mode')) {
    toggleBtn.textContent = '☀️';
  } else {
    toggleBtn.textContent = '🌙';
  }
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  updateDarkModeIcon();
});

// Ejecutar al inicio para que el ícono coincida con el modo actual
updateDarkModeIcon();

// Multilenguaje
let langData = {};
let currentLang = localStorage.getItem('lang') || 'en';

async function loadLang() {
  try {
    const res = await fetch('lang.json');
    langData = await res.json();
    setLang(currentLang);
  } catch (error) {
    console.error('Error loading language file:', error);
  }
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  for (const key in langData[lang]) {
    const el = document.getElementById(key);
    if (el) {
      el.textContent = langData[lang][key];
    }
  }

  // Actualizar texto del botón para mostrar el idioma al que se puede cambiar
  if (langBtn) {
    langBtn.textContent = lang === 'en' ? 'ES' : 'EN';
  }
}

function toggleLang() {
  const newLang = currentLang === 'en' ? 'es' : 'en';
  setLang(newLang);
}

if (langBtn) {
  langBtn.addEventListener('click', toggleLang);
}

loadLang();

// Para usar desde HTML si quieres
window.toggleLang = toggleLang;