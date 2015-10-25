package ru.fess38.finance.view;

import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;

import java.time.YearMonth;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


public class MonthTransactionsByRubric implements GroupedTimePeriodTransactions<DayTransactions, Rubric> {
    public MonthTransactionsByRubric(int year, int month) {
        this.yearMonth = YearMonth.of(year, month);
    }

    private final YearMonth yearMonth;
    private Map<Rubric, Map<Date, DayTransactions>> groupedTransactions;
    private int amount;
    private Map<Rubric, Integer> amountByRubric = new HashMap<>();

    @Override
    public void add(List<Transaction> transactions) {
        transactions.forEach(x -> amount += x.getAmountFrom());
        groupedTransactions = transactions.stream()
                .collect(Collectors.groupingBy(Transaction::getRubric))
                .entrySet()
                .stream()
                .collect(Collectors.toMap(Map.Entry::getKey, x -> toDayTransactions(x.getValue())));
    }

    private Map<Date, DayTransactions> toDayTransactions(List<Transaction> transactions) {
        return transactions.stream()
                .collect(Collectors.groupingBy(Transaction::getDayRef))
                .entrySet()
                .stream()
                .collect(Collectors.toMap(Map.Entry::getKey, this::toConvertedEntry));
    }

    private DayTransactions toConvertedEntry(Map.Entry<Date, List<Transaction>> entry) {
        DayTransactions dayTransactions = new DayTransactions(entry.getKey());
        dayTransactions.set(entry.getValue());
        return dayTransactions;
    }

    @Override
    public Map<Rubric, Map<Date, DayTransactions>> getGroupedTransactions() {
        return groupedTransactions;
    }

    public int daysInMonth() {
        return yearMonth.lengthOfMonth();
    }

    public int getAmount() {
        return amount;
    }

    public Map<Rubric, Integer> getAmountByRubric() {
        return amountByRubric;
    }
}
