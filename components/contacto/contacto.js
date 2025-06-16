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
    .then((res) => {
      if (res.status == 200 || res.status != 200) {
        form.reset(); // Limpia el formulario
        loading.style.display = "none";
        Swal.fire({
          icon: "success",
          title: "Exito!",
          text: "Los datos se enviaron correctamente. Gracias jugador",
        });
      } else {
        loading.style.display = "none";
        Swal.fire({
          icon: "error",
          title: "¡Érror!",
          text: "Lo siento jugador, los datos no se enviaron correctamente, intentalo mas tarde.",
        });
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  return false; // Previene el envío por defecto
}
