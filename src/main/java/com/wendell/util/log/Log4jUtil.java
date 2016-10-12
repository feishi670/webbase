package com.wendell.util.log;

import java.io.FileInputStream;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

public class Log4jUtil {
	
	static{
		setLog4jProperty( "/log4j/log4j.properties");
	}
	
	public static void main(String[] args) throws Exception {
		setLog4jProperty( "/log4j/log4j.properties");
		Logger log = getLogger(Log4jUtil.class);
		log.info("info");
		log.error("error");
	}
	
	public static Logger getLogger(Class<?> class1) {
		return  Logger.getLogger(Log4jUtil.class);
	}

	public static boolean setLog4jProperty(String path){
		String currentPath=Log4jUtil.class.getProtectionDomain().getCodeSource().getLocation().getPath();
		String logFile =currentPath+path;
		try {
			Properties props = new Properties();
			FileInputStream in = new FileInputStream(logFile);
			props.load(in);
			in.close();
			PropertyConfigurator.configure(props);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			
		}
		return false;
	}
}
