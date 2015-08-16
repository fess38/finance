package ru.fess38.finance.service;

import freemarker.template.Configuration;
import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.dao.UserDao;
import ru.fess38.finance.db.DbConnection;
import ru.fess38.finance.db.IdGenerator;
import ru.fess38.finance.model.User;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by admin on 05.07.15.
 */
public class UserService extends EntityService {
    public String getUsers() {
        templateData.put("users", getUserDao().getUsers());
        return TemplateConfig.procces(templateData, "ru/fess38/finance/templates/User.ftl");
    }

    public void create(String name) {
        User user = new User();
        user.setId(IdGenerator.getId());
        user.setName(name);
        getUserDao().create(user);
    }

    @Override
    public void delete(Integer id) {
        getUserDao().deleteById(id);
    }
}
