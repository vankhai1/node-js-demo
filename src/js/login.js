const loginForm = document.getElementById('login-form');
const resultDiv = document.getElementById('result');
let failedAttempts = 0;

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form submission

  const username = loginForm.username.value;
  const password = loginForm.password.value;

  if (failedAttempts >= 5) {
    alert('Đăng nhập quá nhiều lần. Vui lòng thử lại sau!');
    return;
  }

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
        failedAttempts = 0;
      } else {
        alert(message);
        failedAttempts++;
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

const api = axios.create();
const rateLimitedApi = RateLimit(api, {
  maxRequests: 3, // số lượng yêu cầu tối đa trong khoảng thời gian
  perMilliseconds: 5000 // khoảng thời gian giới hạn (5000ms = 5 giây)
});

// sử dụng rate-limited API cho tất cả các yêu cầu API :v khó hiểu 
axios.interceptors.request.use((config) => {
  config.adapter = rateLimitedApi.adapter;
  return config;
});