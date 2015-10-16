package ru.fess38.finance.dao;

import ru.fess38.finance.model.Rubric;

import java.util.List;
import java.util.stream.Collectors;


public class RubricDao extends EntityDao<Rubric> {
    public List<Rubric> findIncomeRubrics() {
        return findAll().stream().filter(Rubric::getIsIncome).collect(Collectors.toList());
    }

    public List<Rubric> findExpenceRubrics() {
        return findAll().stream().filter(x -> !x.getIsIncome()).collect(Collectors.toList());
    }
}
