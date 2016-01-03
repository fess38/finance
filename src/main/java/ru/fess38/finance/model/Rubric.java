package ru.fess38.finance.model;


import java.util.Objects;


public final class Rubric extends Entity {
    public Rubric() { }

    public Rubric(Integer id) {
        super(id);
    }

    private boolean isIncome;
    private boolean isService;

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object == null || getClass() != object.getClass()) {
            return false;
        }

        Rubric that = (Rubric) object;
        return Objects.equals(this.getId(), that.getId())
                && Objects.equals(this.getName(), that.getName())
                && Objects.equals(this.getIsIncome(), that.getIsIncome());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getIsIncome());
    }

    public boolean getIsIncome() {
        return isIncome;
    }

    public void setIsIncome(boolean isIncome) {
        this.isIncome = isIncome;
    }

    public boolean getIsService() {
        return isService;
    }

    public void setIsService(boolean isService) {
        this.isService = isService;
    }
}
