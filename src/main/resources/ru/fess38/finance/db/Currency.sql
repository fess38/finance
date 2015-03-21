CREATE TABLE Currency(
	id INTEGER NOT NULL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	symbol NVARCHAR(1) NULL CHECK(LENGTH(symbol) = 1) UNIQUE,
	isDeleted INTEGER NOT NULL DEFAULT 0 CHECK(isDeleted IN (0, 1))
);

INSERT INTO Currency(id, name, symbol) VALUES
(1, "Рубль", "₽"),
(2, "Доллар", "$"),
(3, "Евро", "€");