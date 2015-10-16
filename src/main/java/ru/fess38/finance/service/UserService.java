package ru.fess38.finance.service;

import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.model.User;

import java.util.HashMap;
import java.util.Map;


public class UserService extends EntityService {
    @Override
    public String makeHtmlForGET() {
        Map<String, Object> data = new HashMap<>();
        data.put("users", getUserDao().findAll());
        return TemplateConfig.procces(data, getFtlTemplatePath());
    }

    public void create(String name) {
        User user = new User();
        user.setName(name);
        getUserDao().create(user);
    }

    @Override
    public void delete(Integer id) {
        getUserDao().deleteById(id);
    }
}
