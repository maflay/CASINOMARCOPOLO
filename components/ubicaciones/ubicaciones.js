(() => {
  const btntoPromo = document.getElementById("toPromo");
  btntoPromo.addEventListener("click", ToPromos);

  function ToPromos() {
    navegarA("juegos");
  }
})();

function sliderBarra() {
  const trackbarranquilla = document.getElementById("sliderTrackbarranquilla2");
  const radiosbarranquilla = document.querySelectorAll(
    'input[name="slider-radio-barranquilla"]'
  );
  const labelsbarranquilla = document.querySelectorAll(
    ".slider-controlsbarranquilla label"
  );
  const prevBtnhbarranquilla = document.getElementById("prevBtnhbarranquilla");
  const nextBtnhbarranquilla = document.getElementById("nextBtnhbarranquilla");

  let currentIndexbarranquilla = 0;
  const totalSlidesbarranquilla = radiosbarranquilla.length;
  let intervalbarranquilla;

  function goToSlidebarranquilla(index) {
    trackbarranquilla.style.transform = `translateX(-${index * 100}%)`;
    radiosbarranquilla[index].checked = true;
    currentIndexbarranquilla = index;
  }

  function nextSlidebarranquilla() {
    let index = (currentIndexbarranquilla + 1) % totalSlidesbarranquilla;
    goToSlidebarranquilla(index);
  }

  function prevSlidebarranquilla() {
    let index =
      (currentIndexbarranquilla - 1 + totalSlidesbarranquilla) %
      totalSlidesbarranquilla;
    goToSlidebarranquilla(index);
  }

  function resetIntervalbarranquilla() {
    clearInterval(intervalbarranquilla);
    intervalbarranquilla = setInterval(nextSlidebarranquilla, 11000);
  }

  nextBtnhbarranquilla.addEventListener("click", () => {
    nextSlidebarranquilla();
    resetIntervalbarranquilla();
  });

  prevBtnhbarranquilla.addEventListener("click", () => {
    prevSlidebarranquilla();
    resetIntervalbarranquilla();
  });

  labelsbarranquilla.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlidebarranquilla(index);
      resetIntervalbarranquilla();
    });
  });

  intervalbarranquilla = setInterval(nextSlidebarranquilla, 11000);
}
if (document.getElementById("sliderTrackbarranquilla")) {
  sliderBarra();
}

function sliderBogota() {
  const trackbogota = document.getElementById("sliderTrackbogota2");
  const radiosbogota = document.querySelectorAll(
    'input[name="slider-radio-bogota"]'
  );
  const labelsbogota = document.querySelectorAll(
    ".slider-controlsbogota label"
  );
  const prevBtnhbogota = document.getElementById("prevBtnhbogota");
  const nextBtnhbogota = document.getElementById("nextBtnhbogota");

  let currentIndexbogota = 0;
  const totalSlidesbogota = radiosbogota.length;
  let intervalbogota;

  function goToSlidebogota(index) {
    trackbogota.style.transform = `translateX(-${index * 100}%)`;
    radiosbogota[index].checked = true;
    currentIndexbogota = index;
  }

  function nextSlidebogota() {
    let index = (currentIndexbogota + 1) % totalSlidesbogota;
    goToSlidebogota(index);
  }

  function prevSlidebogota() {
    let index =
      (currentIndexbogota - 1 + totalSlidesbogota) % totalSlidesbogota;
    goToSlidebogota(index);
  }

  function resetIntervalbogota() {
    clearInterval(intervalbogota);
    intervalbogota = setInterval(nextSlidebogota, 11000);
  }

  nextBtnhbogota.addEventListener("click", () => {
    nextSlidebogota();
    resetIntervalbogota();
  });

  prevBtnhbogota.addEventListener("click", () => {
    prevSlidebogota();
    resetIntervalbogota();
  });

  labelsbogota.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlidebogota(index);
      resetIntervalbogota();
    });
  });

  intervalbogota = setInterval(nextSlidebogota, 11000);
}

if (document.getElementById("sliderTrackbogota")) {
  sliderBogota();
}


function sliderOeste() {
  const trackoeste = document.getElementById("sliderTrackoeste2");
  const radiosoeste = document.querySelectorAll(
    'input[name="slider-radio-oeste"]'
  );
  const labelsoeste = document.querySelectorAll(
    ".slider-controlsoeste label"
  );
  const prevBtnhoeste = document.getElementById("prevBtnhoeste");
  const nextBtnhoeste = document.getElementById("nextBtnhoeste");

  let currentIndexoeste = 0;
  const totalSlidesoeste = radiosoeste.length;
  let intervaloeste;

  function goToSlideoeste(index) {
    trackoeste.style.transform = `translateX(-${index * 100}%)`;
    radiosoeste[index].checked = true;
    currentIndexoeste = index;
  }

  function nextSlideoeste() {
    let index = (currentIndexoeste + 1) % totalSlidesoeste;
    goToSlideoeste(index);
  }

  function prevSlideoeste() {
    let index = (currentIndexoeste - 1 + totalSlidesoeste) % totalSlidesoeste;
    goToSlideoeste(index);
  }

  function resetIntervaloeste() {
    clearInterval(intervaloeste);
    intervaloeste = setInterval(nextSlideoeste, 11000);
  }

  nextBtnhoeste.addEventListener("click", () => {
    nextSlideoeste();
    resetIntervaloeste();
  });

  prevBtnhoeste.addEventListener("click", () => {
    prevSlideoeste();
    resetIntervaloeste();
  });

  labelsoeste.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlideoeste(index);
      resetIntervaloeste();
    });
  });

  intervaloeste = setInterval(nextSlideoeste, 11000);
}

if (document.getElementById("sliderTrackoeste")) {
  sliderOeste();
}



function sliderSur() {

  const tracksur = document.getElementById("sliderTracksur2");
  const radiososur = document.querySelectorAll(
    'input[name="slider-radio-sur"]'
  );
  const labelssur = document.querySelectorAll(".slider-controlssur label");
  const prevBtnhsur = document.getElementById("prevBtnhsur");
  const nextBtnhsur = document.getElementById("nextBtnhsur");

  let currentIndexsur = 0;
  const totalSlidessur = radiososur.length;
  let intervalsur;

  function goToSlidesur(index) {
    tracksur.style.transform = `translateX(-${index * 100}%)`;
    radiososur[index].checked = true;
    currentIndexsur = index;
  }

  function nextSlidesur() {
    let index = (currentIndexsur + 1) % totalSlidessur;
    goToSlidesur(index);
  }

  function prevSlidesur() {
    let index = (currentIndexsur - 1 + totalSlidessur) % totalSlidessur;
    goToSlidesur(index);
  }

  function resetIntervalsur() {
    clearInterval(intervalsur);
    intervalsur = setInterval(nextSlidesur, 11000);
  }

  nextBtnhsur.addEventListener("click", () => {
    nextSlidesur();
    resetIntervalsur();
  });

  prevBtnhsur.addEventListener("click", () => {
    prevSlidesur();
    resetIntervalsur();
  });

  labelssur.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlidesur(index);
      resetIntervalsur();
    });
  });

  intervalsur = setInterval(nextSlidesur, 11000);
}

if (document.getElementById("sliderTracksur")) {
  sliderSur();
}