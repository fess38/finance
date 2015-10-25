package ru.fess38.finance.view;


import ru.fess38.finance.model.Entity;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;

import java.util.List;
import java.util.Map;


public interface GroupedTimePeriodTransactions<T extends TimePeriodTransactions, V extends Entity> {
    void add(List<Transaction> transactions);

    <U> Map<Rubric, Map<U, V>> getGroupedTransactions();
}
