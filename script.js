const toggleTheme = document.getElementById("toggle-theme");
const toggleLang = document.getElementById("toggle-lang");

const translations = {
  en: {
    welcome: "Mauricio Guerrero A",
    intro: "Systems Engineer - Fullstack developer.",
    projects: "Projects",
    project1: {
      title: "React Portfolio",
      desc: "A modern portfolio with dark mode and multi-language support."
    },
    project2: {
      title: "Weather App",
      desc: "App that shows real-time weather using an API."
    },
    project3: {
      title: "Pokémon Finder",
      desc: "Explore Pokémon with a sleek and responsive UI."
    },
    buttonLang: "Español",
    buttonTheme: "Dark mode",
  },
  es: {
    welcome: "Mauricio Guerrero A",
    intro: "Ingeniero de Sistemas - Desarrollador Fullstack",
    projects: "Proyectos",
    project1: {
      title: "Portafolio React",
      desc: "Un portafolio moderno con modo oscuro y soporte multilenguaje."
    },
    project2: {
      title: "App del Clima",
      desc: "Aplicación que muestra el clima actual usando una API."
    },
    project3: {
      title: "Buscador Pokémon",
      desc: "Explora Pokémon con una interfaz moderna y responsiva."
    },
    buttonLang: "English",
    buttonTheme: "Modo oscuro",
  }
};

let currentLang = localStorage.getItem("lang") || "en";
let darkMode = localStorage.getItem("dark") === "true";

function applyLanguage(lang) {
  const t = translations[lang];
  document.getElementById("welcome").textContent = t.welcome;
  document.getElementById("intro").textContent = t.intro;
  document.getElementById("projects-title").textContent = t.projects;
  document.getElementById("project1-title").textContent = t.project1.title;
  document.getElementById("project1-desc").textContent = t.project1.desc;
  document.getElementById("project2-title").textContent = t.project2.title;
  document.getElementById("project2-desc").textContent = t.project2.desc;
  document.getElementById("project3-title").textContent = t.project3.title;
  document.getElementById("project3-desc").textContent = t.project3.desc;
  toggleLang.textContent = t.buttonLang;
  toggleTheme.textContent = t.buttonTheme;
}

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("dark", isDark);
}

// Init
applyLanguage(currentLang);
applyTheme(darkMode);

// Toggle Events
toggleLang.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "es" : "en";
  localStorage.setItem("lang", currentLang);
  applyLanguage(currentLang);
});

toggleTheme.addEventListener("click", () => {
  darkMode = !darkMode;
  applyTheme(darkMode);
});

function animateTyping(id, text, speed = 50) {
  const el = document.getElementById(id);
  el.innerHTML = ""; // Limpiar contenido
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "|";
  el.appendChild(cursor);

  let i = 0;
  const interval = setInterval(() => {
    const char = text.charAt(i);
    if (char) {
      cursor.insertAdjacentText("beforebegin", char);
    }
    i++;
    if (i >= text.length) {
      clearInterval(interval);
    }
  }, speed);
}

// Ejecuta animación después de aplicar idioma
function animateWelcome() {
  const text = document.getElementById("welcome").getAttribute("data-text");
  animateTyping("welcome", text);
}

// Llama esto después de cambiar el idioma
function applyLanguage(lang) {
  const t = translations[lang];
  document.getElementById("welcome").setAttribute("data-text", t.welcome);
  document.getElementById("intro").textContent = t.intro;
  document.getElementById("projects-title").textContent = t.projects;
  document.getElementById("project1-title").textContent = t.project1.title;
  document.getElementById("project1-desc").textContent = t.project1.desc;
  document.getElementById("project2-title").textContent = t.project2.title;
  document.getElementById("project2-desc").textContent = t.project2.desc;
  document.getElementById("project3-title").textContent = t.project3.title;
  document.getElementById("project3-desc").textContent = t.project3.desc;
  toggleLang.textContent = t.buttonLang;
  toggleTheme.textContent = t.buttonTheme;
  animateWelcome(); // 👈 ejecutar animación
}