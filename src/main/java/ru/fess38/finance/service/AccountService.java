package ru.fess38.finance.service;

import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.db.IdGenerator;
import ru.fess38.finance.model.Account;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by admin on 05.07.15.
 */
public final class AccountService extends EntityService {
    public String getAccounts() {
        templateData.put("accounts", getAccountDao().getAccounts());
        templateData.put("currencies", getCurrencyDao().getCurrencies());
        return TemplateConfig.procces(templateData, "ru/fess38/finance/templates/Account.ftl");
    }

    public void create(String name, Integer currencyId, Boolean isCredit) {
        Account account = new Account();
        account.setId(IdGenerator.getId());
        account.setName(name);
        account.setCurrencyId(currencyId);
        account.setIsCredit(isCredit);
        getAccountDao().create(account);
    }

    public void delete(Integer id) {
        getAccountDao().deleteById(id);
    }
}
