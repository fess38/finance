package ru.fess38.finance.transaction.statistic;

import ru.fess38.finance.transaction.Transaction;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ExtendedYearSummaryCalculator {
  public List<ExtendedYearSummary> calculate(List<Transaction> transactions) {
    return transactions.stream()
        .collect(Collectors.groupingBy(x -> x.dayRef().getYear()))
        .entrySet().stream()
        .map(x -> calculateYear(x.getKey(), x.getValue()))
        .sorted(Comparator.comparing(ExtendedYearSummary::year))
        .collect(Collectors.toList());
  }

  private ExtendedYearSummary calculateYear(int year, List<Transaction> transactions) {
    int income = transactions.stream()
        .filter(Transaction::isIncome)
        .map(Transaction::amountFrom)
        .mapToInt(x -> x)
        .sum();
    int expence = transactions.stream()
        .filter(Transaction::isExpence)
        .map(Transaction::amountFrom)
        .mapToInt(x -> x)
        .sum();
    return ExtendedYearSummary.of(year, income, expence);
  }
}
