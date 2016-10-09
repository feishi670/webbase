package com.wendell.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.log4j.lf5.util.StreamUtils;

public class StreamUtil {
    public static String inStream2String(InputStream is) throws Exception {  
        ByteArrayOutputStream baos = new ByteArrayOutputStream();  
        byte[] buf = new byte[1024];  
        int len = -1;  
        while ((len = is.read(buf)) != -1) {  
            baos.write(buf, 0, len);  
        }  
        return new String(baos.toByteArray());  
    } 
    public static void main(String[] args) {
    	
	}
    public static void copy(InputStream input,OutputStream output) throws IOException{
		StreamUtils.copy(input, output);
    }
    public static byte[] getBytes(InputStream input) throws IOException{
    	return StreamUtils.getBytes(input);
    }
}
