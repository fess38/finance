package ru.fess38.finance.service;

import ru.fess38.finance.TemplateConfig;
import ru.fess38.finance.db.IdGenerator;
import ru.fess38.finance.model.Rubric;

/**
 * Created by admin on 05.07.15.
 */
public class RubricService extends EntityService {
    public String getRubrics() {
        templateData.put("rubrics", getRubricDao().getRubrics());
        return TemplateConfig.procces(templateData, "ru/fess38/finance/templates/Rubric.ftl");
    }

    public void create(String name, Boolean isIncome) {
        Rubric rubric = new Rubric();
        rubric.setId(IdGenerator.next());
        rubric.setName(name);
        rubric.setIsIncome(isIncome);
        getRubricDao().create(rubric);
    }

    @Override
    public void delete(Integer id) {
        getRubricDao().deleteById(id);
    }
}
