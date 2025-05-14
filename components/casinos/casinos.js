document.addEventListener("DOMContentLoaded", function () {
  const heroCasinos = document.querySelector(".hero-casinos");
  if (heroCasinos) {
    heroCasinos.classList.add("aparecer");
  }
});

function toMas() {
  const tomascontainer = document.getElementById("content-area");
  if (tomascontainer) {
    fetch(navegarA("/components/marcopolovip/marcopolo.html"))
      .then((response) => response.text())
      .then((html) => {
        tomascontainer.innerHTML = html;
        scrollToTop();
      })
      .catch((err) => console.error("Error al cargar la página:", err));
  } else {
    console.error("No se encontró el contenedor content-area");
  }
}

function vidanocturna() {
  const tomascontainer = document.getElementById("content-area");
  if (tomascontainer) {
    fetch(navegarA("/components/vidanocturna/vidanocturna.html"))
      .then((response) => response.text())
      .then((html) => {
        tomascontainer.innerHTML = html;
        scrollToTop();
      })
      .catch((err) => console.error("Error al cargar la página:", err));
  } else {
    console.error("No se encontró el contenedor content-area");
  }
}

// const apiKey = "754c703d5db074fe8a9432fa54306bdf";
const obttest = document.getElementById("wg-api-basketball-games");

const apiKey =
  "cceddfe7ed800d9d2230d9adb5aa7d02282757e0179e14a99153835ed4bbf0d6";

setInterval(() => {

fetch("/components/casinos/casinos.php?q=atletico nacional vs ")
  .then((res) => res.json())
  .then((data) => {
    const resultado = data.sports_results;

    if (resultado && resultado.game_spotlight) {
      const game = resultado.game_spotlight;
      const equipos = game.teams;
      const home = equipos[0];
      const away = equipos[1];

      const marcador = `${home.score} - ${away.score}`;
      const estado = game.status || "Sin estado";
      const tiempo = game.date || "";

      // Mostrar logos + nombres
      document.getElementById("equipos").innerHTML = `
        <img src="${home.thumbnail}" alt="${home.name}" width="40" style="vertical-align:middle;"> 
        ${home.name} vs ${away.name}
        <img src="${away.thumbnail}" alt="${away.name}" width="40" style="vertical-align:middle;">
      `;

      document.getElementById("marcador").textContent = marcador;
      document.getElementById("estado").textContent = `${estado}`;
    } else {
      document.getElementById("resultado").textContent =
        "No se encontró resultado para esta búsqueda.";
    }
  })
  .catch((err) => {
    console.error("Error al cargar datos de SerpApi:", err);
    document.getElementById("resultado").textContent =
      "Error al obtener los datos.";
  });

fetch("/components/casinos/casinos.php?q=fluminense vs ")
  .then((res) => res.json())
  .then((data) => {
    const resultado2 = data.sports_results;

    if (resultado2 && resultado2.game_spotlight) {
      const game = resultado2.game_spotlight;
      const equipos2 = game.teams;
      const home = equipos2[0];
      const away = equipos2[1];

      const marcador2 = `${home.score} - ${away.score}`;
      const estado2 = game.status || "Sin estado";
      const tiempo2 = game.date || "";

      // Mostrar logos + nombres
      document.getElementById("equipos2").innerHTML = `
        <img src="${home.thumbnail}" alt="${home.name}" width="40" style="vertical-align:middle;"> 
        ${home.name} vs ${away.name}
        <img src="${away.thumbnail}" alt="${away.name}" width="40" style="vertical-align:middle;">
      `;

      document.getElementById("marcador2").textContent = marcador2;
      document.getElementById("estado2").textContent = `${estado2}`;
    } else {
      document.getElementById("resultado").textContent =
        "No se encontró resultado para esta búsqueda.";
    }
  })
  .catch((err) => {
    console.error("Error al cargar datos de SerpApi:", err);
    document.getElementById("resultado2").textContent =
      "Error al obtener los datos.";
  });

fetch("/components/casinos/casinos.php?q=real madrid vs ")
  .then((res) => res.json())
  .then((data) => {
    const resultado2 = data.sports_results;

    if (resultado2 && resultado2.game_spotlight) {
      const game = resultado2.game_spotlight;
      const equipos2 = game.teams;
      const home = equipos2[0];
      const away = equipos2[1];

      const marcador2 = `${home.score} - ${away.score}`;
      const estado2 = game.status || "Sin estado";
      const tiempo2 = game.date || "";

      // Mostrar logos + nombres
      document.getElementById("equipos3").innerHTML = `
        <img src="${home.thumbnail}" alt="${home.name}" width="40" style="vertical-align:middle;"> 
        ${home.name} vs ${away.name}
        <img src="${away.thumbnail}" alt="${away.name}" width="40" style="vertical-align:middle;">
      `;

      document.getElementById("marcador3").textContent = marcador2;
      document.getElementById("estado3").textContent = `${estado2}`;
    } else {
      document.getElementById("resultado").textContent =
        "No se encontró resultado para esta búsqueda.";
    }
  })
  .catch((err) => {
    console.error("Error al cargar datos de SerpApi:", err);
    document.getElementById("resultado3").textContent =
      "Error al obtener los datos.";
  });

fetch("/components/casinos/casinos.php?q=peñarol vs ")
  .then((res) => res.json())
  .then((data) => {
    const resultado2 = data.sports_results;
    console.log(data, "resultado2");
    if (resultado2 && resultado2.game_spotlight) {
      const game = resultado2.game_spotlight;
      const equipos2 = game.teams;
      const home = equipos2[0];
      const away = equipos2[1];

      const marcador2 = `${home.score} - ${away.score}`;
      const estado2 = game.status || "Sin estado";
      const tiempo2 = game.in_game_time.minute || "";
      console.log(tiempo2,"tiempo2");

      // Mostrar logos + nombres
      document.getElementById("equipos4").innerHTML = `
        <img src="${home.thumbnail}" alt="${home.name}" width="40" style="vertical-align:middle;"> 
        ${home.name} vs ${away.name}
        <img src="${away.thumbnail}" alt="${away.name}" width="40" style="vertical-align:middle;">
      `;

      document.getElementById("marcador4").textContent = marcador2;
      document.getElementById("estado4").textContent = `${estado2}`;
            document.getElementById("tiempo4").textContent = `${tiempo2+"'"}`;
    } else {
      document.getElementById("resultado").textContent =
        "No se encontró resultado para esta búsqueda.";
    }
  })
  .catch((err) => {
    console.error("Error al cargar datos de SerpApi:", err);
    document.getElementById("resultado4").textContent =
      "Error al obtener los datos.";
  });
}, 5000);

// fetch("/components/casinos/casinos.php?q=real madrid vs barcelona")
//   .then((res) => res.json())
//   .then((data) => {
//     const resultado = data.sports_results;
//     if (resultado) {
//       console.log("Marcador:", resultado.game_spotlight);
//       console.log("Equipos:", resultado.teams);
//     } else {
//       console.log("No se encontró marcador deportivo.");
//     }
//   })
//   .catch((err) => {
//     console.error("Error al obtener datos:", err);
//     document.getElementById("equipos").textContent =
//       "Error al obtener los datos no sirve.";
//   });

console.log("si cargo", apiKey);
console.log("si cargo", obttest);
