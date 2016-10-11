package com.wendell.util.socket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class SocketServer {
	private ServerSocket server;
	private int port;
	private List<Socket> clients=new ArrayList<Socket>();

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
		clients.add(client);
		onAccept(client);
		new Thread(){
			public void run () {
				try {
					BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream())); 
					while (true) {  
						try {
							String msg = in.readLine();  
							onMessage(client,msg);
							if (msg.equals("end")){
								break;  
							}
						} catch (SocketException e) {
							// TODO: handle exception
							System.out.println(e.getMessage());
							break;  
						}
					}  
					client.close();  
					clients.remove(client);
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println(e.getClass().getName());
					
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
	
	public void writeToAll(String msg) throws IOException{
			System.out.println("send msg:"+msg+"  to client;client num:"+clients.size());
			for(Socket socket:clients){
				write(socket,msg);
			}
	}
	public void write(Socket socket,String msg) throws IOException{
//		socket.getOutputStream().write(msg.getBytes());
//		socket.getOutputStream().flush();
		PrintWriter out = new PrintWriter(socket.getOutputStream());  
		out.println(msg);  
		out.flush();  
	}
	
	public static void main(String[] args) throws IOException {
		SocketServer server=new SocketServer(9096);
		server.startListener();
		Scanner reader=new Scanner(System.in);
		System.out.println("server start");
		while(reader.hasNext()){
			server.writeToAll(reader.nextLine());
		}
		System.out.println("read all");
	}
	
}
