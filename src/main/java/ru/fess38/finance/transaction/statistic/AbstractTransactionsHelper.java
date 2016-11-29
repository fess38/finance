package ru.fess38.finance.transaction.statistic;

import com.google.common.base.Preconditions;
import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Check;
import org.immutables.value.Value.Enclosing;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Parameter;
import org.immutables.value.Value.Style;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.tag.Tag;

import java.time.LocalDate;

@Immutable
@Enclosing
@TypeAdapters
@Style(typeImmutable = "*")
abstract class AbstractTransactionsHelper {
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
}
