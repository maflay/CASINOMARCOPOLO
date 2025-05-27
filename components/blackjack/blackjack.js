(function () {
  const types = ["C", "D", "H", "S"];
  const specials = ["A", "J", "Q", "K"];
  let deck = [];

  let playerPoints = 0;
  let dealerPoints = 0;
  const playerCardsDiv = document.getElementById("player-cards");
  const dealerCardsDiv = document.getElementById("dealer-cards");
  const playerScoreSpan = document.getElementById("player-score");
  const dealerScoreSpan = document.getElementById("dealer-score");
  const message = document.getElementById("message");

  const btnNew = document.getElementById("btn-new");
  const btnHit = document.getElementById("btn-hit");
  const btnStand = document.getElementById("btn-stand");
  const btnStartGame = document.getElementById("btn-start");

  const balanceSpan = document.getElementById("balance");
  const betInput = document.getElementById("bet-amount");
  const currentBetSpan = document.getElementById("current-bet");
  const placeBetBtn = document.getElementById("place-bet");

  const initialBalance = 1000;
  let balance = initialBalance;
  balanceSpan.textContent = balance;
  let currentBet = 0;

  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let type of types) {
        deck.push(i + type);
      }
    }
    for (let type of types) {
      for (let sp of specials) {
        deck.push(sp + type);
      }
    }
    return shuffleDeck(deck);
  };

  const valueCard = (card) => {
    const value = card.slice(0, -1);
    if (isNaN(value)) {
      return value === "A" ? 11 : 10;
    }
    return +value;
  };

  const drawCard = () => {
    if (deck.length === 0) createDeck();
    return deck.pop();
  };

  const renderCard = (card, container) => {
    const img = document.createElement("img");
    img.src = `/resources/cartas/${card}.svg`; // Ajusta la ruta si están en otro lugar
    img.alt = card;
    img.classList.add("card-image", "card-flip");
    container.appendChild(img);
  };

  const updateScores = () => {
    playerScoreSpan.textContent = playerPoints;
    dealerScoreSpan.textContent = dealerPoints;
  };

  // Unifica limpieza de UI
  const limpiarUI = () => {
    playerCardsDiv.innerHTML = "";
    dealerCardsDiv.innerHTML = "";
    message.textContent = "";
  };

  const resetGame = () => {
    createDeck();
    playerPoints = 0;
    dealerPoints = 0;
    limpiarUI();
    // Solo reinicia saldo si quieres un "nuevo jugador"
    // balance = initialBalance;
    currentBet = 0;
    verificarSaldo();
    updateScores();
  };
  const dealerTurn = () => {
    while (dealerPoints < 17) {
      const card = drawCard();
      dealerPoints += valueCard(card);
      renderCard(card, dealerCardsDiv);
    }
    updateScores();
    checkWinner();
  };

  const checkWinner = () => {
    setTimeout(() => {
      if (playerPoints > 21) {
        message.textContent = "❌ Te pasaste, pierdes";
        currentBet = 0;
        alertLose();
        setTimeout(() => {
          resetGame();
        }, 3000);
      } else if (dealerPoints > 21 || playerPoints > dealerPoints) {
        message.textContent = "✅ ¡Ganaste!";
        balance += currentBet * 2; // recibe el doble de su apuesta
        currentBet = 0;
        alertWin();
        setTimeout(() => {
          resetGame();
        }, 3000);
      } else if (playerPoints < dealerPoints) {
        message.textContent = "😢 Pierdes";
        currentBet = 0;
        alertLose();
        setTimeout(() => {
          resetGame();
        }, 3000);
      } else {
        message.textContent = "🤝 Empate";
        balance += currentBet; // se le devuelve su apuesta
        currentBet = 0;
        alertEmpate();
        setTimeout(() => {
          resetGame();
        }, 3000);
      }
      btnStand.disabled = true;

      balanceSpan.textContent = balance;
      verificarSaldo();
      currentBetSpan.textContent = currentBet;
    }, 500);
  };

  btnNew.addEventListener("click", resetGame);

  btnHit.addEventListener("click", () => {
    if (currentBet === 0) {
      alert("⚠️ Debes hacer una apuesta antes de jugar.");
      return;
    }
    btnStand.disabled = false;
    const card = drawCard();
    playerPoints += valueCard(card);
    renderCard(card, playerCardsDiv);
    updateScores();

    if (playerPoints > 21) {
      dealerTurn();
    }
  });

  btnStand.addEventListener("click", () => {
    dealerTurn();
  });

  // Inicializar
  resetGame();

  const chips = document.querySelectorAll(".chip");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const value = parseInt(chip.getAttribute("data-value"));

      if (value > balance) {
        alert("Saldo insuficiente");
        return;
      }

      currentBet += value;
      balance -= value;

      currentBetSpan.textContent = currentBet;
      balanceSpan.textContent = balance;
      verificarSaldo();
    });
  });

  function alertLose() {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "❌ Has perdido",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  function alertWin() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "✅ ¡Ganaste!",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  function alertEmpate() {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "🤝 Empate",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  function verificarSaldo() {
    if (balance <= 0) {
      // Desactiva botones de juego
      document.getElementById("btn-hit").disabled = true;
      document.getElementById("btn-stand").disabled = true;
      document.getElementById("btn-double").disabled = true;
      document
        .querySelectorAll(".chip")
        .forEach((chip) => (chip.style.pointerEvents = "none"));

      alert("Saldo agotado. Reinicia el juego para seguir jugando.");
    }
  }
})();
