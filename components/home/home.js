// TARJETA-MYMAWI

function membresia() {
  navegarA("membresia");
}

// PROMOCIONES

function saberMasPromo() {
  window.scrollTo(0, 0);
  navegarA("promociones");
}


// function sliderUbicaciones() {
//   const trackubicacion = document.getElementById("sliderTrackubicacion");
//   const radiosubicacion = document.querySelectorAll(
//     'input[name="slider-ubicacion"]'
//   );
//   const labelsubicacion = document.querySelectorAll(
//     ".navigationubicacion label"
//   );
//   const prevBtnubicacion = document.getElementById("prevBtn-ubicacion");
//   const nextBtnubicacion = document.getElementById("nextBtn-ubicacion");
//   const sedeBarra = document.getElementById("sedeBar");
//   const sedeBog = document.getElementById("sedeBog");
//   const sedeCas = document.getElementById("sedeCas");
//   const sedeCao = document.getElementById("sedeCao");

//   let currentIndex = 0;
//   const totalSlides = radiosubicacion.length;
//   let interval;

//   function goToSlide(index) {
//     trackubicacion.style.transform = `translateX(-${index * 100}%)`;
//     radiosubicacion[index].checked = true;
//     currentIndex = index;
//   }
//   function nextSlide() {
//     let index = (currentIndex + 1) % totalSlides;
//     goToSlide(index);
//   }

//   function prevSlide() {
//     let index = (currentIndex - 1 + totalSlides) % totalSlides;
//     goToSlide(index);
//   }

//   function resetInterval() {
//     clearInterval(interval);
//     interval = setInterval(nextSlide, 10000);
//   }

//   sedeBarra.addEventListener("click", () => {
//     navegarA("barranquilla");
//   });

//   sedeBog.addEventListener("click", () => {
//     navegarA("bogota");
//   });

//   sedeCas.addEventListener("click", () => {
//     navegarA("calisur");
//   });

//   sedeCao.addEventListener("click", () => {
//     navegarA("calioeste");
//   });

//   nextBtnubicacion.addEventListener("click", () => {
//     nextSlide();
//     resetInterval();
//   });

//   prevBtnubicacion.addEventListener("click", () => {
//     prevSlide();
//     resetInterval();
//   });

//   labelsubicacion.forEach((label, index) => {
//     label.addEventListener("click", () => {
//       goToSlide(index);
//       resetInterval();
//     });
//   });
//   interval = setInterval(nextSlide, 10000);
// }

// sliderUbicaciones();

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

// function sliderhome() {
//   const track = document.getElementById("sliderTrack2");
//   const radios = document.querySelectorAll('input[name="slider-radio"]');
//   const labels = document.querySelectorAll(".slider-controls label");
//   const prevBtnh = document.getElementById("prevBtnh");
//   const nextBtnh = document.getElementById("nextBtnh");

//   let currentIndex = 0;
//   const totalSlides = radios.length;
//   let interval;

//   function goToSlide(index) {
//     track.style.transform = `translateX(-${index * 100}vw)`;
//     radios[index].checked = true;
//     currentIndex = index;
//   }

//   function nextSlide() {
//     let index = (currentIndex + 1) % totalSlides;
//     goToSlide(index);
//   }

//   function prevSlide() {
//     let index = (currentIndex - 1 + totalSlides) % totalSlides;
//     goToSlide(index);
//   }

//   function resetInterval() {
//     clearInterval(interval);
//     interval = setInterval(nextSlide, 11000);
//   }

//   nextBtnh.addEventListener("click", () => {
//     nextSlide();
//     resetInterval();
//   });

//   prevBtnh.addEventListener("click", () => {
//     prevSlide();
//     resetInterval();
//   });

//   labels.forEach((label, index) => {
//     label.addEventListener("click", () => {
//       goToSlide(index);
//       resetInterval();
//     });
//   });

//   interval = setInterval(nextSlide, 11000);
// }

// sliderhome();

(() => {
  const estadoBarraEl = document.getElementById("estadoBarra");
  const estadoBogoEl = document.getElementById("estadoBog");
  const estadoCalsEl = document.getElementById("estadoCals");
  const estadoCaloEl = document.getElementById("estadoCalo");

  // Define horarios en formato HHMM (ej: 930 = 09:30 AM, 2415 = 12:15 AM del siguiente día)
  const horaAperturaBarra = 900;
  const horaCierreBarra = 2400;

  const horaAperturaBogo = 930;
  const horaCierreBogo = 2330;

  const horaAperturaCals = 1000;
  const horaCierreCals = 2200;

  const horaAperturaCalo = 830;
  const horaCierreCalo = 2230;

  function verificarHorario() {
    const ahora = new Date();
    const horaActual = ahora.getHours(); // 0–23
    const minutosActual = ahora.getMinutes(); // 0–59
    const horaEnHM = horaActual * 100 + minutosActual; // ej: 14:30 -> 1430

    function actualizarEstado(elemento, apertura, cierre) {
      if (horaEnHM >= apertura && horaEnHM < cierre) {
        elemento.textContent = "Abierto";
        elemento.classList.add("abierto");
        elemento.classList.remove("cerrado");
      } else {
        elemento.textContent = "Cerrado";
        elemento.classList.add("cerrado");
        elemento.classList.remove("abierto");
      }
    }

    actualizarEstado(estadoBarraEl, horaAperturaBarra, horaCierreBarra);
    actualizarEstado(estadoBogoEl, horaAperturaBogo, horaCierreBogo);
    actualizarEstado(estadoCalsEl, horaAperturaCals, horaCierreCals);
    actualizarEstado(estadoCaloEl, horaAperturaCalo, horaCierreCalo);
  }

  verificarHorario();
  setInterval(verificarHorario, 60000); // actualiza cada minuto
})();

function sliderhome() {
  const track = document.getElementById("sliderTrackC");
  const radios = document.querySelectorAll('input[name="slider-radioC"]');
  const labels = document.querySelectorAll(".slider-controlsC label");
  const prevBtnh = document.getElementById("prevBtnC");
  const nextBtnh = document.getElementById("nextBtnC");

  let currentIndex = 0;
  const totalSlides = radios.length;
  let interval;
  let startX = 0;
  let deltaX = 0;
  let isDragging = false;

  function goToSlide(index) {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${index * 100}vw)`;
    radios[index].checked = true;
    currentIndex = index;
  }

  function nextSlide() {
    const index = (currentIndex + 1) % totalSlides;
    goToSlide(index);
  }

  function prevSlide() {
    const index = (currentIndex - 1 + totalSlides) % totalSlides;
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

  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    deltaX = 0;
    track.style.transition = "none";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    deltaX = e.pageX - startX;
    track.style.transform = `translateX(calc(-${currentIndex * 100}vw + ${deltaX}px))`;
  });

  track.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.5s ease";
    handleSwipe();
  });

  track.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      track.style.transition = "transform 0.5s ease";
      handleSwipe();
    }
  });

  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    deltaX = 0;
    track.style.transition = "none";
  }, { passive: true });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    deltaX = e.touches[0].clientX - startX;
    track.style.transform = `translateX(calc(-${currentIndex * 100}vw + ${deltaX}px))`;
  }, { passive: true });

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.5s ease";
    handleSwipe();
  });

  function handleSwipe() {
    if (deltaX > 50) {
      prevSlide();
    } else if (deltaX < -50) {
      nextSlide();
    } else {
      goToSlide(currentIndex);
    }
    resetInterval();
  }

  goToSlide(currentIndex);
}


sliderhome();