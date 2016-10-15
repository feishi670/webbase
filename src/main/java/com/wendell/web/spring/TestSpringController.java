package com.wendell.web.spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wendell.model.User;
import com.wendell.service.UserService;

@Controller
public class TestSpringController {
	@Autowired
	private UserService userService;
	
	@RequestMapping("test")
	public void test() {
		System.err.println("test");
		User user = new User();
		user.setName("aaa");
		user.setNikeName("gddfaaa");
		userService.saveUser(user);
	}
	
	
	public TestSpringController() {
		// TODO Auto-generated constructor stub
//		System.err.println("init TestSpringController");
	}


	public UserService getUserService() {
		return userService;
	}


	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
