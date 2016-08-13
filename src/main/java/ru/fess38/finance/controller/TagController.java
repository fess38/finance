package ru.fess38.finance.controller;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ru.fess38.finance.dao.TagDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.model.Tag;

import java.util.List;

@RestController
public class TagController {
  @Autowired
  private TagDao tagDao;
  @Autowired
  private TransactionDao transactionDao;

  @RequestMapping(value = "/tag/get", method = RequestMethod.GET)
  public @ResponseBody List<Tag> get() {
    return tagDao.find(DetachedCriteria.forClass(Tag.class));
  }

  @RequestMapping(value = "/tag/save", method = RequestMethod.POST)
  public void save(@RequestBody Tag tag) {
    tagDao.save(tag);
  }

  @RequestMapping(value = "/tag/update", method = RequestMethod.POST)
  public void update(@RequestBody Tag tag) {
    tagDao.update(tag);
  }

  @RequestMapping(value = "/tag/delete", method = RequestMethod.POST)
  public void delete(@RequestBody Tag tag) {
    if (transactionDao.countByTag(tag) == 0) {
      tagDao.delete(tag);
    }
  }
}
