package ru.fess38.finance.presentation;

import java.util.List;

/**
 * Created by admin on 16.08.15.
 */
public class MonthTransactions extends TransactionPresentation {
    private List<DayTransactions> dayTransactions;

    public List<DayTransactions> getDayTransactions() {
        return dayTransactions;
    }

    public void setDayTransactions(List<DayTransactions> dayTransactions) {
        this.dayTransactions = dayTransactions;
    }
}
