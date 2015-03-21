package ru.fess38.finance.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

public class AccountDaoImpl extends EntityDaoImpl implements AccountDao {
	public AccountDaoImpl(BasicDataSource dataSource) {
		super(dataSource);
		npJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}
	
	private NamedParameterJdbcTemplate npJdbcTemplate;

	@Override
	public void createAccount(Account account) {
		List<SqlParameterSource> params = new ArrayList<SqlParameterSource>();
		params.add(new BeanPropertySqlParameterSource(account)); 
		
		npJdbcTemplate.batchUpdate("INSERT INTO Account(id, name, currencyId, amount,"
				+ " isCurrent, isCredit, isClosed, startDate, finishDate)"
				+ " VALUES (:id, :name, :currencyId, :amount, :isCurrent,"
				+ " :isCredit, :isClosed, :startDate, :finishDate)",
				params.toArray(new SqlParameterSource[0]));
	}

	@Override
	public void deleteAccount(Account account) {
		jdbcTemplate.update("UPDATE Account SET IsDeleted = 1"
				+ " WHERE id = ?", new Object[] {account.getId()});
	}

	@Override
	public void updateName(Account account) {
		jdbcTemplate.update("UPDATE Account SET name = ? WHERE id = ?",
				new Object[] {account.getName(), account.getId()});
	}
	
	@Override
	public void updateCurrencyId(Account account) {
		jdbcTemplate.update("UPDATE Account SET currencyId = ? WHERE id = ?",
				new Object[] {account.getCurrencyId(), account.getId()});
	}
	
	@Override
	public void updateAmount(Account account) {
		jdbcTemplate.update("UPDATE Account SET amount = ? WHERE id = ?",
				new Object[] {account.getAmount(), account.getId()});
	}

	@Override
	public void updateIsCurrent(Account account) {
		jdbcTemplate.update("UPDATE Account SET isCurrent = ? WHERE id = ?",
				new Object[] {account.getIsCurrent(), account.getId()});
	}
	
	@Override
	public void updateIsCredit(Account account) {
		jdbcTemplate.update("UPDATE Account SET isCredit = ? WHERE id = ?",
				new Object[] {account.getIsCredit(), account.getId()});
	}

	@Override
	public void updateIsClosed(Account account) {
		jdbcTemplate.update("UPDATE Account SET isClosed = ? WHERE id = ?",
				new Object[] {account.getIsClosed(), account.getId()});
	}

	@Override
	public void updateStartDate(Account account) {
		jdbcTemplate.update("UPDATE Account SET startDate = ? WHERE id = ?",
				new Object[] {account.getStartDate(), account.getId()});
	}

	@Override
	public void updateFinishDate(Account account) {
		jdbcTemplate.update("UPDATE Account SET finishDate = ? WHERE id = ?",
				new Object[] {account.getFinishDate(), account.getId()});
	}
}
