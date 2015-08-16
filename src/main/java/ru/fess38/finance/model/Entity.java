package ru.fess38.finance.model;

public abstract class Entity {
	protected Integer id;
	protected String name;
	protected Boolean isDeleted;

	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	public final Integer getId() {
		return id;
	}

	public final void setId(Integer id) {
		this.id = id;
	}

	public final Boolean getIsDeleted() {
		return isDeleted;
	}

	public final void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
}
