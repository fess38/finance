package ru.fess38.finance.transaction.statistic;

import org.apache.commons.lang3.tuple.Pair;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.transaction.Transaction;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class YearRubricTransactions {
  public YearRubricTransactions(List<Transaction> transactions) {
    rubrics = rubrics(transactions);
    startOfYears = startOfYears(transactions);
    yearsSummary = yearsSummary(transactions);
    yearSummary = yearSummary(transactions);
    rubricSummary = rubricSummary(transactions);
    yearRubricSummary = yearRubricSummary(transactions);
  }

  private final List<Rubric> rubrics;
  private final List<LocalDate> startOfYears;
  private final int yearsSummary;
  private List<YearSummary> yearSummary;
  private final List<RubricSummary> rubricSummary;
  private final List<YearRubricSummary> yearRubricSummary;

  private List<Rubric> rubrics(List<Transaction> transactions) {
    return transactions.stream()
        .map(Transaction::rubric)
        .distinct()
        .collect(Collectors.toList());
  }

  private List<LocalDate> startOfYears(List<Transaction> transactions) {
    return transactions.stream()
        .map(Transaction::dayRef)
        .map(LocalDate::getYear)
        .distinct()
        .map(x -> LocalDate.of(x, 1, 1))
        .sorted()
        .collect(Collectors.toList());
  }

  private int yearsSummary(List<Transaction> transactions) {
    return transactions.stream()
        .filter(Transaction::isExpence)
        .mapToInt(Transaction::amountFrom)
        .sum();
  }

  private List<YearSummary> yearSummary(List<Transaction> transactions) {
    return transactions.stream()
        .filter(Transaction::isExpence)
        .map(x -> Pair.of(LocalDate.of(x.dayRef().getYear(), 1, 1), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> YearSummary.of(x.getKey(), x.getValue()))
        .collect(Collectors.toList());
  }

  private List<RubricSummary> rubricSummary(List<Transaction> transactions) {
    return transactions.stream()
        .map(x -> Pair.of(x.rubric(), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> RubricSummary.of(x.getKey(), x.getValue()))
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
