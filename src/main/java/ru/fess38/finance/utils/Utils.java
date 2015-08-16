package ru.fess38.finance.utils;

import org.apache.commons.lang3.time.DateUtils;

import java.util.Date;

/**
 * Created by admin on 16.08.15.
 */
public class Utils {
    public static Date endOfMonth(Date date) {
        Date endOfMonth = DateUtils.addMonths(date, 1);
        return DateUtils.setDays(endOfMonth, 1);
    }
}
