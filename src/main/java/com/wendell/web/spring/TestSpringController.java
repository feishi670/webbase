package com.wendell.web.spring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestSpringController {
	@RequestMapping("test")
	public void test() {
		System.err.println("test");
	}
	
	
	public TestSpringController() {
		// TODO Auto-generated constructor stub
		System.err.println("init TestSpringController");
	}
}
