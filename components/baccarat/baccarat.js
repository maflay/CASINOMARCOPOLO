if (typeof window.indexRecorrido === "undefined") {
  window.suits = ["H", "D", "S", "C"];
}

const cardName = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
];

const generateDeck = (amount) => {
  const deck = [];
  for (let i = 0; i < amount; i++) {
    for (let suit of suits) {
      for (let name of cardName) {
        deck.push(`${name}${suit}`);
      }
    }
  }
  return deck;
};

var buenas = 0;
function getRandomCard() {
  let randomCardIndex = Math.floor(Math.random() * decks.length);
  let randomCard = decks[randomCardIndex];
  decks.splice(randomCardIndex, 1);

  let cardImage = document.createElement("img");
  cardImage.src = `/resources/cartas\\${randomCard}.svg`;
  cardImage.id = "card";
  cardImage.classList.add("card");
  buenas = randomCard[0];
  return [cardImage, randomCard[0]];
}

const playerField = document.querySelector("#playerCards");
const bankerField = document.querySelector("#bankerCards");

const infoBoard = document.querySelector("#info");

const dealButton = document.querySelector("#dealButton");
dealButton.addEventListener("click", deal);
const buttonSection = document.querySelector("#buttonSection");
const contentDeshacer = document.querySelector("#content-deshacer");

const drawButton = document.createElement("button");
drawButton.id = "drawButton";
drawButton.innerText = " Repartir";
drawButton.style.width = "fit-content";
drawButton.classList.add("btn-design1");
drawButton.addEventListener("click", draw);

const nextHandButton = document.createElement("span");
nextHandButton.id = "nextHandButton";
nextHandButton.innerText = "Siguiente Mano";
nextHandButton.style.width = "155px";
nextHandButton.style.height = "35px";
nextHandButton.classList.add("btn-design1");
nextHandButton.addEventListener("click", reset);

const decks = generateDeck(8);

const cardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 0,
  J: 0,
  Q: 0,
  K: 0,
  A: 1,
};

let playerScore = 0;
let bankerScore = 0;
const pScore = document.querySelector("#playerScore");
const bScore = document.querySelector("#bankerScore");

let playerThirdCard = null;
let turns = 1;

let playerPickups = true;
let bankerPickups = true;

let gameStart = false;

function deal() {
  infoBoard.innerText = "Jugando...";

  if (betChoice == null) {
    infoBoard.innerText = "Primero elije el equipo.";
  } else if (betNumber > 0) {
    undoButton.remove();
    gameStart = true;
    dealButton.style.display = "none";
    buttonSection.append(drawButton);

    const randomCard = getRandomCard();
    const card = randomCard[0];
    playerScore = playerScore + cardValues[randomCard[1]];
    playerField.append(card);
    scoreUpdater();
  } else {
    infoBoard.innerText = "Necesitas realizar una apuesta, para poder jugar.";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "❌ Necesitas realizar una apuesta, para poder jugar.",
      showConfirmButton: false,
      timer: 3000,
    });
  }
}

function scoreUpdater() {
  if (playerScore > 9) {
    playerScore -= 10;
  }
  if (bankerScore > 9) {
    bankerScore -= 10;
  }
  pScore.innerText = playerScore;
  bScore.innerText = bankerScore;
}

function draw() {
  if (whoDrawsNext() == "player") {
    const randomCard = getRandomCard();
    const card = randomCard[0];
    if (document.querySelector("#playerCards").children.length == 2) {
      playerThirdCard = randomCard[1];
    }
    playerScore = playerScore + cardValues[randomCard[1]];
    playerField.append(card);
    scoreUpdater();
  } else if (whoDrawsNext() == "banker") {
    const randomCard = getRandomCard();
    const card = randomCard[0];
    bankerScore = bankerScore + cardValues[randomCard[1]];
    bankerField.append(card);
    scoreUpdater();
  }
  gameEndCheck();
}

function whoDrawsNext() {
  const playerCards = document.querySelector("#playerCards").children.length;
  const bankerCards = document.querySelector("#bankerCards").children.length;

  if (playerCards == 3 && bankerCards == 3) {
    return null;
  }
  if (playerCards < 2 || bankerCards < 2) {
    if (bankerCards < playerCards) {
      return "banker";
    } else if (bankerCards == playerCards) {
      return "player";
    } else if (playerCards < bankerCards) {
      return "banker";
    }
  }

  console.log(playerCards, "playerCards");
  if (playerScore == 8 || playerScore == 9) {
    return null;
  } else if (bankerScore == 8 || bankerScore == 9) {
    return null;
  } else if (playerScore <= 5 && playerCards < 3) {
    return "player";
  } else if (playerScore == 6 || (playerScore == 7 && playerCards == 2)) {
    if (bankerScore < 6 && bankerCards < 3) {
      return "banker";
    }
  } else if (bankerCards < 3) {
    if (bankerScore <= 2) {
      return "banker";
    } else if (bankerScore == 3 && playerThirdCard != 8) {
      return "banker";
    } else if (bankerScore == 4) {
      const validCards = ["2", "3", "4", "5", "6", "7"];
      if (validCards.includes(playerThirdCard)) {
        return "banker";
      }
    } else if (bankerScore == 5) {
      const validCards = ["4", "5", "6", "7"];
      if (validCards.includes(playerThirdCard)) {
        return "banker";
      }
    } else if (bankerScore == 6) {
      const validCards = ["6", "7"];
      if (validCards.includes(playerThirdCard)) {
        return "banker";
      }
    }
  } else {
    gameEnd();
    return null;
  }
}

function gameEndCheck() {
  if (whoDrawsNext() == null) {
    gameEnd();
  }
}

