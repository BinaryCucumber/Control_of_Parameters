// Функция проверки данных
function validateForm(event) {
  event.preventDefault(); // Отменяем отправку формы по умолчанию
  localStorage.setItem("isAuthenticated", "false");
  const username = document.querySelector('input[type="text"]').value;
  const password = document.querySelector('input[type="password"]').value;

  // Проверяем правильность логина и пароля
  if (username === "Admin" && password === "12345") {
      // Сохраняем состояние входа в localStorage
      localStorage.setItem("isAuthenticated", "true");
      // Перенаправляем на другую страницу
      window.location.href = "../Login in system/main.html"; // Укажите URL страницы для успешного входа
  } else {
      alert("Неверный логин или пароль! Попробуйте снова.");
  }
}

// Запускаем проверку авторизации при загрузке страницы
window.onload = function () {
  validateForm();
};