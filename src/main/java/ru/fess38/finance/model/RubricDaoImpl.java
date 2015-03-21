package ru.fess38.finance.model;

import org.apache.commons.dbcp2.BasicDataSource;

public class RubricDaoImpl extends EntityDaoImpl implements RubricDao {
	public RubricDaoImpl(BasicDataSource dataSource) {
		super(dataSource);
	}

	@Override
	public void createRubric(Rubric rubric) {
		jdbcTemplate.update("INSERT INTO Rubric(id, name, isIncome)"
				+ " VALUES (?, ?, ?)", new Object[] {rubric.getId(),
						rubric.getName(), rubric.getIsIncome()});
	}

	@Override
	public void deleteRubric(Rubric rubric) {
		jdbcTemplate.update("UPDATE Rubric SET IsDeleted = 1"
				+ " WHERE id = ?", new Object[] {rubric.getId()});
	}

	@Override
	public void updateRubricName(Rubric rubric) {
		jdbcTemplate.update("UPDATE Rubric SET name = ? WHERE id = ?",
				new Object[] {rubric.getName(), rubric.getId()});
	}

	@Override
	public void updateRubricIsIncome(Rubric rubric) {
		jdbcTemplate.update("UPDATE Rubric SET isIncome = ? WHERE id = ?",
				new Object[] {rubric.getIsIncome(), rubric.getId()});
	}
}
