package ru.fess38.finance.model;

public interface RubricDao {
	public void createRubric(Rubric rubric);
	public void deleteRubric(Rubric rubric);
	public void updateRubricName(Rubric rubric);
	public void updateRubricIsIncome(Rubric rubric);
}
