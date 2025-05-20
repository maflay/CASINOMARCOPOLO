import {
  createCard,
  activeCards,
  playerPoints,
  dealerPoints,
  flipCardBack,
  finishGameCase,
  dealerTurn,
} from "/components/blackjack/assets/js/game.js";
import { doubleBet } from "/components/blackjack/assets/js/home.js";

const btnHit = document.getElementById("btn-hit");
const btnStand = document.getElementById("btn-stand");
const btnDouble = document.getElementById("btn-double");
const dealerScoreContainer = document.querySelector(".dealer__score");
const playerCardsContainer = document.querySelector(".player__cards");
const dealerCardsContainer = document.querySelector(".dealer__cards");
const betAmountCenter = document.querySelector(".bet-amount-center");

// deshabilitar botones
const btnsDisabled = () => {
  btnHit.classList.add("disabled");
  btnStand.classList.add("disabled");
  btnDouble.classList.add("disabled");
};

// habilitar botones
const btnsEnabled = () => {
  btnHit.classList.remove("disabled");
  btnStand.classList.remove("disabled");
  btnDouble.classList.remove("disabled");
};

// Esta evento le permite al player tomar una carta
btnHit.addEventListener("click", () => {
  btnDouble.classList.add("disabled");
  createCard("player");
  setTimeout(() => {
    for (let i = 0; i < playerCardsContainer.children.length; i++) {
      activeCards(i, playerCardsContainer);
    }
  }, 100);
  if (playerPoints > 21) {
    setTimeout(() => {
      finishGameCase("dealer");
    }, 600);
  } else if (playerPoints === 21) {
    setTimeout(() => {
      finishGameCase("player");
    }, 600);
  } else {
    return;
  }
});

// Esta evento me permite al player plantarse
btnStand.addEventListener("click", () => {
  flipCardBack();
  setTimeout(() => {
    dealerScoreContainer.classList.add("active");
  }, 200);

  if (playerPoints < dealerPoints) {
    setTimeout(() => {
      finishGameCase("dealer");
    }, 200);
  } else {
    setTimeout(() => {
      dealerTurn();
    }, 200);
  }
});

// Esta evento me permite doblar la apuesta
btnDouble.addEventListener("click", () => {
  betAmountCenter.classList.add("pulse");
  setTimeout(() => {
    doubleBet();
  }, 400);
  createCard("player");
  setTimeout(() => {
    for (let i = 0; i < playerCardsContainer.children.length; i++) {
      activeCards(i, playerCardsContainer);
    }
  }, 800);

  if (playerPoints > 21) {
    finishGameCase("dealer");
  } else if (playerPoints === 21) {
    finishGameCase("player");
  } else {
    setTimeout(() => {
      flipCardBack();
      dealerScoreContainer.classList.add("active");
      dealerTurn();
    }, 800);
  }
});

export { btnsDisabled, btnsEnabled };
