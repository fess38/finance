package ru.fess38.finance.service;

import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Transaction;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class TransactionService extends EntityService {
    @Override
    public String makeHtmlForGET() {
        Map<String, Object> data = new HashMap<>();
        data.put("transactions", getTransactionDao().findAll());
        data.put("incomeRubrics", getRubricDao().findIncomeRubrics());
        data.put("expenceRubrics", getRubricDao().findExpenceRubrics());
        data.put("accounts", getAccountDao().findAll());
        data.put("transactionGroups", getTransactionGroupDao().findAll());
        data.put("users", getUserDao().findAll());
        data.put("today", new Date());
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
