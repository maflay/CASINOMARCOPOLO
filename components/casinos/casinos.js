document.addEventListener("DOMContentLoaded", function () {
  const heroCasinos = document.querySelector(".hero-casinos");
  if (heroCasinos) {
    heroCasinos.classList.add("aparecer");
  }
});

function toBlackjack() {
  window.scrollTo(0, 0);
  navegarA(`blackjack`);
}