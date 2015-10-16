package ru.fess38.finance.service;

import ru.fess38.finance.dao.*;


public abstract class EntityService {
    private AccountDao accountDao;
    private CurrencyDao currencyDao;
    private RubricDao rubricDao;
    private TransactionDao transactionDao;
    private TransactionGroupDao transactionGroupDao;
    private UserDao userDao;
    private String ftlTemplatePath;

    public abstract String makeHtmlForGET();

    public void deleteEntity(Integer id) {
        if (!getTransactionDao().isEntityUsed(id)) {
            delete(id);
        }
    }

    public abstract void delete(Integer id);

    public TransactionDao getTransactionDao() {
        return transactionDao;
    }

    public void setTransactionDao(TransactionDao transactionDao) {
        this.transactionDao = transactionDao;
    }

    public RubricDao getRubricDao() {
        return rubricDao;
    }

    public void setRubricDao(RubricDao rubricDao) {
        this.rubricDao = rubricDao;
    }

    public TransactionGroupDao getTransactionGroupDao() {
        return transactionGroupDao;
    }

    public void setTransactionGroupDao(TransactionGroupDao transactionGroupDao) {
        this.transactionGroupDao = transactionGroupDao;
    }

    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public AccountDao getAccountDao() {
        return accountDao;
    }

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    public CurrencyDao getCurrencyDao() {
        return currencyDao;
    }

    public void setCurrencyDao(CurrencyDao currencyDao) {
        this.currencyDao = currencyDao;
    }

    public String getFtlTemplatePath() {
        return ftlTemplatePath;
    }

    public void setFtlTemplatePath(String ftlTemplatePath) {
        this.ftlTemplatePath = ftlTemplatePath;
    }
}
