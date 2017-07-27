package ru.fess38.finance.rubric;

import org.hibernate.criterion.DetachedCriteria;

import java.util.List;

public interface RubricDao {
  Rubric save(Rubric rubric);

  Rubric get(long id);

  Rubric update(Rubric rubric);

  Rubric delete(Rubric rubric);

  List<Rubric> find(DetachedCriteria detachedCriteria);

  List<Rubric> findDeleted(DetachedCriteria detachedCriteria);

  DetachedCriteria detachedCriteria();
  
  Rubric getTransferRubric();
}
