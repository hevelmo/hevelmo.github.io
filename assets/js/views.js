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