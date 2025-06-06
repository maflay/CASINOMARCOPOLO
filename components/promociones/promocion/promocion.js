// const fecha = new Date();
// console.log(fecha, "fecha");

// // This example takes 2 seconds to run
// const start = Date.now();

// console.log("starting timer...");
// // Expected output: "starting timer..."

// setTimeout(() => {
//   const ms = Date.now() - start;

//   console.log(`seconds elapsed = ${Math.floor(ms / 1000)}`);
//   // Expected output: "seconds elapsed = 2"
// }, 2000);

const sliderTrack = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");
let currentIndex = 0;
function updateSlider() {
  const slideWidth = document.querySelector(".slide").offsetWidth;
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
  console.log(currentIndex, "currentIndex");
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
