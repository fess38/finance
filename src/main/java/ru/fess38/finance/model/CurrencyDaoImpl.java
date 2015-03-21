package ru.fess38.finance.model;

import org.apache.commons.dbcp2.BasicDataSource;

public class CurrencyDaoImpl extends EntityDaoImpl implements CurrencyDao {
	public CurrencyDaoImpl(BasicDataSource dataSource) {
		super(dataSource);
	}
	
	@Override
	public void createCurrency(Currency currency) {
		jdbcTemplate.update("INSERT INTO Currency(id, name, symbol)"
				+ " VALUES (?, ?, ?)", new Object[] {currency.getId(),
						currency.getName(), currency.getSymbol()});
	}

	@Override
	public void deleteCurrency(Currency currency) {
		jdbcTemplate.update("UPDATE Currency SET IsDeleted = 1"
				+ " WHERE id = ?", new Object[] {currency.getId()});
	}

	@Override
	public void updateCurrencyName(Currency currency) {
		jdbcTemplate.update("UPDATE Currency SET name = ? WHERE id = ?",
				new Object[] {currency.getName(), currency.getId()});
	}

	@Override
	public void updateCurrencySymbol(Currency currency) {
		jdbcTemplate.update("UPDATE Currency SET symbol = ? WHERE id = ?",
				new Object[] {currency.getSymbol(), currency.getId()});
	}
}
