// PARA ENVIAR DESDE EL FOOTER EL EMAIL PARA REDIRECCIONAR
const formularioFooter = document.getElementById('footer-form-action');
  if (formularioFooter) {
      formularioFooter.addEventListener('submit', function (event) {
          event.preventDefault(); // Evita el envío del formulario por defecto

          const emailInput = formularioFooter.querySelector('input[id="email-footer"]');
          const email = emailInput.value;

          console.log('Email:', email);

          // Aquí puedes agregar la lógica para enviar el correo electrónico a tu servidor
      });
  }