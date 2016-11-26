package ru.fess38.finance.transaction.statistic;

import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Parameter;
import org.immutables.value.Value.Style;
import ru.fess38.finance.tag.Tag;

@Immutable
@TypeAdapters
@Style(typeImmutable = "*")
public abstract class AbstractTagSummary {
  @Parameter
  public abstract Tag tag();

  @Parameter
  public abstract int amount();
}
