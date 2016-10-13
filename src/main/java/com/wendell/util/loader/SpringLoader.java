package com.wendell.util.loader;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class SpringLoader {
	public static void main(String[] args) {
		String config="spring/*.xml";
		getApplicationContextWithClassPath(config);
	}
	/**
	 * 
	 * 获取当前web容器上绑定的ApplicationContext
	 * */
	public static WebApplicationContext  getCurrentWebApplicationContext() {
		// TODO Auto-generated method stub
		return ContextLoader.getCurrentWebApplicationContext();
	}
	/**
	 * @param filePath :文件路径:spring/SpringMVC-servlet.xml
	 * */
	public static BeanFactory getBeanFactoryWithClassPath(String filePath) {
		ClassPathResource resource = new ClassPathResource(filePath);
		return new XmlBeanFactory(resource);
	}
	public static BeanFactory getBeanFactoryWithFilePath(String filePath) {
		FileSystemResource resource = new FileSystemResource(SpringLoader.class.getProtectionDomain().getCodeSource().getLocation().getPath()+filePath);
		return new XmlBeanFactory(resource);
	}
	/**
	 * @param configPath :通配符路径:spring/*.xml
	 * */
	public static ApplicationContext getApplicationContextWithClassPath(String configPath) {
		ApplicationContext ac = new ClassPathXmlApplicationContext(configPath); 
		return ac;
	}
	public static ApplicationContext getApplicationContextWithFilePath(String configPath) {
		ApplicationContext ac =new FileSystemXmlApplicationContext(SpringLoader.class.getProtectionDomain().getCodeSource().getLocation().getPath()+configPath);
		return ac;
	}
	public static ApplicationContext getApplicationContextFromServer(ServletContext servletContext) {
//		return WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
		return WebApplicationContextUtils.getWebApplicationContext(servletContext);
	}

}
