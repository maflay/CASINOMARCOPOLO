function enviarFormularioContacto(e) {
  e.preventDefault(); // Evita que se recargue

  const form = document.getElementById("formulario-contacto");
  const mensaje = document.getElementById("mensaje-contacto");
  const checkboxTerminos = document.getElementById("aceptoTerminos");
  const loading = document.getElementById("loading");

  // Validación del checkbox
  if (!checkboxTerminos.checked) {
    alert("Debes aceptar los Términos y Condiciones antes de continuar.");
    checkboxTerminos.focus();
    return false;
  }

  const formData = new FormData(form);
  if (loading) loading.style.display = "flex";

  fetch("/components/contacto/guardar_contacto.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((data) => {
      setTimeout(() => {
        if (loading) loading.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Datos enviados correctamente.",
        });
      }, 1000);
      window.history.replaceState({}, document.title, window.location.pathname);
      form.reset();

      setTimeout(() => {
        mensaje.innerHTML = "";
      }, 5000);
    })
    .catch((err) => {
      mensaje.innerHTML = `<div style="color: red;">Error de red al enviar.</div>`;
      console.error(err);
    });

  return false; // Previene el envío por defecto
}
