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

  public ModifiableTag toModifiable() {
    ModifiableTag tag = new ModifiableTag();
    if (this.id() != 0) {
      tag.setId(this.id());
    }
    tag.setName(this.name());
    tag.setDeleted(this.isDeleted());
    return tag;
  }
}
