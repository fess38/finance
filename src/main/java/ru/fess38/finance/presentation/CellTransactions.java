package ru.fess38.finance.presentation;

import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;

import java.util.List;

/**
 * Created by admin on 16.08.15.
 */
public class CellTransactions extends TransactionPresentation {
    private List<Transaction> transactions;
    private Rubric rubric;

    public Rubric getRubric() {
        return rubric;
    }

    public void setRubric(Rubric rubric) {
        this.rubric = rubric;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
}
