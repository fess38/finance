package ru.fess38.finance.view;

import javafx.scene.control.Label;


public class TransactionLabel extends Label {
	public TransactionLabel(String text, Transactions transactions) {
		super(text);
		this.transactions = transactions;
		if (ZERO.equals(text)) {
			setText("");
		}
	}
	
	public TransactionLabel(String text) {
		this(text, Transactions.EMPTY);
	}
	
	private final static String ZERO = "0";
	private final Transactions transactions;

}
