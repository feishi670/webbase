package com.wendell.util.betaJson;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class JSONParse {
	private static class TempObj{
		public char[] chs;
		public int index;
	}

	private static Map toMap(TempObj o) throws Exception{
		Map result=new HashMap();
		String key=null;
		Object value=null;
		o.index++;
		for (; o.index < o.chs.length; o.index++) {
			if(skipSpace(o)){
				continue;
			}
			if(key==null){
				if(o.chs[o.index]=='"'){
					key=getStrValue(o);
					if(o.chs[o.index+1]==':'){
						o.index++;
					}else{
						System.out.println(o.chs[o.index+1]);
					}
				}
			}else{
				if(o.chs[o.index]=='"'){
					value=getStrValue(o);
					result.put(key, value);
					key=null;
					value=null;
				}else if(o.chs[o.index]=='{'){
					value=toMap(o);
					result.put(key, value);
					key=null;
					value=null;
				}else if(o.chs[o.index]=='['){
					value=toList(o);
					result.put(key, value);
					key=null;
					value=null;
				}else if(o.chs[o.index]>=48&&o.chs[o.index]<=57){
					value=toNumber(o);
					result.put(key, value);
					key=null;
					value=null;
				}
			}
			if(o.chs[o.index]=='}'){
				break;
			}
		}
		o.index++;
		skipSpaces(o);
		return result;
	}
	private static Number toNumber(TempObj o) {
		// TODO Auto-generated method stub
		String value="";
		int flag=0;
		for (; o.index < o.chs.length; o.index++) {
			if(o.chs[o.index]>=48&&o.chs[o.index]<=57){
				value+=o.chs[o.index];
				continue;
			}
			if(o.chs[o.index]=='.'){
				flag++;
				value+=o.chs[o.index];
				continue;
			}
			break;
		}
		skipSpaces(o);
		if(flag==0){
			return Long.parseLong(value);
		}else{
			return Double.parseDouble(value);
		}
	}
	private static String getStrValue(TempObj o) {
		// TODO Auto-generated method stub
		String value="";
		o.index++;
		for (; o.index < o.chs.length; o.index++) {
			if(o.chs[o.index]=='\\'){
				value+=o.chs[o.index++];
				value+=o.chs[o.index];
			}
			if(o.chs[o.index]!='"'){
				value+=o.chs[o.index];
			}else{
				break;
			}
		}
		skipSpaces(o);
		return value;
	}
	private static void skipSpaces(TempObj o) {
		// TODO Auto-generated method stub
		for (; o.index < o.chs.length; o.index++) {
			if(!skipSpace(o)){
				break;
			}
		}
	}
	private static List toList(TempObj o) throws Exception {
		// TODO Auto-generated method stub
		List result=new ArrayList();
		Object value=null;
		o.index++;
		for (; o.index < o.chs.length; o.index++) {
			if(skipSpace(o)){
				continue;
			};
			if(o.chs[o.index]=='"'){
				value=getStrValue(o);
				result.add(value);
			}else if(o.chs[o.index]=='{'){
				value=toMap(o);
				result.add( value);
			}else if(o.chs[o.index]=='['){
				value=toList(o);
				result.add(value);
			}else if(o.chs[o.index]>=48&&o.chs[o.index]<=57){
				value=toNumber(o);
				result.add( value);
			}
			if(o.chs[o.index]==']'){
				break;
			}
			if(value!=null){
				if(o.chs[o.index]==','){
					value=null;
					continue;
				}else{
					System.err.println(" not json list");
				}
			}
		}
		o.index++;
		skipSpaces(o);
		return result;
	}
	private static boolean skipSpace(TempObj o) {
		// TODO Auto-generated method stub
		if(o.chs[o.index]=='\\'&&(o.chs[o.index+1]=='r'||o.chs[o.index+1]=='n'||o.chs[o.index+1]=='t')){
			o.index++;
			return true;
		}
		if(o.chs[o.index]==' '||o.chs[o.index]=='\n'||o.chs[o.index]=='\r'||o.chs[o.index]=='\t'){
			return true;
		}
		return false;
	}
	private static Object fromJson(String jsonStr){
		TempObj o=new TempObj();
		char[] chs=jsonStr.trim().toCharArray();
		o.chs=chs;
		Object result=null;
		if(o.chs[o.index]=='{'){
			try {
				result=toMap(o);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}else if(o.chs[o.index]=='['){
			try {
				result=toList(o);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		
		return result;
	}
	private static Object toClass(Object obj,Class classz){
		if(obj instanceof Map){
			transMapToClass((Map)obj,classz);
		}
		if(obj instanceof List){
			transListToClass((List)obj,classz);
		}
		return obj;
	}
	private static void transListToClass(List obj, Class classz) {
		// TODO Auto-generated method stub
		
	}
	private static void transMapToClass(Map obj, Class classz) {
		// TODO Auto-generated method stub
		if(isImplements(classz,Map.class)){
			
		}
		
	}
	private static boolean isImplements(Class classz, Class interfacez) {
		// TODO Auto-generated method stub
		Class[] classes = classz.getInterfaces();
		for (int i = 0; i < classes.length; i++) {
			if(interfacez==classes[i]){
				return true;
			}
		}
		return false;
	}
	public static void main(String[] args) {
		System.out.println(isImplements(HashMap.class,ArrayList.class));
	}
	public static JSONObject toJSONObject(String jsonStr){
		Object obj=fromJson(jsonStr);
		if(obj instanceof Map){
			return new JSONObject((Map)obj);
		}
		return null;
	}
	public static JSONArray toJSONArray(String jsonStr){
		Object obj=fromJson(jsonStr);
		if(obj instanceof List){
			return new JSONArray((List)obj);
		}
		return null;
	}
}
