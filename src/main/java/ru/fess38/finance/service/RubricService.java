package ru.fess38.finance.service;

import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.model.Rubric;

import java.util.HashMap;
import java.util.Map;


public class RubricService extends EntityService {
    public String makeHtmlForGET() {
        Map<String, Object> data = new HashMap<>();
        data.put("rubrics", getRubricDao().findAll());
        return TemplateConfig.procces(data, getFtlTemplatePath());
    }

    public void create(String name, Boolean isIncome) {
        Rubric rubric = new Rubric();
        rubric.setName(name);
        rubric.setIsIncome(isIncome);
        getRubricDao().create(rubric);
    }

    @Override
    public void delete(Integer id) {
        getRubricDao().deleteById(id);
    }
}
