package com.wendell.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wendell.dao.UserDao;
import com.wendell.model.User;
import com.wendell.service.UserService;
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;
	@Override
	public void saveUser(User user) {
		// TODO Auto-generated method stub
		System.out.println(user);
		userDao.save(user);
	}
	public UserServiceImpl() {
		// TODO Auto-generated constructor stub
		System.err.println("UserServiceImpl init");
	}
	public UserDao getUserDao() {
		return userDao;
	}
	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

}
