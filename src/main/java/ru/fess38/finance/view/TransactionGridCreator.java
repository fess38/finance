package ru.fess38.finance.view;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javafx.geometry.HPos;
import javafx.geometry.Orientation;
import javafx.scene.control.Label;
import javafx.scene.control.Separator;
import javafx.scene.layout.GridPane;
import ru.fess38.finance.model.Rubric;


public class TransactionGridCreator {
	public TransactionGridCreator(Transactions transactions) {
		this.transactions = transactions;
		this.yearMonth = transactions.getYearMonth();
		incomes = transactions.filter(Transactions.isIncome(true));
		expences = transactions.filter(Transactions.isIncome(false));

		dayOfMonthColumns = yearMonth.lengthOfMonth();
		amountOfColumns = notDayOfMonthColumns + dayOfMonthColumns;
		amountOfRows = notRubricRows + transactions.rubrics().size();
		expenceRowIndex = incomeRowIndex + incomes.rubrics().size() + incomeExpenceSpace;
	}

	private final GridPane gridPane = ViewFactory.transactionWindow();
	private final Transactions transactions;
	private final YearMonth yearMonth;
	private final Transactions incomes;
	private final Transactions expences;

	/** Рубрика, разделитель, разделитель, итого по рубрикам */
	private final int notDayOfMonthColumns = 4;
	private final int dayOfMonthColumns;
	/** Итого по дням доходов, разделитель */
	private final int incomeExpenceSpace = 2;
	/** Дни месяца, разделитель, итого по дням расходов */
	private final int notRubricRows = incomeExpenceSpace + 3;
	private final int dayOfMonthMinColumnIndex = 2;

	private final int amountOfRows;
	private final int amountOfColumns;

	private final int incomeRowIndex = 2;
	private final int expenceRowIndex;

	public GridPane create() {
		addHeader();
		addMonthDays();
		addHorizontalSeparators();
		addVerticalSeparators();
		addCells(incomes, incomeRowIndex);
		addCells(expences, expenceRowIndex);
		return gridPane;
	}

	private void addHeader() {
		String labelText = DateTimeFormatter.ofPattern("LLLL yyyy").format(yearMonth);
		addCell(new Label(labelText), 0, 0);
	}

	private void addMonthDays() {
		int rowIndex = 0;
		for (int dayOfMonth: transactions.daysOfMonth()) {
			int columnIndex = dayOfMonthColumnIndex(dayOfMonth);
			Label label = new Label(String.valueOf(dayOfMonth));
			addCell(label, columnIndex, rowIndex);
		}
	}

	private void addHorizontalSeparators() {
		gridPane.add(new Separator(), 0, 1, amountOfColumns, 1);
		// Если нет доходов или расходов, то разделитель не нужен
		if (!(incomes.isEmpty() || expences.isEmpty())) {
			int columnIndex = expenceRowIndex - 1;
			gridPane.add(new Separator(), 0, columnIndex, amountOfColumns, 1);
		}
	}

	private void addVerticalSeparators() {
		int leftSeparatorColumnIndex = 1;
		gridPane.add(new Separator(Orientation.VERTICAL), leftSeparatorColumnIndex, 0, 1, amountOfRows);
		int rightSeparatorColumnIndex = leftSeparatorColumnIndex + dayOfMonthColumns + 1;
		gridPane.add(new Separator(Orientation.VERTICAL), rightSeparatorColumnIndex, 0, 1, amountOfRows);
	}

	private void addCells(Transactions transactions, int minRowIndex) {
		addRubrics(transactions.rubrics(), minRowIndex);
		addRubricSummary(transactions, minRowIndex);
		addDayOfMonthSummary(transactions, minRowIndex);
		addAllSummary(transactions, minRowIndex);
		addBasicCells(transactions, minRowIndex);
	}

	private void addRubrics(List<Rubric> rubrics, int minRowIndex) {
		int columnIndex = 0;
		for (Rubric rubric: rubrics) {
			Label label = new Label(rubric.getName());
			int rowIndex = minRowIndex + rubrics.indexOf(rubric);
			addCell(label, columnIndex, rowIndex);
		}
	}

	private void addRubricSummary(Transactions transactions, int minRowIndex) {
		int columnIndex = amountOfColumns - 1;
		for (Rubric rubric: transactions.rubrics()) {
			int rowIndex = minRowIndex + transactions.rubrics().indexOf(rubric);
			Transactions rubricTransactions = transactions.filter(Transactions.rubric(rubric));
			addCell(rubricTransactions, columnIndex, rowIndex, CellStyle.BOLD);
		}
	}

	private void addDayOfMonthSummary(Transactions transactions, int minRowIndex) {
		for (int dayOfMonth: transactions.daysOfMonth()) {
			int columnIndex = dayOfMonthColumnIndex(dayOfMonth);
			int rowIndex = minRowIndex + transactions.rubrics().size();
			addCell(transactions.filter(Transactions.dayOfMonth(dayOfMonth)), columnIndex, rowIndex, CellStyle.BOLD);
		}
	}

	private void addAllSummary(Transactions transactions, int minRowIndex) {
		int columnIndex = amountOfColumns - 1;
		int rowIndex = minRowIndex + transactions.rubrics().size();
		addCell(transactions, columnIndex, rowIndex, CellStyle.BOLD);
	}

	private void addBasicCells(Transactions transactions, int minRowIndex) {
		for (int dayOfMonth: transactions.daysOfMonth()) {
			int columnIndex = dayOfMonthColumnIndex(dayOfMonth);
			for (Rubric rubric: transactions.rubrics()) {
				int rowIndex = minRowIndex + transactions.rubrics().indexOf(rubric);
				Transactions rubricTransactions = transactions.filter(rubric, dayOfMonth);
				addCell(rubricTransactions, columnIndex, rowIndex);
			}
		}
	}

	/** dayOfMonth начинается с 1, поэтому -1 */
	private int dayOfMonthColumnIndex(int dayOfMonth) {
		return dayOfMonthMinColumnIndex - 1 + dayOfMonth;
	}

	private void addCell(Label label, int columnIndex, int rowIndex, CellStyle cellStyle) {
		label.setStyle(cellStyle.value);
		gridPane.add(label, columnIndex, rowIndex);
		GridPane.setHalignment(label, HPos.CENTER);
	}

	private void addCell(Label label, int columnIndex, int rowIndex) {
		addCell(label, columnIndex, rowIndex, CellStyle.DEFAULT);
	}

	private void addCell(Transactions transactions, int columnIndex, int rowIndex, CellStyle cellStyle) {
		TransactionLabel label = new TransactionLabel(transactions);
		addCell(label, columnIndex, rowIndex, cellStyle);
	}

	private void addCell(Transactions transactions, int columnIndex, int rowIndex) {
		addCell(transactions, columnIndex, rowIndex, CellStyle.DEFAULT);
	}

	private enum CellStyle {
		DEFAULT(""),
		BOLD("-fx-font-weight: bold;");

		private CellStyle(String value) {
			this.value = value;
		}

		private String value;
	}
}
