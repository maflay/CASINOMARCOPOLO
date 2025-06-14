(function () {
  const symbols = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];

  const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
  ];

  const message = document.getElementById("message");
  const spinBtn = document.getElementById("spinBtn");

  function mostrarFrutasIniciales() {
    reels.forEach((reel) => {
      const fruta = getRandomSymbol();
      const img = document.createElement("img");
      img.src = "/resources/" + fruta;
      img.style.width = "100%";
      img.style.height = "100%";
      reel.innerHTML = "";
      reel.appendChild(img);
    });
  }

  mostrarFrutasIniciales();

  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function spinReel(reel, callback) {
    reel.innerHTML = "";

    const track = document.createElement("div");
    track.classList.add("spin-track");

    let lastSymbol = "";

    // const lastVal = symbols.pop();
    // var num = lastVal.split(".",1).pop();
    // console.log(num, "num");

    // Cargar 4 símbolos
    for (let i = 0; i < symbols.length; i++) {
      const img = document.createElement("img");
      const symbol = getRandomSymbol();
      img.src = "/resources/" + symbol;
      img.style.width = "100%";
      img.style.height = "100%";
      track.appendChild(img);
      if (i === 5) lastSymbol = symbol; // Guardar el símbolo final
    }

    reel.appendChild(track);

    // Cuando termina la animación
    setTimeout(() => {
      // Mostrar solo el símbolo final centrado y fijo
      reel.innerHTML = ""; // Limpiar
      const finalImg = document.createElement("img");
      finalImg.src = "/resources/" + lastSymbol;
      finalImg.style.width = "100%";
      finalImg.style.height = "100%";
      reel.appendChild(finalImg);

      callback("/" + lastSymbol);
    }, 1000); // Debe coincidir con duración de @keyframes spinAnim
  }

  function spinAllReels() {
    message.textContent = "";

    let results = [];

    spinReel(reels[0], (res1) => {
      results[0] = res1;
      spinReel(reels[1], (res2) => {
        results[1] = res2;
        spinReel(reels[2], (res3) => {
          results[2] = res3;
          checkResult(results);
        });
      });
    });
  }

  function checkResult([a, b, c]) {
    const imgA = a.split("/").pop();
    const imgB = b.split("/").pop();
    const imgC = c.split("/").pop();

    if (
      imgA === imgB &&
      imgA === imgC &&
      imgB === imgA &&
      imgB === imgC &&
      imgC === imgA &&
      imgC === imgB
    ) {
      Swal.fire({
        title: "🎉 ¡Ganaste!",
        text: "Combinacion exitosa",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      message.textContent = "🎉 ¡Ganaste!";
      message.style.color = "lime";
      setTimeout(() => {
        message.textContent = "";
        message.style.color = "";
      }, 5000);
    } else {
      Swal.fire({
        title: "Lo siento!",
        text: "😢 Inténtalo de nuevo",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      message.textContent = "😢 Inténtalo de nuevo";
      message.style.color = "white";
      setTimeout(() => {
        message.textContent = "";
        message.style.color = "";
      }, 5000);
    }
  }

  spinBtn.addEventListener("click", spinAllReels);
})();
