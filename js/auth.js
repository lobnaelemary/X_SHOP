// Authentication Functions
// LoginForm funxtiona
function initializeAuth() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) { 
        loginForm.onsubmit = function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                currentUser = user;
                saveCurrentUser(); 
                showToast(`Welcome ${currentUser.name}`);
                updateUI();
                window.location.href = '../index.html'; 
            } else {
                showToast('Invalid email or password', 'error');
            }
        };
    }

    // Registration Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) { 
        registerForm.onsubmit = function(e) {
            e.preventDefault();

            const name = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirm = document.getElementById('confirmPassword').value;

            if (password !== confirm) {
                showToast('Passwords do not match', 'error');
                return;
            }

            if (users.find(u => u.email === email)) {
                showToast('Email already exists', 'error');
                return;
            }

            users.push({ email, password, name, isAdmin: false });
            saveUsers(); 
            showToast(`Welcome ${name} Account created successfully.. Please login.`);
            toggleAuthForm();
            document.getElementById('registerForm').reset();
        };
    }
}

// Function to toggle between login and registration forms
function toggleAuthForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm && registerForm) { 
        loginForm.classList.toggle('hidden');
        registerForm.classList.toggle('hidden');
    }
}

// Function to logout
function logout() {
    currentUser = null;
    cart = []; 
    saveCurrentUser(); 
    saveCart(); 
    updateUI();
    window.location.href = '../index.html'; 
    showToast('Logout successful');
}

document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});