package ru.fess38.finance.transaction.statistic;

import org.apache.commons.lang3.tuple.Pair;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.transaction.Transaction;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.DayRubricSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.DaySummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.RubricSummary;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@SuppressWarnings("unused")
public class DayRubricTransactions {
  public DayRubricTransactions(List<Transaction> transactions) {
    this.rubrics = TransactionsHelper.rubrics(transactions);
    this.dates = dates(transactions);
    this.monthSummary = TransactionsHelper.expenseSum(transactions);
    this.daySummary = daySummary(transactions);
    this.rubricSummary = TransactionsHelper.rubricSummary(transactions);
    this.dayRubricSummary = dayRubricSummary(transactions);
  }

  private final List<Rubric> rubrics;
  private final List<LocalDate> dates;
  private final int monthSummary;
  private final List<DaySummary> daySummary;
  private final List<RubricSummary> rubricSummary;
  private final List<DayRubricSummary> dayRubricSummary;

  private List<LocalDate> dates(List<Transaction> transactions) {
    YearMonth yearMonth = transactions.isEmpty() ? YearMonth.now() : YearMonth.of(
        transactions.get(0).dayRef().getYear(), transactions.get(0).dayRef().getMonth());
    return IntStream.rangeClosed(1, yearMonth.lengthOfMonth()).boxed()
        .map(x -> LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), x))
        .sorted()
        .collect(Collectors.toList());
  }

  private List<DaySummary> daySummary(List<Transaction> transactions) {
    return transactions.stream()
        .filter(Transaction::isExpence)
        .map(x -> Pair.of(x.dayRef(), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> DaySummary.of(x.getKey(), x.getValue()))
        .collect(Collectors.toList());
  }

  private List<DayRubricSummary> dayRubricSummary(List<Transaction> transactions) {
    return transactions.stream()
        .map(x -> Pair.of(Pair.of(x.dayRef(), x.rubric()), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> DayRubricSummary.of(x.getKey().getKey(), x.getKey().getValue(), x.getValue()))
        .collect(Collectors.toList());
  }

  public List<Rubric> getRubrics() {
    return rubrics;
  }

  public List<LocalDate> getDates() {
    return dates;
  }

  public int getMonthSummary() {
    return monthSummary;
  }

  public List<DaySummary> getDaySummary() {
    return daySummary;
  }

  public List<RubricSummary> getRubricSummary() {
    return rubricSummary;
  }

  public List<DayRubricSummary> getDayRubricSummary() {
    return dayRubricSummary;
  }
}
