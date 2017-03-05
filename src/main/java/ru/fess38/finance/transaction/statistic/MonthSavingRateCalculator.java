package ru.fess38.finance.transaction.statistic;

import ru.fess38.finance.transaction.Transaction;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class MonthSavingRateCalculator {
  public List<MonthSavingRate> convert(List<Transaction> transactions) {
    List<MonthSavingRate> rates = new ArrayList<>();

    List<YearMonth> yearMonths = transactions.stream()
        .filter(x -> !x.yearMonth().equals(YearMonth.now()))
        .map(Transaction::yearMonth)
        .distinct()
        .collect(Collectors.toList());
    for (YearMonth yearMonth : yearMonths) {
      for (int period : Arrays.asList(3, 12, 24)) {
        double savingRate = calculate(transactions, yearMonth, period);
        rates.add(MonthSavingRate.of(yearMonth, savingRate, period));
      }
    }
    rates.sort(Comparator.comparing(MonthSavingRate::yearMonth)
        .thenComparing(MonthSavingRate::monthPeriod));
    return rates;
  }

  private double calculate(List<Transaction> transactions, YearMonth from, int n) {
    int income = incomeNMonths(transactions, from, n);
    int expence = expenceNMonths(transactions, from, n);
    return TransactionsHelper.savingRate(income, expence);
  }

  private int incomeNMonths(List<Transaction> transactions, YearMonth from, int n) {
    return computeAmount(transactions, from, n, Transaction::isIncome);
  }

  private int expenceNMonths(List<Transaction> transactions, YearMonth from, int n) {
    return computeAmount(transactions, from, n, Transaction::isExpence);
  }

  private int computeAmount(List<Transaction> transactions, YearMonth from, int n,
      Predicate<Transaction> predicate) {
    List<YearMonth> yearMonths = lastNMonths(from, n);
    return transactions.stream()
        .filter(x -> yearMonths.contains(YearMonth.from(x.dayRef())))
        .filter(predicate)
        .map(Transaction::amountFrom)
        .mapToInt(x -> x)
        .sum();
  }

  private List<YearMonth> lastNMonths(YearMonth from, int n) {
    return IntStream.range(0, n).boxed().map(from::minusMonths).collect(Collectors.toList());
  }
}
