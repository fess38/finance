package ru.fess38.finance;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ru.fess38.finance.db.DbConnection;
import ru.fess38.finance.db.IdGenerator;
import ru.fess38.finance.model.User;
import ru.fess38.finance.model.UserDaoImpl;

@Transactional
public class Main {

	public static void main(String[] args) {
		/*
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("ru/fess38/finance/Config.xml");
		Main main = ctx.getBean("main", Main.class);
		main.test();
		ctx.close();
		*/
		BasicDataSource dataSource = DbConnection.getInstance();
		IdGenerator id = new IdGenerator(dataSource);
		User user = new User();
		user.setId(id.getId());
		user.setName("kk");
		UserDaoImpl userDaoImpl = new UserDaoImpl(dataSource);
		userDaoImpl.createUser(user);
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
