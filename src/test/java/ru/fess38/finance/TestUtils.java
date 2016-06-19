package ru.fess38.finance;


import java.util.UUID;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import ru.fess38.finance.model.Account;
import ru.fess38.finance.model.AccountType;
import ru.fess38.finance.model.Currency;
import ru.fess38.finance.model.Rubric;
import ru.fess38.finance.model.User;


public class TestUtils {
	private static ClassPathXmlApplicationContext ctx;

	public static ClassPathXmlApplicationContext getTestContest() {
		if (ctx == null) {
			ctx = new ClassPathXmlApplicationContext();
			ctx.getEnvironment().setActiveProfiles("test");
			ctx.setConfigLocation("ru/fess38/finance/Config.xml");
			ctx.refresh();
		}
		return ctx;
	}

	public static Currency mockCurrency() {
		Currency currency = new Currency();
		currency.setName(UUID.randomUUID().toString());
		currency.setSymbol(UUID.randomUUID().toString().substring(0, 1));
		return currency;
	}

	public static Rubric mockRubric() {
		Rubric rubric = new Rubric();
		rubric.setName(UUID.randomUUID().toString());
		rubric.setIsIncome(false);
		return rubric;
	}

	public static Account mockAccount(Currency currency) {
		Account account = new Account();
		account.setName(UUID.randomUUID().toString());
		account.setCurrency(currency);
		account.setType(AccountType.DEFAULT);
		return account;
	}

	public static User mockUser() {
		User user = new User();
		user.setName(UUID.randomUUID().toString());
		return user;
	}
}
