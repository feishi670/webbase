package com.wendell.util.socket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.Socket;
import java.net.SocketException;
import java.util.Scanner;

public class SocketUdpClient {
	public static void sendUdp(String ip,int port,String data) throws IOException{
        DatagramSocket ds  = new DatagramSocket();  
        byte[] buf = data.getBytes();  
        DatagramPacket dp = new DatagramPacket(buf,buf.length,InetAddress.getByName(ip),port);//10000为定义的端口     
        ds.send(dp);  
        ds.close();  
	}
	public static void main(String[] args) throws IOException {
		Scanner reader=new Scanner(System.in);
		System.out.println("client start");
		while(reader.hasNext()){
//			client.write(reader.nextLine());
			sendUdp("127.0.0.1", 9095, reader.nextLine());
		}
		System.out.println("read all");
	}
}
