// Get current page
const path = window.location.pathname;

// ===== REGISTER PAGE =====
if (path.includes("register.html")) {
  const registerBtn = document.getElementById("registerBtn");

  registerBtn.addEventListener("click", () => {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const errorMsg = document.getElementById("registerError");

    errorMsg.textContent = ""; // Reset message

    // --- Validation checks -----
    if (!name || !email || !password) {
      errorMsg.textContent = "⚠️ Please fill in all fields!";
      return;
    }

    // Name must be at least 3 chars
    if (name.length < 3) {
      errorMsg.textContent = "Name must be at least 3 characters long.";
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      errorMsg.textContent =
        "Invalid email format. Example: user@example.com";
      return;
    }

    // Password validation
    if (password.length < 6) {
      errorMsg.textContent = "Password must be at least 6 characters long.";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      errorMsg.textContent = "This email is already registered. Try logging in.";
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registration successful! Redirecting to login...");
    window.location.href = "login.html";
  });
}

// ---------- LOGIN PAGE ---------------

if (path.includes("index.html")) {
if (path.includes("index.html")) {
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const errorMsg = document.getElementById("loginError");

    errorMsg.textContent = ""; // Reset message

    if (!email || !password) {
      errorMsg.textContent = "⚠️ Please fill in all fields!";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);

    if (!user) {
      errorMsg.textContent = "No account found with this email.";
      return;
    }

    if (user.password !== password) {
      errorMsg.textContent = "Incorrect password. Please try again.";
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "home.html";
  });
}

// ===== HOME PAGE =====

if (path.includes("home.html")) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const welcomeMsg = document.getElementById("welcomeMsg");
  const logoutBtn = document.getElementById("logoutBtn");

  // ✅ Block access if not logged in

  if (!user) {
    alert("⚠️ You must log in first!");

    window.location.href = "index.html";

    window.location.href = "index.html";
 
  } else {
    welcomeMsg.textContent = `Welcome, ${user.name}!`;
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";

    window.location.href = "index.html";

  });
}

