CREATE TABLE Account (
	id INT NOT NULL PRIMARY KEY,
	name NVARCHAR(100) NOT NULL,
	currencyId INT NOT NULL REFERENCES Currency(id),
	amount INT NOT NULL DEFAULT 0,
	isCurrent BOOLEAN NOT NULL,
	isCredit BOOLEAN NOT NULL,
	isClosed BOOLEAN NOT NULL DEFAULT FALSE,
	startDate DATE NULL,
	finishDate DATE NULL,
	isDeleted BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO Account(id, name, currencyId, isCurrent, isCredit) VALUES
(4, "Наличные рубли", 1, "TRUE", "FALSE"),
(5, "Наличные доллары", 2, "TRUE", "FALSE"),
(6, "Наличные евро", 3, "TRUE", "FALSE");