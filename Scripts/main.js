// Функция для проверки авторизации
function checkAuthorization() {
    // Проверяем наличие флага авторизации в localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    // Если флаг отсутствует или равен "false", перенаправляем на страницу входа
    if (isAuthenticated !== 'true') {
        alert("Вы не авторизованы! Пожалуйста, войдите заново.");
        window.location.href = "../Login in system/login.html"; // Укажите путь к странице входа
    }
}

// Запускаем проверку авторизации при загрузке страницы
window.onload = function () {
    checkAuthorization();
};

// Дополнительно: Проверка авторизации через интервалы (если требуется постоянно проверять)
setInterval(() => {
    checkAuthorization();
}, 5000); // Проверяем каждые 5 секунд
