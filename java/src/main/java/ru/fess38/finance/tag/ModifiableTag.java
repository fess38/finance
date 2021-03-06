package ru.fess38.finance.tag;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import ru.fess38.finance.rubric.ModifiableRubric;

import java.util.Optional;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Tag")
public class ModifiableTag {
  @Id
  @GeneratedValue(generator = "IdSequence", strategy = GenerationType.SEQUENCE)
  @SequenceGenerator(name = "IdSequence")
  private Long id;
  @Column(length = 100, nullable = false)
  private String name;
  @Column(nullable = false)
  private boolean isDeleted = false;
  @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
  private boolean isObsolete = false;
  @ManyToOne(fetch = FetchType.EAGER, optional = true, targetEntity = ModifiableRubric.class)
  @JoinColumn(name = "rubricId", nullable = true)
  private ModifiableRubric rubric;

  @Override
  public boolean equals(Object object) {
    return EqualsBuilder.reflectionEquals(this, object, true);
  }

  @Override
  public int hashCode() {
    return HashCodeBuilder.reflectionHashCode(this, true);
  }

  @Override
  public String toString() {
    return ToStringBuilder.reflectionToString(this);
  }

  public Tag toImmutable() {
    return Tag.builder()
        .id(id == null ? 0 : id)
        .name(name)
        .isDeleted(isDeleted)
        .isObsolete(isObsolete)
        .rubric(Optional.ofNullable(rubric == null ? null : rubric.toImmutable()))
        .build();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public boolean isDeleted() {
    return isDeleted;
  }

  public void setDeleted(boolean isDeleted) {
    this.isDeleted = isDeleted;
  }

  public boolean isObsolete() {
    return isObsolete;
  }

  public void setObsolete(boolean obsolete) {
    isObsolete = obsolete;
  }

  public ModifiableRubric getRubric() {
    return rubric;
  }

  public void setRubric(ModifiableRubric rubric) {
    this.rubric = rubric;
  }
}
