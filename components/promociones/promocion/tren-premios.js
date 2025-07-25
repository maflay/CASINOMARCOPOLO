(() => {
  const btnToBlackJackExpress = document.getElementById(
    "next-to-blackjack-express"
  );

  btnToBlackJackExpress.addEventListener("click", () => {
    navegarA("blackjackexpress");
  });
  
})();

function toPromos(){
  navegarA("promociones");
}