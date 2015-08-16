CREATE TABLE Transaction_ (
	id INTEGER NOT NULL PRIMARY KEY,
	rubricId INTEGER NOT NULL REFERENCES Rubric(id),
	dayRef DATE NOT NULL,
	accountIdFrom INTEGER NOT NULL REFERENCES Account(id),
	accountIdTo INTEGER NOT NULL REFERENCES Account(id),
	amountFrom INTEGER NOT NULL CHECK (amountFrom > 0),
	amountTo INTEGER NOT NULL CHECK (amountTo > 0),
	userId INTEGER REFERENCES User(id),
	transactionGroupId INTEGER REFERENCES TransactionGroup(id),
	isUseForStat INTEGER NOT NULL DEFAULT 1 CHECK (isUseForStat IN (0, 1)),
	comment TEXT,
	isDeleted INTEGER NOT NULL DEFAULT 0 CHECK (isDeleted IN (0, 1))
);
