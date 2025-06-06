// TARJETA-MYMAWI

function ObtenerTarjeta() {
  navegarA("obtenertarjeta");
}

// PROMOCIONES

function saberMasPromo() {
  window.scrollTo(0, 0);
  navegarA("promociones");
}

function asociarse() {
  navegarA("asociado");
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, 300);
}

function toprogresivos() {
  navegarA("clubnavegante?id=section-progresivos");
}

// ENVIO DE CASH
function enviocash() {
  const form = document.getElementById("cash-unico");
  const loading = document.getElementById("loading");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevenir redirección
      const formData = new FormData(form);
      loading.style.display = "flex";
      fetch("/components/home/guardar.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status == 200 || response.status != 200) {
            Swal.fire({
              icon: "success",
              title: "¡Éxito!",
              text: "Datos enviados correctamente, Gracias.",
            });
            form.reset(); // Limpia el formulario
            loading.style.display = "none"; //Oculta el loader
          } else {
            Swal.fire({
              icon: "error",
              title: "¡Error!",
              text: "!Lo sentimos ha ocurrido un error. Inténtalo más tarde",
            });
            loading.style.display = "none"; //Oculta el loader
          }
        })
        .catch((error) => {
          alert("Error. Inténtalo más tarde", error.text);
        });
    });
  }
}

enviocash();

// Slider Principal

function sliderMain() {
  const track = document.getElementById("sliderTrack");
  const radios = document.querySelectorAll('input[name="slider"]');
  const labels = document.querySelectorAll(".navigation label");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

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
    interval = setInterval(nextSlide, 5000);
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  labels.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });
  });
  interval = setInterval(nextSlide, 5000);
}

sliderMain();


function sliderUbicaciones() {
  const trackubicacion = document.getElementById("sliderTrackubicacion");
  const radiosubicacion = document.querySelectorAll('input[name="slider-ubicacion"]');
  const labelsubicacion = document.querySelectorAll(".navigationubicacion label");
  const prevBtnubicacion = document.getElementById("prevBtn-ubicacion");
  const nextBtnubicacion = document.getElementById("nextBtn-ubicacion");

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
    interval = setInterval(nextSlide, 5000);
  }

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
  interval = setInterval(nextSlide, 5000);
}

sliderUbicaciones();


// Slider Muestras
// function slidermuestra() {
//   const trackMuestras = document.getElementById("sliderTrackMuestras");
//   const radiosMuestras = document.querySelectorAll(
//     'input[name="slider-muestras"]'
//   );
//   const labelsMuestras = document.querySelectorAll(
//     ".navigation-muestras label"
//   );
//   const prevBtnMuestra = document.getElementById("prevBtnMuestra");
//   const nextBtnMuestra = document.getElementById("nextBtnMuestra");

//   let currentIndexMuestra = 0;
//   const totalSlidesMuestra = radiosMuestras.length;
//   let intervalMuestra;

//   function goToSlideMuestra(index) {
//     trackMuestras.style.transform = `translateX(-${index * 100}vw)`;
//     radiosMuestras[index].checked = true;
//     currentIndexMuestra = index;
//   }

//   function nextSlideMuestra() {
//     let index = (currentIndexMuestra + 1) % totalSlidesMuestra;
//     goToSlideMuestra(index);
//   }

//   function prevSlideMuestra() {
//     let index =
//       (currentIndexMuestra - 1 + totalSlidesMuestra) % totalSlidesMuestra;
//     goToSlideMuestra(index);
//   }

//   function resetIntervalMuestra() {
//     clearInterval(intervalMuestra);
//     intervalMuestra = setInterval(nextSlideMuestra, 3000);
//   }

//   nextBtnMuestra.addEventListener("click", () => {
//     nextSlideMuestra();
//     resetIntervalMuestra();
//   });

//   prevBtnMuestra.addEventListener("click", () => {
//     prevSlideMuestra();
//     resetIntervalMuestra();
//   });

//   labelsMuestras.forEach((label, index) => {
//     label.addEventListener("click", () => {
//       goToSlideMuestra(index);
//       resetIntervalMuestra();
//     });
//   });
//   intervalMuestra = setInterval(nextSlideMuestra, 3000);
// }
// slidermuestra();
