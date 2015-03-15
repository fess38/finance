CREATE TABLE Transaction_ (
	id INT NOT NULL PRIMARY KEY,
	rubricId INT NOT NULL REFERENCES Rubric(id),
	amount INT NOT NULL,
	dayRef DATE NOT NULL,
	accountIdFrom INT NULL REFERENCES Account(id),
	accountIdTo INT NULL REFERENCES Account(id),
	exchangeRate DECIMAL(10,2) NOT NULL DEFAULT 1,
	userId INT REFERENCES User(id),
	transactionGroupId INT REFERENCES TransactionGroup(id),
	isUseForStat BOOLEAN NOT NULL DEFAULT TRUE,
	comment NVARCHAR(255),
	isDeleted BOOLEAN NOT NULL DEFAULT FALSE
);