package com.wendell.util.stream;

import java.io.Serializable;

public class MyClass implements Serializable{
	private static final long serialVersionUID = -3112513028021223065L;
	int i=10;
	String a="adas";
	public int getI() {
		return i;
	}
	public void setI(int i) {
		this.i = i;
	}
	public String getA() {
		return a;
	}
	public void setA(String a) {
		this.a = a;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	/**
	 * 读取后替换返回对象
	 * */
	private Object readResolve() {
		// TODO Auto-generated method stub
		return this;
	}
	/**
	 * 序列化前修改对象
	 * */
//	Object writeReplace(){
//		return a;
//	}
}