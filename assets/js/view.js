export function renderHome() {
    // Renderiza la página principal
    loadCSS(ROUTES.CSS_PATH + 'style.css');
}

function loadCSS(path) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = path;
    document.head.appendChild(link);
}