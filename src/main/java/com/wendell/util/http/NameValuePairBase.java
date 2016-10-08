package com.wendell.util.http;

import org.apache.http.NameValuePair;

public class NameValuePairBase implements  NameValuePair{

	private String name;
	private String value;

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return this.name;
	}

	@Override
	public String getValue() {
		// TODO Auto-generated method stub
		return this.value;
	}
	public NameValuePairBase(String name,String value) {
		// TODO Auto-generated constructor stub
		this.name=name;
		this.value=value;
	}

}
