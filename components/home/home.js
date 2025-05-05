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

function saberMasPromo1() {
  const promocontainer1 = document.getElementById("content-area");
  if (promocontainer1) {
    fetch(
      navegarA("/components/promociones/promocion/promocion1/promocion1.html")
    )
      .then((response) => response.text())
      .then((html) => {
        promocontainer1.innerHTML = html;
        scrollToTop();
      })
      .catch((err) => console.error("Error al cargar la página:", err));
  } else {
    console.error("No se encontró el contenedor content-area");
  }
}

function saberMasPromo2() {
  const promocontainer2 = document.getElementById("content-area");
  if (promocontainer2) {
    fetch(
      navegarA("/components/promociones/promocion/promocion2/promocion2.html")
    )
      .then((response) => response.text())
      .then((html) => {
        promocontainer2.innerHTML = html;
        scrollToTop();
      })
      .catch((err) => console.error("Error al cargar la página:", err));
  } else {
    console.error("No se encontró el contenedor content-area");
  }
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

