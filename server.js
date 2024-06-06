const express = require('express');
const mssql = require('mssql');

const app = express();
const port = 3000;

// Конфигурация подключения к базе данных SQL Server
const config = {
  server: 'localhost',
  database: 'master',
};

// Подключение к базе данных
mssql.connect(config, err => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Подключение к базе данных успешно.');
});

// Класс Пользователь
class Пользователь {
  constructor(почта, пароль, имя) {
    this.почта = почта;
    this.пароль = пароль;
    this.имя = имя;
  }

  static зарегистрировать(почта, пароль, имя) {
    const request = new mssql.Request();
    request.query(
      `INSERT INTO пользователи (логин, password, name) VALUES ('${почта}', '${пароль}', '${имя}')`,
      (err, result) => {
        if (err) {
          console.error('Ошибка при регистрации пользователя:', err);
          return false;
        }
        console.log('Пользователь успешно зарегистрирован.');
        return true;
      }
    );
  }

  static войти(почта, пароль, callback) {
    const request = new mssql.Request();
    request.query(
      `SELECT * FROM пользователи WHERE логин = '${почта}' AND password = '${пароль}'`,
      (err, result) => {
        if (err) {
          console.error('Ошибка при входе пользователя:', err);
          callback(null);
          return;
        }
        if (result.recordset.length > 0) {
          console.log('Пользователь успешно вошел.');
          callback(result.recordset[0]);
        } else {
          console.log('Неверная почта или пароль.');
          callback(null);
        }
      }
    );
  }
}

// Класс Статья
class Статья {
  constructor(заголовок, содержание, теги, файл) {
    this.заголовок = заголовок;
    this.содержание = содержание;
    this.теги = теги;
    this.файл = файл;
  }

  static получитьВсе(callback) {
    const request = new mssql.Request();
    request.query('SELECT * FROM статьи', (err, result) => {
      if (err) {
        console.error('Ошибка при получении статей:', err);
        callback([]);
        return;
      }
      callback(result.recordset);
    });
  }
}

// Определение маршрута для получения списка пользователей
app.get('/api/users', (req, res) => {
  const request = new mssql.Request();
  request.query('SELECT * FROM пользователи', (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    res.json(result.recordset);
  });
});

// Определение маршрута для получения списка статей
app.get('/api/articles', (req, res) => {
  Статья.получитьВсе(статьи => {
    res.json(статьи);
  });
});

// Определение маршрутов Express.js
app.get('/', (req, res) => {
  // Здесь вы можете написать код для обработки запросов
  res.send('Привет, мир!');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
