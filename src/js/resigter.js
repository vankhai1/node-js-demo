const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Mật khẩu không trùng');
    return;
  }

  // kiểm tra tài khoản xem trùng k :v
  axios.get('https://localhost:44363/api/TaiKhoan')
    .then((response) => {
      const accounts = response.data;
      const accountExists = accounts.some(account => account.tenTaiKhoan === username);
      if (accountExists) {
        alert('Tài khoản đã tồn tại');
        return;
      }

      // tạo tk mới
      axios.post('https://localhost:44363/api/TaiKhoan', {
        tenTaiKhoan: username,
        matKhau: password
      })
      .then((response) => {
        console.log(response);
        alert('Đăng ký thành công');
        sendConfirmationEmail(username);
      })
      .catch((error) => {
        console.log(error);
        alert('Đăng ký thất bại');
      });
    })
    .catch((error) => {
      console.log(error);
      alert('Không thể kiểm tra tài khoản');
    });
});

function sendConfirmationEmail(username) {
  axios.post('/send-email', { username })
    .then((response) => {
      console.log(response);
      alert('Email xác nhận đã được gửi tới địa chỉ của bạn');
    })
    .catch((error) => {
      console.log(error);
      alert('Gửi email xác nhận thất bại');
    });
}