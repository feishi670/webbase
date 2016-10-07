package com.wendell.job.task;

import java.util.Date;
import java.util.Timer;

public class Task {

	public static void main(String[] args) {
		Timer timer = new Timer();
		/**
		 * schedule循环执行以结束时间为节点计算间隔 scheduleAtFixedRate循环执行以开始时间为节点计算间隔
		 */
		// 指定时间，间隔毫秒数循环执行
		 timer.scheduleAtFixedRate(new TestTask(), new Date(), 2000);
		 timer.schedule(new TestTask(), new Date(), 2000);
		// 指定延时时间，间隔毫秒数循环执行
		 timer.scheduleAtFixedRate(new TestTask(), 2000, 2000);
		 timer.schedule(new TestTask(), 2000, 2000);
		// 制定时间执行
		 timer.schedule(new TestTask(), new Date());
		// 指定延时时间执行
		 timer.schedule(new TestTask(), 2000);
	}
}
