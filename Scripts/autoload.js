function fetchAndUpdateData() {
    fetch("http://localhost:3000/api/sensor")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
        return response.json(); // Преобразуем JSON
      })
      .then((data) => {
        // Обновляем данные на странице
        document.querySelector(".container.active #humidity_value").textContent = data.humidity;
        document.querySelector(".container.active #temperature_value").textContent = data.temperature;
      })
      .catch((error) => {
        console.error("Ошибка загрузки данных:", error);
      });
  }
  
  // Автоматическое обновление данных каждые 5 секунд
  window.onload = function () {
    fetchAndUpdateData();
    setInterval(fetchAndUpdateData, 5000);
  };
  