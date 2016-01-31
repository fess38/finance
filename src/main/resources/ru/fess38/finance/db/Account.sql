CREATE TABLE Account (
	id INTEGER NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	currencyId INTEGER NOT NULL REFERENCES Currency(id),
	amount INTEGER DEFAULT 0 NOT NULL,
	isService BOOLEAN NOT NULL,
	isDeleted BOOLEAN NOT NULL
);

INSERT INTO Account(id, name, currencyId, isService) VALUES
(4, 'Мастер счет', 1, FALSE),
(5, 'Внешний счет', 1, TRUE);
