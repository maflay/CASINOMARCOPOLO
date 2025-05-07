// TARJETA-MYMAWI

function ObtenerTarjeta() {
  navegarA("/components/obtenertarjeta/obtenertarjeta.html");
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, 300);
}

// PROMOCIONES

function saberMasPromo() {
  window.scrollTo(0, 0);
  navegarA("/components/promociones/promociones.html");
}

function asociarse() {
  navegarA("/components/asociado/aosciado.html")
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, 300);
}
