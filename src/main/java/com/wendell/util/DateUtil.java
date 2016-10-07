package com.wendell.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {
	/**
	 * G	Era 标志符	Text	AD
	 * y	年	Year	1996; 96
	 * M	年中的月份	Month	July; Jul; 07
	 * w	年中的周数	Number	27
	 * W	月份中的周数	Number	2
	 * D	年中的天数	Number	189
	 * d	月份中的天数	Number	10
	 * F	月份中的星期	Number	2
	 * E	星期中的天数	Text	Tuesday; Tue
	 * a	Am/pm 标记	Text	PM
	 * H	一天中的小时数（0-23）	Number	0
	 * k	一天中的小时数（1-24）	Number	24
	 * K	am/pm 中的小时数（0-11）	Number	0
	 * h	am/pm 中的小时数（1-12）	Number	12
	 * m	小时中的分钟数	Number	30
	 * s	分钟中的秒数	Number	55
	 * S	毫秒数	Number	978
	 * z	时区	General time zone	Pacific Standard Time; PST; GMT-08:00
	 * Z	时区	RFC 822 time zone	-0800
	 * 
	 * */
	public static final String DATE_FORMAT_COMMON="yyyy-MM-dd HH:mm:ss";
	public static final String DATE_FORMAT_COMMON_PAR="^\\d{4}\\-((0?\\d)|(1[012]))\\-(([012]?\\d)|(3[01])) (([01]?\\d)|(2[0-4])):(([0-5]?\\d)|(60)):(([0-5]?\\d)|(60))$";
	public static final String DATE_FORMAT_SHORT="yyyy-MM-dd";
	public static final String DATE_FORMAT_SHORT_PAR="^\\d{4}\\-((0?\\d)|(1[012]))\\-(([012]?\\d)|(3[01]))$";
	public static String toString(Date date) {
		if(date==null){
			return null;
		}
		return formatToString(date,DATE_FORMAT_COMMON);
	}
	public static String toString(Date date,String dateFormat) {
		if(date==null){
			return null;
		}
		return formatToString(date,dateFormat);
	}
	public static String toShortString(Date date) {
		if(date==null){
			return null;
		}
		return DateFormat.getDateInstance(DateFormat.SHORT).format(date);
	}
	public static String toFullString(Date date) {
		if(date==null){
			return null;
		}
		return DateFormat.getDateInstance(DateFormat.FULL).format(date);
	}
	private static String formatToString(Date date, String dateFormat) {
		// TODO Auto-generated method stub
		return (new SimpleDateFormat(dateFormat)).format(date);
	}
	
	public static Date parse(String date) {
		if(date==null){
			return null;
		}
		try {
			if(date.matches(DATE_FORMAT_COMMON_PAR)){
				return new SimpleDateFormat(DATE_FORMAT_COMMON).parse(date);
			}
			if(date.matches(DATE_FORMAT_SHORT_PAR)){
				return new SimpleDateFormat(DATE_FORMAT_SHORT).parse(date);
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;
	}
	public static Date parse(String date,String dateFormat) {
		if(date==null){
			return null;
		}
		try {
			return new SimpleDateFormat(dateFormat).parse(date);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;
	}

	public static Date addYears(Date date, int y) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int year = c.get(Calendar.YEAR);
		c.set(Calendar.YEAR, year + y);
		date.setTime(c.getTime().getTime());
		return date;
	}
	public static Date addMonth(Date date,int M) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int month = c.get(Calendar.MONTH);
		c.set(Calendar.MONTH, month + M);
		date.setTime(c.getTime().getTime());
		return date;
	}
	public static Date addDays(Date date,int d) {
		date.setTime(date.getTime()+24l*60*60*1000*d);
		return date;
	}
	public static Date addHours(Date date,int h) {
		date.setTime(date.getTime()+60l*60*1000*h);
		return date;
	}
	public static Date addMinutes(Date date,int m) {
		date.setTime(date.getTime()+60l*1000*m);
		return date;
	}
	public static Date addSeconds(Date date,int s) {
		date.setTime(date.getTime()+1000l*s);
		return date;
	}
	public static void main(String[] args) {
//		System.out.println(toString(new Date()));
//		System.out.println(toShortString(new Date()));
//		System.out.println(toFullString(new Date()));
//		String dateStr="2016-10-08 00:16:21";
//		System.out.println(dateStr.matches(DATE_FORMAT_COMMON_PAR));
//		System.out.println(toString(parse(dateStr)));
//		
//		Date  date=new Date();
//		date.setTime(date.getTime()+1000);
//		System.out.println(toString(new Date())); 
//		System.out.println(toString(date)); 
//		System.out.println(date.getTime());
	}
}
