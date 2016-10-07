package com.wendell.job;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TestSpringJob2 {
    
  @Scheduled(cron="0/5 * * * * ?")//每5秒钟执行一次  
  public void testCron(){  
//      System.out.println("5秒执行一次:TestTask2:"+Thread.currentThread());
		System.out.println(this.getClass().getName()+"::"+Thread.currentThread()); 
  }  
    
  @Scheduled(fixedRate=5000, initialDelay=1000)//第一次服务器启动一秒后执行，以后每过5秒执行一次，具体情况请查看Scheduled的方法  
  public void test() {  
//      System.out.println("延时1秒后5秒执行一次:TestTask2:"+Thread.currentThread());  
  }  
}
