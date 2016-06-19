package ru.fess38.finance.controller;


import java.util.List;

import org.hibernate.criterion.DetachedCriteria;

import ru.fess38.finance.model.TransactionGroup;
import ru.fess38.finance.view.TransactionGroupView;


public class TransactionGroupController extends SimpleEntityController<TransactionGroup> {
	public TransactionGroupController() {
		setEntityView(new TransactionGroupView());
	}

	@Override
	protected List<TransactionGroup> findEntities() {
		return getTransactionGroupDao().find(DetachedCriteria.forClass(TransactionGroup.class));
	}

	@Override
	protected void deleteEntity(TransactionGroup entity) {
		getTransactionGroupDao().delete(entity);
	}

	@Override
	protected TransactionGroup readEntityFromView() {
		TransactionGroup transactionGroup = new TransactionGroup();
		transactionGroup.setName(getEntityView().getEntityAdderName().getText());
		return transactionGroup;
	}

	@Override
	protected void saveEntity(TransactionGroup entity) {
		getTransactionGroupDao().save(entity);
	}

	@Override
	protected void updateEntity(TransactionGroup entity) {
		getTransactionGroupDao().update(entity);
	}
}
