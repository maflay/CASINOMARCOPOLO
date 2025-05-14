// TARJETA-MYMAWI

function ObtenerTarjeta() {
  navegarA("obtenertarjeta");
}

// PROMOCIONES

function saberMasPromo() {
  window.scrollTo(0, 0);
  navegarA("promociones");
}

function asociarse() {
  navegarA("asociado")
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, 300);
}
