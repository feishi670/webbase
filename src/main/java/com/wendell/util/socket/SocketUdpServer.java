package com.wendell.util.socket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class SocketUdpServer {
	private DatagramSocket server;
	private int port;

	public SocketUdpServer(int port) {
		this.port=port;
		initServer();
	}
	public  DatagramPacket accept() throws IOException{
		if(!isServerOk()){
			return null;
		}
        byte[] buf = new byte[1024];  
        DatagramPacket dp = new DatagramPacket(buf,buf.length);  
        //在此阻塞
        server.receive(dp);
		return  dp;
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
				this.server = new DatagramSocket(this.port);
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
		final DatagramPacket client = accept();
		if(client==null){
			return false;
		}
		onAccept(client);
		new Thread(){
			public void run () {
					String ip = client.getAddress().getHostAddress();   //数据提取  
					String data = new String(client.getData(),0,client.getLength());  
					onMessage(client, data);
			};
		}.start();;
		
			return true;
	}
	private void onAccept(DatagramPacket client) {
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
	private void onMessage(DatagramPacket client, String msg){
		System.out.println(msg);
	}
	
	
	public static void main(String[] args) throws IOException {
		SocketUdpServer server=new SocketUdpServer(9095);
		server.startListener();
		System.out.println("server start");
	}
	
}
