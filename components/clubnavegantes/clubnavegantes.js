function Register() {
  loading.style.display = "flex";
  setTimeout(() => {
    window.location.href = "/components/registro/registro.html";
  }, 1000);
}

function Aexperience() {
    const experiencecontainer = document.getElementById("content-area");
  if (experiencecontainer) {
    fetch(navegarA("/components/vive-experience/viveex.html"))
      .then((response) => response.text())
      .then((html) => {
        experiencecontainer.innerHTML = html;
      })
      .catch((err) => console.log("Error al cargar la pagina:", err));
  } else {
    console.log("No se encontro el contenedo content-area");
  }}


 async function toprogresivos() {
 await fetch('/document/progresivos-semanal.xlsx')
    .then(res => res.arrayBuffer())
    .then(buffer => {
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      renderTable(jsonData);
      abrirModal(); // Mostrar modal al cargar la tabla
    })
    .catch(err => {
      document.getElementById('table-container').innerText = 'Error al cargar el archivo Excel.';
      console.error(err);
      abrirModal(); // Mostrar modal incluso si hay error
    });
}

function renderTable(data) {
  // console.log(data,"data");
  const container = document.getElementById('table-container');
  let tableHTML = '<table><thead><tr>';

  data[0].forEach(header => {
    tableHTML += `<th>${header}</th>`;
  });

  tableHTML += '</tr></thead><tbody>';

  for (let i = 1; i < data.length; i++) {
    tableHTML += '<tr>';
    data[i].forEach(cell => {
      tableHTML += `<td>${cell ?? ''}</td>`;
    });
    tableHTML += '</tr>';
  }

  tableHTML += '</tbody></table>';
  container.innerHTML = tableHTML;
}

// Funciones para mostrar/ocultar modal
function abrirModal() {
  document.getElementById("excelModal").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("excelModal").style.display = "none";
}




