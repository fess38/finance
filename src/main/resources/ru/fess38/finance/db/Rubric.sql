CREATE TABLE Rubric(
	id INTEGER NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	isIncome BOOLEAN NOT NULL,
	isService BOOLEAN NOT NULL,
	isDeleted BOOLEAN NOT NULL
);

INSERT INTO Rubric(id, name, isIncome, isService) VALUES
(6, 'Перевод между счетами', FALSE, TRUE);