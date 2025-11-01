// Centralized script for login/register/home pages
// File: index.js

(function () {
  const page = document.body.dataset.page || '';
  const path = window.location.pathname;

  // Utilities
  const setUsers = (users) => localStorage.setItem('users', JSON.stringify(users));
  const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
  const setLoggedInUser = (user) => localStorage.setItem('loggedInUser', JSON.stringify(user));
  const getLoggedInUser = () => JSON.parse(localStorage.getItem('loggedInUser'));
  const removeLoggedInUser = () => localStorage.removeItem('loggedInUser');

  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  // ---------- REGISTER PAGE ----------
  if (page === 'register' || path.includes('register.html')) {
    const registerBtn = document.getElementById('registerBtn');

    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        const nameEl = document.getElementById('registerName');
        const emailEl = document.getElementById('registerEmail');
        const passwordEl = document.getElementById('registerPassword');
        const errorMsg = document.getElementById('registerError');

        const name = (nameEl && nameEl.value || '').trim();
        const email = (emailEl && emailEl.value || '').trim();
        const password = (passwordEl && passwordEl.value || '').trim();

        errorMsg.textContent = '';

        if (!name || !email || !password) {
          errorMsg.textContent = '⚠️ Please fill in all fields!';
          return;
        }

        if (name.length < 3) {
          errorMsg.textContent = 'Name must be at least 3 characters long.';
          return;
        }

        if (!emailRegex.test(email)) {
          errorMsg.textContent = 'Invalid email format. Example: user@example.com';
          return;
        }

        if (password.length < 6) {
          errorMsg.textContent = 'Password must be at least 6 characters long.';
          return;
        }

        const users = getUsers();
        const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

        if (userExists) {
          errorMsg.textContent = 'This email is already registered. Try logging in.';
          return;
        }

        users.push({ name, email, password });
        setUsers(users);

        alert('✅ Registration successful! Redirecting to login...');
        // redirect to login page
        window.location.href = 'index.html';
      });
    }
  }

  // ---------- LOGIN PAGE ----------
  if (page === 'login' || path.includes('index.html') || path.includes('login.html') || path === '/' || path.endsWith('/')) {
    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        const emailEl = document.getElementById('loginEmail');
        const passwordEl = document.getElementById('loginPassword');
        const errorMsg = document.getElementById('loginError');

        const email = (emailEl && emailEl.value || '').trim();
        const password = (passwordEl && passwordEl.value || '').trim();

        errorMsg.textContent = '';

        if (!email || !password) {
          errorMsg.textContent = '⚠️ Please fill in all fields!';
          return;
        }

        const users = getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
          errorMsg.textContent = 'No account found with this email.';
          return;
        }

        if (user.password !== password) {
          errorMsg.textContent = 'Incorrect password. Please try again.';
          return;
        }

        setLoggedInUser(user);
        window.location.href = 'home.html';
      });
    }
  }

  // ---------- HOME PAGE ----------
  if (page === 'home' || path.includes('home.html')) {
    const user = getLoggedInUser();
    const welcomeMsg = document.getElementById('welcomeMsg');
    const userEmail = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!user) {
      // not logged in -> redirect to login
      alert('⚠️ You must log in first!');
      window.location.href = 'index.html';
      return;
    }

    if (welcomeMsg) {
      welcomeMsg.textContent = `Welcome, ${user.name}!`;
    }
    if (userEmail) {
      userEmail.textContent = user.email;
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        removeLoggedInUser();
        window.location.href = 'index.html';
      });
    }
  }

})();
