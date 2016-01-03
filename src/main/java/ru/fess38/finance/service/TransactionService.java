package ru.fess38.finance.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.view.Transactions;


public class TransactionService extends EntityService {
    @Override
    public String makeHtmlForGET() {
        Map<String, Object> data = new HashMap<>();
        data.put("transactions", getTransactionDao().findAll());
        data.put("incomeRubrics", getRubricDao().findRubrics(true));
        data.put("expenceRubrics", getRubricDao().findRubrics(false));
        data.put("accounts", getAccountDao().findAll());
        data.put("transactionGroups", getTransactionGroupDao().findAll());
        data.put("users", getUserDao().findAll());
        data.put("today", new Date());

        Transactions transactionsByRubric = null;// = new MonthTransactionsByRubric(2015, 10, transactions);
        data.put("rublesIncome", transactionsByRubric);
        return TemplateConfig.procces(data, getFtlTemplatePath());
    }

    public void create(Integer rubricId, Date dayRef, Integer accountFromId,
                       Integer accountToId, Integer amountFrom, Integer amountTo,
                       Integer userId, Integer transactionGroupId, String comment) {
        Transaction transaction = new Transaction();
        transaction.setRubricId(rubricId);
        transaction.setDayRef(dayRef);
        transaction.setAccountFromId(accountFromId);
        transaction.setAccountToId(accountToId);
        transaction.setAmountFrom(amountFrom);
        transaction.setAmountTo(amountTo);
        transaction.setUserId(userId);
        transaction.setTransactionGroupId(transactionGroupId);
        transaction.setComment(comment);
        setServiceAccount(transaction);
        getTransactionDao().create(transaction);
    }

    private void setServiceAccount(Transaction transaction) {
        if (transaction.getAccountFromId() == null) {
            Account accountTo = transaction.getAccountTo();
            Account accountFrom = getAccountDao().findServiceAccountByAnother(accountTo);
            transaction.setAccountFrom(accountFrom);
            transaction.setAmountFrom(transaction.getAmountTo());
        } else if (transaction.getAccountToId() == null) {
            Account accountFrom = transaction.getAccountFrom();
            Account accountTo = getAccountDao().findServiceAccountByAnother(accountFrom);
            transaction.setAccountTo(accountTo);
            transaction.setAmountTo(transaction.getAmountFrom());
        }
    }

    @Override
    public void delete(Integer id) {
        getTransactionDao().deleteById(id);
    }
}
