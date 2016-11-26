package ru.fess38.finance.transaction.statistic;

import com.google.common.base.Preconditions;
import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Check;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Parameter;
import org.immutables.value.Value.Style;
import ru.fess38.finance.tag.Tag;

import java.time.LocalDate;

@Immutable
@TypeAdapters
@Style(typeImmutable = "*")
public abstract class AbstractMonthTagSummary {
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
