package ru.fess38.finance;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class Main {

	public static void main(String[] args) {
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("ru/fess38/finance/Config.xml");
		Main main = ctx.getBean("main", Main.class);
		main.test();
		ctx.close();
	}
	
	private BasicDataSource dataSource;
	
	@Transactional(propagation=Propagation.REQUIRES_NEW)
	public void test() {
		JdbcTemplate j = new JdbcTemplate(dataSource);
		System.out.println(j.queryForObject("SELECT datetime('now');", String.class));
	}

	public void setDataSource(BasicDataSource dataSource) {
		this.dataSource = dataSource;
	}

}
