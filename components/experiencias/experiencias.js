// PARA ENVIAR REDIRECCIONAR

function questionAction(){
  const buttons = document.querySelectorAll('.faq-question');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;

      // Cerrar todas las respuestas
      document.querySelectorAll('.faq-answer').forEach(el => {
        if (el !== answer) {
          el.style.maxHeight = null;
          el.classList.remove("open");
        }
      });
      // Alternar la respuesta actual
      if (answer.classList.contains("open")) {
        answer.style.maxHeight = null;
        answer.classList.remove("open");
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.classList.add("open");
      }
    });
  });
}

questionAction();