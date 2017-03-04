package ru.fess38.finance.transaction.statistic;

import com.google.common.base.Preconditions;
import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Check;
import org.immutables.value.Value.Derived;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Style;

import java.time.YearMonth;

@Immutable
@TypeAdapters
@Style(typeImmutable = "*", allParameters = true)
public abstract class AbstractMonthSavingRate {
  public abstract YearMonth yearMonth();

  public abstract double savingRate();

  public abstract int monthPeriod();

  @Derived
  public String startOfMonth() {
    return String.format("%s-01", yearMonth().toString());
  }

  @Check
  protected void check() {
    Preconditions.checkState(monthPeriod() > 0);
  }
}
