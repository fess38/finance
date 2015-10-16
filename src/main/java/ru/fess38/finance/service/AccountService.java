package ru.fess38.finance.service;

import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.model.Account;

import java.util.HashMap;
import java.util.Map;


public final class AccountService extends EntityService {
    @Override
    public String makeHtmlForGET() {
        getAccountDao().updateAmount();
        Map<String, Object> data = new HashMap<>();
        data.put("accounts", getAccountDao().findAll());
        data.put("currencies", getCurrencyDao().findAll());
        return TemplateConfig.procces(data, getFtlTemplatePath());

    }

    public void create(String name, Integer currencyId) {
        Account account = new Account();
        account.setName(name);
        account.setCurrencyId(currencyId);
        getAccountDao().create(account);
    }

    @Override
    public void delete(Integer id) {
        getAccountDao().deleteById(id);
    }
}
