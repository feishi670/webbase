package com.wendell.web.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import com.wendell.util.log.Log4jUtil;

public class Log4jListener implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		String path=arg0.getServletContext().getInitParameter("log4j");
		Log4jUtil.setLog4jProperty(path);
	}

}
