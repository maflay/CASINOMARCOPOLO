window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  setTimeout(() => {
    loading.style.display = "none";
  }, 550);
});
function cargarEstiloVista(cssUrls) {
  // Eliminar cualquier estilo anterior de vista
  const oldLinks = document.querySelectorAll("link[data-vista-css]");
  oldLinks.forEach((link) => link.remove());

  // Cargar nuevos estilos
  if (Array.isArray(cssUrls)) {
    cssUrls.forEach((url, i) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.setAttribute("data-vista-css", `vista-css-${i}`);
      document.head.appendChild(link);
    });
  } else {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssUrls;
    link.setAttribute("data-vista-css", "vista-css");
    document.head.appendChild(link);
  }
}

function cargarScriptVista(scriptUrls) {
  // Elimina todos los scripts anteriores de vista
  const oldScripts = document.querySelectorAll("script[data-vista-script]");
  oldScripts.forEach((script) => script.remove());

  // Cargar nuevos scripts (uno o varios)
  if (Array.isArray(scriptUrls)) {
    scriptUrls.forEach((url, i) => {
      const script = document.createElement("script");
      script.type = "module";
      script.src = url;
      script.defer = true;
      script.setAttribute("data-vista-script", `vista-script-${i}`);
      document.body.appendChild(script);
    });
  } else {
    const script = document.createElement("script");
    script.src = scriptUrls;
    script.defer = true;
    script.setAttribute("data-vista-script", "vista-script");
    document.body.appendChild(script);
  }
}

const PageLoader = {
  cargarPagina: function (clave, contenedorId = "content-area") {
    const loading = document.getElementById("loading");
    const mainContent = document.getElementById(contenedorId);
    window.scrollTo(0, 0);
    loading.style.display = "flex";

    const ruta = rutasLimpias[clave];
    if (!ruta) {
      mainContent.innerHTML = `<p>Ruta no encontrada: ${clave}</p>`;
      loading.style.display = "none";
      return;
    }

    fetch(ruta.html)
      .then((response) => response.text())
      .then((html) => {
        if (ruta.css) cargarEstiloVista(ruta.css);
        if (ruta.js) cargarScriptVista(ruta.js);
        mainContent.innerHTML = html;
        capturarCorreoDesdeURL();
        document
          .querySelectorAll(".titulo, .titulor, .titulol")
          .forEach((el, index) => {
            el.dataset.id = `anim-${index}`;
          });

        // Ejecutar animaciones iniciales tras cargar vista
        animarScroll(".titulo", "y");
        animarScroll(".titulor", "x-right");
        animarScroll(".titulol", "x-left");
        setTimeout(() => {
          loading.style.display = "none";
        }, 400);
      })
      .catch((error) => {
        mainContent.innerHTML = "<p>Error al cargar la página.</p>";
        console.error("Error al cargar la página:", error);
      });
  },
};

function navegarA(valor) {
  const clave = valor.split("?")[0];

  if (!rutasLimpias[clave]) {
    console.error("Ruta no definida:", clave);
    return;
  }
  window.location.hash = valor;
}

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.slice(1);
  const [clave, query] = hash.split("?");

  PageLoader.cargarPagina(clave);

  if (query) {
    const params = new URLSearchParams(query);
    const seccionId = params.get("id");

    if (seccionId) {
      setTimeout(() => {
        const elemento = document.getElementById(seccionId);
        if (elemento) {
          elemento.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  cargarHeaderYFooter();

  if (!window.location.hash) {
    navegarA("inicio");
  }

  // Asignar IDs únicos a elementos animables
  document
    .querySelectorAll(".titulo, .titulor, .titulol")
    .forEach((el, index) => {
      el.dataset.id = `anim-${index}`;
    });

  // Scroll
  window.addEventListener("scroll", () => {
    animarScroll(".titulo", "y");
    animarScroll(".titulor", "x-right");
    animarScroll(".titulol", "x-left");
  });

  // En carga inicial
  animarScroll(".titulo", "y");
  animarScroll(".titulor", "x-right");
  animarScroll(".titulol", "x-left");
});

function animarScroll(selector, direccion = "y") {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const id = el.dataset.id;
    if (!id) return;

    if (sessionStorage.getItem(id) === "true") {
      el.dataset.animated = "true";
      el.style.opacity = 1;
      el.style.transform = "translate(0, 0)";
      return;
    }

    if (el.dataset.animated === "true") return;

    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (inViewport) {
      const scrollY = window.scrollY;
      const opacity = Math.min(scrollY / 500, 1);
      let transform = "";

      if (direccion === "y") {
        const translateY = Math.max(50 - scrollY * 0.1, 0);
        transform = `translateY(${translateY}px)`;
      } else if (direccion === "x-right") {
        const translateX = Math.max(50 - scrollY * 0.1, 0);
        transform = `translateX(${translateX}px)`;
      } else if (direccion === "x-left") {
        const translateX = Math.min(-50 + scrollY * 0.1, 0);
        transform = `translateX(${translateX}px)`;
      }

      el.style.transform = transform;
      el.style.opacity = opacity;

      if (opacity >= 1) {
        el.dataset.animated = "true";
        sessionStorage.setItem(id, "true"); // guardar como animado
      }
    }
  });
}

function cargarHeaderYFooter() {
  const mainFooter = document.getElementById("main-footer");
  const hash = window.location.hash.slice(1) || "inicio";
  const clave = hash.split("?")[0];

  fetch("/components/header/header.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("main-header").innerHTML = html;
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

      const navLinks = document.querySelectorAll(".nav-link");

      navLinks.forEach((link) => {
        link.addEventListener("click", function () {
          // Elimina clases activas del resto
          navLinks.forEach((l) => l.classList.remove("active"));
          this.classList.add("active");

          // Cerrar menú móvil si está abierto
          if (navItems.classList.contains("open")) {
            navToggle.classList.remove("open");
            navItems.classList.remove("open");
            document.body.style.overflow = "";
          }
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
      window.location.hash = ruta;
    }
  });
  PageLoader.cargarPagina(clave);
}

function toRegister() {
  window.scrollTo(0, 0);
  navegarA(`contacto`);
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
  const email = url.searchParams.get("email");

  const inputCorreo = document.getElementById("correo");

  if (email && inputCorreo) {
    inputCorreo.value = decodeURIComponent(email);
  }
}

function actualizarMenuActivo() {
  const hashActual = window.location.hash.split("?")[0] || "#inicio";
  const enlaces = document.querySelectorAll(".nav-link");

  enlaces.forEach((enlace) => {
    const enlaceHash = enlace.getAttribute("href").split("?")[0];

    if (enlaceHash === hashActual) {
      enlace.classList.add("active");
    } else {
      enlace.classList.remove("active");
    }
  });
}

// Ejecutar al cargar y al cambiar hash
window.addEventListener("load", actualizarMenuActivo);
window.addEventListener("hashchange", actualizarMenuActivo);
