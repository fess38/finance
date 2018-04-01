package ru.fess38.finance.rubric;

import org.hibernate.criterion.DetachedCriteria;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.fess38.finance.AppConfigurationTest;
import ru.fess38.finance.util.DefaultEntitiesCreator;

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
    Assert.assertTrue(rubricDao.save(newRubric()) != null);
  }

  @Test
  public void delete() throws Exception {
    Assert.assertTrue(rubricDao.delete(rubricDao.save(newRubric())).isDeleted());
  }

  @Test
  public void find() throws Exception {
    Rubric rubric1 = rubricDao.save(newRubric());
    rubricDao.delete(rubricDao.save(newRubric()));
    rubricDao.delete(rubricDao.save(newRubric()));
    List<Rubric> rubrics = rubricDao.find(DetachedCriteria.forClass(ModifiableRubric.class));
    Assert.assertEquals(1, rubrics.size());
    Assert.assertEquals(rubric1, rubrics.get(0));
  }

  @Test
  public void findDeleted() throws Exception {
    Rubric rubric1 = rubricDao.delete(rubricDao.save(newRubric()));
    rubricDao.save(newRubric());
    rubricDao.save(newRubric());
    List<Rubric> rubrics = rubricDao.findDeleted(DetachedCriteria.forClass(ModifiableRubric.class));
    Assert.assertEquals(1, rubrics.size());
    Assert.assertEquals(rubric1, rubrics.get(0));
  }

  @Test
  public void getTransferRubric() throws Exception {
    defaultEntitiesCreator.create();
    Assert.assertTrue(rubricDao.getTransferRubric() != null);
  }

  private Rubric newRubric() {
    return Rubric.of(UUID.randomUUID().toString());
  }
}
