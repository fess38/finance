package ru.fess38.finance.dao;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.AppConfigurationTest;
import ru.fess38.finance.DefaultEntitiesCreator;
import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Tag;
import ru.fess38.finance.model.Transaction;
import ru.fess38.finance.model.User;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.UUID;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AppConfigurationTest.class)
@Transactional
public class TransactionDaoImplTest {
  @Autowired
  private AccountDao accountDao;
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private TagDao tagDao;
  @Autowired
  private TransactionDao transactionDao;
  @Autowired
  private UserDao userDao;
  @Autowired
  private DefaultEntitiesCreator entitiesCreator;

  @Before
  public void before() {
    entitiesCreator.create();
  }

  @Test
  public void findByYearMonth() throws Exception {
    Transaction transaction1 = transaction();
    transaction1.setDayRef(LocalDate.of(2016, 11, 1));
    Transaction transaction2 = transaction();
    transaction2.setDayRef(LocalDate.of(2016, 11, 30));
    Transaction transaction3 = transaction();
    transaction3.setDayRef(LocalDate.of(2016, 10, 1));

    rubricDao.save(transaction1.getRubric());
    rubricDao.save(transaction2.getRubric());
    rubricDao.save(transaction3.getRubric());

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(2, transactionDao.find(YearMonth.of(2016, 11)).size());
  }

  @Test
  public void findByYearMonthRubric() throws Exception {
    Transaction transaction1 = transaction();
    transaction1.setDayRef(LocalDate.of(2016, 11, 1));
    Transaction transaction2 = transaction();
    transaction2.setDayRef(LocalDate.of(2016, 11, 30));
    transaction2.setRubric(transaction1.getRubric());
    Transaction transaction3 = transaction();
    transaction3.setDayRef(LocalDate.of(2016, 10, 1));

    rubricDao.save(transaction1.getRubric());
    rubricDao.save(transaction3.getRubric());

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(2, transactionDao.find(transaction1.getRubric().getId(),
        YearMonth.of(2016, 11)).size());
  }

  @Test
  public void findByDateRubric() throws Exception {
    Transaction transaction1 = transaction();
    transaction1.setDayRef(LocalDate.of(2016, 11, 1));
    Transaction transaction2 = transaction();
    transaction2.setDayRef(LocalDate.of(2016, 11, 1));
    transaction2.setRubric(transaction1.getRubric());
    Transaction transaction3 = transaction();
    transaction3.setDayRef(LocalDate.of(2016, 10, 1));

    rubricDao.save(transaction1.getRubric());
    rubricDao.save(transaction3.getRubric());

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(2, transactionDao.find(transaction1.getRubric().getId(),
        LocalDate.of(2016, 11, 1)).size());
  }

  @Test
  public void countByAccount() throws Exception {
    Transaction transaction1 = transaction();
    Transaction transaction2 = transaction();
    Transaction transaction3 = transaction();

    rubricDao.save(transaction1.getRubric());
    rubricDao.save(transaction2.getRubric());
    rubricDao.save(transaction3.getRubric());

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(3, transactionDao.countByAccount(transaction1.getAccountFrom()));
  }

  @Test
  public void countByRubric() throws Exception {
    Transaction transaction1 = transaction();
    Transaction transaction2 = transaction();
    transaction2.setRubric(transaction1.getRubric());
    Transaction transaction3 = transaction();

    rubricDao.save(transaction1.getRubric());
    rubricDao.save(transaction3.getRubric());

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(2, transactionDao.countByRubric(transaction1.getRubric()));
  }

  @Test
  public void countByTag() throws Exception {
    Transaction transaction1 = transaction();
    transaction1.setTag(tag());
    Transaction transaction2 = transaction();
    transaction2.setRubric(transaction1.getRubric());
    transaction2.setTag(transaction1.getTag());
    Transaction transaction3 = transaction();
    transaction3.setRubric(transaction1.getRubric());

    rubricDao.save(transaction1.getRubric());
    tagDao.save(transaction1.getTag());

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(2, transactionDao.countByTag(transaction1.getTag()));
  }

  @Test
  public void countByUser() throws Exception {
    Transaction transaction1 = transaction();
    transaction1.setUser(user());
    Transaction transaction2 = transaction();
    transaction2.setRubric(transaction1.getRubric());
    transaction2.setUser(transaction1.getUser());
    Transaction transaction3 = transaction();
    transaction3.setRubric(transaction1.getRubric());
    transaction3.setUser(transaction1.getUser());

    rubricDao.save(transaction1.getRubric());
    userDao.save(transaction1.getUser());

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(3, transactionDao.countByUser(transaction1.getUser()));
  }

  private Account masterAccount() {
    return accountDao.getMasterAccount();
  }

  private Account outerAccount() {
    return accountDao.getOuterAccount();
  }

  private Transaction transaction() {
    Rubric rubric = new Rubric();
    rubric.setName(UUID.randomUUID().toString());

    Transaction transaction = new Transaction();
    transaction.setAccountFrom(masterAccount());
    transaction.setAccountTo(outerAccount());
    transaction.setAmountFrom(100);
    transaction.setAmountTo(100);
    transaction.setRubric(rubric);
    transaction.setDayRef(LocalDate.now());

    return transaction;
  }

  private Tag tag() {
    Tag tag = new Tag();
    tag.setName("tag");
    return tag;
  }

  private User user() {
    User user = new User();
    user.setName("user");
    return user;
  }
}
