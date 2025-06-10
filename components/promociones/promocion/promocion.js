(() => {
  const sliderTrack = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("dots");

  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  let currentIndex = 0;

  let isTouching = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      } else {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      if (currentIndex < slides.length - 3) {
        currentIndex++;
        updateSlider();
      } else {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
      }
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    sliderTrack.style.transition = "transform 0.3s ease";
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();

    // restaurar la transición luego del movimiento
    setTimeout(() => {
      sliderTrack.style.transition = "none";
    }, 300);
  }

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function updateSlider() {
    goToSlide(currentIndex);
  }

  function nextSlide() {
    if (currentIndex < slides.length - 3) {
      currentIndex++;
      updateSlider();
    } else {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }
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

  if (window.autoSlideInterval) {
    clearInterval(window.autoSlideInterval);
  }

  window.autoSlideInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, 6000);

  if (!sliderTrack.dataset.initialized) {
    sliderTrack.dataset.initialized = "true";

    sliderTrack.addEventListener("touchstart", () => {
      clearInterval(autoSlideInterval);
    });

    sliderTrack.addEventListener("touchend", () => {
      autoSlideInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
      }, 6000);
    });

    sliderTrack.addEventListener("touchstart", (e) => {
      isTouching = true;
      startX = e.touches[0].clientX;
      prevTranslate = currentIndex * -sliderTrack.offsetWidth;
      cancelAnimationFrame(animationID);
    });

    sliderTrack.addEventListener("touchmove", (e) => {
      if (!isTouching) return;
      const currentX = e.touches[0].clientX;
      const delta = currentX - startX;
      currentTranslate = prevTranslate + delta;
      sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
      
    });

    sliderTrack.addEventListener("touchend", () => {
      isTouching = false;
      const movedBy = currentTranslate - prevTranslate;

      const threshold = sliderTrack.offsetWidth * 0.2;

      if (movedBy < -threshold && currentIndex < slides.length - 1) {
        currentIndex++;
      } else if (movedBy > threshold && currentIndex > 0) {
        currentIndex--;
      }

      updateSlider();
    });
  }
})();
