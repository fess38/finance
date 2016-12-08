package ru.fess38.finance.transaction.statistic;

import org.apache.commons.lang3.tuple.Pair;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.transaction.Transaction;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.RubricSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.YearRubricSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.YearSummary;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class YearRubricTransactions {
  public YearRubricTransactions(List<Transaction> transactions) {
    rubrics = TransactionsHelper.rubrics(transactions);
    startOfYears = startOfYears(transactions);
    yearsSummary = TransactionsHelper.expenseSum(transactions);
    yearSummary = TransactionsHelper.yearSummary(transactions);
    rubricSummary = TransactionsHelper.rubricSummary(transactions);
    yearRubricSummary = yearRubricSummary(transactions);
  }

  private final List<Rubric> rubrics;
  private final List<LocalDate> startOfYears;
  private final int yearsSummary;
  private List<YearSummary> yearSummary;
  private final List<RubricSummary> rubricSummary;
  private final List<YearRubricSummary> yearRubricSummary;

  private List<LocalDate> startOfYears(List<Transaction> transactions) {
    return transactions.stream()
        .map(Transaction::dayRef)
        .map(LocalDate::getYear)
        .distinct()
        .map(x -> LocalDate.of(x, 1, 1))
        .sorted()
        .collect(Collectors.toList());
  }

  private List<YearRubricSummary> yearRubricSummary(List<Transaction> transactions) {
    return transactions.stream()
        .map(x -> Pair.of(
            Pair.of(LocalDate.of(x.dayRef().getYear(), 1, 1), x.rubric()), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> YearRubricSummary.of(x.getKey().getKey(), x.getKey().getValue(), x.getValue()))
        .collect(Collectors.toList());
  }

  public List<Rubric> getRubrics() {
    return rubrics;
  }

  public List<LocalDate> getStartOfYears() {
    return startOfYears;
  }

  public int getYearsSummary() {
    return yearsSummary;
  }

  public List<YearSummary> getYearSummary() {
    return yearSummary;
  }

  public List<RubricSummary> getRubricSummary() {
    return rubricSummary;
  }

  public List<YearRubricSummary> getYearRubricSummary() {
    return yearRubricSummary;
  }
}
