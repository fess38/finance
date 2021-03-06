package ru.fess38.finance.transaction.statistic;

import org.apache.commons.lang3.tuple.Pair;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.transaction.Transaction;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.MonthRubricSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.MonthSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.RubricSummary;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class MonthRubricTransactions {
  public MonthRubricTransactions(List<Transaction> transactions) {
    rubrics = TransactionsHelper.rubrics(transactions);
    startOfMonths = startOfMonths(transactions);
    yearSummary = TransactionsHelper.expenseSum(transactions);
    monthSummary = TransactionsHelper.monthSummary(transactions);
    rubricSummary = TransactionsHelper.rubricSummary(transactions);
    monthRubricSummary = monthRubricSummary(transactions);
  }

  private final List<Rubric> rubrics;
  private final List<LocalDate> startOfMonths;
  private final int yearSummary;
  private List<MonthSummary> monthSummary;
  private final List<RubricSummary> rubricSummary;
  private final List<MonthRubricSummary> monthRubricSummary;

  private List<LocalDate> startOfMonths(List<Transaction> transactions) {
    int year = transactions.isEmpty() ? Year.now().getValue() :
        transactions.get(0).dayRef().getYear();
    return IntStream.rangeClosed(1, 12).boxed()
        .map(x -> LocalDate.of(year, x, 1))
        .collect(Collectors.toList());
  }

  private List<MonthRubricSummary> monthRubricSummary(List<Transaction> transactions) {
    return transactions.stream()
        .map(x -> Pair.of(Pair.of(x.dayRef().withDayOfMonth(1), x.rubric()), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> MonthRubricSummary.of(x.getKey().getKey(), x.getKey().getValue(), x.getValue()))
        .collect(Collectors.toList());
  }

  public List<Rubric> getRubrics() {
    return rubrics;
  }

  public List<LocalDate> getStartOfMonths() {
    return startOfMonths;
  }

  public int getYearSummary() {
    return yearSummary;
  }

  public List<MonthSummary> getMonthSummary() {
    return monthSummary;
  }

  public List<RubricSummary> getRubricSummary() {
    return rubricSummary;
  }

  public List<MonthRubricSummary> getMonthRubricSummary() {
    return monthRubricSummary;
  }
}
