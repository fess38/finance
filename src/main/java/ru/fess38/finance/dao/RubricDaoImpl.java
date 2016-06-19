package ru.fess38.finance.dao;


import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ru.fess38.finance.model.Rubric;


@Repository
@Transactional
public class RubricDaoImpl implements RubricDao {
	private SessionFactory sessionFactory;

	@Override
	public Long save(Rubric rubric) {
		return (Long) sessionFactory.getCurrentSession().save(rubric);
	}

	@Override
	public Rubric get(Long id) {
		return sessionFactory.getCurrentSession().get(Rubric.class, id);
	}

	@Override
	public void update(Rubric rubric) {
		sessionFactory.getCurrentSession().update(rubric);

	}

	@Override
	public void delete(Rubric rubric) {
		Rubric savedRubric = get(rubric.getId());
		savedRubric.setDeleted(true);
		update(savedRubric);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Rubric> find(DetachedCriteria detachedCriteria) {
		detachedCriteria.add(Restrictions.eq("isService", false))
			.add(Restrictions.eq("isDeleted", false));
		return detachedCriteria.getExecutableCriteria(sessionFactory.getCurrentSession()).list();
	}

	@Override
	public List<Rubric> findByType(boolean isIncome) {
		DetachedCriteria criteria = DetachedCriteria.forClass(Rubric.class)
			.add(Restrictions.eq("isIncome", isIncome));
		return find(criteria);
	}

	@Override
	public Rubric getTransferRubric() {
		DetachedCriteria criteria = DetachedCriteria.forClass(Rubric.class)
			.add(Restrictions.eq("isService", true));
		return find(criteria).get(0);
	}

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
}
