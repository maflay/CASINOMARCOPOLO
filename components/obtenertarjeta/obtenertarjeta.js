function enviarFormularioTarjeta() {
  const form = document.getElementById("form-tarjeta");
  const message = document.getElementById("form-message-tarjeta");
  const loading = document.getElementById("loading");
  const nombre = document.getElementById("nombre-tarjeta").value.trim();
  const email = document.getElementById("email-tarjeta").value.trim();
  const telefono = document.getElementById("telefono-tarjeta").value.trim();
  const direccion = document.getElementById("direccion-tarjeta").value.trim();
  const ciudad = document.getElementById("ciudad-tarjeta").value.trim();
  const tipoTarjeta = form.querySelector('select[name="tipo_tarjeta"]').value;

  if (!nombre || !email || !telefono || !direccion || !ciudad || !tipoTarjeta) {
    alert("Por favor completa todos los campos y selecciona un tipo de tarjeta.");
    return;
  }
  if (!form) return;

  const formData = new FormData(form);
  loading.style.display = "flex";
  fetch("/components/obtenertarjeta/guardar_tarjeta.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      setTimeout(() => {
        loading.style.display = "none";
        message.innerHTML =
          '<div class="success-message">' +
          "<strong>¡Éxito!</strong> Datos enviados correctamente.</div>";
      }, 1000);
      window.history.replaceState({}, document.title, window.location.pathname);
      form.reset();
      setTimeout(() => {
        message.innerHTML = "";
      }, 5000);
    })
    .catch((error) => {
      console.error("Error al enviar el formulario de tarjeta:", error);
      alert("Ocurrió un error al enviar tus datos.");
    });
}


function slidertarjeta(){
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

function toprogresivos() {
  navegarA("clubnavegante?id=section-progresivos");
}
