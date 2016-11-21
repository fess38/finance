package ru.fess38.finance.transaction;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.AppConfigurationTest;
import ru.fess38.finance.account.Account;
import ru.fess38.finance.account.AccountDao;
import ru.fess38.finance.rubric.Rubric;
import ru.fess38.finance.rubric.RubricDao;
import ru.fess38.finance.tag.Tag;
import ru.fess38.finance.tag.TagDao;
import ru.fess38.finance.user.User;
import ru.fess38.finance.user.UserDao;
import ru.fess38.finance.util.DefaultEntitiesCreator;

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
  public void save() throws Exception {
    Transaction transaction = transaction(rubricDao.save(rubric()));
    Assert.assertTrue(transactionDao.save(transaction).id() != 0);
  }

  @Test
  public void delete() throws Exception {
    Transaction transaction = transaction(rubricDao.save(rubric()));
    Assert.assertTrue(transactionDao.delete(transactionDao.save(transaction)).isDeleted());
  }

  @Test
  public void findByYearMonth() throws Exception {
    Rubric rubric = rubricDao.save(rubric());

    Transaction transaction1 = transaction(rubric).withDayRef(LocalDate.of(2016, 11, 1));
    Transaction transaction2 = transaction(rubric).withDayRef(LocalDate.of(2016, 11, 30));
    Transaction transaction3 = transaction(rubric).withDayRef(LocalDate.of(2016, 10, 1));

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(2, transactionDao.find(YearMonth.of(2016, 11)).size());
  }

  @Test
  public void findByYearMonthRubric() throws Exception {
    Rubric rubric = rubricDao.save(rubric());

    Transaction transaction1 = transaction(rubric).withDayRef(LocalDate.of(2016, 11, 1));
    Transaction transaction2 = transaction(rubric).withDayRef(LocalDate.of(2016, 11, 30));
    Transaction transaction3 = transaction(rubricDao.save(rubric()))
        .withDayRef(LocalDate.of(2016, 10, 1));

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(2, transactionDao.find(rubric.id(), YearMonth.of(2016, 11)).size());
  }

  @Test
  public void findByDateRubric() throws Exception {
    Rubric rubric = rubricDao.save(rubric());

    Transaction transaction1 = transaction(rubric).withDayRef(LocalDate.of(2016, 11, 1));
    Transaction transaction2 = transaction(rubric).withDayRef(LocalDate.of(2016, 11, 1));
    Transaction transaction3 = transaction(rubricDao.save(rubric()))
        .withDayRef(LocalDate.of(2016, 10, 1));

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(2, transactionDao.find(rubric.id(), LocalDate.of(2016, 11, 1)).size());
  }

  @Test
  public void countByAccount() throws Exception {
    Rubric rubric = rubricDao.save(rubric());

    Transaction transaction1 = transaction(rubric);
    Transaction transaction2 = transaction(rubric);
    Transaction transaction3 = transaction(rubric);

    rubricDao.save(transaction1.rubric());
    rubricDao.save(transaction2.rubric());
    rubricDao.save(transaction3.rubric());

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(3, transactionDao.countByAccount(transaction1.accountFrom()));
  }

  @Test
  public void countByRubric() throws Exception {
    Rubric rubric = rubricDao.save(rubric());

    Transaction transaction1 = transaction(rubric);
    Transaction transaction2 = transaction(rubric);
    Transaction transaction3 = transaction(rubricDao.save(rubric()));

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(2, transactionDao.countByRubric(rubric));
  }

  @Test
  public void countByTag() throws Exception {
    Rubric rubric = rubricDao.save(rubric());
    Tag tag = tagDao.save(tag());

    Transaction transaction1 = transaction(rubric).withTag(tag);
    Transaction transaction2 = transaction(rubric).withTag(tag);
    Transaction transaction3 = transaction(rubric);

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(2, transactionDao.countByTag(tag));
  }

  @Test
  public void countByUser() throws Exception {
    User user = userDao.save(user());
    Rubric rubric = rubricDao.save(rubric());

    Transaction transaction1 = transaction(rubricDao.save(rubric())).withUser(user);
    Transaction transaction2 = transaction(rubric).withUser(user);
    Transaction transaction3 = transaction(rubric).withUser(user);

    transactionDao.save(transaction1);
    transactionDao.save(transaction2);
    transactionDao.save(transaction3);

    Assert.assertEquals(3, transactionDao.countByUser(user));
  }

  private Account masterAccount() {
    return accountDao.getMasterAccount();
  }

  private Account outerAccount() {
    return accountDao.getOuterAccount();
  }

  private Transaction transaction(Rubric rubric) {
    return Transaction.builder()
        .accountFrom(masterAccount())
        .accountTo(outerAccount())
        .amountFrom(100)
        .amountTo(100)
        .dayRef(LocalDate.now())
        .rubric(rubric)
        .build();
  }

  private Tag tag() {
    return Tag.builder().name("tag").build();
  }

  private User user() {
    return User.builder().name("user").build();
  }

  private Rubric rubric() {
    return Rubric.builder().name(UUID.randomUUID().toString()).build();
  }
}
