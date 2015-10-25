package ru.fess38.finance.view;


import ru.fess38.finance.model.Transaction;

import java.util.List;


public interface TimePeriodTransactions<T> {
    void set(List<Transaction> transactions);

    List<Transaction> getTransactions();

    int getAmount();

    T getTimePeriod();
}
