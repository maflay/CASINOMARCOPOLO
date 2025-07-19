function toLampara() {
  navegarA("lampara");
}

function toGiroDorado() {
  navegarA("girodorado");
}

function toDadosPoker() {
  navegarA("dadospoker");
}

function toMymawi() {
  navegarA("mymawitepremia");
}
function toCascadapremios() {
  navegarA("cascadapremios");
}
function toGanaya() {
  navegarA("ganaya");
}

function toBingolocura() {
  navegarA("bingolocura");
}

function toSuperbingo() {
  navegarA("superbingo");
}

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

(() => {

  const horaFull = document.getElementById("cuenta-regresiva");
  if (!horaFull) {
    return;
  }else{

  function actualizarCuentaRegresiva() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = ahora.getMonth(); // 0-indexado: enero es 0

    // Siguiente mes (si es diciembre, pasa a enero del siguiente año)
    const siguienteMes = new Date(año, mes + 1, 1, 0, 0, 0);

    const diferencia = siguienteMes - ahora;



    if (diferencia <= 0) {
      horaFull.innerText = "¡Ya es el nuevo mes!";
      return;
    }

    const segundosTotales = Math.floor(diferencia / 1000);
    const dias = Math.floor(segundosTotales / (60 * 60 * 24));
    const horas = Math.floor((segundosTotales % (60 * 60 * 24)) / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;

    horaFull.innerText =
      ` ${dias}d ${horas}h ${minutos}m ${segundos}s para las próximas ven y no te las pierdas.`;
  }
  }

  // Actualiza cada segundo
  actualizarCuentaRegresiva();
  setInterval(actualizarCuentaRegresiva, 1000);
})();
