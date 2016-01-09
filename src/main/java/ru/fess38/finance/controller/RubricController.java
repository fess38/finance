package ru.fess38.finance.controller;


import java.util.List;

import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.view.RubricView;


public class RubricController extends SimpleEntityController<Rubric> {
	public RubricController(ControllersFactory factory) {
		super(factory);
		factory.setRubricController(this);
		setEntityView(new RubricView());
	}

	@Override
	protected List<Rubric> findEntities() {
		return getRubricDao().find();
	}

	@Override
	protected void deleteEntity(Rubric entity) {
		getRubricDao().delete(entity);
	}

	@Override
	protected Rubric readEntityFromView() {
		RubricView rubricView = (RubricView) getEntityView();
		Rubric rubric = new Rubric();
		rubric.setName(getEntityView().getEntityAdderName().getText());
		rubric.setIsIncome(RubricView.isIncomeToBoolean(rubricView.getIsIncomeComboBox().getValue()));
		return rubric;
	}

	@Override
	protected void saveEntity(Rubric entity) {
		getRubricDao().save(entity);
	}

	@Override
	protected void updateEntity(Rubric entity) {
		getRubricDao().update(entity);
	}
}
