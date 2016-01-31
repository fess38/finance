CREATE TABLE Currency (
	id INTEGER NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	symbol VARCHAR(1) NOT NULL CHECK (LENGTH(symbol) = 1) UNIQUE,
	isDeleted BOOLEAN NOT NULL
);

INSERT INTO Currency(id, name, symbol) VALUES
(1, 'Рубль', '₽'),
(2, 'Доллар', '$'),
(3, 'Евро', '€');
