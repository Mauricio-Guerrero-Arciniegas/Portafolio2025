const langToggle = document.getElementById('lang-toggle');
const welcomeText = document.getElementById('welcome-text');
const introText = document.getElementById('intro-text');
const toggleThemeBtn = document.getElementById('toggle-theme');

let currentLang = localStorage.getItem('lang') || 'es';
let translations = {};

// Función para cargar el JSON de traducciones
async function loadTranslations() {
	try {
		const response = await fetch('assets/translations.json');
		translations = await response.json();
		applyLanguage(currentLang);
	} catch (error) {
		console.error('Error loading translations:', error);
	}
}

// Función para aplicar idioma a los elementos HTML
function applyLanguage(lang) {
	const translationsForLang = translations[lang];
	if (!translationsForLang) return;

	Object.keys(translationsForLang).forEach((id) => {
		const el = document.getElementById(id);
		if (el) el.textContent = translationsForLang[id];
	});

	currentLang = lang;

	// Actualiza texto del botón de tema según modo y idioma
	const isDark = document.body.classList.contains('dark');
	toggleThemeBtn.textContent = isDark
		? lang === 'en'
			? 'Light mode'
			: 'Modo claro'
		: lang === 'en'
		? 'Dark mode'
		: 'Modo oscuro';

	// Actualiza texto del botón de idioma para mostrar el idioma al que se cambiará
	langToggle.textContent = lang === 'es' ? 'English' : 'Español';

	// Guarda idioma en localStorage
	localStorage.setItem('lang', lang);
}

// Función para aplicar el modo oscuro o claro
function applyTheme(isDark) {
	document.body.classList.toggle('dark', isDark);
	localStorage.setItem('dark', isDark);
	toggleThemeBtn.textContent = isDark
		? currentLang === 'en'
			? 'Light mode'
			: 'Modo claro'
		: currentLang === 'en'
		? 'Dark mode'
		: 'Modo oscuro';
}

// Evento para cambiar idioma al hacer click
langToggle.addEventListener('click', () => {
	const newLang = currentLang === 'es' ? 'en' : 'es';
	applyLanguage(newLang);
});

// Evento para cambiar modo oscuro/claro
toggleThemeBtn.addEventListener('click', () => {
	const isDarkNow = document.body.classList.contains('dark');
	applyTheme(!isDarkNow);
});

// Al cargar la página, cargar traducciones y aplicar idioma y tema guardados
loadTranslations();

const savedDark = localStorage.getItem('dark') === 'true';
applyTheme(savedDark);

window.addEventListener('load', () => {
	setTimeout(() => {
		document.getElementById('intro-loader').style.display = 'none';

		const navbar = document.querySelector('.navbar');
		const glassText = document.querySelector('.glass-text');
		const glassSubtext = document.querySelector('.glass-subtext');

		navbar.classList.add('show');
		glassText.classList.add('animate-name');
		glassSubtext.classList.add('animate-subtext');
	}, 2000);
});

window.addEventListener('DOMContentLoaded', () => {
	// Espera a que la animación del loader termine
	setTimeout(() => {
		// Oculta el loader (ya se hace con CSS)
		
		// Muestra la navbar
		document.querySelector('.navbar').classList.add('show');

		// Agrega clases de animación
		document.querySelector('.glass-text').classList.add('animate-name');
		document.querySelector('.glass-subtext').classList.add('animate-subtext');
	}, 2000); // mismo delay que el fadeOut del loader
});



