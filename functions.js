const rutasLimpias = {
  home: {
    html: "/components/home/index.html",
    css: "/components/home/index.css",
    js: "/components/home/home.js",
  },
  casino: {
    html: "/components/casinos/casinos.html",
    css: "/components/casinos/casinos.css",
    js: "/components/casinos/casinos.js",
  },
  experiencias: {
    html: "/components/experiencias/experiencias.html",
    css: "/components/experiencias/experiencias.css",
    js: "/components/experiencias/experiencias.js",
  },
  promociones: {
    html: "/components/promociones/promociones.html",
    css: "/components/promociones/promociones.css",
    js: "/components/promociones/promociones.js",
  },
  clubnavegante: {
    html: "/components/clubnavegantes/clubnavegantes.html",
    css: "/components/clubnavegantes/clubnavegantes.css",
    js: "/components/clubnavegantes/clubnavegantes.js",
  },
  contacto: {
    html: "/components/contacto/contacto.html",
    css: "/components/contacto/contacto.css",
    js: "/components/contacto/contacto.js",
  },
  obtenertarjeta: {
    html: "/components/obtenertarjeta/obtenertarjeta.html",
    css: "/components/obtenertarjeta/obtenertarjeta.css",
    js: "/components/obtenertarjeta/obtenertarjeta.js",
  },
  asociado: {
    html: "/components/asociado/aosciado.html",
    css: "/components/asociado/asociado.css",
    js: "/components/asociado/asociado.js",
  },
  blackjack: {
    html: "/components/blackjack/blackjack.html",
    css: "/components/blackjack/blackjack.css",

    js: "/components/blackjack/blackjack.js",
  },
  nosotros: {
    html: "/components/nosotros/nosotros.html",
    css: "/components/nosotros/nosotros.css",
    js: "/components/nosotros/nosotros.js",
  },
  ruleta: {
    html: "/components/ruleta/ruleta.html",
    css: "/components/ruleta/ruleta.css",
    js: "/components/ruleta/ruleta.js",
  },
  baccarat: {
    html: "/components/baccarat/baccarat.html",
    css: "/components/baccarat/baccarat.css",
    js: "/components/baccarat/baccarat.js",
  },
  barranquilla: {
    html: "/components/ubicaciones/barranquilla.html",
    css: "/components/ubicaciones/ubicaciones.css",
    // js: "/components/baccarat/barranquilla.js",
  },
  bogota: {
    html: "/components/ubicaciones/bogota.html",
    css: "/components/ubicaciones/ubicaciones.css",
    // js: "/components/baccarat/barranquilla.js",
  },

  calisur: {
    html: "/components/ubicaciones/cali-sur.html",
    css: "/components/ubicaciones/ubicaciones.css",
    // js: "/components/baccarat/barranquilla.js",
  },
  calioeste: {
    html: "/components/ubicaciones/cali-oeste.html",
    css: "/components/ubicaciones/ubicaciones.css",
    // js: "/components/baccarat/barranquilla.js",
  },
  lampara: {
    html: "/components/promociones/promocion/lampara-suerte.html",
    css: "/components/promociones/promocion/promocion.css",
    js: "/components/promociones/promocion/promocion.js",
  },
  girodorado: {
    html: "/components/promociones/promocion/giro-dorado.html",
    css: "/components/promociones/promocion/promocion.css",
    js: "/components/promociones/promocion/promocion.js",
  },
  dadospoker: {
    html: "/components/promociones/promocion/dados-poker.html",
    css: "/components/promociones/promocion/promocion.css",
    js: "/components/promociones/promocion/promocion.js",
  },
};

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
  // PARA CARGAR EL MENU Y PIE DE PÁGINA EN EL DOM
 if (!window.location.hash) {
    window.location.hash = "#home";
    setTimeout(() => {
      location.reload();
    }, 100);
    return; // Evita cargar sin hash, y deja que el listener hashchange lo maneje
  }
  const contentArea = document.getElementById("content-area");
  const mainFooter = document.getElementById("main-footer");
  const hash = window.location.hash.slice(1) || "home";
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

  //   ANIMACIONES

  window.addEventListener("scroll", () => {
    const elements = document.querySelectorAll(".titulo");

    elements.forEach((el) => {
      if (el.dataset.animated === "true") {
        return;
      }

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
  const url = new URL("http://anyurl.com" + hash.slice(1)); // usar un dominio falso
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
