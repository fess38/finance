package ru.fess38.finance.view;


import ru.fess38.finance.model.Transaction;

import java.util.ArrayList;
import java.util.List;


public abstract class AbstractTimePeriodTransactions<T> implements TimePeriodTransactions<T> {
    private List<Transaction> transactions = new ArrayList<>();
    private int amount;

    @Override
    public void set(List<Transaction> transactions) {
        this.transactions = transactions;
        transactions.forEach(x -> amount += x.getAmountFrom());
    }

    @Override
    public List<Transaction> getTransactions() {
        return transactions;
    }

    @Override
    public int getAmount() {
        return amount;
    }
}
