// Симуляция изменения состояния LED (вы можете интегрировать реальные данные)
document.addEventListener('DOMContentLoaded', function() {
    const ledStatusText = document.getElementById('led_status');
    const ledIndicator = document.getElementById('led_indicator');
  
    // Пример для переключения состояния LED (вы можете использовать реальные данные)
    let ledActive = false; // Начальное состояние (неактивен)
  
    // Для демонстрации будем через 3 секунды менять состояние светодиода
    setTimeout(() => {
      ledActive = true; // Изменение состояния на активное
      updateLedStatus(ledActive);
    }, 3000);
  
    // Функция обновления статуса LED
    function updateLedStatus(isActive) {
      if (isActive) {
        ledStatusText.textContent = 'АКТИВЕН';
        ledIndicator.classList.remove('led-off');
        ledIndicator.classList.add('led-on');
      } else {
        ledStatusText.textContent = 'НЕАКТИВЕН';
        ledIndicator.classList.remove('led-on');
        ledIndicator.classList.add('led-off');
      }
    }
  });
  