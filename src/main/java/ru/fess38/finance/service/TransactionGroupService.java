package ru.fess38.finance.service;

import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.model.TransactionGroup;

import java.util.HashMap;
import java.util.Map;


public class TransactionGroupService extends EntityService {
    @Override
    public String makeHtmlForGET() {
        Map<String, Object> data = new HashMap<>();
        data.put("transactionGroups", getTransactionGroupDao().findAll());
        return TemplateConfig.procces(data, getFtlTemplatePath());
    }

    public void create(String name) {
        TransactionGroup transactionGroup = new TransactionGroup();
        transactionGroup.setName(name);
        getTransactionGroupDao().create(transactionGroup);
    }

    @Override
    public void delete(Integer id) {
        getTransactionGroupDao().deleteById(id);
    }
}
