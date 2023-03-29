// MODELO

const modelo = {
    obtenerDatos: function(callback) {
      fetch('assets/data/sobre-mi.json')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error(error))
    }
  }
  
  // VISTA
  
  const vista = {
    inicializar: function() {
      this.nombre = document.getElementById('nombre')
      this.edad = document.getElementById('edad')
      this.descripcion = document.getElementById('descripcion')
    },
  
    actualizar: function(datos) {
      this.nombre.textContent = datos.nombre
      this.edad.textContent = datos.edad
      this.descripcion.textContent = datos.descripcion
    }
  }
  
  // CONTROLADOR
  
  const controlador = {
    inicializar: function() {
      vista.inicializar()
      modelo.obtenerDatos(function(datos) {
        vista.actualizar(datos)
      })
    }
  }
  
  // Inicializar la aplicación
  controlador.inicializar()
  