package ru.fess38.finance.tag;

import org.hibernate.criterion.DetachedCriteria;

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
