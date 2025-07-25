(() => {
  const btnToTrenPremios = document.getElementById("next-to-tren-premios");

  btnToTrenPremios.addEventListener("click", () => {
    navegarA("trenpremios");
  });
})();

function toPromos() {
  navegarA("promociones");
}
