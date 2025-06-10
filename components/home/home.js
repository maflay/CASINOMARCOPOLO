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
    interval = setInterval(nextSlide, 5000);
  }

  sedeBarra.addEventListener("click", () => {
     trackubicacion.style.transform = `translateX(-${0 * 100}%)`;
    radiosubicacion[0].checked = true;
    currentIndex = 1;
  });

  sedeBog.addEventListener("click", () => {
     trackubicacion.style.transform = `translateX(-${1 * 100}%)`;
    radiosubicacion[1].checked = true;
    currentIndex = 1;
  });

  sedeCas.addEventListener("click", () => {
     trackubicacion.style.transform = `translateX(-${2 * 100}%)`;
    radiosubicacion[2].checked = true;
    currentIndex = 1;
  });

  sedeCao.addEventListener("click", () => {
     trackubicacion.style.transform = `translateX(-${3 * 100}%)`;
    radiosubicacion[3].checked = true;
    currentIndex = 1;
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
  interval = setInterval(nextSlide, 5000);
}

sliderUbicaciones();

function toBarranquilla() {
  navegarA("barranquilla");
}
