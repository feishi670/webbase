package com.wendell.dao.impl;

import com.wendell.dao.BaseDao;
import com.wendell.dao.UserDao;
import com.wendell.model.User;

public class UserDaoImpl extends BaseDao implements UserDao{

	@Override
	public void save(User user) {
		// TODO Auto-generated method stub
		this.getHibernateTemplate().saveOrUpdate(user);
	}

}
