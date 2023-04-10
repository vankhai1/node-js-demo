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
    const { isSuccess, message, data } = response.data;
    localStorage.setItem('token', data);
    if (isSuccess) {
        localStorage.setItem('token', data);
        alert(`Login successful. Access token: ${data}`);
      } else {
        alert(message);
      }
      if(data==null){
        alert(message);
      }else{
        window.location.href = "/home";
      }   
        
    
    
  })
  .catch((error) => {
    alert(error.message);
  });
});
