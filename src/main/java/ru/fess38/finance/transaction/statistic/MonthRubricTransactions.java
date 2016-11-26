package ru.fess38.finance.transaction.statistic;

import org.apache.commons.lang3.tuple.Pair;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.transaction.Transaction;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class MonthRubricTransactions {
  public MonthRubricTransactions(List<Transaction> transactions) {
    rubrics = rubrics(transactions);
    startOfMonths = startOfMonths(transactions);
    yearSummary = yearSummary(transactions);
    monthSummary = monthSummary(transactions);
    rubricSummary = rubricSummary(transactions);
    monthRubricSummary = monthRubricSummary(transactions);
  }

  private final List<Rubric> rubrics;
  private final List<LocalDate> startOfMonths;
  private final int yearSummary;
  private List<MonthSummary> monthSummary;
  private final List<RubricSummary> rubricSummary;
  private final List<MonthRubricSummary> monthRubricSummary;

  private List<Rubric> rubrics(List<Transaction> transactions) {
    return transactions.stream()
        .map(Transaction::rubric)
        .distinct()
        .collect(Collectors.toList());
  }

  private List<LocalDate> startOfMonths(List<Transaction> transactions) {
    int year = transactions.isEmpty() ? Year.now().getValue() :
        transactions.get(0).dayRef().getYear();
    return IntStream.rangeClosed(1, 12).boxed()
        .map(x -> LocalDate.of(year, x, 1))
        .collect(Collectors.toList());
  }

  private int yearSummary(List<Transaction> transactions) {
    return transactions.stream()
        .filter(Transaction::isExpence)
        .mapToInt(Transaction::amountFrom)
        .sum();
  }

  private List<MonthSummary> monthSummary(List<Transaction> transactions) {
    return transactions.stream()
        .filter(Transaction::isExpence)
        .map(x -> Pair.of(x.dayRef().withDayOfMonth(1), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> MonthSummary.of(x.getKey(), x.getValue()))
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
