package ru.fess38.finance.tag;

import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Default;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Parameter;
import org.immutables.value.Value.Style;

@Immutable
@TypeAdapters
@Style(typeImmutable = "*")
public abstract class AbstractTag {
  @Default
  public long id() {
    return 0;
  }

  @Parameter
  public abstract String name();

  @Default
  public boolean isDeleted() {
    return false;
  }

  @Default
  public int amountTransactions() {
    return 0;
  }

  public Tag addTransaction() {
    return Tag.builder().from(this).amountTransactions(amountTransactions() + 1).build();
  }

  public Tag subtractTransaction() {
    int amountTransactions = amountTransactions();
    if (hasTransactions()) {
      amountTransactions -= 1;
    }
    return Tag.builder().from(this).amountTransactions(amountTransactions).build();
  }

  public boolean hasTransactions() {
    return amountTransactions() > 0;
  }

  public ModifiableTag toModifiable() {
    ModifiableTag tag = new ModifiableTag();
    if (this.id() != 0) {
      tag.setId(this.id());
    }
    tag.setName(this.name());
    tag.setDeleted(this.isDeleted());
    tag.setAmountTransactions(this.amountTransactions());
    return tag;
  }
}
