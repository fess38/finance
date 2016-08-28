package ru.fess38.finance.dao;

import ru.fess38.finance.GenericDao;
import ru.fess38.finance.model.Rubric;

import java.util.List;

public interface RubricDao extends GenericDao<Rubric, Long> {
  List<Rubric> findByType(boolean isIncome);

  Rubric getTransferRubric();
}
