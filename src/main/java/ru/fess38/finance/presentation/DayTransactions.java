package ru.fess38.finance.presentation;

import ru.fess38.finance.model.Rubric;

import java.util.List;

/**
 * Created by admin on 16.08.15.
 */
public class DayTransactions extends TransactionPresentation {
    private List<CellTransactions> cellTransactions;
    private List<Rubric> rubrics;

    public List<Rubric> getRubrics() {
        return rubrics;
    }

    public void setRubrics(List<Rubric> rubrics) {
        this.rubrics = rubrics;
    }

    public List<CellTransactions> getCellTransactions() {
        return cellTransactions;
    }

    public void setCellTransactions(List<CellTransactions> cellTransactions) {
        this.cellTransactions = cellTransactions;
    }
}
