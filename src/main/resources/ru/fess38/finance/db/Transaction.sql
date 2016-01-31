CREATE TABLE Transaction(
	id INTEGER NOT NULL,
	rubricId INTEGER NOT NULL REFERENCES Rubric(id),
	dayRef DATE NOT NULL,
	accountFromId INTEGER NOT NULL REFERENCES Account(id),
	accountToId INTEGER NOT NULL REFERENCES Account(id),
	amountFrom INTEGER NOT NULL,
	amountTo INTEGER NOT NULL,
	userId INTEGER REFERENCES User(id),
	transactionGroupId INTEGER REFERENCES TransactionGroup(id),
	comment VARCHAR(100),
	isDeleted BOOLEAN NOT NULL
);
