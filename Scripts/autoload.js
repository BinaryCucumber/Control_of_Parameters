// Функция для отображения уведомления
function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;

    document.body.appendChild(notification);

    // Воспроизведение сигнала
    const alarmSound = document.getElementById("alarm-sound");
    alarmSound.play(); // Воспроизвести сигнализацию

    // Убираем уведомление через 3 секунды
    setTimeout(() => {
        notification.remove();
    }, 3000);

    // Останавливаем звук после 3 секунд
    /*setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0; // Сбросить время, чтобы звук начинался с начала при следующем воспроизведении
    }, 3000);*/
}


// Функция для открытия мини-отчета
function toggleReportWindow() {
    const reportWindow = document.getElementById("reportWindow");
    if (reportWindow) {
        reportWindow.classList.toggle("show"); // Добавляем/удаляем класс для открытия/закрытия окна
    }
}
// Функция для закрытия мини-отчета
function closeReport() {
    const reportWindow = document.getElementById("reportWindow");
    if (reportWindow) {
        reportWindow.classList.remove("show"); // Закрытие окна
    }
}


// Функция для получения и обновления данных
function fetchAndUpdateData() {
    fetch("http://localhost:3000/api/sensor")  // Ваш API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
        return response.json(); // Преобразуем JSON
      })
      .then((data) => {
        // Обновляем данные на странице
        const humidityElement = document.querySelector(".container.active #humidity_value");
        const temperatureElement = document.querySelector(".container.active #temperature_value");
        humidityElement.textContent = data.humidity;
        temperatureElement.textContent = data.temperature;

        // Валидация данных
        const container = document.querySelector(".container.active");
        const reportMessage = document.getElementById("report_message");
        const reportDetails = document.getElementById("report_details");

        // Проверяем, если температура > 25 и влажность < 60
        if (data.temperature > 25 && data.humidity < 60) {
            // Меняем цвет краев формы на красный
            container.classList.add("error");
            // Показываем сообщение о проблемах в показаниях
            reportMessage.textContent = "Показания вне нормы!";
            reportDetails.textContent = "Температура выше 25°C и влажность ниже 60%. Рекомендуем понизить температуру или повысить влажность.";
            showNotification("Внимание! Температура выше 25°C и влажность ниже 60%");
        } else {
            alarmSound.pause();
            alarmSound.currentTime = 0; // Сбрасываем звук
            // Возвращаем нормальные стили, если данные в норме
            container.classList.remove("error");
            reportMessage.textContent = "Показания в норме!";
            reportDetails.textContent = "Температура и влажность в норме.";          
        }
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
      });
}

// Автоматическое обновление данных каждые 5 секунд
window.onload = function () {
    fetchAndUpdateData();  // Начальная загрузка данных
    setInterval(fetchAndUpdateData, 5000);  // Каждые 5 секунд
};
