package ru.fess38.finance.model;

import java.util.Objects;


public final class Account extends Entity {
    public Account() { }

    public Account(Integer id) {
        super(id);
    }

    private Currency currency;
    private int amount;

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object == null || getClass() != object.getClass()) {
            return false;
        }

        Account that = (Account) object;
        return Objects.equals(this.getId(), that.getId())
                && Objects.equals(this.getName(), that.getName())
                && Objects.equals(this.getCurrency(), that.getCurrency())
                && Objects.equals(this.getAmount(), that.getAmount());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getCurrency(), getAmount());
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Integer getCurrencyId() {
        return currency.getId();
    }

    public void setCurrencyId(Integer currencyId) {
        setCurrency(new Currency(currencyId));
    }
}
