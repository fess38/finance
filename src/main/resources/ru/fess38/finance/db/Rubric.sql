CREATE TABLE Rubric (
	id INT NOT NULL PRIMARY KEY,
	name NVARCHAR(100) NOT NULL,
	isIncome BOOLEAN NOT NULL,
	isDeleted BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO Rubric(id, name, isIncome) VALUES
(7, "Перевод между счетами", "FALSE"),
(8, "Доход с капитала", "FALSE"),
(9, "Выплата по кредиту", "FALSE"),
(10, "Корректировка счетов по доходу", "FALSE"),
(11, "Корректировка счетов по расходу", "FALSE");