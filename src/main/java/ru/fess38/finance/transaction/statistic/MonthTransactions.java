package ru.fess38.finance.transaction.statistic;

import org.apache.commons.lang3.tuple.Pair;
import ru.fess38.finance.account.Account;
import ru.fess38.finance.currency.Currency;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.transaction.Transaction;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SuppressWarnings("unused")
public class MonthTransactions {
  public MonthTransactions(YearMonth yearMonth, List<Transaction> transactions) {
    this.yearMonth = yearMonth;
    this.transactions = transactions;
    this.rubrics = processRubrics();
    this.dates = processDates();
    this.monthSummary = processMonthSummary();
    this.daySummary = processDaySummary();
    this.rubricSummary = processRubricSummary();
    this.rubricDaySummary = processRubricByDaySummary();
    transactions.clear();
  }

  private final YearMonth yearMonth;
  private final List<Transaction> transactions;
  private final List<Rubric> rubrics;
  private final List<LocalDate> dates;
  private final int monthSummary;
  private final List<DaySummary> daySummary;
  private final List<RubricSummary> rubricSummary;
  private final List<RubricDaySummary> rubricDaySummary;

  private List<Rubric> processRubrics() {
    return transactions.stream()
        .map(Transaction::rubric)
        .distinct()
        .collect(Collectors.toList());
  }

  private List<LocalDate> processDates() {
    List<LocalDate> result = new ArrayList<>();
    for (int i = 1; i <= yearMonth.lengthOfMonth(); i++) {
      LocalDate localDate = LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), i);
      result.add(localDate);
    }
    return result;
  }

  private int processMonthSummary() {
    return transactions.stream()
        .filter(Transaction::isExpence)
        .mapToInt(Transaction::amountFrom)
        .sum();
  }

  private List<DaySummary> processDaySummary() {
    List<DaySummary> result = new ArrayList<>();
    Map<LocalDate, Integer> map = new HashMap<>();
    transactions.stream()
        .filter(Transaction::isExpence)
        .forEach(x -> {
          int amount = x.amountFrom();
          map.computeIfPresent(x.dayRef(), (key, value) -> value + amount);
          map.putIfAbsent(x.dayRef(), amount);
        });
    map.forEach((key, value) -> result.add(new DaySummary(key, value)));
    return result;
  }

  private List<RubricSummary> processRubricSummary() {
    List<RubricSummary> result = new ArrayList<>();
    Map<Rubric, Integer> map = new HashMap<>();
    transactions.forEach(x -> {
      Rubric rubric = x.rubric();
      int amount = x.amountFrom();
      map.computeIfPresent(rubric, (key, value) -> value + amount);
      map.putIfAbsent(rubric, amount);
    });
    map.forEach((key, value) -> result.add(new RubricSummary(key, value)));
    return result;
  }

  private List<RubricDaySummary> processRubricByDaySummary() {
    List<RubricDaySummary> result = new ArrayList<>();
    Map<Pair<Rubric, LocalDate>, Integer> map = new HashMap<>();
    transactions.forEach(x -> {
      Pair<Rubric, LocalDate> pair = Pair.of(x.rubric(), x.dayRef());
      int amount = x.amountFrom();
      map.computeIfPresent(pair, (key, value) -> value + amount);
      map.putIfAbsent(pair, amount);
    });
    map.forEach((key, value) -> result.add(new RubricDaySummary(key.getLeft(), key.getRight(),
        value)));
    return result;
  }

  public List<Currency> currencies() {
    return transactions.stream()
        .map(Transaction::accountFrom)
        .map(Account::currency)
        .distinct()
        .sorted(Comparator.comparing(Currency::id))
        .collect(Collectors.toList());
  }

  public YearMonth getYearMonth() {
    return yearMonth;
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

  public List<RubricDaySummary> getRubricDaySummary() {
    return rubricDaySummary;
  }

  private static class DaySummary {
    DaySummary(LocalDate date, int amount) {
      this.date = date;
      this.amount = amount;
    }

    private final LocalDate date;
    private final int amount;

    public LocalDate getDate() {
      return date;
    }

    public int getAmount() {
      return amount;
    }
  }

  private class RubricSummary {
    RubricSummary(Rubric rubric, int amount) {
      this.rubric = rubric;
      this.amount = amount;
    }

    private final Rubric rubric;
    private final int amount;

    public Rubric getRubric() {
      return rubric;
    }

    public int getAmount() {
      return amount;
    }
  }

  private class RubricDaySummary extends RubricSummary {
    RubricDaySummary(Rubric rubric, LocalDate date, int amount) {
      super(rubric, amount);
      this.date = date;
    }

    private final LocalDate date;

    public LocalDate getDate() {
      return date;
    }
  }
}
