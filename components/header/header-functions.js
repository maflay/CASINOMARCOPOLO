document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-items a");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      // Quita la clase "active" de todos los links
      links.forEach((l) => l.classList.remove("active"));
      // Agrega "active" al que fue clicado
      this.classList.add("active");
    });
  });
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-target]");
  if (link) {
    event.preventDefault();
    const ruta = link.getAttribute("data-target");
    window.location.hash = ruta; // actualiza la URL
  }
});
