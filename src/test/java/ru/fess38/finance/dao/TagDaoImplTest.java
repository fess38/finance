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
import ru.fess38.finance.model.ModifiableTag;
import ru.fess38.finance.model.Tag;

import java.util.List;
import java.util.UUID;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AppConfigurationTest.class)
@Transactional
public class TagDaoImplTest {
  @Autowired
  private TagDao tagDao;

  @Test
  public void save() throws Exception {
    Assert.assertTrue(tagDao.save(newTag()).id() != 0);
  }

  @Test
  public void delete() throws Exception {

  }

  @Test
  public void find() throws Exception {
    Tag tag1 = tagDao.save(newTag());
    tagDao.delete(tagDao.save(newTag()));
    tagDao.delete(tagDao.save(newTag()));
    List<Tag> tags = tagDao.find(DetachedCriteria.forClass(ModifiableTag.class));
    Assert.assertEquals(1, tags.size());
    Assert.assertEquals(tag1, tags.get(0));

  }

  @Test
  public void findDeleted() throws Exception {
    Tag tag1 = tagDao.delete(tagDao.save(newTag()));
    tagDao.save(newTag());
    tagDao.save(newTag());
    List<Tag> tags = tagDao.findDeleted(DetachedCriteria.forClass(ModifiableTag.class));
    Assert.assertEquals(1, tags.size());
    Assert.assertEquals(tag1, tags.get(0));
  }

  private Tag newTag() {
    return Tag.of(UUID.randomUUID().toString());
  }
}
