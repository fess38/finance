package ru.fess38.finance.dao;

import java.util.List;
import java.util.stream.Collectors;

import ru.fess38.finance.model.Rubric;


public class RubricDao extends EntityDao<Rubric> {
    public List<Rubric> findRubrics(boolean isIncome) {
    	return findAll().stream()
    			.filter(x -> x.getIsIncome() == isIncome)
    			.collect(Collectors.toList());
    }
    
    public Rubric getTransferRubric() {
    	return (Rubric) getSession().getNamedQuery("getTransferRubric").list().get(0);
    }
}
