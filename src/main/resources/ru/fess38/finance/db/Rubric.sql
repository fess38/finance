CREATE TABLE Rubric (
	id INTEGER NOT NULL PRIMARY KEY,
	name TEXT NOT NULL,
	isIncome INTEGER NOT NULL CHECK (isIncome IN (0, 1)),
	isDeleted INTEGER NOT NULL DEFAULT 0 CHECK (isDeleted IN (0, 1))
);

INSERT INTO Rubric(id, name, isIncome) VALUES
(8, "Доход с капитала", 0),
(9, "Выплата по кредиту", 0),
(10, "Перевод между счетами", 0);