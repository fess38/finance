package ru.fess38.finance.service;

import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.db.IdGenerator;
import ru.fess38.finance.model.Transaction;

import java.util.Date;

/**
 * Created by admin on 05.07.15.
 */
public class TransactionService extends EntityService {
    public String getTransactions() {
        templateData.put("transactions", getTransactionDao().getAllTransactions());
        templateData.put("rubrics", getRubricDao().getRubrics());
        templateData.put("accounts", getAccountDao().getAccounts());
        templateData.put("transactionGroups", getTransactionGroupDao().getTransactionGroups());
        templateData.put("users", getUserDao().getUsers());
        templateData.put("today", new Date());
        return TemplateConfig.procces(templateData, "ru/fess38/finance/templates/Transaction.ftl");
    }

    public void create(Integer rubricId, Date dayRef, Integer accountIdFrom,
                       Integer accountIdTo, Integer amountFrom, Integer amountTo,
                       Integer userId, Integer transactionGroupId,
                       Boolean isUseForStat, String comment) {
        Transaction transaction = new Transaction();
        transaction.setId(IdGenerator.getId());
        transaction.setRubricId(rubricId);
        transaction.setDayRef(dayRef);
        transaction.setAccountIdFrom(accountIdFrom);
        transaction.setAccountIdTo(accountIdTo);
        transaction.setAmountFrom(amountFrom);
        transaction.setAmountTo(amountTo);
        transaction.setUserId(userId);
        transaction.setTransactionGroupId(transactionGroupId);
        transaction.setIsUseForStat(isUseForStat);
        transaction.setComment(comment);
        getTransactionDao().create(transaction);
    }

    @Override
    public void delete(Integer id) {
        getTransactionDao().deleteById(id);
    }
}
