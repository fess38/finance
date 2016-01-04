package ru.fess38.finance.dao;

import org.hibernate.Query;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ru.fess38.finance.model.Account;


public class AccountDao extends EntityDao<Account> {
	@Transactional(propagation = Propagation.REQUIRED)
	public void updateAmount() {
		getSession().getNamedQuery("updateAccountAmount").executeUpdate();
	}

	public Account findServiceAccountByAnother(Account account) {
		Account accountWithAtributes = findById(account.getId());
		Integer currencyId = accountWithAtributes.getCurrencyId();
		Query query = getSession().getNamedQuery("accountFindServiceByCurrencyId")
				.setInteger("id", currencyId);
		return (Account) query.uniqueResult();
	}
}
