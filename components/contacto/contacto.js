function enviarFormularioContacto(e) {
  e.preventDefault();

  const form = document.getElementById("formulario-contacto");
  const mensaje = document.getElementById("mensaje-contacto");
  const checkboxTerminos = document.getElementById("aceptoTerminos");
  const loading = document.getElementById("loading");

  // Validación del checkbox
  if (!checkboxTerminos.checked) {
  Swal.fire({
          icon: "warning",
          title: "Advertencia",
          html: `Para poder enviar la información debes aceptar los terminos y condiciones, te invitamos a leer los <a target="_Blank" class="a_modal" href="#tratamiento_datos">Terminos y Condiciones</a>.`,
          confirmButtonColor: "#1F253A",
           customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        })
        return;
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
  const descripcion = document.getElementById("descripcion");
  const es_cliente = document.getElementById("es_cliente");
  const aceptoTerminos = document.getElementById("aceptoTerminos");
  const loader = document.getElementById("loading");

  const nombreEn = nombre.value;
  const correoEn = correo.value;
  const telefonoEn = telefono.value;
  const ciudadEn = ciudad.value;
  const direccionEn = direccion.value;
  const descripcionEn = descripcion.value;
const es_clienteEn = es_cliente.checked ? "Si" : "No";
const aceptoTerminosEn = aceptoTerminos.checked ? "Si acepto" : "No acepto";

if(aceptoTerminosEn == "No acepto"){
      Swal.fire({
          icon: "warning",
          title: "Advertencia",
          html: `Para poder enviar la información debes aceptar los terminos y condiciones, te invitamos a leer los <a target="_Blank" class="a_modal" href="#tratamiento_datos">Terminos y Condiciones</a>.`,
          confirmButtonColor: "#1F253A",
           customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        })
        return;
}



  const url =
    "https://script.google.com/macros/s/AKfycbwatZBZdXwAjc1VkNqywr4CENX7ipZA8T1GHn3u6PQYoQu6YDKbRnz0PleJrtiDtSsA/exec";
  loader.style.display = "flex";


    const fechaCompleta = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [fecha, hora] = fechaCompleta.split(", ");


  const data = {
    nombre: nombreEn,
    correo: correoEn,
    telefono: telefonoEn,
    ciudad: ciudadEn,
    direccion: direccionEn,
    fechasoli: fecha,
    descripcion: descripcionEn,
    cliente: es_clienteEn,
    terminos: aceptoTerminosEn,
  };

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then(() => {

      nombre.value = "";
      correo.value = "";
      telefono.value = "";
      ciudad.value = "";
      direccion.value = "";
      descripcion.value = "";
      es_cliente.checked = false;
      aceptoTerminos.checked = false;

      setTimeout(() => {
        loader.style.display = "none";
          Swal.fire({
          icon: "success",
          title: "EXITO",
          text: "El envio de la información fue exitoso.",
          confirmButtonColor: "#1F253A",
           customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "btn-Send mi-boton",
          },
        })
      }, 2000);
    })
    .catch((error) => {
      loader.style.display = "none";
    });
}
