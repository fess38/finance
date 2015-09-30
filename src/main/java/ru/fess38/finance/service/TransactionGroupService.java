package ru.fess38.finance.service;

import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.db.IdGenerator;
import ru.fess38.finance.model.TransactionGroup;

/**
 * Created by admin on 05.07.15.
 */
public class TransactionGroupService extends EntityService {
    public String getTransactionGroups() {
        templateData.put("transactionGroups", getTransactionGroupDao().getTransactionGroups());
        return TemplateConfig.procces(templateData, "ru/fess38/finance/templates/TransactionGroup.ftl");
    }

    public void create(String name) {
        TransactionGroup transactionGroup = new TransactionGroup();
        transactionGroup.setId(IdGenerator.next());
        transactionGroup.setName(name);
        getTransactionGroupDao().create(transactionGroup);
    }

    @Override
    public void delete(Integer id) {
        getTransactionGroupDao().deleteById(id);
    }
}
