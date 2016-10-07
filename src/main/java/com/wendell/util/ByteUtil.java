package com.wendell.util;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class ByteUtil {
private static String code64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+=";
private static String code32="ABCDEFGHIJKLMNOPQRSTUVWXYZ012345";
private static String code16="0123456789ABCDEF";
public static String encode64(String str){
	return encode(str,code64);
}
public static String decode64(String str){
	return decode(str,code64);
}
public static String encode64(String str,String pwd){
	return encode(str,code64,pwd);
}
public static String decode64(String str,String pwd){
	return decode(str,code64,pwd);
}
public static String encodeByte64(byte[] bytes){
	return encodeFromByets(bytes,code64);
}
public static byte[] decodeByte64(String str){
	return decodeToBytes(str,code64);
}
public static String encodeByte64(byte[] bytes,String pwd){
	return encodeFromByets(bytes,code64,pwd);
}
public static byte[] decodeByte64(String str,String pwd){
	return decodeToBytes(str,code64,pwd);
}
public static String encode32(String str){
	return encode(str,code32);
}
public static String decode32(String str){
	return decode(str,code32);
}
public static String encode32(String str,String pwd){
	return encode(str,code32,pwd);
}
public static String decode32(String str,String pwd){
	return decode(str,code32,pwd);
}
public static String encodeByte32(byte[] bytes){
	return encodeFromByets(bytes,code32);
}
public static byte[] decodeByte32(String str){
	return decodeToBytes(str,code32);
}
public static String encodeByte32(byte[] bytes,String pwd){
	return encodeFromByets(bytes,code32,pwd);
}
public static byte[] decodeByte32(String str,String pwd){
	return decodeToBytes(str,code32,pwd);
}
public static String encode16(String str){
	return encode(str,code16);
}
public static String decode16(String str){
	return decode(str,code16);
}
public static String encode16(String str,String pwd){
	return encode(str,code16,pwd);
}
public static String decode16(String str,String pwd){
	return decode(str,code16,pwd);
}
public static String encodeByte16(byte[] bytes){
	return encodeFromByets(bytes,code16);
}
public static byte[] decodeByte16(String str){
	return decodeToBytes(str,code16);
}
public static String encodeByte16(byte[] bytes,String pwd){
	return encodeFromByets(bytes,code16,pwd);
}
public static byte[] decodeByte16(String str,String pwd){
	return decodeToBytes(str,code16,pwd);
}
private static int byteToInt(byte b){
	return (b>0?b:(256+b));
}
public static String encode(String inStr,String code){
	return encode(inStr,code,null);
}
public static String encodeFromByets(byte[] bytes,String code){
	return encodeFromByets(bytes,code,null);
}
public static String encode(String inStr,String code,String pwd){
	byte[] bytes = null;
	try {
		bytes = inStr.getBytes("UTF-8");
	} catch (UnsupportedEncodingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		bytes = inStr.getBytes();
	}
	return encodeFromByets(bytes,code,pwd);
}
public static String encodeFromByets(byte[] bytes,String code,String pwd){
	if(code==null){
		code=code64;
	}
	try {
		code=getEncodeCode(pwd, code);
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	String result="";
	int index=0;
	int length=(int) (Math.log(code.length()+1)/Math.log(2));
	int currentValue=0;
	int currentLength=0;
	while (index<=bytes.length) {
		if(currentLength<length&&index<bytes.length){
			byte b = bytes[index];
			currentValue=currentValue*256+(b>=0?b:(256+b));
			index++;
			currentLength+=8;
			continue;
		}
		if(index==bytes.length){
			if(currentLength==0){
				break;
			}
			if(currentLength-length<0){
				int plus=(int) Math.pow(2, length-currentLength);
				result+=code.charAt(currentValue*plus);
				break;
			}
		}
		int reduce=(int) Math.pow(2, currentLength-length);
		currentLength=currentLength-length;
		result+=code.charAt(currentValue/reduce);
		currentValue=currentValue%reduce;
	}
	return result;
}
public static String decode(String formatStr,String code){
	return decode(formatStr,code,null);
}
public static  byte[] decodeToBytes(String formatStr,String code){
	return decodeToBytes(formatStr,code,null);
}
public static String decode(String formatStr,String code,String pwd){
	return new String(decodeToBytes(formatStr,code,pwd));
}
public static byte[] decodeToBytes(String formatStr,String code,String pwd){
	if(code==null){
		code=code64;
	}
	try {
		code=getEncodeCode(pwd, code);
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	List<Byte> byteList=new ArrayList<Byte>();
	int index=0;
	int length=(int) (Math.log(code.length()+1)/Math.log(2));
	int plus=(int) Math.pow(2, length);
	int currentValue=0;
	int currentLength=0;
	while (index<=formatStr.length()) {
		if(currentLength<8&&index<formatStr.length()){
			currentValue=currentValue*plus+code.indexOf(formatStr.charAt(index));
			currentLength+=length;
			index++;
			continue;
		}
		
		int reduce=(int) Math.pow(2, currentLength-8);
		currentLength=currentLength-8;
		byteList.add((byte) (currentValue/reduce));
		currentValue=currentValue%reduce;
		if(index==formatStr.length()){
			index++;
		}
	}
	byte[] bytes = new byte[byteList.size()];
	for (int i = 0; i < bytes.length; i++) {
		bytes[i]=byteList.get(i);
	}
	return bytes;
}
public static String  getEncodeCode(String pwd,String code) throws Exception{
	if(code==null){
		code=code64;
	}
	if(pwd==null){
		return code;
	}
	byte[] bytes=pwd.getBytes("UTF-8");
	int length=code.length();
	int move=0;
	int i=0;
	int step=0;
	int currentValue=0;
	while(i<=bytes.length){
		if(currentValue==0){
			if(i==bytes.length){
				break;
			}
			currentValue=byteToInt(bytes[i]);
			i++;
		}
		move=currentValue%length;
		String end=code.substring(step);
		code=code.substring(0,step)+end.substring(move)+end.substring(0,move);
		currentValue=(int)(currentValue/length);
		step++;
		length--;
		if(length<=2){
			break;
		}
	}
	return code;
}

public static void main(String[] args) throws Exception {
//	System.out.println(decode64(encode64("sad453￥……&￥%￥￥#asd")));
//	System.out.println(encode64("ewffsasgs放到h55"));
//	System.out.println(decode(encode("sadasgh5",code64),code64));
//	System.out.println(Math.pow(2, 2));
//	byte[] bs = "中".getBytes("UTF-8");
//	int num=0;
//	for (int i = 0; i < bs.length; i++) {
//		Integer n = (bs[i]>0?bs[i]:(256+bs[i]));
//		System.out.println(Integer.toHexString(n));
//		num=num*256+n;
//	}
//	System.out.println(bs.length);
//	System.out.println(num);
//	System.out.println((char)(37));
	System.out.println(encode64("getEncodeCode", "asa"));
	String sessionId="C04440EF27B0C7B33B694AC3FF82DD46";
	String encodeSessionId=encodeByte64(decodeByte16(sessionId,"tvreume"),"tvume");
	System.out.println(sessionId);
	System.out.println(encodeSessionId);
	System.out.println(encodeByte16(decodeByte64(encodeSessionId,"tvume"),"tvreume"));
}
}
