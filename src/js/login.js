const loginForm = document.getElementById('login-form');
const resultDiv = document.getElementById('result');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form submission

  const username = loginForm.username.value;
  const password = loginForm.password.value;

  axios.post('https://localhost:44363/api/Login/Login', {
    tenTaiKhoan: username,
    matKhau: password
  })
  .then((response) => {
    const { isSuccess, message, accessToken } = response.data;
    if (isSuccess) {
        localStorage.setItem('accessToken', accessToken);
        alert(`Login successful. Access token: ${accessToken}`);
        
      } else {
        alert(message);
      }
  })
  .catch((error) => {
    alert(error.message);
  });
});