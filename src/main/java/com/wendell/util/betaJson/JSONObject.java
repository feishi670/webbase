package com.wendell.util.betaJson;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class JSONObject {
	JSONObject() {
		// TODO Auto-generated constructor stub
	}
	JSONObject(Map obj) {
		// TODO Auto-generated constructor stub
		jsonMap=obj;
	}
	private String jsonStr;
	private Map<String,Object> jsonMap;
	
	public Set getKeys(){
		return jsonMap.keySet();
	}
	
	public int getInt(String key){
		return (int)jsonMap.get(key);
	}
	public Long getLong(String key){
		return (Long)jsonMap.get(key);
	}
	public Double getDouble(String key){
		return (Double)jsonMap.get(key);
	}
	public Float getFloat(String key){
		return (Float)jsonMap.get(key);
	}
	public Boolean getBoolean(String key){
		return (Boolean)jsonMap.get(key);
	}
	public String getString(String key){
		return (String)jsonMap.get(key);
	}
	public List getList(String key){
		return (List)jsonMap.get(key);
	}
	public Map getMap(String key){
		return (Map)jsonMap.get(key);
	}
	public JSONObject getJSONObject(String key){
		return new JSONObject((Map)jsonMap.get(key));
	}
	public JSONArray getJSONArray(String key){
		return new JSONArray((List)jsonMap.get(key));
	}
}
