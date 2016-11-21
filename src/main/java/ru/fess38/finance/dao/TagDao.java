package ru.fess38.finance.dao;

import org.hibernate.criterion.DetachedCriteria;
import ru.fess38.finance.model.Tag;

import java.util.List;

public interface TagDao {
  Tag save(Tag tag);

  Tag get(long id);

  Tag update(Tag tag);

  Tag delete(Tag tag);

  List<Tag> find(DetachedCriteria detachedCriteria);

  List<Tag> findDeleted(DetachedCriteria detachedCriteria);

  DetachedCriteria detachedCriteria();
}
