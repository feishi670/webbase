package com.wendell.util.json;

import com.wendell.model.User;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.PropertyNameProcessor;
import net.sf.json.util.PropertyFilter;
import net.sf.json.xml.XMLSerializer;

public class JSONUtil {

	public static JSONObject fromObject(User user) {
		// TODO Auto-generated method stub
		return JSONObject.fromObject(user);
	}

	public static JSONObject fromObject(Object user, PropertyNameProcessor propertyNameProcessor) {
		// TODO Auto-generated method stub
		JsonConfig jsonConfig = new JsonConfig();
		if (user == null) {
			return null;
		}
		jsonConfig.registerJsonPropertyNameProcessor(user.getClass(), propertyNameProcessor);
		return JSONObject.fromObject(user, jsonConfig);
	}

	public static JSONObject fromObjectWithFilter(Object user, PropertyFilter propertyFilter) {
		// TODO Auto-generated method stub
		JsonConfig jsonConfig = new JsonConfig();
		if (user == null) {
			return null;
		}
		jsonConfig.setJsonPropertyFilter(propertyFilter);
		return JSONObject.fromObject(user, jsonConfig);
	}

	public static JSONObject fromObjectWithFilter(Object user, String[] fileds) {
		// TODO Auto-generated method stub
		JsonConfig jsonConfig = new JsonConfig();
		if (user == null) {
			return null;
		}
		jsonConfig.setExcludes(fileds);
		return JSONObject.fromObject(user, jsonConfig);
	}

	public static JSONObject FromObject(Object user) {
		// TODO Auto-generated method stub
		JsonConfig jsonConfig = new JsonConfig();
		if (user == null) {
			return null;
		}
		PropertyNameProcessor propertyNameProcessor = new PropertyNameProcessor() {
			@Override
			public String processPropertyName(Class target, String fieldName) {
				return fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);
			}
		};
		jsonConfig.registerJsonPropertyNameProcessor(user.getClass(), propertyNameProcessor);
		return JSONObject.fromObject(user, jsonConfig);
	}

	private static final String STR_JSON = "{\"name\":\"Michael\",\"address\":{\"city\":\"Suzou\",\"street\":\" Changjiang Road \",\"postcode\":100025},\"blog\":\"http://www.ij2ee.com\"}";

	public static String xml2JSON(String xml) {
		return new XMLSerializer().read(xml).toString();
	}

	public static String json2XML(String json) {
		JSONObject jobj = JSONObject.fromObject(json);
		String xml = new XMLSerializer().write(jobj);
		return xml;
	}
	public static void main(String[] args) {
		User user=new User();
		user.setName("asdasd");
		user.setNikeName("NikeName");
		JsonConfig jsonConfig = new JsonConfig();
        
		JSONObject json = JSONObject.fromObject(user, jsonConfig);
		System.out.println(json2XML(json.toString()));
	}
}
