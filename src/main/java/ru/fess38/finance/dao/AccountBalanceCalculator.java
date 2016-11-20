package ru.fess38.finance.dao;

import org.apache.commons.lang3.tuple.Pair;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.ModifiableAccount;
import ru.fess38.finance.model.ModifiableTransaction;
import ru.fess38.finance.model.Transaction;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class AccountBalanceCalculator {
  private AccountDao accountDao;
  private TransactionDao transactionDao;

  @Transactional
  public void run() {
    Map<Account, Integer> accountBalanceMap = transactionDao
        .find(DetachedCriteria.forClass(ModifiableTransaction.class))
        .stream()
        .map(this::convert)
        .flatMap(Collection::stream)
        .collect(Collectors.groupingBy(Pair::getLeft, Collectors.summingInt(Pair::getRight)));
    accounts().forEach(x -> accountDao.update(x.withBalance(accountBalanceMap.getOrDefault(x, 0))));
  }

  private List<Pair<Account, Integer>> convert(Transaction transaction) {
    return Arrays.asList(Pair.of(transaction.accountFrom(), -transaction.amountFrom()),
        Pair.of(transaction.accountTo(), transaction.amountTo()));
  }

  private List<Account> accounts() {
    List<Account> accounts = accountDao.find(DetachedCriteria.forClass(ModifiableAccount.class));
    accounts.add(accountDao.getMasterAccount());
    return accounts;
  }

  @Autowired
  public void setAccountDao(AccountDao accountDao) {
    this.accountDao = accountDao;
  }

  @Autowired
  public void setTransactionDao(TransactionDao transactionDao) {
    this.transactionDao = transactionDao;
  }
}
