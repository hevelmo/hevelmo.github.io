const vistaSobreMi = {
    descripcion: document.querySelector('#sobre-mi .descripcion'),
    habilidades: document.querySelector('#sobre-mi .habilidades')
  };
  
  function actualizarVistaSobreMi() {
    vistaSobreMi.descripcion.textContent = modeloSobreMi.descripcion;
    vistaSobreMi.habilidades.innerHTML = modeloSobreMi.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('');
  }