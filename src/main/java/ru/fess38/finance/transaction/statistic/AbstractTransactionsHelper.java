package ru.fess38.finance.transaction.statistic;

import com.google.common.base.Preconditions;
import org.apache.commons.lang3.tuple.Pair;
import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Check;
import org.immutables.value.Value.Enclosing;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Parameter;
import org.immutables.value.Value.Style;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.tag.Tag;
import ru.fess38.finance.transaction.Transaction;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.MonthSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.RubricSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.TagSummary;
import ru.fess38.finance.transaction.statistic.TransactionsHelper.YearSummary;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Immutable
@Enclosing
@TypeAdapters
@Style(typeImmutable = "*")
abstract class AbstractTransactionsHelper {
  static List<Rubric> rubrics(List<Transaction> transactions) {
    return transactions.stream()
        .map(Transaction::rubric)
        .distinct()
        .collect(Collectors.toList());
  }

  static List<Tag> tags(List<Transaction> transactions) {
    return transactions.stream()
        .map(Transaction::tag)
        .map(Optional::get)
        .distinct()
        .collect(Collectors.toList());
  }

  static int expenseSum(List<Transaction> transactions) {
    return transactions.stream()
        .filter(Transaction::isExpence)
        .mapToInt(Transaction::amountFrom)
        .sum();
  }

  static List<RubricSummary> rubricSummary(List<Transaction> transactions) {
    return transactions.stream()
        .map(x -> Pair.of(x.rubric(), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> RubricSummary.of(x.getKey(), x.getValue()))
        .collect(Collectors.toList());
  }

  static List<TagSummary> tagSummary(List<Transaction> transactions) {
    return transactions.stream()
        .map(x -> Pair.of(x.tag().get(), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> TagSummary.of(x.getKey(), x.getValue()))
        .collect(Collectors.toList());
  }

  static List<MonthSummary> monthSummary(List<Transaction> transactions) {
    return transactions.stream()
        .filter(Transaction::isExpence)
        .map(x -> Pair.of(x.dayRef().withDayOfMonth(1), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> MonthSummary.of(x.getKey(), x.getValue()))
        .collect(Collectors.toList());
  }

  static List<YearSummary> yearSummary(List<Transaction> transactions) {
    return transactions.stream()
        .filter(Transaction::isExpence)
        .map(x -> Pair.of(LocalDate.of(x.dayRef().getYear(), 1, 1), x.amountFrom()))
        .collect(Collectors.groupingBy(Pair::getKey, Collectors.summingInt(Pair::getRight)))
        .entrySet()
        .stream()
        .map(x -> YearSummary.of(x.getKey(), x.getValue()))
        .collect(Collectors.toList());
  }

  @Immutable
  @TypeAdapters
  @Style(typeImmutable = "*")
  abstract static class AbstractDaySummary {
    @Parameter
    public abstract LocalDate date();

    @Parameter
    public abstract int amount();
  }

  @Immutable
  @TypeAdapters
  @Style(typeImmutable = "*")
  abstract static class AbstractMonthSummary {
    @Parameter
    public abstract LocalDate startOfMonth();

    @Parameter
    public abstract int amount();

    @Check
    protected void check() {
      Preconditions.checkState(startOfMonth().getDayOfMonth() == 1);
    }
  }

  @Immutable
  @TypeAdapters
  @Style(typeImmutable = "*")
  abstract static class AbstractYearSummary {
    @Parameter
    public abstract LocalDate startOfYear();

    @Parameter
    public abstract int amount();

    @Check
    protected void check() {
      Preconditions.checkState(startOfYear().getDayOfYear() == 1);
    }
  }

  @Immutable
  @TypeAdapters
  @Style(typeImmutable = "*")
  abstract static class AbstractRubricSummary {
    @Parameter
    public abstract Rubric rubric();

    @Parameter
    public abstract int amount();
  }

  @Immutable
  @TypeAdapters
  @Style(typeImmutable = "*")
  abstract static class AbstractTagSummary {
    @Parameter
    public abstract Tag tag();

    @Parameter
    public abstract int amount();
  }

  @Immutable
  @TypeAdapters
  @Style(typeImmutable = "*")
  abstract static class AbstractDayRubricSummary {
    @Parameter
    public abstract LocalDate date();

    @Parameter
    public abstract Rubric rubric();

    @Parameter
    public abstract int amount();
  }

  @Immutable
  @TypeAdapters
  @Style(typeImmutable = "*")
  abstract static class AbstractMonthRubricSummary {
    @Parameter
    public abstract LocalDate startOfMonth();

    @Parameter
    public abstract Rubric rubric();

    @Parameter
    public abstract int amount();

    @Check
    protected void check() {
      Preconditions.checkState(startOfMonth().getDayOfMonth() == 1);
    }
  }

  @Immutable
  @TypeAdapters
  @Style(typeImmutable = "*")
  abstract static class AbstractMonthTagSummary {
    @Parameter
    public abstract LocalDate startOfMonth();

    @Parameter
    public abstract Tag tag();

    @Parameter
    public abstract int amount();

    @Check
    protected void check() {
      Preconditions.checkState(startOfMonth().getDayOfMonth() == 1);
    }
  }

  @Immutable
  @TypeAdapters
  @Style(typeImmutable = "*")
  abstract static class AbstractYearRubricSummary {
    @Parameter
    public abstract LocalDate startOfYear();

    @Parameter
    public abstract Rubric rubric();

    @Parameter
    public abstract int amount();

    @Check
    protected void check() {
      Preconditions.checkState(startOfYear().getDayOfYear() == 1);
    }
  }

  @Immutable
  @TypeAdapters
  @Style(typeImmutable = "*")
  abstract static class AbstractYearTagSummary {
    @Parameter
    public abstract LocalDate startOfYear();

    @Parameter
    public abstract Tag tag();

    @Parameter
    public abstract int amount();

    @Check
    protected void check() {
      Preconditions.checkState(startOfYear().getDayOfYear() == 1);
    }
  }
}
