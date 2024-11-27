// Функция для отображения уведомления
function showNotification(message) {
	const notification = document.createElement('div')

	notification.classList.add('notification')
	notification.textContent = message

	document.body.appendChild(notification)

	// Работаем со звуком
	const alarmSound = document.getElementById('alarm-sound')

	// Убедимся, что звук загружен перед воспроизведением
	if (alarmSound.readyState >= 2) {
		// readyState 2 означает, что метаданные загружены
		alarmSound.currentTime = 0 // Сбрасываем время на начало
		alarmSound.play().catch(err => {
			console.error('Ошибка воспроизведения звука:', err)
		})
	} else {
		alarmSound.addEventListener('canplay', () => {
			alarmSound.currentTime = 0 // Сбрасываем время на начало
			alarmSound.play().catch(err => {
				console.error('Ошибка воспроизведения звука:', err)
			})
		})
	}

	// Убираем уведомление через 3 секунды
	setTimeout(() => {
		notification.remove()
	}, 3000)

	// Останавливаем звук после 3 секунд (если требуется)
	setTimeout(() => {
		alarmSound.pause()
		alarmSound.currentTime = 0
	}, 3000)
}

function toggleReportWindow() {
	const reportWindow = document.getElementById('reportWindow')
	if (reportWindow) {
		reportWindow.classList.toggle('show') // Добавляем/удаляем класс для открытия/закрытия окна
	}
}

function closeReport() {
	const reportWindow = document.getElementById('reportWindow')
	if (reportWindow) {
		reportWindow.classList.remove('show') // Закрытие окна
	}
}

function fetchAndUpdateData() {
	fetch('http://localhost:3000/api/sensor') // Ваш API URL
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP ошибка! Статус: ${response.status}`)
			}
			return response.json() // Преобразуем JSON
		})
		.then(data => {
			// Обновляем данные на странице
			const activeContainer = document.querySelector('.container.active')
			if (!activeContainer) {
				console.error('Активный контейнер не найден!')
				return // Останавливаем выполнение функции
			}

			const humidityElement = activeContainer.querySelector('.humidity_value')
			const temperatureElement =
				activeContainer.querySelector('.temperature_value')

			humidityElement.textContent = data.humidity
			temperatureElement.textContent = data.temperature

			// Валидация данных
			const reportMessage = document.getElementById('report_message')
			const reportDetails = document.getElementById('report_details')

			// Проверяем, если температура > 25 и влажность < 60
			if (data.temperature > 25 && data.humidity < 60) {
				activeContainer.classList.add('error')
				reportMessage.textContent = 'Показания вне нормы!'
				reportDetails.textContent =
					'Температура выше 25°C и влажность ниже 60%. Рекомендуем понизить температуру или повысить влажность.'
				showNotification('Внимание! Температура выше 25°C и влажность ниже 60%')
			} else {
				alarmSound.pause()

				// Возвращаем нормальные стили, если данные в норме
				activeContainer.classList.remove('error')
				reportMessage.textContent = 'Показания в норме!'
				reportDetails.textContent = 'Температура и влажность в норме.'
			}
		})
		.catch(error => {
			console.error('Ошибка загрузки данных:', error)
		})
}

// Автоматическое обновление данных каждые 5 секунд
window.onload = function () {
	fetchAndUpdateData() // Начальная загрузка данных
	setInterval(fetchAndUpdateData, 3000) // Каждые 5 секунд
}
