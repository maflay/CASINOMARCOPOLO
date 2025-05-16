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
  navegarA("asociado")
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, 300);
}

function toprogresivos(){
  navegarA("clubnavegante?id=section-progresivos");
}



    // // Slider Principal
    // const track = document.getElementById("sliderTrack");
    // const dots = document.querySelectorAll(".dot");
    // const prevBtn = document.getElementById("prevBtn");
    // const nextBtn = document.getElementById("nextBtn");

    // let currentIndex = 0;
    // const totalSlides = dots.length;
    // let interval;

    // function goToSlide(index) {
    //   track.style.transform = `translateX(-${index * 100}vw)`;
    //   dots.forEach(dot => dot.classList.remove("active"));
    //   dots[index].classList.add("active");
    //   currentIndex = index;
    // }

    // function nextSlide() {
    //   let index = (currentIndex + 1) % totalSlides;
    //   goToSlide(index);
    // }

    // function prevSlide() {
    //   let index = (currentIndex - 1 + totalSlides) % totalSlides;
    //   goToSlide(index);
    // }

    // function resetInterval() {
    //   clearInterval(interval);
    //   interval = setInterval(nextSlide, 5000);
    // }

    // // Botones
    // nextBtn.addEventListener("click", () => {
    //   nextSlide();
    //   resetInterval();
    // });

    // prevBtn.addEventListener("click", () => {
    //   prevSlide();
    //   resetInterval();
    // });

    // // Dots
    // dots.forEach(dot => {
    //   dot.addEventListener("click", () => {
    //     let index = parseInt(dot.dataset.index);
    //     goToSlide(index);
    //     resetInterval();
    //   });
    // });

    // // Auto Slide
    // interval = setInterval(nextSlide, 5000);


    // Slider Muestras
    function slidermuestra(){

    const trackMuestras = document.getElementById("sliderTrackMuestras");
    const radiosMuestras = document.querySelectorAll('input[name="slider-muestras"]');
    const labelsMuestras = document.querySelectorAll(".navigation-muestras label");
    const prevBtnMuestra = document.getElementById("prevBtnMuestra");
    const nextBtnMuestra = document.getElementById("nextBtnMuestra");

    let currentIndexMuestra = 0;
    const totalSlidesMuestra = radiosMuestras.length;
    let intervalMuestra;

    function goToSlideMuestra(index) {
      trackMuestras.style.transform = `translateX(-${index * 100}vw)`;
      radiosMuestras[index].checked = true;
      currentIndexMuestra = index;
    }

    function nextSlideMuestra() {
      let index = (currentIndexMuestra + 1) % totalSlidesMuestra;
      goToSlideMuestra(index);
    }

    function prevSlideMuestra() {
      let index = (currentIndexMuestra - 1 + totalSlidesMuestra) % totalSlidesMuestra;
      goToSlideMuestra(index);
    }

    function resetIntervalMuestra() {
      clearInterval(intervalMuestra);
      intervalMuestra = setInterval(nextSlideMuestra, 3000);
    }

    nextBtnMuestra.addEventListener("click", () => {
      nextSlideMuestra();
      resetIntervalMuestra();
    });

    prevBtnMuestra.addEventListener("click", () => {
      prevSlideMuestra();
      resetIntervalMuestra();
    });

    labelsMuestras.forEach((label, index) => {
      label.addEventListener("click", () => {
        goToSlideMuestra(index);
        resetIntervalMuestra();
      });
    });
    intervalMuestra = setInterval(nextSlideMuestra, 3000);
    }
slidermuestra();