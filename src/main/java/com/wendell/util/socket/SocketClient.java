package com.wendell.util.socket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;
import java.util.Scanner;

public class SocketClient {
	private Socket socketClient;
	private String ip;
	private int port;
	private InetAddress host;
	private PrintWriter out;

	public SocketClient(String ip,int port) {
		// TODO Auto-generated constructor stub
		this.ip=ip;
		this.port=port;
		initSocketClient();
	}

	public SocketClient(InetAddress host, int port) {
		// TODO Auto-generated constructor stub
		this.host=host;
		this.port=port;
		initSocketClient();
	}

	private boolean initSocketClient() {
		// TODO Auto-generated method stub
        try {
			this.socketClient = this.host==null?new Socket(this.host, this.port):new Socket(this.ip, this.port);
		}  catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
		
	}
	public String read() throws IOException{
		BufferedReader in = new BufferedReader(new InputStreamReader(socketClient.getInputStream())); 
		while (true) {  
			String msg = in.readLine();  
			onMessage(msg);
			if (msg.equals("end"))  
				break;  
		}  
		socketClient.close();  
//		String msg =StreamUtil.inStream2String(socketClient.getInputStream()); 
//		return msg;
		return null;
	}
	public void startListener(){
		new Thread(){
			@Override
			public void run() {
				// TODO Auto-generated method stub
				super.run();
				try {
					read();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}.start();
		
	}
	private void onMessage(String msg){
		System.out.println(msg);
	}
	public void write(String msg) throws IOException{
		System.out.println("send msg:"+msg);

	      this.out =getWriter(); new PrintWriter(socketClient.getOutputStream());  
          out.println(msg);  
          out.flush();  
	}
	
	private PrintWriter getWriter() throws IOException {
		// TODO Auto-generated method stub
		if( this.out!=null){
			return this.out;
		}
		return     this.out =new PrintWriter(socketClient.getOutputStream()); 
	}

	public static void main(String[] args) throws IOException {
		SocketClient client = new SocketClient(InetAddress.getLocalHost(), 9096);
		client.startListener();
		
		Scanner reader=new Scanner(System.in);

		System.out.println("client start");
		while(reader.hasNext()){
			client.write(reader.nextLine());
		}
		System.out.println("read all");
	}
}
