// Controlador de navegación
const navController = {
    init: function() {
      // Seleccionar los enlaces de la navegación
      const navLinks = document.querySelectorAll('header nav a');
  
      // Agregar evento de click a cada enlace
      navLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault(); // Prevenir comportamiento por defecto
          const target = e.target.getAttribute('href'); // Obtener el identificador de la sección
          sectionController.show(target); // Mostrar la sección correspondiente
        });
      });
    }
  };
  
  // Controlador de secciones
  const sectionController = {
    init: function() {
      // Seleccionar todas las secciones
      const sections = document.querySelectorAll('main section');
  
      // Ocultar todas las secciones excepto la primera
      sections.forEach((section, index) => {
        if (index > 0) {
          section.style.display = 'none';
        }
      });
    },
  
    show: function(target) {
      // Seleccionar la sección correspondiente al identificador
      const section = document.querySelector(target);
  
      // Ocultar todas las secciones
      const sections = document.querySelectorAll('main section');
      sections.forEach(section => {
        section.style.display = 'none';
      });
  
      // Mostrar la sección correspondiente
      section.style.display = 'block';
    }
  };
  
  // Inicializar controladores
  navController.init();
  sectionController.init();
  