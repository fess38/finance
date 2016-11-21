package ru.fess38.finance.dao;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;

public class DaoHelper {
  public static DetachedCriteria deleted(DetachedCriteria detachedCriteria) {
    return detachedCriteria.add(Restrictions.eq("isDeleted", true));
  }

  public static DetachedCriteria notDeleted(DetachedCriteria detachedCriteria) {
    return detachedCriteria.add(Restrictions.eq("isDeleted", false));
  }
}
