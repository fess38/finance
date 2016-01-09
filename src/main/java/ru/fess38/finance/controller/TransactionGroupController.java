package ru.fess38.finance.controller;


import java.util.List;

import ru.fess38.finance.model.TransactionGroup;
import ru.fess38.finance.view.TransactionGroupView;


public class TransactionGroupController extends SimpleEntityController<TransactionGroup> {
	public TransactionGroupController(ControllersFactory factory) {
		super(factory);
		factory.setTransactionGroupController(this);
		setEntityView(new TransactionGroupView());
	}

	@Override
	protected List<TransactionGroup> findEntities() {
		return getTransactionGroupDao().find();
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
