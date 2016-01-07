package ru.fess38.finance.model;


import java.util.Objects;


public abstract class Entity {
	private Integer id;
	private String name;
	@SuppressWarnings("unused")
	private boolean isDeleted;

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}
		if (object == null || getClass() != object.getClass()) {
			return false;
		}

		Entity that = (Entity) object;
		return Objects.equals(this.getId(), that.getId())
				&& Objects.equals(this.getName(), that.getName());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId(), getName());
	}

	@Override
	public String toString() {
		final StringBuffer sb = new StringBuffer("Entity{");
		sb.append("id=").append(id);
		sb.append(", name='").append(name).append('\'');
		sb.append('}');
		return sb.toString();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
