function inicializarSliderUbicaciones() {
  const sliderTrack = document.getElementById("sliderTrackpromo");
  const slides = document.querySelectorAll(".slidepromo");
  const btnPrev = document.getElementById("btn-prevpromo");
  const btnNext = document.getElementById("btn-nextpromo");
  const dotsContainer = document.getElementById("dotspromo");

  if (!sliderTrack || slides.length === 0) return;

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

  let autoSlideInterval = setInterval(autoSlide, 5000);
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 5000);
  }

  btnPrev.addEventListener("click", () => {
    changeSlide(-1);
    resetAutoSlide();
  });

  btnNext.addEventListener("click", () => {
    changeSlide(1);
    resetAutoSlide();
  });

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

inicializarSliderUbicaciones();
