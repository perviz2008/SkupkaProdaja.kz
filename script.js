const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});

// Получение данных из localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Вход
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const errorDiv = document.getElementById("login-error");

  const users = getUsers();

  if (users[email] && users[email].password === password) {
    errorDiv.style.display = "none";
    window.location.href = "main.html";
  } else {
    errorDiv.innerText = "Неправильный email или пароль.";
    errorDiv.style.display = "block";
  }
});

// Регистрация
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-password-confirm").value;
  const errorDiv = document.getElementById("register-error");

  const users = getUsers();

  if (users[email]) {
    errorDiv.innerText = "Пользователь с таким email уже существует.";
    errorDiv.style.display = "block";
    return;
  }

  if (password !== confirmPassword) {
    errorDiv.innerText = "Пароли не совпадают.";
    errorDiv.style.display = "block";
    return;
  }

  users[email] = { username, password };
  saveUsers(users);
  errorDiv.style.display = "none";

  alert("Регистрация успешна! Теперь вы можете войти.");
  loginTab.click(); // Переключение на форму входа
});
