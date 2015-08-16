package ru.fess38.finance.presentation;

import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.utils.Utils;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by admin on 16.08.15.
 */
public class MonthTransactionsDao {
    public MonthTransactions getMonthTransactions(Date startOfMonth) {
        Date endOfMonth = Utils.endOfMonth(startOfMonth);
        MonthTransactions monthTransactions = new MonthTransactions();
        TransactionDao transactionDao = new TransactionDao();
        List<Transaction> transactions;
        transactions = transactionDao.getTransactionsForPeriod(startOfMonth, endOfMonth);
        List<Rubric> rubrics = transactions.stream()
                .map(Transaction::getRubric)
                .distinct()
                .collect(Collectors.toList());
        rubrics.sort(Comparator.comparing(Rubric::getName));
        return monthTransactions;
    }
}
