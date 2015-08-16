CREATE TABLE Account (
	id INTEGER NOT NULL PRIMARY KEY,
	name TEXT NOT NULL,
	currencyId INTEGER NOT NULL REFERENCES Currency(id),
	amount INTEGER NOT NULL DEFAULT 0,
	isCredit INTEGER NOT NULL DEFAULT 0 CHECK (isCredit IN (0, 1)),
	isClosed INTEGER NOT NULL DEFAULT 0 CHECK (isClosed IN (0, 1)),
	startDate DATE,
	finishDate DATE,
	isDeleted INTEGER NOT NULL DEFAULT 0 CHECK (isDeleted IN (0, 1))
);

INSERT INTO Account(id, name, currencyId, isCredit) VALUES
(4, "Наличные рубли", 1, 0),
(5, "Наличные доллары", 2, 0),
(6, "Наличные евро", 3, 0),
(7, "Внешний мир", 1, 0);
