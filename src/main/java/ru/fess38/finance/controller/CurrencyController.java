package ru.fess38.finance.controller;


import java.util.List;

import ru.fess38.finance.model.Currency;
import ru.fess38.finance.view.CurrencyView;


public class CurrencyController extends SimpleEntityController<Currency> {
	public CurrencyController(ControllersFactory factory) {
		super(factory);
		factory.setCurrencyController(this);
		setEntityView(new CurrencyView());
	}

	@Override
	protected List<Currency> findEntities() {
		return getCurrencyDao().find();
	}

	@Override
	protected void deleteEntity(Currency entity) {
		getCurrencyDao().delete(entity);
	}

	@Override
	protected Currency readEntityFromView() {
		CurrencyView currencyView = (CurrencyView) getEntityView();
		Currency currency = new Currency();
		currency.setName(getEntityView().getEntityAdderName().getText());
		currency.setSymbol(currencyView.getCurrencySymbolTextField().getText());
		return currency;
	}

	@Override
	protected void saveEntity(Currency entity) {
		getCurrencyDao().save(entity);
	}

	@Override
	protected void updateEntity(Currency entity) {
		getCurrencyDao().update(entity);
	}
}
