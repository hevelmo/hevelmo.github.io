let modeloSobreMi = {};

async function cargarDatosSobreMi() {
  const response = await fetch('assets/data/sobre-mi.json');
  const data = await response.json();
  modeloSobreMi = data;
  controladorSobreMi();
}