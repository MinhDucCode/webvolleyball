function displayUserList() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!isAdmin(loggedInUser)) {
        alert('Bạn không có quyền truy cập vào danh sách người dùng!');
        window.location.href = 'login.html'; // Chuyển hướng đến trang đăng nhập
        return;
    }

    // Thực hiện hiển thị danh sách người dùng
    const userList = Object.keys(localStorage).filter(key => key !== 'loggedInUser' && key !== 'contacts');
    const userListContainer = document.getElementById('userList');
    userListContainer.innerHTML = '';

    if (userList.length > 0) {
        userList.forEach(MSSV => {
            const user = JSON.parse(localStorage.getItem(MSSV));
            const li = document.createElement('li');
            li.textContent = `${user.name} - ${user.MSSV}`;

            if (isAdmin(loggedInUser)) {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteUser(MSSV);
                li.appendChild(deleteButton);
            }
            
            userListContainer.appendChild(li);
        });
    } else {
        userListContainer.innerHTML = '<li>No users found.</li>';
    }
}

function deleteUser(MSSV) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!isAdmin(loggedInUser)) {
        alert('Bạn không có quyền xóa người dùng!');
        window.location.href = 'login.html'; // Chuyển hướng đến trang đăng nhập
        return;
    }

    localStorage.removeItem(MSSV);
    alert('User deleted successfully!');
    displayUserList(); // Refresh the user list
}

function isAdmin(username) {
    // Kiểm tra xem username có phải là admin không
    return username === 'admin';
}

// Trong admin.js

// Lắng nghe sự kiện click trên nút đăng xuất
document.getElementById('logoutBtn').addEventListener('click', logoutAdmin);

// Hàm thực hiện đăng xuất
function logoutAdmin() {
    localStorage.removeItem('loggedInUser');
    alert('Đã đăng xuất!');
    window.location.href = 'index.html'; // Chuyển hướng về trang chủ sau khi đăng xuất
}
