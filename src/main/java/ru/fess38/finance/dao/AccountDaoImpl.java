package ru.fess38.finance.dao;


import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.AccountType;


@Repository
@Transactional
public class AccountDaoImpl implements AccountDao {
	private SessionFactory sessionFactory;

	@Override
	public Long save(Account account) {
		return (Long) sessionFactory.getCurrentSession().save(account);
	}

	@Override
	public Account get(Long id) {
		return sessionFactory.getCurrentSession().get(Account.class, id);
	}

	@Override
	public void update(Account account) {
		sessionFactory.getCurrentSession().update(account);
	}

	@Override
	public void delete(Account account) {
		Account savedAccount = get(account.getId());
		savedAccount.setDeleted(true);
		update(savedAccount);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Account> find(DetachedCriteria detachedCriteria) {
		detachedCriteria.add(Restrictions.eq("type", AccountType.DEFAULT))
			.add(Restrictions.eq("isDeleted", false));
		return detachedCriteria.getExecutableCriteria(sessionFactory.getCurrentSession()).list();
	}

	@Override
	public Account getMasterAccount() {
		return (Account) sessionFactory.getCurrentSession()
			.createCriteria(Account.class)
			.add(Restrictions.eq("type", AccountType.MASTER))
			.uniqueResult();
	}

	@Override
	public Account getOuterAccount() {
		return (Account) sessionFactory.getCurrentSession()
			.createCriteria(Account.class)
			.add(Restrictions.eq("type", AccountType.OUTER))
			.uniqueResult();
	}

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
}
