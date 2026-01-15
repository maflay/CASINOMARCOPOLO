(() => {
  const solofechaCompleta = new Date().toLocaleString("es-CO", {
    month: "long",
  });

  const promociones_enero = document.getElementById("promociones_enero");
  const promociones_febrero = document.getElementById("promociones_febrero");
  const cubo1 = document.getElementById("cubo1-mp");
  const cubo2 = document.getElementById("cubo2-mp");
  const cubo4 = document.getElementById("cubo4-mp");

  promociones_enero.style.display = "none";
  promociones_febrero.style.display = "none";
  cubo1.style.display = "none";
  cubo2.style.display = "none";
  cubo4.style.display = "none";

  if (solofechaCompleta == "enero") {
    promociones_enero.style.display = "flex";
  }

  if (solofechaCompleta == "febrero") {
    promociones_febrero.style.display = "flex";
  }

  if (solofechaCompleta == "septiembre") {
    cubo1.style.display = "flex";
  }

  if (solofechaCompleta == "octubre") {
    cubo2.style.display = "flex";
  }

  if (solofechaCompleta == "diciembre") {
    cubo4.style.display = "flex";
  }
})();

function saberMasPromo() {
  window.scrollTo(0, 0);
  navegarA("promociones");
}

function toLampara() {
  navegarA("lampara");
}

function toGiroDorado() {
  navegarA("girodorado");
}

function toDadosPoker() {
  navegarA("dadospoker");
}

function toMymawitepremia() {
  navegarA("mymawitepremia");
}

function toCascadapremios() {
  navegarA("cascadapremios");
}

function toGanaya() {
  navegarA("ganaya");
}

function toBingolocura() {
  navegarA("bingolocura");
}

function toSuperbingo() {
  navegarA("superbingo");
}

function toBlackJackExpress() {
  navegarA("blackjackexpress");
}

function toTrenPremios() {
  navegarA("trenpremios");
}

function toMatchPerfecto() {
  navegarA("matchperfecto");
}

function toFlechazoCupido() {
  navegarA("flechazocupido");
}
