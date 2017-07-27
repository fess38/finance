package ru.fess38.finance.currency;

import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Default;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Parameter;
import org.immutables.value.Value.Style;

@Immutable
@TypeAdapters
@Style(typeImmutable = "*")
public abstract class AbstractCurrency {
  @Default
  public long id() {
    return 0;
  }

  @Parameter
  public abstract String name();

  @Parameter
  public abstract String symbol();

  @Default
  public boolean isDeleted() {
    return false;
  }

  public ModifiableCurrency toModifiable() {
    ModifiableCurrency currency = new ModifiableCurrency();
    if (this.id() != 0) {
      currency.setId(this.id());
    }
    currency.setName(this.name());
    currency.setSymbol(this.symbol());
    currency.setDeleted(this.isDeleted());
    return currency;
  }
}
