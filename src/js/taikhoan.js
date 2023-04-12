
axios.get('https://localhost:44363/api/TaiKhoan')
  .then(function (response) {
    // Lấy dữ liệu từ response
    const data = response.data;
    let counter = 1; // Khởi tạo biến đếm với giá trị ban đầu là 1
    
    // Lặp qua các phần tử trong mảng dữ liệu và tạo các thẻ HTML tương ứng
    data.forEach(function (item) {
      // Tạo một hàng mới trong bảng
      const row = document.createElement('tr');
      
      // Tạo các ô trong hàng với dữ liệu tương ứng
      const column1 = document.createElement('td');
      column1.innerHTML = counter; // Sử dụng biến đếm để tạo số tự tăng
      row.appendChild(column1);
      
      const column2 = document.createElement('td');
      column2.innerHTML = item.tenTaiKhoan;
      row.appendChild(column2);
      
      const column3 = document.createElement('td');
      column3.innerHTML = item.matKhau;
      row.appendChild(column3);
      
      const column4 = document.createElement('td');
      column4.innerHTML = item.idTK;
      row.appendChild(column4);
      // Tạo một nút "Sửa, xóa" cho mỗi hàng
      
      const editBtn = document.createElement('button');
      editBtn.classList.add('btn', 'btn-primary');
      editBtn.innerText = 'Sửa';
      editBtn.addEventListener('click', function() {
    // Hiển thị modal để chỉnh sửa thông tin chức vụ
    showModal(item);
    function showModal(chucVu) {
    const editForm = document.getElementById('editForm');
    editForm.reset();
    editForm.elements['idCV'].value = chucVu.idCV;
    editForm.elements['tenChucVu'].value = chucVu.tenChucVu;
    editForm.elements['moTa'].value = chucVu.moTa;
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}
    document.querySelector('#saveButton').addEventListener('click', function() {
     // Lấy dữ liệu từ form
    const id = document.querySelector('#editIdCV').value;
    const tenChucVu = document.querySelector('#editTenChucVu').value;
    const moTa = document.querySelector('#editMoTa').value;
      
    // Gửi dữ liệu cập nhật lên server
    axios.put('https://localhost:44363/api/ChucVu/id?id=' + id, {
        idCV: id,
        tenChucVu: tenChucVu,
        moTa: moTa
      })
      .then(function(response) {
        // Đóng modal sửa
        const modal = document.querySelector('#editModal');
        M.Modal.getInstance(modal).close();
        
        // Reload lại dữ liệu trên trang
        loadData();
        
      })
      .catch(function(error) {
        console.log(error);
      });
  });
});   
      const column5 = document.createElement('td');
      column5.appendChild(editBtn);
      row.appendChild(column5);  
       //xóa nè mong nó chạy :v

       const deleteBtn = document.createElement('button');
       deleteBtn.classList.add('btn', 'btn-danger');
       deleteBtn.innerText = 'Xóa';
       deleteBtn.addEventListener('click', function() {
       // Lấy id chức vụ từ cột idCV của hàng hiện tại
       const id = item.idTK;
       
       // Gửi yêu cầu xóa chức vụ với id tương ứng lên server
       axios.delete('https://localhost:44363/api/TaiKhoan/' + id)
           .then(function(response) {
           // Nếu xóa thành công, xóa hàng tương ứng trên bảng
           row.remove();
           })
           .catch(function(error) {
           console.log(error);
           });
       });
       const column6 = document.createElement('td');
       column6.appendChild(deleteBtn);
       row.appendChild(column6);
     
      
      // Thêm hàng vào tbody của bảng
      document.querySelector('table tbody').appendChild(row);
      
      counter++; // Tăng biến đếm lên 1 để sử dụng cho hàng tiếp theo
    });
  })
  .catch(function (error) {
    console.log(error);
  });

  //them 
  // Gán form add chức vụ vào biến formAdd
const formAdd = document.querySelector('#form-add');

// Bắt sự kiện submit form
formAdd.addEventListener('submit', function (event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của submit form
  
  // Lấy dữ liệu từ form và đóng gói vào object
  const formData = {
    tenChucVu: document.querySelector('#ten-chuc-vu').value,
    moTa: document.querySelector('#mo-ta').value,
  };
  
  // Gửi dữ liệu lên server
  axios.post('https://localhost:44363/api/ChucVu', formData)
    .then(function (response) {
      // Nếu thành công, thêm chức vụ mới vào bảng
      const data = response.data;
      
      // Tạo một hàng mới trong bảng
      const row = document.createElement('tr');
      
      // Tạo các ô trong hàng với dữ liệu tương ứng
      const column1 = document.createElement('td');
      column1.innerHTML = data.idCV; // Sử dụng id trả về từ server để tạo số tự động
      row.appendChild(column1);
      const column2 = document.createElement('td');
      column2.innerHTML = data.tenChucVu;
      row.appendChild(column2);
      
      const column3 = document.createElement('td');
      column3.innerHTML = data.moTa;
      row.appendChild(column3);
      
      // Thêm hàng vào tbody của bảng
      document.querySelector('table tbody').appendChild(row);
      
      // Reset form
      formAdd.reset();
    })
    .catch(function (error) {
      console.log(error);
    });
});



//kím tìm

document.querySelector('#searchInput').addEventListener('input', function() {
  const searchValue = this.value.toLowerCase(); // Lấy giá trị từ ô input và chuyển về chữ thường
  
  // Lặp lại mảng dữ liệu và kiểm tra xem các phần tử có chứa giá trị tìm kiếm hay không
  const dataRows = document.querySelectorAll('table tbody tr');
  dataRows.forEach(function(row) {
    const name = row.querySelector('td:nth-of-type(2)').textContent.toLowerCase(); // Lấy giá trị tên chức vụ và chuyển về chữ thường
    const description = row.querySelector('td:nth-of-type(3)').textContent.toLowerCase(); // Lấy giá trị mô tả và chuyển về chữ thường
    
    if (name.includes(searchValue) || description.includes(searchValue)) {
      row.style.display = ''; // Hiển thị phần tử nếu chứa giá trị tìm kiếm
    } else {
      row.style.display = 'none'; // Ẩn phần tử nếu không chứa giá trị tìm kiếm
    }
  });
});
// xóa nè