// Функция обработки входа
function handleLogin(event) {
  event.preventDefault(); // Отменяем стандартное поведение формы

  const username = document.querySelector('input[type="text"]').value;
  const password = document.querySelector('input[type="password"]').value;

  // Проверка логина и пароля
  if (username === "Admin" && password === "12345") {
      // Сохраняем состояние авторизации
      localStorage.setItem("isAuthenticated", "true");
      // Перенаправляем на главную страницу
      window.location.href = "../Control Parametrs/main.html";
  } else {
      alert("Неверный логин или пароль! Попробуйте снова.");
  }
}

// Привязываем обработчик формы
window.onload = function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
  }
};

// Блокируем переходы по истории (Назад/Вперед)
history.pushState(null, null, location.href); // Добавляем состояние в историю

window.onpopstate = function (event) {
    // При попытке вернуться или перейти вперёд оставляем на текущей странице
    history.pushState(null, null, location.href);
    alert("Навигация отключена! Вы не можете покинуть эту страницу таким образом.");
};