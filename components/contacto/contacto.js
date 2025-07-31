function enviarFormularioContacto(e) {
  e.preventDefault();

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
        form.reset();
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

  return false;
}

function infoSendContacto() {
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");
  const ciudad = document.getElementById("ciudad");
  const direccion = document.getElementById("direccion");
  const fecha_solicitud = document.getElementById("fecha_solicitud");
  const descripcion = document.getElementById("descripcion");
  const es_cliente = document.getElementById("es_cliente");
  const aceptoTerminos = document.getElementById("aceptoTerminos");

  const nombreEn = nombre.value;
  const correoEn = correo.value;
  const telefonoEn = telefono.value;
  const ciudadEn = ciudad.value;
  const direccionEn = direccion.value;
  const fecha_solicitudEn = fecha_solicitud.value;
  const descripcionEn = descripcion.value;
  const es_clienteEn = es_cliente.value;
  const aceptoTerminosEn = aceptoTerminos.value;

  const data = {
    nombreEn,
    correoEn,
    telefonoEn,
    ciudadEn,
    direccionEn,
    fecha_solicitudEn,
    descripcionEn,
    es_clienteEn,
    aceptoTerminosEn,
  };

}
