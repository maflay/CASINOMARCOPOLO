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
