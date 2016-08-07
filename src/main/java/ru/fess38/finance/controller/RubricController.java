package ru.fess38.finance.controller;

import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.model.Rubric;

import java.util.List;

@RestController
public class RubricController {
  @Autowired
  private RubricDao rubricDao;

  @RequestMapping(value = "/rubrics", method = RequestMethod.GET)
  public @ResponseBody List<Rubric> getRubrics() {
    return rubricDao.find(DetachedCriteria.forClass(Rubric.class));
  }

  @RequestMapping(value = "/rubrics/income", method = RequestMethod.GET)
  public @ResponseBody List<Rubric> getIncomeRubrics() {
    return rubricDao.findByType(true);
  }

  @RequestMapping(value = "/rubrics/expense", method = RequestMethod.GET)
  public @ResponseBody List<Rubric> getExpenseRubrics() {
    return rubricDao.findByType(false);
  }

  @RequestMapping(value = "/rubrics/add", method = RequestMethod.POST)
  public void addRubric(@RequestBody Rubric rubric) {
    rubricDao.save(rubric);
  }

  @RequestMapping(value = "/rubrics/update", method = RequestMethod.POST)
  public void updateRubric(@RequestBody Rubric rubric) {
    rubricDao.update(rubric);
  }

  @RequestMapping(value = "/rubrics/delete", method = RequestMethod.POST)
  public void deleteRubric(@RequestBody Rubric rubric) {
    rubricDao.delete(rubric);
  }
}
