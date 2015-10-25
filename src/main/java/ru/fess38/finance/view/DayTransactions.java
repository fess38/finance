package ru.fess38.finance.view;

import java.util.Date;


public class DayTransactions extends AbstractTimePeriodTransactions<Date> {
    public DayTransactions(Date date) {
        this.date = date;
    }

    private final Date date;

    @Override
    public Date getTimePeriod() {
        return date;
    }
}
