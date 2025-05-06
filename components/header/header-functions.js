// navLinks.forEach(link => {
//     link.addEventListener('click', function(event) {
//         event.preventDefault(); // <--- Esta línea es crucial
//         const targetPage = this.getAttribute('data-target');
//         loadContent(targetPage);
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-items a");

    links.forEach(link => {
        link.addEventListener("click", function () {
            // Quita la clase "active" de todos los links
            links.forEach(l => l.classList.remove("active"));
            // Agrega "active" al que fue clicado
            this.classList.add("active");
        });
    });
});

  
