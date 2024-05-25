function createUser(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const name = document.querySelector('input[name="Username"]').value;
    const MSSV = document.querySelector('input[name="MSSV"]').value;
    const password = document.querySelector('input[name="Password"]').value;

    // Check if the user already exists
    if (localStorage.getItem(MSSV)) {
        alert('Tài khoản đã tồn tại!');
        return;
    }

    // Create user object
    const user = {
        name: name,
        MSSV: MSSV,
        password: password
    };



    // Save user object to localStorage
    localStorage.setItem(MSSV, JSON.stringify(user));
    alert('Đăng ký thành công!');
    window.location.href = 'login.html'; // Redirect to login page after registration
}

function loginUser(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    const MSSV = document.querySelector('input[name="Username"]').value;
    const password = document.querySelector('input[name="Password"]').value;

    // Tạo người dùng mẫu
    const sampleUsers = [
        { name: "Novenber", MSSV: "501230192", password: "123456" },
        { name: "Dev", MSSV: "501230141", password: "123456" }
    ];
    
    // Lưu người dùng mẫu vào localStorage hoặc cơ sở dữ liệu
    sampleUsers.forEach(user => {
        localStorage.setItem(user.MSSV, JSON.stringify(user));
    });

    // Check if the user exists
    const user = JSON.parse(localStorage.getItem(MSSV));

    if (user && user.password === password) {
        // User exists and password matches
        localStorage.setItem('loggedInUser', MSSV); // Save the logged in user's MSSV
        window.location.href = 'page.html'; // Redirect to another page (change 'page.html' to your target page)
    } else if (user) {
        // User exists but password doesn't match
        alert('Mật khẩu không đúng!');
    }
    else {
        // User doesn't exist
        if (confirm('Tài khoản không tồn tại. Bạn có muốn đăng ký không?')) {
            // Redirect to sign-up page (change 'signup.html' to your sign-up page)
            window.location.href = 'register.html';
        }
    }
}

function showProfilePopup() {
    const MSSV = localStorage.getItem('loggedInUser');
    if (MSSV) {
        const user = JSON.parse(localStorage.getItem(MSSV));
        if (user) {
            document.getElementById('profileUsername').value = user.name;
            document.getElementById('profileMSSV').value = user.MSSV;
            document.getElementById('profilePopup').style.display = 'block';
        } else {
            alert('Không tìm thấy thông tin người dùng.');
        }
    } else {
        alert('No user is currently logged in.');
    }
}

function closeProfilePopup() {
    document.getElementById('profilePopup').style.display = 'none';
}

function updateProfile(event) {
    event.preventDefault();
    const newUsername = document.getElementById('profileUsername').value;
    const newPassword = document.getElementById('profilePassword').value;
    const MSSV = document.getElementById('profileMSSV').value;

    const user = {
        name: newUsername,
        MSSV: MSSV,
        password: newPassword
    };

    localStorage.setItem(MSSV, JSON.stringify(user));
    localStorage.setItem('loggedInUser', MSSV);
    alert('Profile updated successfully!');
    closeProfilePopup();
}

function changeProfilePicture(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const newProfilePicture = reader.result;
        document.getElementById('profilePicture').src = newProfilePicture;
        const MSSV = localStorage.getItem('loggedInUser');
        if (MSSV) {
            const user = JSON.parse(localStorage.getItem(MSSV));
            if (user) {
                user.profilePicture = newProfilePicture;
                localStorage.setItem(MSSV, JSON.stringify(user));
            }
        }
    };
    reader.readAsDataURL(event.target.files[0]);
}

function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Đã đăng xuất!');
    window.location.href = 'index.html'; // Redirect to login page after logout
}

document.addEventListener('DOMContentLoaded', () => {
    const MSSV = localStorage.getItem('loggedInUser');
    if (MSSV) {
        const user = JSON.parse(localStorage.getItem(MSSV));
        if (user && user.profilePicture) {
            document.getElementById('profilePicture').src = user.profilePicture;
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleContactForm);
});

function handleContactForm(event) {
    event.preventDefault(); // Ngăn chặn form submit theo cách truyền thống

    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;

    // Tạo đối tượng liên hệ
    const contact = {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toLocaleString()
    };

    // Lưu đối tượng liên hệ vào localStorage
    saveContactToLocalStorage(contact);

    alert('Tin nhắn của bạn đã được gửi thành công!');
    event.target.reset(); // Reset form sau khi gửi
}

function saveContactToLocalStorage(contact) {
    let contacts = localStorage.getItem('contacts');
    if (contacts) {
        contacts = JSON.parse(contacts);
    } else {
        contacts = [];
    }
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'popup.html', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            document.getElementById('newContentContainer').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
};
function loginAdmin(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const username = document.querySelector('input[name="Username"]').value;
    const password = document.querySelector('input[name="Password"]').value;

    // Check if the admin credentials are correct
    if (username === 'admin' && password === '123456') {
        // Admin credentials match
        localStorage.setItem('loggedInUser', username); // Save the logged in user's username
        window.location.href = 'admin.html'; // Redirect to admin page
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
}

function displayUserList() {
    const userList = Object.keys(localStorage).filter(key => key !== 'loggedInUser' && key !== 'contacts');
    const userListContainer = document.getElementById('userList');
    userListContainer.innerHTML = '';

    if (userList.length > 0) {
        userList.forEach(MSSV => {
            const user = JSON.parse(localStorage.getItem(MSSV));
            const li = document.createElement('li');
            li.textContent = `${user.name} - ${user.MSSV}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteUser(MSSV);
            li.appendChild(deleteButton);
            userListContainer.appendChild(li);
        });
    } else {
        userListContainer.innerHTML = '<li>No users found.</li>';
    }
}

function deleteUser(MSSV) {
    localStorage.removeItem(MSSV);
    alert('User deleted successfully!');
    displayUserList(); // Refresh the user list
}
