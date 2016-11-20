package ru.fess38.finance.controller;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.model.ModifiableRubric;
import ru.fess38.finance.model.Rubric;

import java.util.List;

@RestController
public class RubricController {
  @Autowired
  private RubricDao rubricDao;

  @RequestMapping(value = "/rubric/get", method = RequestMethod.GET)
  public @ResponseBody List<Rubric> get() {
    return rubricDao.find(DetachedCriteria.forClass(ModifiableRubric.class));
  }

  @RequestMapping(value = "/rubric/transfer", method = RequestMethod.GET)
  public @ResponseBody Rubric findTransferRubrics() {
    return rubricDao.getTransferRubric();
  }

  @RequestMapping(value = "/rubric/save", method = RequestMethod.POST)
  public void save(@RequestBody Rubric rubric) {
    System.out.println(rubric);
    rubricDao.save(rubric);
  }

  @RequestMapping(value = "/rubric/update", method = RequestMethod.POST)
  public void update(@RequestBody Rubric rubric) {
    rubricDao.update(rubric);
  }

  @RequestMapping(value = "/rubric/delete", method = RequestMethod.POST)
  public void delete(@RequestBody Rubric rubric) {
    rubricDao.delete(rubric);
  }
}
