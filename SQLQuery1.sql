-- �������� ������� ������������� (users) � �������������� ��������
CREATE TABLE ������������ (
    id INT PRIMARY KEY IDENTITY,
    ����� VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- �������� ������� ������ (articles) � �������������� ��������
CREATE TABLE ������ (
    id INT PRIMARY KEY IDENTITY,
    ��������� VARCHAR(255) NOT NULL,
    ���������� TEXT NOT NULL,
    ���� VARCHAR(255),
    ���� VARCHAR(255)
);

-- �������� ������� ����������� ������ (saved_articles) � �������������� ��������
CREATE TABLE �������� (
    id INT PRIMARY KEY IDENTITY,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES ������������(id),
    FOREIGN KEY (article_id) REFERENCES ������(id)
);

