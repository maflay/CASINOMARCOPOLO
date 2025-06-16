
function sliderPromo2(){

  const sliderTracklamp = document.getElementById("sliderTracklamp");
  const slideslamp = document.querySelectorAll(".slidelamp");
  const btnPrevlamp = document.getElementById("btn-prevlamp");
  const btnNextlamp = document.getElementById("btn-nextlamp");
  const dotsContainerlamp = document.getElementById("dotslamp");
  const visibleSlideslamp = window.matchMedia("(max-width: 768px)").matches ? 1 : 3;
  const totalPageslamp = Math.ceil(slideslamp.length / visibleSlideslamp);
  let currentPagelamp = 0; // cambia este nombre para evitar confusión con slideIndex

  function updateSlider() {
    const percentage = (100 / visibleSlideslamp) * currentPagelamp;
    sliderTracklamp.style.transform = `translateX(-${percentage}%)`;

    document.querySelectorAll(".dotlamp").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentPagelamp);
    });
  }

  function changeSlide(delta) {
    currentPagelamp = Math.max(0, Math.min(currentPagelamp + delta, totalPageslamp - 1));
    updateSlider();
  }

  function autoSlide() {
    currentPagelamp = currentPagelamp >= totalPageslamp - 1 ? 0 : currentPagelamp + 1;
    updateSlider();
  }

  function createDots() {
    dotsContainerlamp.innerHTML = "";
    for (let i = 0; i < totalPageslamp; i++) {
      const dot = document.createElement("span");
      dot.className = "dotlamp";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentPagelamp = i;
        resetAutoSlide();
        updateSlider();
      });
      dotsContainerlamp.appendChild(dot);
    }
  }

  let autoSlideInterval = setInterval(autoSlide, 5000); // cada 5 segundos

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 5000);
  }

  // Botones
  btnPrevlamp.addEventListener("click", () => {
    changeSlide(-1);
    resetAutoSlide();
  });

  btnNextlamp.addEventListener("click", () => {
    changeSlide(1);
    resetAutoSlide();
  });

  // Soporte touch
  let startX = 0;
  sliderTracklamp.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  sliderTracklamp.addEventListener("touchend", (e) => {
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

sliderPromo2();


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