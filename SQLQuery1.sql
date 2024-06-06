-- Создание таблицы пользователей (users) с использованием счетчика
CREATE TABLE пользователи (
    id INT PRIMARY KEY IDENTITY,
    логин VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Создание таблицы статей (articles) с использованием счетчика
CREATE TABLE статьи (
    id INT PRIMARY KEY IDENTITY,
    заголовок VARCHAR(255) NOT NULL,
    содержимое TEXT NOT NULL,
    теги VARCHAR(255),
    файл VARCHAR(255)
);

-- Создание таблицы сохраненных статей (saved_articles) с использованием счетчика
CREATE TABLE закладки (
    id INT PRIMARY KEY IDENTITY,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES пользователи(id),
    FOREIGN KEY (article_id) REFERENCES статьи(id)
);

