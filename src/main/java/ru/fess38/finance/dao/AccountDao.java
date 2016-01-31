package ru.fess38.finance.dao;


import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.criterion.Restrictions;

import ru.fess38.finance.model.Account;


public class AccountDao extends EntityDao<Account> {
	private static final int MASTER_ACCOUNT_ID = 4;

	@Override
	public List<Account> find() {
		return super.find().stream().filter(x -> !x.getIsService()).collect(Collectors.toList());
	}

	public void updateAmount() {
		getSession().beginTransaction();
		getSession().getNamedQuery("updateAccountAmount").executeUpdate();
		getSession().getTransaction().commit();
	}

	public Account getMasterAccount() {
		return (Account) getSession().createCriteria(Account.class)
			.add(Restrictions.eq("id", MASTER_ACCOUNT_ID))
			.uniqueResult();
	}

	public Account getOuterAccount() {
		return (Account) getSession().createCriteria(getClazz())
			.add(Restrictions.eq("isDeleted", false))
			.add(Restrictions.eq("isService", true))
			.uniqueResult();
	}
}
