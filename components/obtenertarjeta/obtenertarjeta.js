document.addEventListener("DOMContentLoaded", function () {
  function enviarFormularioTarjeta() {
    const form = document.getElementById("form-tarjeta");
    const message = document.getElementById("form-message-tarjeta");
    const loading = document.getElementById("loading");
    const nombre = document.getElementById("nombre-tarjeta").value.trim();
    const email = document.getElementById("email-tarjeta").value.trim();
    const telefono = document.getElementById("telefono-tarjeta").value.trim();
    const direccion = document.getElementById("direccion-tarjeta").value.trim();
    const ciudad = document.getElementById("ciudad-tarjeta").value.trim();

    if (!nombre || !email || !telefono || !direccion || !ciudad) {
      alert("Por favor completa todos los campos.");
      return;
    }
    if (!form) return;

    const formData = new FormData(form);

    loading.style.display = "flex";
    fetch("/components/obtenertarjeta/guardar_tarjeta.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status == 200) {
          loading.style.display = "none";
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Datos enviados correctamente.",
          });
          form.reset();
        } else {
          loading.style.display = "none";
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Los datos no fueron enviados correctamente. Intentalo mas tarde.",
          });
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function toprogresivos() {
    navegarA("clubnavegante?id=section-progresivos");
  }

  document.getElementById("cambiarFondoBtn").addEventListener("click", () => {
    const img = document.getElementById("miImagen");
    const btn = document.getElementById("cambiarFondoBtn");
    if (img.src.includes("tarjeta-mymawi-negraV2.png")) {
      img.src = "/resources/tarjeta-mymawi-rojaV2.png";
      btn.textContent = "Negro";
    } else {
      img.src = "/resources/tarjeta-mymawi-negraV2.png";
      btn.textContent = "Rojo";
    }
  });
});

(() => {
  const sliderTrack = document.getElementById("sliderTrackpromo");
  const slides = document.querySelectorAll(".slidepromo");
  const btnPrev = document.getElementById("btn-prevpromo");
  const btnNext = document.getElementById("btn-nextpromo");
  const dotsContainer = document.getElementById("dotspromo");

  let currentIndex = 0;
  const visibleSlides = window.innerWidth <= 768 ? 1 : 3;
  const totalPages = Math.ceil(slides.length / visibleSlides);
  const totalSteps = slides.length - visibleSlides;

  function updateSlider() {
    const percentage = (100 / visibleSlides) * currentIndex;
    sliderTrack.style.transform = `translateX(-${percentage}%)`;

    document.querySelectorAll(".dotpromo").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function changeSlide(delta) {
    currentIndex = Math.max(0, Math.min(currentIndex + delta, totalSteps));
    updateSlider();
  }

  function autoSlide() {
    currentIndex = currentIndex >= totalSteps ? 0 : currentIndex + 1;
    updateSlider();
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.className = "dotpromo";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider();
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    }
  }

  let autoSlideInterval = setInterval(autoSlide, 5000); // cada 5 segundos

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 5000);
  }

  // Botones
  btnPrev.addEventListener("click", () => {
    changeSlide(-1);
    resetAutoSlide();
  });

  btnNext.addEventListener("click", () => {
    changeSlide(1);
    resetAutoSlide();
  });

  // Soporte touch
  let startX = 0;
  sliderTrack.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  sliderTrack.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) {
      changeSlide(-1);
      resetAutoSlide();
    } else if (diff < -50) {
      changeSlide(1);
      resetAutoSlide();
    }
  });

  createDots();
  updateSlider();
})();
