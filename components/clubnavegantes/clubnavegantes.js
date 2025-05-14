function Register() {
  loading.style.display = "flex";
  setTimeout(() => {
    window.location.href = "/components/registro/registro.html";
  }, 1000);
}

function Aexperience() {
    const experiencecontainer = document.getElementById("content-area");
  if (experiencecontainer) {
    fetch(navegarA("/components/vive-experience/viveex.html"))
      .then((response) => response.text())
      .then((html) => {
        experiencecontainer.innerHTML = html;
      })
      .catch((err) => console.log("Error al cargar la pagina:", err));
  } else {
    console.log("No se encontro el contenedo content-area");
  }}
