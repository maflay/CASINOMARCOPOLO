function validatePolitica() {
  const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
  });

  document.getElementById("anio_politica_datos").textContent = fechaCompleta;
}

validatePolitica();
