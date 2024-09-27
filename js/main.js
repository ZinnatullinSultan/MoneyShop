document.addEventListener('DOMContentLoaded', () => {
  const loginCodeInput = document.getElementById('login_code');
  let code = '';

  function updateCode() {
    const formattedCode = code.replace(
      /(\d{3})(\d{0,3})(\d{0,3})(\d{0,3})/,
      (_, p1, p2, p3, p4) => {
        let result = p1;
        if (p2) result += '-' + p2;
        if (p3) result += '-' + p3;
        if (p4) result += '-' + p4;
        return result;
      }
    );
    loginCodeInput.value = formattedCode;
  }

  function handleKeyClick(key) {
    if (key === 'backspace') {
      code = code.slice(0, -1);
    } else if (key === 'clear') {
      code = '';
    } else if (code.length < 12 && !isNaN(key)) {
      code += key;
    }
    updateCode();
  }

  function logResponse(response, result) {
    console.log('Authorization response status:', response.status);
    console.log('Authorization response body:', result);
  }

  function handleError(error) {
    console.error('Error connecting to server:', error);
    alert('Ошибка при соединении с сервером.');
  }

  document.querySelectorAll('.key').forEach((button) => {
    button.addEventListener('click', () =>
      handleKeyClick(button.getAttribute('data-key'))
    );
  });
});
