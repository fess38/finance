package ru.fess38.finance.dao;

import org.hibernate.criterion.DetachedCriteria;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.AppConfigurationTest;
import ru.fess38.finance.DefaultEntitiesCreator;
import ru.fess38.finance.model.Rubric;

import java.util.List;
import java.util.UUID;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AppConfigurationTest.class)
@Transactional
public class RubricDaoImplTest {
  @Autowired
  private RubricDao rubricDao;
  @Autowired
  private DefaultEntitiesCreator defaultEntitiesCreator;

  @Test
  public void save() throws Exception {
    Rubric rubric = newRubric();
    rubricDao.save(rubric);
    Assert.assertTrue(rubric.getId() != null);
  }

  @Test
  public void delete() throws Exception {
    Rubric rubric = newRubric();
    rubricDao.save(rubric);
    rubricDao.delete(rubric);
    Assert.assertTrue(rubric.isDeleted());
  }

  @Test
  public void deleteHasTransactions() throws Exception {
    Rubric rubric = newRubric();
    rubric.addTransaction();
    rubricDao.save(rubric);
    rubricDao.delete(rubric);
    Assert.assertFalse(rubric.isDeleted());
  }

  @Test
  public void find() throws Exception {
    Rubric rubric1 = newRubric();
    Rubric rubric2 = newRubric();
    Rubric rubric3 = newRubric();
    rubricDao.save(rubric1);
    rubricDao.save(rubric2);
    rubricDao.save(rubric3);
    rubricDao.delete(rubric2);
    rubricDao.delete(rubric3);
    List<Rubric> rubrics = rubricDao.find(DetachedCriteria.forClass(Rubric.class));
    Assert.assertEquals(1, rubrics.size());
    Assert.assertEquals(rubric1, rubrics.get(0));
  }

  @Test
  public void findDeleted() throws Exception {
    Rubric rubric1 = newRubric();
    Rubric rubric2 = newRubric();
    Rubric rubric3 = newRubric();
    rubricDao.save(rubric1);
    rubricDao.save(rubric2);
    rubricDao.save(rubric3);
    rubricDao.delete(rubric1);
    List<Rubric> rubrics = rubricDao.findDeleted(DetachedCriteria.forClass(Rubric.class));
    Assert.assertEquals(1, rubrics.size());
    Assert.assertEquals(rubric1, rubrics.get(0));
  }

  @Test
  public void getTransferRubric() throws Exception {
    defaultEntitiesCreator.create();
    Assert.assertTrue(rubricDao.getTransferRubric() != null);
  }

  private Rubric newRubric() {
    Rubric rubric = new Rubric();
    rubric.setName(UUID.randomUUID().toString());
    return rubric;
  }
}
