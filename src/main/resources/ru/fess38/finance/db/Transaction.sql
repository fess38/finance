CREATE TABLE ${transactionTable}(
	id INTEGER GENERATED BY DEFAULT AS SEQUENCE ${sequence} NOT NULL,
	rubricId INTEGER NOT NULL REFERENCES ${rubricTable}(id),
	dayRef DATE NOT NULL,
	accountFromId INTEGER NOT NULL REFERENCES ${accountTable}(id),
	accountToId INTEGER NOT NULL REFERENCES ${accountTable}(id),
	amountFrom INTEGER NOT NULL,
	amountTo INTEGER NOT NULL,
	userId INTEGER REFERENCES ${userTable}(id),
	transactionGroupId INTEGER REFERENCES ${transactionGroupTable}(id),
	comment VARCHAR(100),
  isDeleted BOOLEAN DEFAULT FALSE NOT NULL
);