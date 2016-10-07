package com.wendell.util.betaJson;

import java.util.List;
import java.util.Map;

public class JSONArray {
	JSONArray() {
		// TODO Auto-generated constructor stub
	}
	JSONArray(List obj) {
		// TODO Auto-generated constructor stub
		jsonList=obj;
	}
	private List jsonList;
	public int getInt(int key){
		return (int)jsonList.get(key);
	}
	public Long getLong(int key){
		return (Long)jsonList.get(key);
	}
	public Double getDouble(int key){
		return (Double)jsonList.get(key);
	}
	public Float getFloat(int key){
		return (Float)jsonList.get(key);
	}
	public Boolean getBoolean(int key){
		return (Boolean)jsonList.get(key);
	}
	public String getString(int key){
		return (String)jsonList.get(key);
	}
	public List getList(int key){
		return (List)jsonList.get(key);
	}
	public Map getMap(int key){
		return (Map)jsonList.get(key);
	}
	public JSONObject getJSONObject(int key){
		return new JSONObject((Map)jsonList.get(key));
	}
	public JSONArray getJSONArray(int key){
		return new JSONArray((List)jsonList.get(key));
	}
}
