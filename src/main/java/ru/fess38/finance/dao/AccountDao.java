package ru.fess38.finance.dao;


import org.hibernate.Query;

import ru.fess38.finance.model.Account;


public class AccountDao extends EntityDao<Account> {
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
