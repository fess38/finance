package ru.fess38.finance.account;

import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Default;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Parameter;
import org.immutables.value.Value.Style;
import ru.fess38.finance.currency.Currency;

@Immutable
@TypeAdapters
@Style(typeImmutable = "*")
public abstract class AbstractAccount {
  @Default
  public long id() {
    return 0;
  }

  @Parameter
  public abstract String name();

  @Default
  public int balance() {
    return 0;
  }

  @Parameter
  public abstract Currency currency();

  @Default
  public Type type() {
    return Type.DEFAULT;
  }

  @Default
  public boolean isDeleted() {
    return false;
  }

  public Account addMoney(int value) {
    return Account.builder().from(this).balance(balance() + value).build();
  }

  public ModifiableAccount toModifiable() {
    ModifiableAccount account = new ModifiableAccount();
    if (id() != 0) {
      account.setId(id());
    }
    account.setName(name());
    account.setBalance(balance());
    account.setCurrency(currency().toModifiable());
    account.setType(type());
    account.setDeleted(isDeleted());
    return account;
  }

  public enum Type {
    DEFAULT,
    MASTER,
    OUTER
  }
}
