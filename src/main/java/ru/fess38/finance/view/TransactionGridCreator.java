package ru.fess38.finance.view;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.function.Predicate;

import javafx.geometry.HPos;
import javafx.scene.control.Label;
import javafx.scene.control.Separator;
import javafx.scene.layout.GridPane;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.Transaction;


public class TransactionGridCreator {
	public TransactionGridCreator(Transactions transactions) {
		this.transactions = transactions;
		this.yearMonth = transactions.getYearMonth();
		init();
	}

	private final GridPane gridPane = ViewRegistry.transactionWindow();
	private final Transactions transactions;
	private final YearMonth yearMonth;
	private Transactions incomes;
	private Transactions expences;
	private int monthDaysRowIndex = 0;

	private int notDaysColumns = 2;
	private int dayOfMonthColumns;
	private int columnsAmount;

	private int incomeRowIndex = 2;
	private int incomeDayOfMonthSummaryRowIndex;
	private int incomeExpenceSpace = 3;
	private int expenceRowIndex;
	private int rubricSummaryColumnIndex;

	private void init() {
		incomes = transactions.filter(Transactions.isIncome(true));
		expences = transactions.filter(Transactions.isIncome(false));
		dayOfMonthColumns = yearMonth.lengthOfMonth();
		columnsAmount = notDaysColumns + dayOfMonthColumns;
		rubricSummaryColumnIndex = columnsAmount - 1;
		incomeDayOfMonthSummaryRowIndex = incomeRowIndex + incomes.rubrics().size();
		expenceRowIndex = incomeDayOfMonthSummaryRowIndex + incomeExpenceSpace;
	}

	public GridPane create() {
		addHeader();
		addMonthDays();
		addCells(incomes, incomeRowIndex);
		addCells(expences, expenceRowIndex);
		addSeparator();

		int separatorRowIndex = 1;
		int columnAmount = columnsAmount;
		for (int columnIndex = 0; columnIndex <= columnAmount; columnIndex++) {
			Separator separator = new Separator();
			gridPane.add(separator, columnIndex, separatorRowIndex);
		}
		return gridPane;
	}

	private void addHeader() {
		String labelText = DateTimeFormatter.ofPattern("LLLL yyyy").format(yearMonth);
		Label label = new Label(labelText);
		addBoldCell(label, 0, 0);
	}

	private void addMonthDays() {
		for (int dayOfMonth: transactions.daysOfMonth()) {
			int columnIndex = dayOfMonth;
			Label label = new Label(String.valueOf(dayOfMonth));
			addCell(label, columnIndex, monthDaysRowIndex);
		}
	}

	private void addCells(Transactions t, int startRowIndex) {
		addRubrics(t.rubrics(), startRowIndex);
		addRubricSummary(t, startRowIndex);
		addDayOfMonthSummary(t, startRowIndex + t.rubrics().size());
		for (int dayOfMonth: t.daysOfMonth()) {
			int columnIndex = dayOfMonth;
			for (Rubric rubric: t.rubrics()) {
				int rowIndex = startRowIndex + t.rubrics().indexOf(rubric);
				Transactions transactions = t.filter(rubric, dayOfMonth);
				addCell(transactions, Transactions.sumAmount(), columnIndex, rowIndex);
			}
		}
	}

	private void addRubrics(List<Rubric> rubrics, int startRowIndex) {
		int columnIndex = 0;
		for (Rubric rubric: rubrics) {
			Label label = new Label(rubric.getName());
			int rowIndex = startRowIndex + rubrics.indexOf(rubric);
			addCell(label, columnIndex, rowIndex);
		}
	}

	private void addRubricSummary(Transactions transactions, int startRowIndex) {
		for (Rubric rubric: transactions.rubrics()) {
			int rowIndex = startRowIndex + transactions.rubrics().indexOf(rubric);
			addBoldCell(transactions, Transactions.rubric(rubric), rubricSummaryColumnIndex, rowIndex);
		}
		int rowIndex = startRowIndex + transactions.rubrics().size();
		addBoldCell(transactions, Transactions.sumAmount(), rubricSummaryColumnIndex, rowIndex);
	}

	private void addDayOfMonthSummary(Transactions transactions, int rowIndex) {
		for (int dayOfMonth: transactions.daysOfMonth()) {
			int columnIndex = dayOfMonth;
			addBoldCell(transactions, Transactions.dayOfMonth(dayOfMonth), columnIndex, rowIndex);
		}
	}

	private void addSeparator() {
		int separatorRowIndex = incomeDayOfMonthSummaryRowIndex + 1;
		int columnAmount = columnsAmount;
		for (int columnIndex = 0; columnIndex <= columnAmount; columnIndex++) {
			Separator separator = new Separator();
			gridPane.add(separator, columnIndex, separatorRowIndex);
		}
	}

	private void addCell(Label label, int columnIndex, int rowIndex) {
		gridPane.add(label, columnIndex, rowIndex);
		GridPane.setHalignment(label, HPos.CENTER);
	}

	private void addBoldCell(Label label, int columnIndex, int rowIndex) {
		label.setStyle("-fx-font-weight: bold;");
		addCell(label, columnIndex, rowIndex);
	}

	private void addBoldCell(Transactions t, Predicate<Transaction> predicate, int columnIndex, int rowIndex) {
		TransactionLabel label = new TransactionLabel(String.valueOf(t.summary(predicate)), t);
		addBoldCell(label, columnIndex, rowIndex);
	}

	private void addCell(Transactions t, Predicate<Transaction> predicate, int columnIndex, int rowIndex) {
		TransactionLabel label = new TransactionLabel(String.valueOf(t.summary(predicate)), t);
		addCell(label, columnIndex, rowIndex);
	}
}
