const sobreMiControlador = {
    init: function() {
      sobreMiVista.init();
      this.cargarSobreMi();
    },
  
    cargarSobreMi: function() {
      fetch('assets/data/sobre-mi.json')
        .then(response => response.json())
        .then(data => {
          sobreMiModelo.titulo = data.titulo;
          sobreMiModelo.descripcion = data.descripcion;
          sobreMiModelo.foto = data.foto;
          sobreMiModelo.habilidades = data.habilidades;
          sobreMiVista.actualizar(sobreMiModelo);
        });
    }
};  