// Функция проверки авторизации
function checkAuthorization() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    // Если пользователь не авторизован, перенаправляем на страницу входа
    if (isAuthenticated !== "true") {
        alert("Вы не авторизованы! Пожалуйста, войдите заново.");
        window.location.href = "../login.html";
    }
}

// Функция выхода из системы
function logout() {
    // Удаляем статус авторизации
    localStorage.removeItem("isAuthenticated");
    // Перенаправляем на страницу входа
    window.location.href = "../login.html";
}

// Проверяем авторизацию при загрузке страницы
window.onload = function () {
    checkAuthorization();

    // Привязываем обработчик к кнопке выхода
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
};
