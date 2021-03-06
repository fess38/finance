package ru.fess38.finance.transaction.statistic;

import org.apache.commons.lang3.tuple.Pair;
import ru.fess38.finance.tag.Tag;
import ru.fess38.finance.transaction.Transaction;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.TagSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.YearSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.YearTagSummary;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class YearTagTransactions {
  public YearTagTransactions(List<Transaction> transactions) {
    tags = TransactionsHelper.tags(transactions);
    startOfYears = startOfYears(transactions);
    yearsSummary = TransactionsHelper.expenseSum(transactions);
    yearSummary = TransactionsHelper.yearSummary(transactions);
    tagSummary = TransactionsHelper.tagSummary(transactions);
    yearTagSummary = yearTagSummary(transactions);
  }

  private final List<Tag> tags;
  private final List<LocalDate> startOfYears;
  private final int yearsSummary;
  private List<YearSummary> yearSummary;
  private final List<TagSummary> tagSummary;
  private final List<YearTagSummary> yearTagSummary;

  private List<LocalDate> startOfYears(List<Transaction> transactions) {
    return transactions.stream()
        .map(Transaction::dayRef)
        .map(LocalDate::getYear)
        .distinct()
        .map(x -> LocalDate.of(x, 1, 1))
        .sorted()
        .collect(Collectors.toList());
  }

  private List<YearTagSummary> yearTagSummary(List<Transaction> transactions) {
    return transactions.stream()
        .map(x -> Pair.of(
            Pair.of(LocalDate.of(x.dayRef().getYear(), 1, 1), x.tag().get()), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> YearTagSummary.of(x.getKey().getKey(), x.getKey().getValue(), x.getValue()))
        .collect(Collectors.toList());
  }

  public List<Tag> getTags() {
    return tags;
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

  public List<TagSummary> getTagSummary() {
    return tagSummary;
  }

  public List<YearTagSummary> getYearTagSummary() {
    return yearTagSummary;
  }
}
