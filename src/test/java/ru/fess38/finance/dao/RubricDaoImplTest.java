package ru.fess38.finance.dao;


import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import ru.fess38.finance.TestUtils;
import ru.fess38.finance.model.Rubric;


public class RubricDaoImplTest {
	private static ClassPathXmlApplicationContext ctx;
	private static RubricDao rubricDao;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
		ctx = TestUtils.getTestContest();
		rubricDao = ctx.getBean(RubricDao.class);
	}

	@Test
	public void testSaveGet() {
		Rubric expectedRubric = TestUtils.mockRubric();
		Long id = rubricDao.save(expectedRubric);
		Rubric actualRubric = rubricDao.get(id);
		Assert.assertEquals(expectedRubric, actualRubric);
	}

	@Test
	public void testUpdate() {
		Rubric expectedRubric = TestUtils.mockRubric();
		rubricDao.save(expectedRubric);
		expectedRubric.setName("Досуг");
		rubricDao.update(expectedRubric);
		Rubric actualRubric = rubricDao.get(expectedRubric.getId());
		Assert.assertEquals(expectedRubric, actualRubric);
	}

	@Test
	public void testDelete() {
		Rubric rubric = TestUtils.mockRubric();
		rubricDao.save(rubric);
		rubricDao.delete(rubric);
		Rubric actualRubric = rubricDao.get(rubric.getId());
		Assert.assertTrue(actualRubric.isDeleted());
	}

	@Test
	public void testFind() {
		Rubric rubric1 = TestUtils.mockRubric();
		Rubric rubric2 = TestUtils.mockRubric();
		rubricDao.save(rubric1);
		rubricDao.save(rubric2);
		List<Rubric> expectedRubrics = Arrays.asList(rubric1, rubric2);
		List<Rubric> actualRubrics = rubricDao.find(DetachedCriteria.forClass(Rubric.class));
		actualRubrics.sort(Comparator.comparing(Rubric::getId));
		Assert.assertEquals(expectedRubrics, actualRubrics);
	}

	@Test
	public void testGetTransferRubric() {
		Assert.assertNotNull(rubricDao.getTransferRubric());
	}

}
