package ru.fess38.finance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.TagDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.dao.UserDao;
import ru.fess38.finance.model.MonthTransactions;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Tag;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
public class TransactionController {
  @Autowired
  private TransactionDao transactionDao;
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private TagDao tagDao;
  @Autowired
  private UserDao userDao;

  @RequestMapping(value = "/transaction/find", method = RequestMethod.GET,
      params = {"year", "month"})
  public @ResponseBody MonthTransactions find(@RequestParam("year") int year,
      @RequestParam("month") int month) {
    return transactionDao.find(YearMonth.of(year, month));
  }

  @RequestMapping(value = "/transaction/find", method = RequestMethod.GET,
      params = {"year", "month", "day", "rubric-id"})
  public @ResponseBody List<Transaction> find(@RequestParam("year") int year,
      @RequestParam("month") int month, @RequestParam("day") int day,
      @RequestParam("rubric-id") long rubricId) {
    return transactionDao.find(LocalDate.of(year, month, day), rubricId);
  }

  @RequestMapping(value = "/transaction/save", method = RequestMethod.POST)
  public void save(@RequestBody Transaction transaction) {
    transactionDao.save(transaction);

    updateLinkedRubric(transaction.getRubric());
    updateLinkedTag(transaction.getTag());
    updateLinkedUser(transaction.getUser());
  }

  @RequestMapping(value = "/transaction/update", method = RequestMethod.POST)
  public void update(@RequestBody Transaction transaction) {
    Transaction persistedTransaction = transactionDao.get(transaction.getId());
    transactionDao.update(transaction);

    updateLinkedTag(persistedTransaction.getTag());
    updateLinkedUser(persistedTransaction.getUser());
    updateLinkedTag(transaction.getTag());
    updateLinkedUser(transaction.getUser());
  }

  @RequestMapping(value = "/transaction/delete", method = RequestMethod.POST)
  public void delete(@RequestBody Transaction transaction) {
    transactionDao.delete(transaction);

    updateLinkedRubric(transaction.getRubric());
    updateLinkedTag(transaction.getTag());
    updateLinkedUser(transaction.getUser());
  }

  private void updateLinkedRubric(Rubric rubric) {
    Rubric persistedRubric = rubricDao.get(rubric.getId());
    int amount = transactionDao.countByRubric(persistedRubric);
    if (amount == 0 && persistedRubric.isHasTransactions()) {
      persistedRubric.setHasTransactions(false);
      rubricDao.update(persistedRubric);
    } else if (amount > 0 && !persistedRubric.isHasTransactions()) {
      persistedRubric.setHasTransactions(true);
      rubricDao.update(persistedRubric);
    }
  }

  private void updateLinkedTag(Tag tag) {
    if (tag == null) {
      return;
    }
    Tag persistedTag = tagDao.get(tag.getId());
    int amount = transactionDao.countByTag(persistedTag);
    if (amount == 0 && persistedTag.isHasTransactions()) {
      persistedTag.setHasTransactions(false);
      tagDao.update(persistedTag);
    } else if (amount > 0 && !persistedTag.isHasTransactions()) {
      persistedTag.setHasTransactions(true);
      tagDao.update(persistedTag);
    }
  }

  private void updateLinkedUser(User user) {
    if (user == null) {
      return;
    }
    User persistedUser = userDao.get(user.getId());
    int amount = transactionDao.countByUser(persistedUser);

    if (amount == 0 && persistedUser.isHasTransactions()) {
      persistedUser.setHasTransactions(false);
      userDao.update(persistedUser);
    } else if (amount > 0 && !persistedUser.isHasTransactions()) {
      persistedUser.setHasTransactions(true);
      userDao.update(persistedUser);
    }
  }
}
