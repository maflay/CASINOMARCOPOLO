// document.addEventListener('DOMContentLoaded', () => {
//     const slides = document.querySelector('.slider');
//     const radios = document.querySelectorAll('input[name="slider"]');
//     let currentIndex = 0;

//     setInterval(() => {
//         currentIndex = (currentIndex + 1) % radios.length;
//         radios[currentIndex].checked = true;
//         slides.style.transform = `translateX(-${currentIndex * 100}%)`;
//     }, 3000); // Cambia cada 3 segundos
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const slider = document.querySelector('.slider');
//   const radios = document.querySelectorAll('input[name="slider"]');
//   const slideCount = radios.length;
//   let currentIndex = 0;
//   let intervalId;

//   const nextSlide = () => {
//       currentIndex = (currentIndex + 1) % slideCount;
//       updateSlider();
//   };

//   const updateSlider = () => {
//       radios[currentIndex].checked = true;
//       slider.style.transform = `translateX(-${currentIndex * 100}%)`;
//   };

//   const startSlider = () => {
//       intervalId = setInterval(nextSlide, 3000);
//   };

//   const stopSlider = () => {
//       clearInterval(intervalId);
//   };

//   // Iniciar el slider automáticamente al cargar la página
//   startSlider();

//   // Opcional: Pausar el slider al interactuar con los radios
//   radios.forEach(radio => {
//       radio.addEventListener('change', () => {
//           stopSlider();
//           currentIndex = Array.from(radios).indexOf(radio);
//           updateSlider();
//           startSlider(); // Reiniciar el slider después de la interacción
//       });
//   });

//   // Consideración sobre la visibilidad (opcional):
//   // Pausar el slider si no está visible en la ventana para ahorrar recursos
//   const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//           if (entry.isIntersecting) {
//               startSlider();
//           } else {
//               stopSlider();
//           }
//       });
//   });

//   observer.observe(slider);
// });

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