CREATE TABLE Currency(
	id INT NOT NULL PRIMARY KEY,
	name NVARCHAR(25) NOT NULL,
	symbol NVARCHAR(1) NULL,
	isDeleted BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO Currency(id, name, symbol) VALUES
(1, "Рубль", "₽"),
(2, "Доллар", "$"),
(3, "Евро", "€");