package ru.fess38.finance.transaction;

import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Default;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Lazy;
import org.immutables.value.Value.Style;
import ru.fess38.finance.account.Account;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.tag.Tag;
import ru.fess38.finance.user.User;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Optional;

@Immutable
@TypeAdapters
@Style(typeImmutable = "*")
public abstract class AbstractTransaction {
  @Default
  public long id() {
    return 0;
  }

  @Default
  public boolean isDeleted() {
    return false;
  }

  public abstract Rubric rubric();

  @Default
  public LocalDate dayRef() {
    return LocalDate.now();
  }

  public abstract Account accountFrom();

  public abstract Account accountTo();

  public abstract int amountFrom();

  public abstract int amountTo();

  public abstract Optional<Tag> tag();

  public abstract Optional<User> user();

  public abstract Optional<String> comment();

  public ModifiableTransaction toModifiable() {
    ModifiableTransaction transaction = new ModifiableTransaction();
    if (this.id() != 0) {
      transaction.setId(id());
    }
    transaction.setDeleted(isDeleted());
    transaction.setRubric(rubric().toModifiable());
    transaction.setDayRef(dayRef());
    transaction.setAccountFrom(accountFrom().toModifiable());
    transaction.setAccountTo(accountTo().toModifiable());
    transaction.setAmountFrom(amountFrom());
    transaction.setAmountTo(amountTo());
    if (tag().isPresent()) {
      transaction.setTag(tag().get().toModifiable());
    }
    if (user().isPresent()) {
      transaction.setUser(user().get().toModifiable());
    }
    transaction.setComment(comment().orElse(null));
    return transaction;
  }

  @Lazy
  public boolean isIncome() {
    return rubric().isIncome();
  }

  @Lazy
  public boolean isExpence() {
    return !isIncome();
  }

  @Lazy
  public YearMonth yearMonth() {
    return YearMonth.from(dayRef());
  }
}
