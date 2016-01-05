package ru.fess38.finance.view;

import javafx.scene.control.Label;


public class TransactionLabel extends Label {
	public TransactionLabel(Transactions transactions) {
		this.transactions = transactions;
		setText(String.valueOf(transactions.summary()));
	}

	public TransactionLabel(String text) {
		this(Transactions.EMPTY);
	}

	private final Transactions transactions;

	public Transactions getTransactions() {
		return transactions;
	}
}
