const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path') // Для работы с путями

const app = express()
const PORT = 3000

// Включаем CORS
app.use(cors())

// Настроим обработку статических файлов
app.use(express.static(path.join(__dirname, '..')))

// Конечная точка для корневого маршрута
app.get('/', (req, res) => {
	// Отправляем HTML-файл как ответ
	res.sendFile(path.join(__dirname, '..', 'login.html'))
})

// Конечная точка для получения данных из файла test.txt
app.get('/api/sensor', (req, res) => {
	const filePath = '../test.txt'

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('Ошибка чтения файла:', err)
			res.status(500).json({ error: 'Не удалось прочитать файл' })
			return
		}

		// Парсим содержимое файла
		const lines = data.split('\n')
		const humidity = lines[0]?.split(':')[1]?.trim()
		const temperature = lines[1]?.split(':')[1]?.trim()

		// Отправляем данные
		res.json({
			humidity: humidity || 'N/A',
			temperature: temperature || 'N/A',
		})
	})
})

// Запускаем сервер
app.listen(PORT, () => {
	console.log(`Сервер запущен: http://localhost:${PORT}`)
})
