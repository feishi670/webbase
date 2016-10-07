package com.wendell.util.threadPool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;

public class ThreadPoolExecutorTest {
	/**
	 * 不预先创建，无限扩充，无资源时创建
	 * */
	public static void cachedThreadPoolTest() throws Exception {
		ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
		for (int i = 0; i < 100; i++) {
			Thread.sleep(1);
			cachedThreadPool.execute(new MyThread());
		}
	}
	/**
	 * 限制最大线程数，动态分配，无空闲线程时等待
	 * */
	public static void fixedThreadPoolTest() throws Exception {
		ExecutorService fixedThreadPool = Executors.newFixedThreadPool(20);
		for (int i = 0; i < 100; i++) {
			Thread.sleep(1);
			fixedThreadPool.execute(new MyThread());
		}
	}
	/**
	 * 预创建一定线程数，动态分配，无空闲线程时等待
	 * */
	public static void scheduledThreadPoolTest() throws Exception {
		ExecutorService scheduledThreadPool = Executors.newScheduledThreadPool(20);
		for (int i = 0; i < 100; i++) {
			Thread.sleep(1);
			scheduledThreadPool.execute(new MyThread());
		}
	}
	
	/**
	 * 单线程
	 * */
	public static void singleThreadPoolTest() throws Exception {
		ExecutorService singleThreadPool = Executors.newSingleThreadExecutor();
		for (int i = 0; i < 100; i++) {
			Thread.sleep(1);
			singleThreadPool.execute(new MyThread());
		}
	}
	

	
	
	
	
	public static void main(String[] args) throws Exception {
		singleThreadPoolTest();
	}
	static class MyThread implements Runnable{
		private static  Integer index=0;
		public void run() {
			synchronized(index){
				index++;
			}
			int index=MyThread.index;
			try {
				Thread.sleep(2);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			System.out.println(index + "::" + Thread.currentThread().getName());
		}
		public MyThread() {
			// TODO Auto-generated constructor stub

		}
	}

	
}
