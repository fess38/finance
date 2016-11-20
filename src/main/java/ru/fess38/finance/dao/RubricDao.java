package ru.fess38.finance.dao;

import ru.fess38.finance.model.Rubric;

public interface RubricDao extends GenericDao<Rubric> {
  Rubric getTransferRubric();
}
