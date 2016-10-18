package com.wendell.util.stream;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import com.wendell.util.EncryptUtil;

import net.sf.json.JSONObject;

public class StreamTest {
	public static void main(String[] args) throws FileNotFoundException, IOException, ClassNotFoundException {
//		StreamUtils
		ObjectOutputStream output = new ObjectOutputStream(new FileOutputStream("E://object.data"));
		 
		MyClass object = new MyClass();  
		output.writeObject(object); //etc.
		 
		output.close();
		FileInputStream stream = new FileInputStream("E://object.data");
		byte[] bytes = com.wendell.util.StreamUtil.getBytes(stream);
		InputStream in = com.wendell.util.StreamUtil.getInputStream(bytes);
		ObjectInputStream input =new ObjectInputStream(in); //new ObjectInputStream(new FileInputStream("E://object.data"));
		
		
		object = (MyClass) input.readObject(); //etc.
		 
		input.close();
		System.out.println(object);
		System.out.println(JSONObject.fromObject(object));
		System.out.println(new String(com.wendell.util.StreamUtil.getObjBytes(object)));
	}
	
}
