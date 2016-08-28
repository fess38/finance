package ru.fess38.finance.model;

import org.apache.commons.lang3.tuple.Pair;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SuppressWarnings("unused")
public class MonthTransactions {
  private MonthTransactions(YearMonth yearMonth, List<Transaction> transactions) {
    this.yearMonth = yearMonth;
    this.transactions = Collections.unmodifiableList(transactions);
    this.rubrics = Collections.unmodifiableList(processRubrics());
    this.daysOfMonth = Collections.unmodifiableList(processDaysOfMonth());
    this.monthSummary = processMonthSummary();
    this.daySummary = processDaySummary();
    this.rubricSummary = processRubricSummary();
    this.rubricDaySummary = processRubricByDaySummary();
    transactions.clear();
  }

  private final YearMonth yearMonth;
  private final List<Transaction> transactions;
  private final List<Rubric> rubrics;
  private final List<Integer> daysOfMonth;
  private final int monthSummary;
  private final List<DaySummary> daySummary;
  private final List<RubricSummary> rubricSummary;
  private final List<RubricDaySummary> rubricDaySummary;

  public static MonthTransactions of(YearMonth yearMonth, List<Transaction> transactions) {
    return new MonthTransactions(yearMonth, transactions);
  }

  private List<Rubric> processRubrics() {
    return transactions.stream()
        .map(Transaction::getRubric)
        .distinct()
        .collect(Collectors.toList());
  }

  private List<Integer> processDaysOfMonth() {
    List<Integer> result = new ArrayList<>();
    for (int i = 1; i <= yearMonth.lengthOfMonth(); i++) {
      result.add(i);
    }
    return result;
  }

  private int processMonthSummary() {
    return transactions.stream()
        .mapToInt(x -> (x.getRubric().isIncome()) ? x.getAmountFrom() : -x.getAmountFrom())
        .sum();
  }

  private List<DaySummary> processDaySummary() {
    List<DaySummary> result = new ArrayList<>();
    Map<LocalDate, Integer> map = new HashMap<>();
    transactions.forEach(x -> {
      LocalDate date = x.getLocalDate();
      int amount = x.getRubric().isIncome() ? x.getAmountFrom() : -x.getAmountFrom();
      map.computeIfPresent(date, (key, value) -> value + amount);
      map.putIfAbsent(date, amount);
    });
    map.forEach((key, value) -> result.add(new DaySummary(key, value)));
    return result;
  }

  private List<RubricSummary> processRubricSummary() {
    List<RubricSummary> result = new ArrayList<>();
    Map<Rubric, Integer> map = new HashMap<>();
    transactions.forEach(x -> {
      Rubric rubric = x.getRubric();
      int amount = x.getAmountFrom();
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
      Pair<Rubric, LocalDate> pair = Pair.of(x.getRubric(), x.getLocalDate());
      int amount = x.getAmountFrom();
      map.computeIfPresent(pair, (key, value) -> value + amount);
      map.putIfAbsent(pair, amount);
    });
    map.forEach((key, value) -> result.add(new RubricDaySummary(key.getLeft(), key.getRight(),
        value)));
    return result;
  }

  public List<Currency> currencies() {
    return transactions.stream()
        .map(Transaction::getAccountFrom)
        .map(Account::getCurrency)
        .distinct()
        .sorted(Comparator.comparing(Currency::getId))
        .collect(Collectors.toList());
  }

  public YearMonth getYearMonth() {
    return yearMonth;
  }

  public List<Rubric> getRubrics() {
    return rubrics;
  }

  public List<Integer> getDaysOfMonth() {
    return daysOfMonth;
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

  private class DaySummary {
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

    @SuppressWarnings("unused")
    public LocalDate getDate() {
      return date;
    }
  }
}
