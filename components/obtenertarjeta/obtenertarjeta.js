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

function slidertarjeta() {
  const trackMuestras = document.getElementById("sliderTrackMuestras");
  const radiosMuestras = document.querySelectorAll(
    'input[name="slider-muestras"]'
  );
  const labelsMuestras = document.querySelectorAll(
    ".navigation-muestras label"
  );
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
    let index =
      (currentIndexMuestra - 1 + totalSlidesMuestra) % totalSlidesMuestra;
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

slidertarjeta();

function slidergrid() {
  const trackGrid = document.getElementById("sliderTrackGrid");
  const radiosGrid = document.querySelectorAll('input[name="slider-grid"]');
  const labelsGrid = document.querySelectorAll(".navigation-grid label");
  const prevBtnGrid = document.getElementById("prevBtnGrid");
  const nextBtnGrid = document.getElementById("nextBtnGrid");

  let currentIndexGrid = 0;
  const totalSlidesGrid = radiosGrid.length;
  let intervalGrid;

  function goToSlideGrid(index) {
    trackGrid.style.transform = `translateX(-${index * 100}%)`;
    radiosGrid[index].checked = true;
    currentIndexGrid = index;
  }

  function nextSlideGrid() {
    let index = (currentIndexGrid + 1) % totalSlidesGrid;
    goToSlideGrid(index);
  }

  function prevSlideGrid() {
    let index = (currentIndexGrid - 1 + totalSlidesGrid) % totalSlidesGrid;
    goToSlideGrid(index);
  }

  function resetIntervalGrid() {
    clearInterval(intervalGrid);
    intervalGrid = setInterval(nextSlideGrid, 4000);
  }

  nextBtnGrid.addEventListener("click", () => {
    nextSlideGrid();
    resetIntervalGrid();
  });

  prevBtnGrid.addEventListener("click", () => {
    prevSlideGrid();
    resetIntervalGrid();
  });

  labelsGrid.forEach((label, index) => {
    label.addEventListener("click", () => {
      goToSlideGrid(index);
      resetIntervalGrid();
    });
  });
  intervalGrid = setInterval(nextSlideGrid, 4000);
}

slidergrid();

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
