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
        console.log(response.status, "status");
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
  const sliderTrack = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("dots");

  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  if (
    !sliderTrack ||
    slides.length === 0 ||
    !dotsContainer ||
    !btnPrev ||
    !btnNext
  )
    return;
  let currentIndex = 0;

  let isTouching = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  btnPrev.addEventListener("click", () => changeSlide(-1));
  btnNext.addEventListener("click", () => changeSlide(1));

  function goToSlide(index) {
    currentIndex = index;
    sliderTrack.style.transition = "transform 0.3s ease";
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function updateSlider() {
    goToSlide(currentIndex);
  }

  function changeSlide(delta) {
    currentIndex = (currentIndex + delta + slides.length) % slides.length;
    updateSlider();
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  createDots();

  function initSlider() {
    createDots();
    updateSlider();
    setupTouchEvents();
    setupAutoSlide();
  }

  initSlider();

  function setupAutoSlide() {
    if (window.autoSlideInterval) clearInterval(window.autoSlideInterval);
    window.autoSlideInterval = setInterval(() => changeSlide(1), 6000);
  }

  function setupTouchEvents() {
    if (sliderTrack.dataset.initialized) return;
    sliderTrack.dataset.initialized = "true";

    sliderTrack.addEventListener("touchstart", stopAutoSlide);
    sliderTrack.addEventListener("touchend", setupAutoSlide);

    sliderTrack.addEventListener("touchstart", handleTouchStart);
    sliderTrack.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    sliderTrack.addEventListener("touchend", handleTouchEnd);
  }

  function handleTouchStart(e) {
    isTouching = true;
    startX = e.touches[0].clientX;
    prevTranslate = currentIndex * -sliderTrack.offsetWidth;
    sliderTrack.style.transition = "none"; // solo aquí
    cancelAnimationFrame(animationID);
  }

  function handleTouchMove(e) {
    if (!isTouching) return;
    e.preventDefault(); // <- Necesario con passive: false
    const currentX = e.touches[0].clientX;
    const delta = currentX - startX;
    currentTranslate = prevTranslate + delta;
    sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
  }

  function handleTouchEnd() {
    isTouching = false;
    const movedBy = currentTranslate - prevTranslate;
    const threshold = sliderTrack.offsetWidth * 0.2;

    if (movedBy < -threshold && currentIndex < slides.length - 1) {
      currentIndex++;
    } else if (movedBy > threshold && currentIndex > 0) {
      currentIndex--;
    }

    updateSlider();
  }

  function stopAutoSlide() {
    clearInterval(window.autoSlideInterval);
  }
})();
