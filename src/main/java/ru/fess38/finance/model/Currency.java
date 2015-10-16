package ru.fess38.finance.model;

import java.util.Objects;


public final class Currency extends Entity {
    public Currency() { }

    public Currency(Integer id) {
        super(id);
    }

    private String symbol;

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object == null || getClass() != object.getClass()) {
            return false;
        }

        Currency that = (Currency) object;
        return Objects.equals(this.getId(), that.getId())
                && Objects.equals(this.getName(), that.getName())
                && Objects.equals(this.getSymbol(), that.getSymbol());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getSymbol());
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
}
