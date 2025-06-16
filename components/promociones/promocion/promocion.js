function sliderUbi(){

  const sliderTrack = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const dotsContainer = document.getElementById("dots");
  const visibleSlides = window.matchMedia("(max-width: 768px)").matches ? 1 : 3;
  const totalPages = Math.ceil(slides.length / visibleSlides);
  let currentPage = 0; // cambia este nombre para evitar confusión con slideIndex

  function updateSlider() {
    const percentage = (100 / visibleSlides) * currentPage;
    sliderTrack.style.transform = `translateX(-${percentage}%)`;

    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentPage);
    });
  }

  function changeSlide(delta) {
    currentPage = Math.max(0, Math.min(currentPage + delta, totalPages - 1));
    updateSlider();
  }

  function autoSlide() {
    currentPage = currentPage >= totalPages - 1 ? 0 : currentPage + 1;
    updateSlider();
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentPage = i;
        resetAutoSlide();
        updateSlider();
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
}

sliderUbi();


(() => {
  const btnNext1 = document.getElementById("next-to-1");
  const btnNext2 = document.getElementById("next-to-2");
  const btnNext3 = document.getElementById("next-to-3");

  if (btnNext1) {
    btnNext1.addEventListener("click", () => {
      navegarA("lampara");
    });
  }

  if (btnNext2) {
    btnNext2.addEventListener("click", () => {
      navegarA("girodorado");
    });
  }

  if (btnNext3) {
    btnNext3.addEventListener("click", () => {
      navegarA("dadospoker");
    });
  }
})();
