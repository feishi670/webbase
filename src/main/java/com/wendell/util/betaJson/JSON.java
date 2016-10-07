package com.wendell.util.betaJson;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;


public class JSON {
	
	private static String toObjJson(Object obj){
		Class<? extends Object> classz = obj.getClass();
		StringBuffer sb=new StringBuffer();
		sb.append("{");
		Method[] ms = classz.getMethods();
		Field[] fs =classz.getDeclaredFields();
		Map<String, Method> msMap =new HashMap<String, Method>();
		int i=0;
		for (Method m:ms) {
			if(m.getParameterTypes().length==0&&m.getName().startsWith("get")){
				msMap.put(m.getName(), m);
			}
		}
		for (Field f:fs) {
			if(f.getModifiers()==1){
				try {
					sb.append(i++>0?",":"").append("\"").append(f.getName()).append("\":")
					.append(toJson(f.get(obj)));
				} catch (Exception e1) {
					e1.printStackTrace();
				}
				continue;
			}
			Method m=msMap.get(getMethodNameByFileName(f.getName()));
			if(m==null){
				continue;
			}
			try {
				sb.append(i++>0?",":"").append("\"").append(f.getName()).append("\":")
					.append(toJson(m.invoke(obj, new Object[]{})));
			}  catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		sb.append("}");
		return sb.toString();
	}
	private static String getMethodNameByFileName(String fileName){
		char[] array = fileName.toCharArray();
		array[0] = (char) ((array[0]>='a'&&array[0]<='z')?(array[0]-32):array[0]);
		return "get"+String.valueOf(array);
	}
	
	public static String toJson(Object obj){
		if(obj==null){
			return (String) obj;
		}
		if(obj instanceof Number|| obj instanceof Boolean){
			return obj.toString();
		}
		if(obj instanceof String){
			return "\""+((String)obj).replace("\\", "\\\\").replace("\"", "\\\"")+"\"";
		}
		if(obj instanceof Map){
			return toMapJson((Map) obj);
		}
		if(obj instanceof Collection){
			return toCollectionJson((Collection) obj);
		}
		if(obj instanceof Object[]){
			return toArrayJson((Object[]) obj);
		}
		
		return toObjJson(obj);
	}
	private static String toMapJson(Map map){

		StringBuffer sb=new StringBuffer();
		sb.append("{");
		int i=0;
		for ( Object key:map.keySet()) {
			sb.append(i++>0?",":"").append("\"").append(key).append("\":")
				.append(toJson(map.get(key)));
		}
		sb.append("}");
		return sb.toString();
	}
	private static String toCollectionJson(Collection collection){

		StringBuffer sb=new StringBuffer();
		sb.append("[");
		Iterator it = collection.iterator();
		int i=0;
		while (it.hasNext()) {
			Object obj = it.next();
			sb.append(i++>0?",":"").append(toJson(obj));
		}
		sb.append("]");
		
		return sb.toString();
	}
	private static String toArrayJson(Object[] objs){

		StringBuffer sb=new StringBuffer();
		sb.append("[");
		for (int i = 0; i < objs.length; i++) {
			sb.append(i>0?",":"").append(toJson(objs[i]));
		}
		sb.append("]");
		
		return sb.toString();
	}
	public static JSONObject toJSONObject(String jsonStr){
		return JSONParse.toJSONObject(jsonStr);
	}
	public static JSONArray toJSONArray(String jsonStr){
		return JSONParse.toJSONArray(jsonStr);
	}
}
