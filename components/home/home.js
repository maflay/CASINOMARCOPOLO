// TARJETA-MYMAWI

function ObtenerTarjeta() {
  navegarA("obtenertarjeta");
}

// PROMOCIONES

function saberMasPromo() {
  window.scrollTo(0, 0);
  navegarA("promociones");
}
(() => {
  const btnBarranquilla = document.getElementById("toBarranquilla");
  const btnBogota = document.getElementById("toBogota");
  const btnCalisur = document.getElementById("toCalisur");
  const btnCaliO = document.getElementById("toCalioeste");

  btnBarranquilla.addEventListener("click", () => {
    navegarA("barranquilla");
  });

  btnBogota.addEventListener("click", () => {
    navegarA("bogota");
  });

  btnCalisur.addEventListener("click", () => {
    navegarA("calisur");
  });

  btnCaliO.addEventListener("click", () => {
    navegarA("calioeste");
  });
})();

function sliderUbicaciones() {
  const trackubicacion = document.getElementById("sliderTrackubicacion");
  const radiosubicacion = document.querySelectorAll(
    'input[name="slider-ubicacion"]'
  );
  const labelsubicacion = document.querySelectorAll(
    ".navigationubicacion label"
  );
  const prevBtnubicacion = document.getElementById("prevBtn-ubicacion");
  const nextBtnubicacion = document.getElementById("nextBtn-ubicacion");
  const sedeBarra = document.getElementById("sedeBar");
  const sedeBog = document.getElementById("sedeBog");
  const sedeCas = document.getElementById("sedeCas");
  const sedeCao = document.getElementById("sedeCao");

  let currentIndex = 0;
  const totalSlides = radiosubicacion.length;
  let interval;

  function goToSlide(index) {
    trackubicacion.style.transform = `translateX(-${index * 100}%)`;
    radiosubicacion[index].checked = true;
    currentIndex = index;
  }
  function nextSlide() {
    let index = (currentIndex + 1) % totalSlides;
    goToSlide(index);
  }

  function prevSlide() {
    let index = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(index);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 10000);
  }

  sedeBarra.addEventListener("click", () => {
    navegarA("barranquilla");
  });

  sedeBog.addEventListener("click", () => {
    navegarA("bogota");
  });

  sedeCas.addEventListener("click", () => {
    navegarA("calisur");
  });

  sedeCao.addEventListener("click", () => {
    navegarA("calioeste");
  });

  nextBtnubicacion.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtnubicacion.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  labelsubicacion.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });
  });
  interval = setInterval(nextSlide, 10000);
}

sliderUbicaciones();

function toGames() {
  navegarA("juegos");
}

(() => {
  const btnToBarraMvil = document.getElementById("toBarraMovil");
  const btnToBogMvil = document.getElementById("toBogMovil");
  const btnToCaliSMvil = document.getElementById("toCaliSMovil");
  const btnToCaliOMvil = document.getElementById("toCaliOMovil");

  if (btnToBarraMvil) {
    btnToBarraMvil.addEventListener("click", () => {
      navegarA("barranquilla");
    });
  }

  if (btnToBogMvil) {
    btnToBogMvil.addEventListener("click", () => {
      navegarA("bogota");
    });
  }

  if (btnToCaliSMvil) {
    btnToCaliSMvil.addEventListener("click", () => {
      navegarA("calisur");
    });
  }

  if (btnToCaliOMvil) {
    btnToCaliOMvil.addEventListener("click", () => {
      navegarA("calioeste");
    });
  }
})();

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

function sliderhome() {
  const track = document.getElementById("sliderTrack2");
  const radios = document.querySelectorAll('input[name="slider-radio"]');
  const labels = document.querySelectorAll(".slider-controls label");
  const prevBtnh = document.getElementById("prevBtnh");
  const nextBtnh = document.getElementById("nextBtnh");

  let currentIndex = 0;
  const totalSlides = radios.length;
  let interval;

  function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}vw)`;
    radios[index].checked = true;
    currentIndex = index;
  }

  function nextSlide() {
    let index = (currentIndex + 1) % totalSlides;
    goToSlide(index);
  }

  function prevSlide() {
    let index = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(index);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 11000);
  }

  nextBtnh.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtnh.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  labels.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });
  });

  interval = setInterval(nextSlide, 11000);
}

sliderhome();
