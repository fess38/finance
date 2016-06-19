package ru.fess38.finance.dao;


import java.util.List;

import ru.fess38.finance.GenericDao;
import ru.fess38.finance.model.Rubric;


public interface RubricDao extends GenericDao<Rubric, Long> {
	List<Rubric> findByType(boolean isIncome);

	Rubric getTransferRubric();
}