function gameEnd() {
  gameStart = false;
  if (playerScore == bankerScore) {
    infoBoard.innerText = "Es un tie.";
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: "🤝 Es un empate.",
      showConfirmButton: false,
      timer: 3000,
    });
    if (betChoice == "tie") {
      winBet();
    } else {
      push();
    }
  } else if (playerScore > bankerScore) {
    infoBoard.innerText = "Jugador ganador.";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "❌ Has perdido, gano el jugador.",
      showConfirmButton: false,
      timer: 3000,
    });
    if (betChoice == "playerBet") {
      winBet();
    } else {
      loseBet();
    }
  } else if (bankerScore > playerScore) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "❌ Has perdido, gano la banca.",
      showConfirmButton: false,
      timer: 3000,
    });
    infoBoard.innerText = "banca gano.";
    if (betChoice == "bankerBet") {
      winBet();
    } else {
      loseBet();
    }
  }

  drawButton.remove();
  buttonSection.append(nextHandButton);
}

function reset() {
  if (gameStart == false) {
    playerScore = 0;
    bankerScore = 0;
    infoBoard.innerText = "Inicia cuando quieras";
    playerField.innerHTML = "";
    bankerField.innerHTML = "";
    dealButton.style.display = "inline-block";
    nextHandButton.remove();
    pScore.innerText = "";
    bScore.innerText = "";
    playerThirdCard = null;
  } else {
    infoBoard.innerText = "No puede suceder a mitad del juego";
  }
}

const fiveChip = document.getElementById("10_chip");
const tenChip = document.getElementById("25_chip");
const twentyFiveChip = document.getElementById("50_chip");
const fiftyChip = document.getElementById("100_chip");
const hundredChip = document.getElementById("250_chip");
const chipsSection = document.getElementById("chips");

const undoButton = document.createElement("button");
undoButton.id = "undoButton";
undoButton.style.width = "60px";
undoButton.classList.add("btn-design1");
undoButton.innerText = "⟳";
undoButton.addEventListener("click", undo);

fiveChip.addEventListener("click", updateBet);
tenChip.addEventListener("click", updateBet);
twentyFiveChip.addEventListener("click", updateBet);
fiftyChip.addEventListener("click", updateBet);
hundredChip.addEventListener("click", updateBet);

const betAmount = document.querySelector("#bet");
const balance = document.querySelector("#balance");

let balanceNumber = 1000;
let betNumber = 0;

let betChoice = null;

function updateBet() {
  if (gameStart == false) {
    const chipValue = parseInt(this.id.split("_")[0]);
    if (balanceNumber >= chipValue) {
      contentDeshacer.append(undoButton);
      balanceNumber -= chipValue;
      balance.innerText = `${balanceNumber}`;
      betNumber += chipValue;
      betAmount.innerText = `${betNumber}`;
    } else {
      infoBoard.innerText = "Tu saldo es demasiado bajo para esta apuesta.";
    }
  } else {
    infoBoard.innerText = "No puedes cambiar tu apuesta a mitad del juego.";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "❌ No puedes cambiar tu apuesta a mitad del juego.",
      showConfirmButton: false,
      timer: 3000,
    });
  }
}

const tie = document.querySelector("#tie");
const bankerBet = document.querySelector("#bankerBet");
const playerBet = document.querySelector("#playerBet");
playerBet.addEventListener("click", chooseTeam);
tie.addEventListener("click", chooseTeam);

function chooseTeam() {
  if (gameStart == false) {
    tie.style.color = "#05cd84ad";
    bankerBet.style.color = "#05cd84ad";
    playerBet.style.color = "#05cd84ad";

    betChoice = this.id;
    this.style.color = "white";
  } else {
    infoBoard.innerText = "No puedes cambiar tu equipo a mitad del juego.";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "❌ No puedes cambiar tu equipo a mitad del juego.",
      showConfirmButton: false,
      timer: 3000,
    });
  }
}

function winBet() {
  let winnings = 0;
  if (betChoice == "playerBet") {
    winnings = betNumber * 2;
    balanceNumber += winnings;
    balance.innerText = `${balanceNumber}`;
  } else if (betChoice == "bankerBet") {
    winnings = betNumber + 0.95 * betNumber;
    balanceNumber += winnings;
    balance.innerText = `${balanceNumber}`;
  } else if (betChoice == "tie") {
    winnings = betNumber * 8;
    balanceNumber += winnings;
    balance.innerText = `${balanceNumber}`;
  }
  infoBoard.innerText = infoBoard.innerText + `  Ganastes :${winnings}`;
  betNumber = 0;
  betAmount.innerText = `${betNumber}`;
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: ` ✅ ¡Ganastes !.${winnings}`,
    showConfirmButton: false,
    timer: 3000,
  });
}

function loseBet() {
  betNumber = 0;
  betAmount.innerText = `${betNumber}`;
}

function push() {
  infoBoard.innerText = infoBoard.innerText + `  Obtuviste :${betNumber}`;
  balanceNumber += betNumber;
  betNumber = 0;
  balance.innerText = `${balanceNumber}`;
  betAmount.innerText = `${betNumber}`;
}

function undo() {
  balanceNumber += betNumber;
  betNumber = 0;
  balance.innerText = `${balanceNumber}`;
  betAmount.innerText = `${betNumber}`;
  this.remove();
}

function abrirModal() {
  document.getElementById("rule-baccarat-modal").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("rule-baccarat-modal").style.display = "none";
}

function abrirModalInfo() {
  document.getElementById("info-baccarat-modal").style.display = "flex";
}

function cerrarModalInfo() {
  document.getElementById("info-baccarat-modal").style.display = "none";
}
