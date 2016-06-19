package ru.fess38.finance.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;


@Entity
public class Rubric {
	@Id
	@GeneratedValue(generator = "IdSequence", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "IdSequence")
	private Long id;
	@Column(length = 100, nullable = false)
	private String name;
	@Column(nullable = false)
	private boolean isIncome;
	@Column(nullable = false)
	private boolean isService = false;
	@Column(nullable = false)
	private boolean isDeleted = false;

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
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
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

	public boolean isIncome() {
		return isIncome;
	}

	public void setIsIncome(boolean isIncome) {
		this.isIncome = isIncome;
	}

	public boolean isService() {
		return isService;
	}

	public void setService(boolean isService) {
		this.isService = isService;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
}
