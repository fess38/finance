package ru.fess38.finance.dao;


import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.criterion.Restrictions;

import ru.fess38.finance.model.Rubric;


public class RubricDao extends EntityDao<Rubric> {
	@Override
	public List<Rubric> find() {
		return super.find().stream().filter(x -> !x.getIsService()).collect(Collectors.toList());
	}

	public List<Rubric> findRubrics(boolean isIncome) {
		return find().stream()
			.filter(x -> x.getIsIncome() == isIncome)
			.collect(Collectors.toList());
	}

	public Rubric getTransferRubric() {
		return (Rubric) getSession().createCriteria(getClazz())
			.add(Restrictions.eq("isDeleted", false))
			.add(Restrictions.eq("isService", true))
			.uniqueResult();
	}
}
