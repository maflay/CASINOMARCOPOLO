document.addEventListener("DOMContentLoaded", function () {

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

});