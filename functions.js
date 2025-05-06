window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  setTimeout(() => {
    loading.style.display = "none";
  }, 900); // Tiempo para que la transición se vea suave
});


const PageLoader = {
  cargarPagina: function(url, contenedorId = 'content-area') {
      const loading = document.getElementById("loading");
      const mainContent = document.getElementById(contenedorId);

      // Mostrar el loader
      loading.style.display = "flex";

      fetch(url)
          .then(response => response.text())
          .then(html => {
              setTimeout(() => {
                  mainContent.innerHTML = html;
                  loading.style.display = "none";
              }, 1500);
          })
          .catch(error => {
              console.error('Error al cargar la página:', error);
              mainContent.innerHTML = '<p>Ocurrió un error cargando la página.</p>';
              loading.style.display = "none";
          });
  }
};

function navegarA(url) {
  // Verifica si es un enlace interno que quieres cargar dinámico
  if (url.startsWith('/components/')) {
      PageLoader.cargarPagina(url);
  } else {
      // Si es un enlace externo o diferente, haces la navegación normal
      window.location.href = url;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  // PARA CARGAR EL MENU Y PIE DE PÁGINA EN EL DOM
  const navLinks = document.querySelectorAll(
    ".Navbar .nav-items a[data-target]"
  );
  const contentArea = document.getElementById("content-area");
  const mainFooter = document.getElementById("main-footer");

  const loadContent = (url) => {
    window.scrollTo(0, 0);

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        console.log("Contenido cargado:");
        // Verifica el contenido cargado
        contentArea.innerHTML = html;
        const scripts = contentArea.querySelectorAll("script");
        const navToggle = document.getElementById("navToggle"); // Obtén el botón de toggle
        const navItems = document.getElementById("navItems");
        scripts.forEach((script) => {
          try {
            eval(script.textContent);
          } catch (error) {
            console.error("Error al ejecutar script:", error);
          }
        });
        if (navItems && navToggle) {
          if (navItems.classList.contains("open")) {
            navToggle.classList.remove("open");
            navItems.classList.remove("open");
          }
        }
      })
      .catch((error) => {
        console.error("Error al cargar la página:", error);
        contentArea.innerHTML = "<p>Error al cargar el contenido.</p>";
      });
  };
  fetch("/components/header/header.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("main-header").innerHTML = html;
      // Inicializar los scripts del header AQUÍ, después de que el header esté en el DOM
      const navToggle = document.getElementById("navToggle");
      const navItems = document.getElementById("navItems");

      if (navToggle && navItems) {
        navToggle.addEventListener("click", () => {
          navToggle.classList.toggle("open");
          navItems.classList.toggle("open");
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

      const navLinks = document.querySelectorAll(
        ".Navbar .nav-items a[data-target]"
      );
      navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          // Remueve 'active' de todos los enlaces
    navLinks.forEach((l) => l.classList.remove("active"));
    // Agrega 'active' al enlace clicado
    this.classList.add("active");
          const targetPage = this.getAttribute("data-target");
          loadContent(targetPage);
        });
      });
    })
    .catch((error) => {
      console.error("Error al cargar el header:", error);
      document.getElementById("main-header").innerHTML =
        "<p>Error al cargar el menú.</p>";
    });

  fetch("/components/footer/footer.html")
    .then((response) => response.text())
    .then((html) => {
      mainFooter.innerHTML = html;
      // Opcional: Inicializar scripts del footer aquí si los tienes
      const footerScripts = mainFooter.querySelectorAll("script");
      footerScripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src;
        }
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      });
    })
    .catch((error) => {
      console.error("Error al cargar el footer:", error);
      mainFooter.innerHTML = "<p>Error al cargar el footer.</p>";
    });

  loadContent("./components/home/index.html");

  //   ANIMACIONES

  window.addEventListener("scroll", () => {
    const elements = document.querySelectorAll(".titulo");

    elements.forEach((el) => {
      // Si el elemento ya está marcado como "hecho", saltamos
      if (el.dataset.animated === "true") {
        return;
      }

      // Verificar si está en el viewport
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (inViewport) {
        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / 500, 1);
        const translateY = Math.max(50 - scrollY * 0.1, 0);

        el.style.transform = `translateY(${translateY}px)`;
        el.style.opacity = opacity;

        // Cuando la animación ya llegó al máximo, marcamos como terminado
        if (opacity >= 1) {
          el.dataset.animated = "true";
        }
      }
    });
  });

  window.addEventListener("scroll", () => {
    const elements = document.querySelectorAll(".titulor");

    elements.forEach((el) => {
      if (el.dataset.animated === "true") {
        return;
      }

      // Comprobamos si el elemento está en el viewport
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (inViewport) {
        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / 500, 1);

        // Horizontal: desde +100px a 0px
        const translateX = Math.max(50 - scrollY * 0.1, 0);

        el.style.transform = `translateX(${translateX}px)`;
        el.style.opacity = opacity;

        if (opacity >= 1) {
          el.dataset.animated = "true";
        }
      }
    });
  });

  window.addEventListener("scroll", () => {
    const elements = document.querySelectorAll(".titulol");

    elements.forEach((el) => {
      if (el.dataset.animated === "true") {
        return;
      }

      // Comprobamos si el elemento está en el viewport
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (inViewport) {
        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / 500, 1);

        // Horizontal: desde -100px a 0px (hacia la izquierda)
        const translateX = Math.min(-50 + scrollY * 0.1, 0);

        el.style.transform = `translateX(${translateX}px)`;
        el.style.opacity = opacity;

        if (opacity >= 1) {
          el.dataset.animated = "true";
        }
      }
    });
  });
});



function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // hace que el scroll sea suave
  });
}
