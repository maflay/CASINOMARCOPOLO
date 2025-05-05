document.addEventListener('DOMContentLoaded', function() {
    const heroCasinos = document.querySelector('.hero-casinos');
    if (heroCasinos) {
      heroCasinos.classList.add('aparecer');
    }
  });

function toMas(){
  const tomascontainer = document.getElementById("content-area");
  if (tomascontainer) {
    fetch(
      navegarA("/components/marcopolovip/marcopolo.html")
    )
      .then((response) => response.text())
      .then((html) => {
        tomascontainer.innerHTML = html;
        scrollToTop();
      })
      .catch((err) => console.error("Error al cargar la página:", err));
  } else {
    console.error("No se encontró el contenedor content-area");
  }
}

function vidanocturna(){
  const tomascontainer = document.getElementById("content-area");
  if (tomascontainer) {
    fetch(
      navegarA("/components/vidanocturna/vidanocturna.html")
    )
      .then((response) => response.text())
      .then((html) => {
        tomascontainer.innerHTML = html;
        scrollToTop();
      })
      .catch((err) => console.error("Error al cargar la página:", err));
  } else {
    console.error("No se encontró el contenedor content-area");
  }
}