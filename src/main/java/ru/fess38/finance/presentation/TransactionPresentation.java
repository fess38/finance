package ru.fess38.finance.presentation;

import ru.fess38.finance.model.Transaction;

import java.util.Date;
import java.util.List;

/**
 * Created by admin on 16.08.15.
 */
public abstract class TransactionPresentation {
    protected Date date;

    public final Date getDate() {
        return date;
    }

    public final void setDate(Date date) {
        this.date = date;
    }
}
