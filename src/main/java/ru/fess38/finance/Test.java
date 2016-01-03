package ru.fess38.finance;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javafx.application.Application;
import javafx.stage.Stage;


public class Test {
	public static void main(String[] args) throws Exception {
		System.out.println(DateTimeFormatter.ofPattern("LLLL yyyy").format(YearMonth.now()));
		
	}
}
