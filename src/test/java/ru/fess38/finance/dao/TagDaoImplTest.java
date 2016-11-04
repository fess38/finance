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
    Tag tag = newTag();
    tagDao.save(tag);
    Assert.assertTrue(tag.getId() != null);
  }

  @Test
  public void delete() throws Exception {
    Tag tag = newTag();
    tagDao.save(tag);
    tagDao.delete(tag);
    Assert.assertTrue(tag.isDeleted());
  }

  @Test
  public void deleteHasTransactions() throws Exception {
    Tag tag = newTag();
    tag.addTransaction();
    tagDao.save(tag);
    tagDao.delete(tag);
    Assert.assertFalse(tag.isDeleted());
  }

  @Test
  public void find() throws Exception {
    Tag tag1 = newTag();
    Tag tag2 = newTag();
    Tag tag3 = newTag();
    tagDao.save(tag1);
    tagDao.save(tag2);
    tagDao.save(tag3);
    tagDao.delete(tag2);
    tagDao.delete(tag3);
    List<Tag> tags = tagDao.find(DetachedCriteria.forClass(Tag.class));
    Assert.assertEquals(1, tags.size());
    Assert.assertEquals(tag1, tags.get(0));

  }

  @Test
  public void findDeleted() throws Exception {
    Tag tag1 = newTag();
    Tag tag2 = newTag();
    Tag tag3 = newTag();
    tagDao.save(tag1);
    tagDao.save(tag2);
    tagDao.save(tag3);
    tagDao.delete(tag1);
    List<Tag> tags = tagDao.findDeleted(DetachedCriteria.forClass(Tag.class));
    Assert.assertEquals(1, tags.size());
    Assert.assertEquals(tag1, tags.get(0));
  }

  private Tag newTag() {
    Tag tag = new Tag();
    tag.setName(UUID.randomUUID().toString());
    return tag;
  }
}
