(() => {
  fetch("/components/promociones/promocion-view/promocion-view.html")
    .then((res) => res.text())
    .then((html) => {
      const contenedor = document.getElementById("promocion-seccion");
      contenedor.innerHTML = html;

      const estilo = document.createElement("link");
      estilo.rel = "stylesheet";
      estilo.href = "/components/promociones/promocion-view/promocion-view.css";
      document.head.appendChild(estilo);
      // Cargar script dinámicamente
      const script = document.createElement("script");
      script.src = "/components/promociones/promocion-view/promocion-view.js";
      script.onload = () => {
        if (typeof window.inicializarSliderUbicaciones === "function") {
          window.inicializarSliderUbicaciones();
        }
      };
      document.body.appendChild(script);
    });
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

(() => {
  let _scrollY = 0;

  function lockBodyScroll() {
    _scrollY = window.scrollY || document.documentElement.scrollTop;
    document.body.style.top = `-${_scrollY}px`;
    document.body.classList.add("body-lock");
  }

  function unlockBodyScroll() {
    document.body.classList.remove("body-lock");
    document.body.style.top = "";
    window.scrollTo(0, _scrollY);
  }

  function toBlackjack() {
    document.getElementById("features-blackjack").style.display = "flex";
    lockBodyScroll();
  }

  function outBlackjack() {
    document.getElementById("features-blackjack").style.display = "none";
    unlockBodyScroll();
  }

  function toBaccarat() {
    document.getElementById("feature-baccarat").style.display = "flex";
    lockBodyScroll();
  }

  function outBaccarat() {
    document.getElementById("feature-baccarat").style.display = "none";
    unlockBodyScroll();
  }

  function toRuleta() {
    document.getElementById("feature-ruleta").style.display = "flex";
    lockBodyScroll();
  }

  function outRuleta() {
    document.getElementById("feature-ruleta").style.display = "none";
    unlockBodyScroll();
  }

  function toHipodromo() {
    document.getElementById("feature-hipodromo").style.display = "flex";
    lockBodyScroll();
  }

  function outHipodromo() {
    document.getElementById("feature-hipodromo").style.display = "none";
    unlockBodyScroll();
  }

  function toPoker() {
    document.getElementById("feature-poker").style.display = "flex";
    lockBodyScroll();
  }

  function outPoker() {
    document.getElementById("feature-poker").style.display = "none";
  }

  function toSlots() {
    document.getElementById("feature-slots").style.display = "flex";
    lockBodyScroll();
  }

  function outSlots() {
    document.getElementById("feature-slots").style.display = "none";
    unlockBodyScroll();
  }

  function toBaccaratGame() {
    navegarA("baccarat");
  }

  function toBlackjackGame() {
    navegarA("blackjack");
  }

  function toRuletaGame() {
    navegarA("ruleta");
  }

  function toHipodromoGame() {
    navegarA("hipodromo");
  }

  function toPokerGame() {
    navegarA("poker");
  }

  function toSlotsGame() {
    navegarA("slots");
  }

  function toLampara() {
    navegarA("lampara");
  }

  function toGiroDorado() {
    navegarA("girodorado");
  }

  function toDadosPoker() {
    navegarA("dadospoker");
  }
})();
