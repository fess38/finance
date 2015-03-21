CREATE TABLE Transaction_ (
	id INTEGER NOT NULL PRIMARY KEY,
	rubricId INTEGER NOT NULL REFERENCES Rubric(id),
	amount INTEGER NOT NULL,
	dayRef DATE NOT NULL,
	accountIdFrom INTEGER NULL REFERENCES Account(id),
	accountIdTo INTEGER NULL REFERENCES Account(id),
	exchangeRate DECIMAL(10,2) NOT NULL DEFAULT 1,
	userId INTEGER REFERENCES User(id),
	transactionGroupId INTEGER REFERENCES TransactionGroup(id),
	isUseForStat INTEGER NOT NULL DEFAULT 1 CHECK(isUseForStat IN (0, 1)),
	comment TEXT,
	isDeleted INTEGER NOT NULL DEFAULT 0 CHECK(isDeleted IN (0, 1))
);