package ru.fess38.finance.service;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import ru.fess38.finance.dao.RubricDao;
import ru.fess38.finance.dao.TransactionDao;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ScheduledRubricService {
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private TransactionDao transactionDao;

  @Scheduled(fixedRate = 10000)
  private void restoreDeletedRubricsWithTransactions() {
    List<Rubric> deletedRubrics = rubricDao.findDeleted(DetachedCriteria.forClass(Rubric.class));

    if (!deletedRubrics.isEmpty()) {
      DetachedCriteria criteria = DetachedCriteria.forClass(Transaction.class)
          .add(Restrictions.in("rubric", deletedRubrics));
      transactionDao.find(criteria)
          .stream()
          .map(Transaction::getRubric)
          .distinct()
          .peek(x -> x.setDeleted(false))
          .forEach(rubricDao::update);
    }
  }

  @Scheduled(fixedRate = 10000)
  private void setRubricHasTransactionsTrue() {
    DetachedCriteria criteria = DetachedCriteria.forClass(Rubric.class)
        .add(Restrictions.eq("hasTransactions", false));
    List<Rubric> rubricsWithTransactions = rubricDao.find(criteria);

    if (!rubricsWithTransactions.isEmpty()) {
      criteria = DetachedCriteria.forClass(Transaction.class)
          .add(Restrictions.in("rubric", rubricsWithTransactions));
      transactionDao.find(criteria)
          .stream()
          .map(Transaction::getRubric)
          .distinct()
          .peek(x -> x.setHasTransactions(true))
          .forEach(rubricDao::update);
    }
  }

  @Scheduled(fixedRate = 10000)
  private void setRubricHasTransactionsFalse() {
    DetachedCriteria criteria = DetachedCriteria.forClass(Rubric.class)
        .add(Restrictions.eq("hasTransactions", true));
    List<Rubric> expectedRubricsWithTransactions = rubricDao.find(criteria);

    List<Rubric> actualRubricsWithTransactions = transactionDao
        .find(DetachedCriteria.forClass(Transaction.class))
        .stream()
        .map(Transaction::getRubric)
        .distinct()
        .collect(Collectors.toList());

    expectedRubricsWithTransactions.stream()
        .filter(x -> !actualRubricsWithTransactions.contains(x))
        .peek(x -> x.setHasTransactions(false))
        .forEach(rubricDao::update);
  }
}
