// TARJETA-MYMAWI

function ObtenerTarjeta() {
  const container = document.getElementById("content-area");
  if (container) {
    fetch(navegarA("/components/obtenertarjeta/obtenertarjeta.html"))
      .then((response) => response.text())
      .then((html) => {
        container.innerHTML = html;
        scrollToTop();
      })
      .catch((err) => console.error("Error al cargar la página:", err));
  } else {
    console.error("No se encontró el contenedor content-area");
  }
}

// PROMOCIONES

function saberMasPromo() {
  window.scrollTo(0, 0);
  navegarA("/components/promociones/promociones.html");
}

function asociarse() {
  const asociarsecontainer = document.getElementById("content-area");
  if (asociarsecontainer) {
    fetch(navegarA("/components/asociado/aosciado.html"))
      .then((response) => response.text())
      .then((html) => {
        asociarsecontainer.innerHTML = html;
        screenTop();
      })
      .catch((err) => console.log("Error al cargar la pagina:", err));
  } else {
    console.log("No se encontro el contenedo content-area");
  }
}
