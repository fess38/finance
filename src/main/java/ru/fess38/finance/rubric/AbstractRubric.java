package ru.fess38.finance.rubric;

import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Default;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Parameter;
import org.immutables.value.Value.Style;

@Immutable
@TypeAdapters
@Style(typeImmutable = "*")
public abstract class AbstractRubric {
  @Default
  public long id() {
    return 0;
  }

  @Parameter
  public abstract String name();

  @Default
  public boolean isIncome() {
    return false;
  }

  @Default
  public boolean isTransfer() {
    return false;
  }

  @Default
  public boolean isDeleted() {
    return false;
  }

  @Default
  public int amountTransactions() {
    return 0;
  }

  public Rubric addTransaction() {
    return Rubric.builder().from(this).amountTransactions(amountTransactions() + 1).build();
  }

  public Rubric subtractTransaction() {
    int amountTransactions = amountTransactions();
    if (hasTransactions()) {
      amountTransactions -= 1;
    }
    return Rubric.builder().from(this).amountTransactions(amountTransactions).build();
  }

  public boolean hasTransactions() {
    return amountTransactions() > 0;
  }

  public ModifiableRubric toModifiable() {
    ModifiableRubric rubric = new ModifiableRubric();
    if (this.id() != 0) {
      rubric.setId(this.id());
    }
    rubric.setName(this.name());
    rubric.setIncome(isIncome());
    rubric.setTransfer(isTransfer());
    rubric.setDeleted(this.isDeleted());
    rubric.setAmountTransactions(this.amountTransactions());
    return rubric;
  }
}
