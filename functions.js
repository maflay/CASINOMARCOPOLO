// let index = 1;
//   const total = 5;

//   setInterval(() => {
//     document.getElementById(`radio${index}`).checked = true;
//     index = index % total + 1;
//   }, 3000);


document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slider');
    const radios = document.querySelectorAll('input[name="slider"]');
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % radios.length;
        radios[currentIndex].checked = true;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3000); // Cambia cada 3 segundos
});

const navToggle = document.getElementById('navToggle');
  const navItems = document.getElementById('navItems');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navItems.classList.toggle('open');
  });

window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".Navbar");
    if (window.scrollY > 0) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });