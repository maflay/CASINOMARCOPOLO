function toBlackjack() {
  document.getElementById("features-blackjack").style.display = "flex";
}

function outBlackjack() {
  document.getElementById("features-blackjack").style.display = "none";
}

function toBaccarat() {
  document.getElementById("feature-baccarat").style.display = "flex";
}

function outBaccarat() {
  document.getElementById("feature-baccarat").style.display = "none";
}

function toRuleta() {
  document.getElementById("feature-ruleta").style.display = "flex";
}

function outRuleta() {
  document.getElementById("feature-ruleta").style.display = "none";
}

function toHipodromo() {
  document.getElementById("feature-hipodromo").style.display = "flex";
}

function outHipodromo() {
  document.getElementById("feature-hipodromo").style.display = "none";
}

function toPoker() {
  document.getElementById("feature-poker").style.display = "flex";
}

function outPoker() {
  document.getElementById("feature-poker").style.display = "none";
}

function toSlots() {
  document.getElementById("feature-slots").style.display = "flex";
}

function outSlots() {
  document.getElementById("feature-slots").style.display = "none";
}

function toBaccaratGame() {
  navegarA("baccarat");
}

function toBlackjackGame() {
  navegarA("blackjack");
}

function toRuletaGame() {
  navegarA("ruleta");
}

function toHipodromoGame() {
  navegarA("hipodromo");
}

function toPokerGame() {
  navegarA("poker");
}

function toSlotsGame() {
  navegarA("slots");
}

function toLampara() {
  navegarA("lampara");
}

function toGiroDorado() {
  navegarA("girodorado");
}

function toDadosPoker() {
  navegarA("dadospoker");
}

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