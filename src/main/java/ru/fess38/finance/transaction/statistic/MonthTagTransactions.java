package ru.fess38.finance.transaction.statistic;

import org.apache.commons.lang3.tuple.Pair;
import ru.fess38.finance.tag.Tag;
import ru.fess38.finance.transaction.Transaction;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.MonthSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.MonthTagSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.TagSummary;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class MonthTagTransactions {
  public MonthTagTransactions(List<Transaction> transactions) {
    tags = tags(transactions);
    startOfMonths = startOfMonths(transactions);
    yearSummary = yearSummary(transactions);
    monthSummary = monthSummary(transactions);
    tagSummary = tagSummary(transactions);
    monthTagSummary = monthTagSummary(transactions);
  }

  private final List<Tag> tags;
  private final List<LocalDate> startOfMonths;
  private final int yearSummary;
  private List<MonthSummary> monthSummary;
  private final List<TagSummary> tagSummary;
  private final List<MonthTagSummary> monthTagSummary;

  private List<Tag> tags(List<Transaction> transactions) {
    return transactions.stream()
        .map(Transaction::tag)
        .map(Optional::get)
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

  private List<TagSummary> tagSummary(List<Transaction> transactions) {
    return transactions.stream()
        .map(x -> Pair.of(x.tag().get(), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> TagSummary.of(x.getKey(), x.getValue()))
        .collect(Collectors.toList());
  }

  private List<MonthTagSummary> monthTagSummary(List<Transaction> transactions) {
    return transactions.stream()
        .map(x -> Pair.of(Pair.of(x.dayRef().withDayOfMonth(1), x.tag().get()), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> MonthTagSummary.of(x.getKey().getKey(), x.getKey().getValue(), x.getValue()))
        .collect(Collectors.toList());
  }

  public List<Tag> getTags() {
    return tags;
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

  public List<TagSummary> getTagSummary() {
    return tagSummary;
  }

  public List<MonthTagSummary> getMonthTagSummary() {
    return monthTagSummary;
  }
}
