package ru.fess38.finance.dao;


import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Query;

import ru.fess38.finance.model.Account;


public class AccountDao extends EntityDao<Account> {
	@Override
	public List<Account> find() {
		return super.find().stream().filter(x -> !x.getIsService()).collect(Collectors.toList());
	}

	public void updateAmount() {
		getSession().beginTransaction();
		getSession().getNamedQuery("updateAccountAmount").executeUpdate();
		getSession().getTransaction().commit();
	}

	public Account findServiceAccountByAnother(Account account) {
		Integer currencyId = account.getCurrency().getId();
		Query query = getSession().getNamedQuery("accountFindServiceByCurrencyId").setInteger("id",
				currencyId);
		return (Account) query.uniqueResult();
	}
}
