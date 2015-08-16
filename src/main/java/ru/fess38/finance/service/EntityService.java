package ru.fess38.finance.service;

import ru.fess38.finance.dao.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by admin on 08.08.15.
 */
public abstract class EntityService {
    private final AccountDao accountDao = new AccountDao();
    private final CurrencyDao currencyDao = new CurrencyDao();
    private final RubricDao rubricDao = new RubricDao();
    private final TransactionGroupDao transactionGroupDao = new TransactionGroupDao();
    private final UserDao userDao = new UserDao();
    private final TransactionDao transactionDao = new TransactionDao();
    protected final Map<String, Object> templateData = new HashMap<>();

    protected abstract void delete(Integer id);

    public final TransactionDao getTransactionDao() {
        return transactionDao;
    }

    public final RubricDao getRubricDao() {
        return rubricDao;
    }

    public final TransactionGroupDao getTransactionGroupDao() {
        return transactionGroupDao;
    }

    public final UserDao getUserDao() {
        return userDao;
    }

    public final AccountDao getAccountDao() {
        return accountDao;
    }

    public final CurrencyDao getCurrencyDao() {
        return currencyDao;
    }
}
