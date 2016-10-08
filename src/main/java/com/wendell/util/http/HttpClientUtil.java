package com.wendell.util.http;

import java.io.InputStream;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.rmi.ssl.SslRMIClientSocketFactory;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;

public class HttpClientUtil {
	private static RequestConfig commonRequestConfig=null;
	private static SSLConnectionSocketFactory socketFactory=null;
	private static PoolingHttpClientConnectionManager connectionManager=null;
	
	static{
		//启用标准的cookie策略
		initConfig();
		try {
			enableSsl();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		initConnectionManager();
	}
	private static void initConfig(){
		commonRequestConfig = RequestConfig.custom().setCookieSpec(CookieSpecs.STANDARD_STRICT).build();
	}
	private static void initConnectionManager() {
		// TODO Auto-generated method stub
		Registry<ConnectionSocketFactory> socketFactoryRegistry =null;
		
		if(socketFactory!=null){
			socketFactoryRegistry=RegistryBuilder.<ConnectionSocketFactory>create()
					.register("http", PlainConnectionSocketFactory.INSTANCE)
					.register("https",socketFactory).build();
		}else{
			socketFactoryRegistry=RegistryBuilder.<ConnectionSocketFactory>create()
					.register("http", PlainConnectionSocketFactory.INSTANCE).build();
		}
		connectionManager = new PoolingHttpClientConnectionManager(socketFactoryRegistry);
	}
	private static void enableSsl() throws Exception{
		SSLContext content=SSLContext.getInstance("TLS");
		TrustManager manager=new X509TrustManager() {
			public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
			}
			public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
			}
			public X509Certificate[] getAcceptedIssuers() {
				return null;
			}
		};
		content.init(null, new TrustManager[]{manager} , null);
		socketFactory=new SSLConnectionSocketFactory(content, NoopHostnameVerifier.INSTANCE);
	}
	public static void main(String[] args) throws Exception {
		 String result = get("https://www.baidu.com") ;
		 System.out.println(result);
	}
	
	
	public static String get(String url) throws Exception{
		return get(url,null,null,null);
	}
	public static String get(String url,Map<String,String> params) throws Exception{
		return get(url,toNameValueList(params),null,null);
	}
	private static List<NameValuePair> toNameValueList(Map<String, String> params) {
		// TODO Auto-generated method stub
		if(params==null||params.size()==0){
			return null;
		}
		List<NameValuePair> list=new ArrayList<>();
		for (Entry<String, String> entry:params.entrySet()) {
			list.add(new NameValuePairBase(entry.getKey(), entry.getValue()));
		}
		return list;
	}

	public static String get(String url,List<NameValuePair> values,String cookie,String referer) throws Exception{
		CloseableHttpClient httpClient =getDefaultRequest();
		HttpGet httpGet=new HttpGet(url);
		if(cookie!=null ){
			httpGet.setHeader("Cookie", cookie);
		}
		if(referer!=null ){
			httpGet.setHeader("Referer", referer);
		}
		try {
			CloseableHttpResponse response = httpClient.execute(httpGet);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {  
				if(response.getEntity()==null){
					return null;
				}
				String result = EntityUtils.toString(response.getEntity());  
				return result;
			}  
			
		} catch (Exception e) {
			throw e;
		}finally {
			httpClient.close();
		}
		return null;
	}
	public static String post(String url) throws Exception{
		return post(url,null,null,null,null);
	}
	public static String post(String url,Map<String,String> params) throws Exception{
		return post(url,toNameValueList(params),null,null,null);
	}
	public static String post(String url,String content) throws Exception{
		return post(url,null,content,null,null);
	}
	public static String post(String url,List<NameValuePair> values,String content,String cookie,String referer) throws Exception{
		CloseableHttpClient httpClient =getDefaultRequest();
		HttpPost post=new HttpPost(url);
		if(cookie!=null ){
			post.setHeader("Cookie", cookie);
		}
		if(referer!=null ){
			post.setHeader("Referer", referer);
		}
		if(values!=null){
			HttpEntity entity = new UrlEncodedFormEntity(values, Consts.UTF_8);
			post.setEntity(entity);
		}
		if(content!=null){
			HttpEntity entity =new StringEntity(content,Consts.UTF_8);
			post.setEntity(entity);
		}
		
		try {
			CloseableHttpResponse response = httpClient.execute(post);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {  
				if(response.getEntity()==null){
					return null;
				}
				String result = EntityUtils.toString(response.getEntity());  
				return result;
			}  
			
		} catch (Exception e) {
			throw e;
		}finally {
			httpClient.close();
		}
		return null;
	}
	
	
    private static CloseableHttpClient getDefaultRequest() {
		if(connectionManager==null){
			return HttpClients.custom().setDefaultRequestConfig(commonRequestConfig).build();
		}else{
			return  HttpClients.custom().setConnectionManager(connectionManager).setDefaultRequestConfig(commonRequestConfig).build();
		}
	}
    public static CloseableHttpClient getRequest(RequestConfig config) {
    	return HttpClients.custom().setDefaultRequestConfig(config).build();
    }
	/** 
     * 发送 get请求 
     * @throws IOException 
     * @throws  
     */  
    public static void get() throws Exception {  
    	HttpClient client = HttpClients.createDefault();  
        HttpGet get = new HttpGet("http://www.baidu.com");  
        HttpResponse response = client.execute(get);  
        if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {  
            InputStream is = response.getEntity().getContent();  
            String result = EntityUtils.toString(response.getEntity());  
            System.out.println(result);
        }  
    }
}
