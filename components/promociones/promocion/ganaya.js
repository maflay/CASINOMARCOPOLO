(() => {
  const cascadapremios = document.getElementById("next-to-cascada-premios");
  const bingoLocura = document.getElementById("next-to-bingo-locura");
  if (cascadapremios) {
    cascadapremios.addEventListener("click", () => {
      navegarA("cascadapremios");
    });
  }

  if (bingoLocura) {
    bingoLocura.addEventListener("click", () => {
      navegarA("bingolocura");
    });
  }
})();

(() => {
  fetch("/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.html")
    .then((res) => res.text())
    .then((html) => {
      const contenedor = document.getElementById("ubicacion-seccion");
      contenedor.innerHTML = html;

      // Cargar CSS dinámicamente
      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href =
        "/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.css";
      document.head.appendChild(estilo);

      // Cargar script dinámicamente
      const script = document.createElement("script");
      script.src =
        "/components/ubicaciones/slider-ubicaciones/slider-ubicaciones.js";
      script.onload = () => {
        if (typeof window.inicializarSliderUbicaciones === "function") {
          window.inicializarSliderUbicaciones();
        }
      };
      document.body.appendChild(script);
    });
})();

function toPromos(){
  navegarA("promociones");
}