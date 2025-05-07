function enviarFormularioTarjeta() {
  const form = document.getElementById("form-tarjeta");
  const message = document.getElementById("form-message-tarjeta");
  const loading = document.getElementById("loading");

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
