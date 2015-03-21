package ru.fess38.finance.model;

public interface CurrencyDao {
	public void createCurrency(Currency currency);
	public void deleteCurrency(Currency currency);
	public void updateCurrencyName(Currency currency);
	public void updateCurrencySymbol(Currency currency);
}
