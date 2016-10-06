package com.wendell.cxq.baseWeb;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.wendell.cxq.util.RedisClient;
import com.whalin.MemCached.MemCachedClient;
import com.whalin.MemCached.SockIOPool;

public class Test {
	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		return super.equals(obj);
	}
	
	public static void testMemcached(){
		String[] servers = { "127.0.0.1:11211" };  
		   
	       SockIOPool pool = SockIOPool.getInstance();  
	   
	       pool.setServers(servers);  
	   
	       pool.setFailover(true);  
	   
	       pool.setInitConn(10);  
	   
	       pool.setMinConn(5);  
	   
	       pool.setMaxConn(250);  
	   
	       pool.setMaintSleep(30);  
	   
	       pool.setNagle(false);  
	   
	       pool.setSocketTO(3000);  
	   
	       pool.setAliveCheck(true);  
	   
	       pool.initialize();  
	   
	   
	   
	       /**  
	   
	        * 建立MemcachedClient实例  
	   
	        * */  
	   
	       MemCachedClient memCachedClient = new MemCachedClient();  
	   
	       for (int i = 0; i < 1000; i++) {  
	   
	           /**  
	   
	            * 将对象加入到memcached缓存  
	   
	            * */  
	   
	           boolean success = memCachedClient.set("" + i, "Hello!");  
	   
	           /**  
	   
	            * 从memcached缓存中按key值取对象  
	   
	            * */  
	   
	           String result = (String) memCachedClient.get("" + i);  
	   
	           System.out.println(String.format("set( %d ): %s", i, success));  
	   
	           System.out.println(String.format("get( %d ): %s", i, result));  
	   
	       }  
	}
	public static void testRedis(){
		new RedisClient().show(); 
		RedisClient redis = new RedisClient();
		 
	       for (int i = 0; i < 1000; i++) {  
	   
	           /**  
	   
	            * 将对象加入到memcached缓存  
	   
	            * */  
	   
	           boolean success = redis.set("" + i, "Hello!");  
	   
	           /**  
	   
	            * 从memcached缓存中按key值取对象  
	   
	            * */  
	   
	           String result = (String) redis.get("" + i);  
	   
	           System.out.println(String.format("set( %d ): %s", i, success));  
	   
	           System.out.println(String.format("get( %d ): %s", i, result));  
	           if(result!=null){
	        	   redis.del("" + i);
	           }
	   
	       }  
	}
	public static void testMongoDB(){
        MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
        
        // 连接到数据库
        MongoDatabase mongoDatabase = mongoClient.getDatabase("mycol"); 
        
	}
	public static void testMutiParam(String name,String...params){
		System.out.println(params.length);
		for (int i = 0; i < params.length; i++) {
			System.out.println(params[i]);
		}
		
	}
	public static void main(String[] args) {
		testMutiParam("dssd","a","b","c");
		
	}
}
