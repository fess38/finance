package ru.fess38.finance.view;


import javafx.scene.control.Label;


public class TransactionLabel extends Label {
	public TransactionLabel(Transactions transactions) {
		this.transactions = transactions;
		setText(String.valueOf(transactions.summary()));
	}

	private final Transactions transactions;

	public Transactions getTransactions() {
		return transactions;
	}
}
