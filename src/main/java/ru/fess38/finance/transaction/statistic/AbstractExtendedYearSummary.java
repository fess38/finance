package ru.fess38.finance.transaction.statistic;

import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Derived;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Style;

@Immutable
@TypeAdapters
@Style(typeImmutable = "*", allParameters = true)
public abstract class AbstractExtendedYearSummary {
  public abstract int year();

  public abstract int income();

  public abstract int expence();

  @Derived
  public int incomeInThousands() {
    return income() / 1000;
  }

  @Derived
  public int expenceInThousands() {
    return expence() / 1000;
  }

  @Derived
  public int savings() {
    return income() - expence();
  }

  @Derived
  public int savingsInThousands() {
    return savings() / 1000;
  }

  @Derived
  public int savingsInThousandsNotMinus() {
    return savingsInThousands() <= 0 ? 1 : savingsInThousands();
  }

  @Derived
  public double savingRate() {
    return TransactionsHelper.savingRate(income(), expence());
  }

  @Derived
  public double savingRateNotZero() {
    return savingRate() == 0.0 ? savingRate() + 0.001 : savingRate();
  }
}
