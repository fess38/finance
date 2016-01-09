package ru.fess38.finance.view;


import ru.fess38.finance.model.TransactionGroup;


public class TransactionGroupView extends SimpleEntityView<TransactionGroup> {
	@Override
	protected void initTableView() {
		super.initTableView();
		getTab().setText("Группы транзакций");
	}
}
