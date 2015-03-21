CREATE TABLE Account (
	id INTEGER NOT NULL PRIMARY KEY,
	name TEXT NOT NULL,
	currencyId INTEGER NOT NULL REFERENCES Currency(id),
	amount INTEGER NOT NULL DEFAULT 0,
	isCurrent INTEGER NOT NULL CHECK(isCurrent IN (0, 1)),
	isCredit INTEGER NOT NULL CHECK(isCredit IN (0, 1)),
	isClosed INTEGER NOT NULL DEFAULT 0 CHECK(isClosed IN (0, 1)),
	startDate DATE NULL,
	finishDate DATE NULL,
	isDeleted INTEGER NOT NULL DEFAULT 0 CHECK(isDeleted IN (0, 1))
);

INSERT INTO Account(id, name, currencyId, isCurrent, isCredit) VALUES
(4, "Наличные рубли", 1, 1, 0),
(5, "Наличные доллары", 2, 1, 0),
(6, "Наличные евро", 3, 1, 0);