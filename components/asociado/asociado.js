function enviarAsociado() {
  const form = document.getElementById("form-asociado");
  const message = document.getElementById("form-message-asociado");
  const loading = document.getElementById("loading");
  const nombre = document.getElementById("nombre-asociado").value.trim();
  const email = document.getElementById("email-asociado").value.trim();
  const telefono = document.getElementById("telefono-asociado").value.trim();
  const direccion = document.getElementById("direccion-asociado").value.trim();
  const ciudad = document.getElementById("ciudad-asociado").value.trim();
  const tipoTarjeta = document.querySelector("select[name='tipo_tarjeta']").value;

  // Validación
  if (!nombre || !email || !telefono || !direccion || !ciudad || !tipoTarjeta) {
    alert("Por favor completa todos los campos antes de solicitar.");
    return;
  }
  if (!form) return;

  const formData = new FormData(form);
  loading.style.display = "flex";
  fetch("/components/asociado/guardar-asociado.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
    .then(data => {
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
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar tus datos.");
    });
}

