package com.wendell.util.socket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class SocketServer {
	private ServerSocket server;
	private int port;
	private Socket socket;
	private PrintWriter out;

	public SocketServer(int port) {
		this.port=port;
		initServer();
	}
	public  Socket accept() throws IOException{
		if(!isServerOk()){
			return null;
		}
		return  server.accept();
	}
	private boolean isServerOk() {
		// TODO Auto-generated method stub
		if(this.server==null){
			if(initServer()){
				return true;
			}else {
				return false;
			}
		}
		return true;
	}
	private boolean initServer() {
		// TODO Auto-generated method stub
		 try {
				this.server = new ServerSocket(this.port);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;  
			}
		return true;  
	}
	public boolean read() throws Exception{
		if(!isServerOk()){
			return false;
		}
		final Socket client = accept();
		if(client==null){
			return false;
		}
		onAccept(client);
		new Thread(){
			public void run () {
				try {
					BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream())); 
					while (true) {  
						String msg = in.readLine();  
						onMessage(client,msg);
						if (msg.equals("end"))  
							break;  
					}  
					client.close();  
				} catch (Exception e) {
					e.printStackTrace();
				}
			};
		}.start();;
			return true;
	}
	private void onAccept(Socket client) {
		// TODO Auto-generated method stub
		
	}
	public void startListener(){
		new Thread(){
			@Override
			public void run() {
				// TODO Auto-generated method stub
				super.run();
				try {
					while (read()) {}
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		}.start();;
		
	}
	private void onMessage(Socket client, String msg){
		System.out.println(client.getInetAddress().getHostAddress());
		System.out.println(msg);
	}
	
	public void write(String msg) throws IOException{
		System.out.println("send msg:"+msg);

	      this.out =getWriter(); new PrintWriter(socket.getOutputStream());  
          out.println(msg);  
          out.flush();  
	}
	
	private PrintWriter getWriter() throws IOException {
		// TODO Auto-generated method stub
		if( this.out!=null){
			return this.out;
		}
		return     this.out =new PrintWriter(socket.getOutputStream()); 
	}
	public static void main(String[] args) throws IOException {
		SocketServer server=new SocketServer(9096);
		server.startListener();
		Scanner reader=new Scanner(System.in);
		System.out.println("server start");
		while(reader.hasNext()){
			server.write(reader.nextLine());
		}
		System.out.println("read all");
	}
	
}
