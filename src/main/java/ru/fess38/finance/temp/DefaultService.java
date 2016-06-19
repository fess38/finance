package ru.fess38.finance.temp;


import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.fess38.finance.dao.AccountDao;
import ru.fess38.finance.dao.CurrencyDao;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.dao.TransactionGroupDao;
import ru.fess38.finance.dao.UserDao;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;


@Service
public class DefaultService {
	@Autowired
	private AccountDao accountDao;
	@Autowired
	private CurrencyDao currencyDao;
	@Autowired
	private RubricDao rubricDao;
	@Autowired
	private TransactionDao transactionDao;
	@Autowired
	private TransactionGroupDao transactionGroupDao;
	@Autowired
	private UserDao userDao;

	public List<Rubric> getIncomeRubrics() {
		return rubricDao.findByType(true);
	}

	public List<Rubric> getExpenseRubrics() {
		return rubricDao.findByType(false);
	}

	public List<User> getUsers() {
		return userDao.find(DetachedCriteria.forClass(User.class));
	}

	public List<Transaction> getTransactions() {
		return transactionDao.find(DetachedCriteria.forClass(Transaction.class));
	}

	public void save(User user) {
		userDao.save(user);
	}

	public void delete(User user) {
		userDao.delete(user);
	}

	public void save(Rubric rubric) {
		rubricDao.save(rubric);
	}

	public void delete(Rubric rubric) {
		rubricDao.delete(rubric);
	}

	public void saveIncome(Transaction transaction, Long rubricId) {
		transaction.setAccountFrom(accountDao.getOuterAccount());
		transaction.setAccountTo(accountDao.getMasterAccount());
		save(transaction, rubricId);
	}

	public void saveExpense(Transaction transaction, Long rubricId) {
		transaction.setAccountFrom(accountDao.getMasterAccount());
		transaction.setAccountTo(accountDao.getOuterAccount());
		save(transaction, rubricId);
	}

	private void save(Transaction transaction, Long rubricId) {
		transaction.setAmountTo(transaction.getAmountFrom());
		transaction.setRubric(rubricDao.get(rubricId));
		transactionDao.save(transaction);
	}

	public void delete(Transaction transaction) {
		transactionDao.delete(transaction);
	}

}
