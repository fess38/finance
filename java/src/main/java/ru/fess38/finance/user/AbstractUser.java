package ru.fess38.finance.user;

import org.immutables.gson.Gson.TypeAdapters;
import org.immutables.value.Value.Default;
import org.immutables.value.Value.Immutable;
import org.immutables.value.Value.Parameter;
import org.immutables.value.Value.Style;

@Immutable
@TypeAdapters
@Style(typeImmutable = "*")
public abstract class AbstractUser {
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

  public ModifiableUser toModifiable() {
    ModifiableUser user = new ModifiableUser();
    if (id() != 0) {
      user.setId(id());
    }
    user.setName(name());
    user.setDeleted(isDeleted());
    return user;
  }
}
