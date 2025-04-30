window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    loading.style.display = 'none'; // Ocultar el loading después de cargar la página
  });


document.addEventListener('DOMContentLoaded', () => {

    // PARA CARGAR EL MENU Y PIE DE PÁGINA EN EL DOM
  const navLinks = document.querySelectorAll('.Navbar .nav-items a[data-target]');
  const contentArea = document.getElementById('content-area');
  const mainFooter = document.getElementById('main-footer'); 
  
  const loadContent = (url) => {
      fetch(url)
          .then(response => response.text())
          .then(html => {
              console.log('Contenido cargado:');
               // Verifica el contenido cargado
              contentArea.innerHTML = html;
              const scripts = contentArea.querySelectorAll('script');
              const navToggle = document.getElementById('navToggle'); // Obtén el botón de toggle
              const navItems = document.getElementById('navItems');
              scripts.forEach(script => {
                  try {
                      eval(script.textContent);
                  } catch (error) {
                      console.error('Error al ejecutar script:', error);
                  }
              });
              if (navItems.classList.contains('open')) {
                  navToggle.classList.remove('open');
                  navItems.classList.remove('open');
              }
          })
          .catch(error => {
              console.error('Error al cargar la página:', error);
              contentArea.innerHTML = '<p>Error al cargar el contenido.</p>';
          });
  };
  fetch('/components/header/header.html')
      .then(response => response.text())
      .then(html => {
          document.getElementById('main-header').innerHTML = html;
          // Inicializar los scripts del header AQUÍ, después de que el header esté en el DOM
          const navToggle = document.getElementById('navToggle');
          const navItems = document.getElementById('navItems');

          if (navToggle && navItems) {
              navToggle.addEventListener('click', () => {
                  navToggle.classList.toggle('open');
                  navItems.classList.toggle('open');
              });
          }

          window.addEventListener("scroll", function () {
              const navbar = document.querySelector(".Navbar");
              if (navbar) {
                  if (window.scrollY > 0) {
                      navbar.classList.add("navbar-scrolled");
                  } else {
                      navbar.classList.remove("navbar-scrolled");
                  }
              }
          });

          const navLinks = document.querySelectorAll('.Navbar .nav-items a[data-target]');
          navLinks.forEach(link => {
              link.addEventListener('click', function (event) {
                  event.preventDefault();
                  const targetPage = this.getAttribute('data-target');
                  loadContent(targetPage);
              });
          });
      })
      .catch(error => {
          console.error('Error al cargar el header:', error);
          document.getElementById('main-header').innerHTML = '<p>Error al cargar el menú.</p>';
      });

  fetch('/components/footer/footer.html')
      .then(response => response.text())
      .then(html => {
          mainFooter.innerHTML = html;
          // Opcional: Inicializar scripts del footer aquí si los tienes
          const footerScripts = mainFooter.querySelectorAll('script');
          footerScripts.forEach(script => {
              const newScript = document.createElement('script');
              if (script.src) {
                  newScript.src = script.src;
              }
              newScript.textContent = script.textContent;
              document.body.appendChild(newScript);
          });
      })
      .catch(error => {
          console.error('Error al cargar el footer:', error);
          mainFooter.innerHTML = '<p>Error al cargar el footer.</p>';
      });

  loadContent('./components/home/index.html');





});
  

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // hace que el scroll sea suave
    });
  }

