package ru.fess38.finance.dao;

import org.hibernate.Query;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.Utils;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.User;

import java.util.List;
import java.util.stream.Collectors;


public class AccountDao extends EntityDao<Account> {
    private String updateAmountSqlpath;

    @Transactional(propagation = Propagation.REQUIRED)
    public void updateAmount() {
        getJdbcTemplate().update(Utils.readFile(updateAmountSqlpath));
    }

    public Account findServiceAccountByAnother(Account account) {
        Account accountWithAtributes = findById(account.getId());
        Integer currencyId = accountWithAtributes.getCurrencyId();
        Query query = getSession().getNamedQuery("accountFindServiceByCurrencyId")
                .setInteger("id", currencyId);
        return (Account) query.list().get(0);
    }

    public void setUpdateAmountSqlpath(String updateAmountSqlpath) {
        this.updateAmountSqlpath = updateAmountSqlpath;
    }
}
