const sobreMiVista = {
    init: function() {
      this.sobreMiTitulo = document.querySelector('.sobre-mi-titulo');
      this.sobreMiFoto = document.querySelector('.sobre-mi-foto');
      this.sobreMiDescripcion = document.querySelector('.sobre-mi-descripcion');
      this.sobreMiHabilidades = document.querySelector('.sobre-mi-habilidades');
    },
  
    actualizar: function(modelo) {
      this.sobreMiTitulo.textContent = modelo.titulo;
      this.sobreMiFoto.src = modelo.foto;
      this.sobreMiDescripcion.innerHTML = modelo.descripcion;
      this.sobreMiHabilidades.innerHTML = '';
      modelo.habilidades.forEach(habilidad => {
        const habilidadElemento = document.createElement('div');
        habilidadElemento.classList.add('sobre-mi-habilidad');
        habilidadElemento.innerHTML = `
          <div class="sobre-mi-habilidad-nombre">${habilidad.nombre}</div>
          <div class="sobre-mi-habilidad-nivel">
            <div class="sobre-mi-habilidad-nivel-fondo">
              <div class="sobre-mi-habilidad-nivel-valor" style="width:${habilidad.nivel}%"></div>
            </div>
            <div class="sobre-mi-habilidad-nivel-porcentaje">${habilidad.nivel}%</div>
          </div>
        `;
        this.sobreMiHabilidades.appendChild(habilidadElemento);
      });
    }
};

const portafolioVista = {
  init: function() {
    this.portafolioTitulo = document.querySelector('.portafolio-titulo');
    this.portafolioProyecto = document.querySelector('.portafolio-proyecto');
  },

  actualizar: function(modelo) {
    this.portafolioTitulo.textContent = modelo.titulo;
    this.portafolioProyecto.innerHTML = '';
    modelo.proyectos.forEach(proyecto => {
      const portafolioElemento = document.createElement('div');
      portafolioElemento.classList.add('portafolio-proyecto');
      portafolioElemento.innerHTML = `
        <img class="portafolio-proyecto-imagen" src="${proyecto.imagen}" alt="${proyecto.titulo}">
        <h3 class="portafolio-proyecto-titulo">${proyecto.titulo}</h3>
        <p class="portafolio-proyecto-descripcion">${proyecto.descripcion}</p>
        <a class="portafolio-proyecto-enlace" href="${proyecto.enlace}" target="_blank">Ver proyecto</a>
      `;
      this.portafolioProyecto.appendChild(portafolioElemento);
    });
  }
};

const blogVista = {
  init: function() {
    this.blogTitulo = document.querySelector('.blog-titulo');
    this.blogArticulos = document.querySelector('.blog-articulos-contenedor');
  },

  actualizar: function(modelo) {
    this.blogTitulo.textContent = modelo.titulo;
    this.blogArticulos.innerHTML = '';
    modelo.articulos.forEach(articulo => {
      const articuloElemento = document.createElement('div');
      articuloElemento.classList.add('blog-articulos');
      articuloElemento.innerHTML = `
        <div class="blog-articulo">
          <img class="blog-articulo-imagen" src="${articulo.imagen}" alt="${articulo.titulo}">
          <h3 class="blog-articulo-titulo">${articulo.titulo}</h3>
          <p class="blog-articulo-autor-fecha">${articulo.autor} - ${articulo.fecha}</p>
          <p class="blog-articulo-contenido">${articulo.contenido}</p>
          <a class="blog-articulo-enlace" href="${articulo.enlace}" target="_blank">Leer más</a>
        </div>
      `;
      this.blogArticulos.appendChild(articuloElemento);
    });
  }
};

const contactoVista = {
  init: function() {
    this.contactOptions = document.querySelector('.contacto-opciones-contenedor');
  },

  actualizar: function(modelo) {
    this.contactOptions.innerHTML = '';
    modelo.opciones.forEach(opciones => {
      const opcionesElemento = document.createElement('div');
      opcionesElemento.classList.add('contacto-opciones');
      opcionesElemento.innerHTML = `
        <div class="contacto-opciones">
          <a href="mailto:${opcion.email}" id="contact-email">Contáctame por correo electrónico</a>
          <a href="https://wa.me/${opcion.whatsapp}" target="_blank" id="contact-whatsapp">Contáctame por WhatsApp</a>
          <a href="tel:${opcion.phone}" id="contact-phone">Contáctame por teléfono</a>
        </div>
      `;
      this.contactOptions.appendChild(opcionesElemento);
    });
  }
}