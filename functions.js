window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  setTimeout(() => {
  loading.style.display = "none";
}, 550);

});

function mostrarLoader() {
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "flex";
}



const PageLoader = {
  cargarPagina: function (url, contenedorId = "content-area") {
    const loading = document.getElementById("loading");
    const mainContent = document.getElementById(contenedorId);
    window.scrollTo(0, 0);
    loading.style.display = "flex";

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
          mainContent.innerHTML = html;

          // PARA EJECUTAR SCRIPTS DE LA VISTA CARGADA
          const scripts = mainContent.querySelectorAll("script");
          scripts.forEach((script) => {
            const newScript = document.createElement("script");
            if (script.src) {
              newScript.src = script.src;
              document.body.appendChild(newScript);
            } else {
              try {
                eval(script.textContent);
              } catch (err) {
                console.error("Error ejecutando script:", err);
              }
            }
          });

          capturarCorreoDesdeURL();
          loading.style.display = "none";
          // window.history.replaceState({}, "", window.location.pathname);
      })
      .catch((error) => {
        console.error("Error al cargar la página:", error);
        mainContent.innerHTML = "<p>Ocurrió un error cargando la página.</p>";
        // loading.style.display = "none";
      });
  },
};

function navegarA(ruta) {
  const contentArea = document.getElementById("content-area");
  const loading = document.getElementById("loading");
  if (!contentArea) return;

  loading.style.display = "flex";

  fetch(ruta)
    .then((res) => res.text())
    .then((html) => {
      setTimeout(() => {
        contentArea.innerHTML = html;
        // loading.style.display = "none";
        window.location.hash = ruta; // actualiza el hash
      }, 500);
    })
    .catch((err) => {
      // loading.style.display = "none";
      contentArea.innerHTML = "<p>Error al cargar el contenido.</p>";
      console.error("Error al redirigir:", err);
    });
}

window.addEventListener("hashchange", () => {
  const nuevaRuta = window.location.hash.slice(1);
  PageLoader.cargarPagina(nuevaRuta);
});

document.addEventListener("DOMContentLoaded", () => {
  // PARA CARGAR EL MENU Y PIE DE PÁGINA EN EL DOM

  const contentArea = document.getElementById("content-area");
  const mainFooter = document.getElementById("main-footer");

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
          if (navItems.classList.contains("open")) {
            navToggle.classList.remove("open");
            navItems.classList.remove("open");
          }
          // loadContent(targetPage);
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
  document.addEventListener("click", (event) => {
    const link = event.target.closest(".Navbar .nav-items a[data-target]");
    if (link) {
      event.preventDefault();
      const ruta = link.getAttribute("data-target");
      window.location.hash = ruta; // esto actualiza la URL sin recargar
    }
  });
  const ruta = window.location.hash
    ? window.location.hash.slice(1)
    : "/components/home/index.html";
  PageLoader.cargarPagina(ruta);

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

function toRegister() {
  window.scrollTo(0, 0);
  navegarA(`/components/contacto/contacto.html`);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // hace que el scroll sea suave
  });
}

function capturarCorreoDesdeURL() {
  const hash = window.location.hash;
  const url = new URL("http://prueba.com" + hash.slice(1)); // usar un dominio falso
  const params = new URLSearchParams(url.search);
  const email = params.get("email");
  const inputCorreo = document.getElementById("correo");

  if (email && inputCorreo) {
    inputCorreo.value = decodeURIComponent(email);
  }
}
