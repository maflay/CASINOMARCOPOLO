(() => {
const sliderTrack = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");


const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

if (btnPrev) {
  btnPrev.addEventListener("click", prevSlide);
}

if (btnNext) {
  btnNext.addEventListener("click", nextSlide);
}


let currentIndex = 0;
function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
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

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  } else {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }
}

function createDots() {
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

setInterval(() => {
  nextSlide();
}, 6000);
})();