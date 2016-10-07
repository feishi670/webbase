package com.wendell.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class TestJob extends QuartzJobBean{
	public void testJob() {
		System.out.println("execute:"+System.currentTimeMillis());
	}
	public static void main(String[] args) {
		
	}
	@Override
	protected void executeInternal(JobExecutionContext arg0) throws JobExecutionException {
		// TODO Auto-generated method stub
		System.out.println("定时任务测试"); 
	}
}
