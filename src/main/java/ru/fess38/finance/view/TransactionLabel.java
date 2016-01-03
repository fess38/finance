package ru.fess38.finance.view;

import javafx.scene.control.Label;


public class TransactionLabel extends Label {
	public TransactionLabel(Transactions transactions) {
		this.transactions = transactions;
		setText(String.valueOf(transactions.summary(Transactions.sumAmount())));
		if (ZERO.equals(getText())) {
			setText("");
		}
	}
	
	public TransactionLabel(String text) {
		this(Transactions.EMPTY);
	}
	
	private final static String ZERO = "0";
	private final Transactions transactions;
}
