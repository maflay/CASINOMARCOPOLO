var options = [
  "0",
  "28",
  "9",
  "26",
  "30",
  "11",
  "7",
  "20",
  "32",
  "17",
  "5",
  "22",
  "34",
  "15",
  "3",
  "24",
  "36",
  "13",
  "1",
  "00",
  "27",
  "10",
  "25",
  "29",
  "12",
  "8",
  "19",
  "31",
  "18",
  "6",
  "21",
  "33",
  "16",
  "4",
  "23",
  "35",
  "14",
  "2",
];
var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

if (typeof window.indexRecorrido === 'undefined') {
  window.indexRecorrido = 0;
}

if(typeof window.animacionTablero === 'undefined') {
  window.animacionTablero = null;

}

document.getElementById("spin").addEventListener("click", spin);

function getColor(value) {
  const verdes = ["0", "00"];
  const rojos = [
    "1",
    "3",
    "5",
    "7",
    "9",
    "12",
    "14",
    "16",
    "18",
    "19",
    "21",
    "23",
    "25",
    "27",
    "30",
    "32",
    "34",
    "36",
  ];

  if (verdes.includes(value)) return "green";
  if (rojos.includes(value)) return "red";
  return "black";
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 125;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = "bold 12px Helvetica, Arial";

    for (var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      //ctx.fillStyle = colors[i];
      ctx.fillStyle = getColor(options[i]);

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur = 0;
      ctx.shadowColor = "rgb(220,220,220)";
      ctx.fillStyle = "white";
      ctx.translate(
        250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius
      );
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    //Arrow
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  const apuesta = document.getElementById("apuesta").value.trim();

  if (apuesta === "") {
    // alert("Ingrese un valor para apostar")
    Swal.fire({
      title: "Advertencia!",
      text: "Ni tienes saldo!",
      icon: "warning",
    });
    return;
  } else if (apuesta > 36) {
    Swal.fire({
      title: "Advertencia!",
      text: "El número debe estar entre 0 y 36 (incluye 00)!",
      icon: "warning",
    });
    return;
  }
  // Reiniciar ángulos y tiempos
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = (Math.random() * 3 + 4) * 1000;

  iniciarRecorridoTabla();
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle =
    spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI) / 180;
  drawRouletteWheel();
  spinTimeout = setTimeout("rotateWheel()", 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);

  // Calcular el número en el que se detuvo la ruleta
  var degrees = (startAngle * 180) / Math.PI + 90;
  var arcd = (arc * 180) / Math.PI;
  var index = Math.floor((360 - (degrees % 360)) / arcd);
  var numeroGanador = options[index];
  // Mostrar en canvas
  ctx.save();
  ctx.font = "60px Arial";
  ctx.fillStyle = "#F6921E";
  ctx.fillText(
    numeroGanador,
    250 - ctx.measureText(numeroGanador).width / 2,
    250 + 10
  );
  ctx.restore();

  // Mostrar texto
  document.getElementById(
    "ganador"
  ).textContent = `🎯 Ganó el número: ${numeroGanador}`;

  const apuesta = document.getElementById("apuesta").value.trim();
  const resultadoApuesta = document.getElementById("resultado-apuesta");

  if (apuesta === numeroGanador) {
    resultadoApuesta.textContent = "✅ ¡Felicidades! ¡Acertaste!";
    resultadoApuesta.style.color = "lime";
  } else {
    resultadoApuesta.textContent = `❌ No acertaste. Tu número fue: ${apuesta}`;
    resultadoApuesta.style.color = "red";
  }

  setTimeout(() => {
    resultadoApuesta.textContent = "";
    resultadoApuesta.style.color = "";
    document.getElementById("ganador").textContent = ``;
  }, 4000);

  // Detener tabla en ese número
  detenerEnGanador(numeroGanador);
}

function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

drawRouletteWheel();

document.getElementById("reset").addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
  // Limpiar texto del ganador
  const ganadorElemento = document.getElementById("ganador");
  if (ganadorElemento) {
    ganadorElemento.textContent = "";
  }

  // Quitar resaltado de tabla
  const celdas = document.querySelectorAll("#tabla-ruleta td");
  celdas.forEach((td) => {
    td.style.outline = "none";
  });

  // Limpiar texto del canvas
  if (ctx) {
    ctx.clearRect(0, 0, 500, 500);
    drawRouletteWheel(); // Redibujar ruleta sin texto
  }

  // Reiniciar ángulo
  startAngle = 0;
}

function resaltarCeldaGanadora(textoGanador) {
  const celdas = Array.from(document.querySelectorAll("#tabla-ruleta td"));
  let index = 0;
  let intervalo = setInterval(() => {
    // Limpiar todos
    celdas.forEach((td) => (td.style.outline = "none"));

    // Pintar la actual
    if (celdas[index]) {
      celdas[index].style.outline = "2px solid orange";
    }

    // Si coincide con el número ganador
    if (celdas[index] && celdas[index].dataset.numero === textoGanador) {
      clearInterval(intervalo);
      celdas[index].style.outline = "4px solid yellow"; // dejar marcado el ganador
    } else {
      index = (index + 1) % celdas.length;
    }
  }, 60); // velocidad del barrido (en ms)
}

function iniciarAnimacionTablero(numeroGanador) {
  const celdas = Array.from(document.querySelectorAll("#tabla-ruleta td"));
  let index = 0;

  animacionTablero = setInterval(() => {
    celdas.forEach((td) => (td.style.outline = "none"));
    if (celdas[index]) {
      celdas[index].style.outline = "2px solid orange";
    }

    if (celdas[index] && celdas[index].dataset.numero === numeroGanador) {
      // Espera al final para dejarlo marcado
      clearInterval(animacionTablero);
      celdas[index].style.outline = "4px solid yellow";
    } else {
      index = (index + 1) % 36;
    }
  }, spinTimeTotal / celdas.length); // Sincroniza duración
}

function iniciarRecorridoTabla() {
  const celdas = Array.from(document.querySelectorAll("#tabla-ruleta td"));
  indexRecorrido = 0;

  animacionTablero = setInterval(() => {
    celdas.forEach((td) => (td.style.outline = "none"));
    if (celdas[indexRecorrido]) {
      celdas[indexRecorrido].style.outline = "2px solid orange";
    }
    indexRecorrido = (indexRecorrido + 1) % celdas.length;
  }, 50); // velocidad del recorrido (puedes ajustar)
}

function detenerEnGanador(numeroGanador) {
  clearInterval(animacionTablero);
  const celdas = Array.from(document.querySelectorAll("#tabla-ruleta td"));

  const intervaloFinal = setInterval(() => {
    celdas.forEach((td) => (td.style.outline = "none"));
    if (celdas[indexRecorrido]) {
      celdas[indexRecorrido].style.outline = "2px solid orange";
    }

    if (
      celdas[indexRecorrido] &&
      celdas[indexRecorrido].dataset.numero === numeroGanador
    ) {
      clearInterval(intervaloFinal);
      celdas[indexRecorrido].style.outline = "4px solid yellow";
    } else {
      indexRecorrido = (indexRecorrido + 1) % celdas.length;
    }
  }, 1); // más lento para efecto de frenado
}
