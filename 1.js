const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к базе данных
const pool = new Pool({
  user: 'your_database_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_database_password',
  port: 5432, // Порт вашей базы данных
});

// Middleware для разбора тела запроса
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Массив статей
const статьи = [];

// Класс Статья
class Статья {
    constructor(заголовок, содержание, теги, файл) {
        this.заголовок = заголовок;
        this.содержание = содержание;
        this.теги = теги;
        this.файл = файл;
    }
}

// Получение всех статей из базы данных
app.get('/articles', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM статьи');
    res.json(rows);
  } catch (error) {
    console.error('Ошибка при получении статей:', error);
    res.status(500).json({ error: 'Ошибка при получении статей' });
  }
});

// Создание новой статьи
app.post('/articles', async (req, res) => {
  const { заголовок, содержание, теги, файл } = req.body;
  try {
    await pool.query('INSERT INTO статьи (заголовок, содержание, теги, файл) VALUES ($1, $2, $3, $4)', [заголовок, содержание, теги, файл]);
    res.status(201).json({ message: 'Статья успешно создана' });
  } catch (error) {
    console.error('Ошибка при создании статьи:', error);
    res.status(500).json({ error: 'Ошибка при создании статьи' });
  }
});

// Прослушивание запросов на определенном порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Отображение страницы авторизации при загрузке страницы
app.use(express.static('public'));
