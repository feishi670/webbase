package com.wendell.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilterInputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.nio.charset.Charset;

import org.springframework.util.Assert;

import com.wendell.util.stream.MyClass;

public class StreamUtil {
    public static void main(String[] args) {
    	
	}
    public static void writeObj(Object object,String filePath) throws IOException, ClassNotFoundException {  
		ObjectOutputStream output = new ObjectOutputStream(new FileOutputStream(filePath));
		output.writeObject(object); //etc.
		output.close();
    }
    public static byte[] getObjBytes(Object object) throws IOException, ClassNotFoundException {  
    	ByteArrayOutputStream bos=new ByteArrayOutputStream();
    	ObjectOutputStream output = new ObjectOutputStream(bos);
    	output.writeObject(object); //etc.
    	byte[] bytes = bos.toByteArray();
    	output.close();
    	return bytes;
    }
    
    public static <T> T readObj(byte[] bytes,Class<T> T) throws IOException, ClassNotFoundException {  
		InputStream in = getInputStream(bytes);
		ObjectInputStream input =new ObjectInputStream(in);
    	T readObject = (T) input.readObject();
    	input.close();
		return readObject;  
    }
    public static Object readObj(byte[] bytes) throws IOException, ClassNotFoundException {  
    	InputStream in = getInputStream(bytes);
    	ObjectInputStream input =new ObjectInputStream(in);
    	Object obj = input.readObject();
    	input.close();
    	return  obj;  
    }
    public static <T> T readObj(String filePath,Class<T> classz) throws IOException, ClassNotFoundException {  
    	InputStream in = new FileInputStream(filePath);
    	ObjectInputStream input =new ObjectInputStream(in);
    	T readObject = (T) input.readObject();
    	input.close();
		return readObject;  
    }
    public static Object readObj(String filePath) throws IOException, ClassNotFoundException {  
    	InputStream in = new FileInputStream(filePath);
    	ObjectInputStream input =new ObjectInputStream(in);
    	Object obj = input.readObject();
    	input.close();
    	return  obj;  
    }
	
    public static String inStream2String(InputStream is) throws Exception {  
        ByteArrayOutputStream baos = new ByteArrayOutputStream();  
        byte[] buf = new byte[BUFFER_SIZE];  
        int len = -1;  
        while ((len = is.read(buf)) != -1) {  
            baos.write(buf, 0, len);  
        }  
        return new String(baos.toByteArray());  
    } 

    public static byte[] getBytes(InputStream input) throws IOException{
		ByteArrayOutputStream result = new ByteArrayOutputStream();
		copy(input, result);
		result.close();
		return result.toByteArray();
    }
    public static InputStream getInputStream(byte[] bytes) throws IOException{
    	return new ByteArrayInputStream(bytes); 
    }
	public static final int BUFFER_SIZE = 4096;
	private static final byte[] EMPTY_CONTENT = new byte[0];
	public static byte[] copyToByteArray(InputStream in) throws IOException {
		ByteArrayOutputStream out = new ByteArrayOutputStream(4096);
		copy(in, out);
		return out.toByteArray();
	}

	public static String copyToString(InputStream in, Charset charset) throws IOException {
		Assert.notNull(in, "No InputStream specified");
		StringBuilder out = new StringBuilder();
		InputStreamReader reader = new InputStreamReader(in, charset);
		char[] buffer = new char[4096];
		int bytesRead = -1;
		while ((bytesRead = reader.read(buffer)) != -1) {
			out.append(buffer, 0, bytesRead);
		}
		return out.toString();
	}

	public static long copy(InputStream inputStream, OutputStream outputStream) throws IOException {
		return copy(inputStream, outputStream, BUFFER_SIZE);
	}


	public static long copy(Reader reader, Writer writer) throws IOException {
		return copy(reader, writer, BUFFER_SIZE);
	}

	public static long copy(Reader reader, Writer writer, int bufferSize) throws IOException {
		char[] buffer = new char[bufferSize];
		long count = 0L;

		int n=-1;
		while (-1 != (n = reader.read(buffer))) {
			writer.write(buffer, 0, n);
			count += n;
		}
		return count;
	}
	public static void copy(byte[] in, OutputStream out) throws IOException {
		Assert.notNull(in, "No input byte array specified");
		Assert.notNull(out, "No OutputStream specified");
		out.write(in);
	}

	public static void copy(String in, Charset charset, OutputStream out) throws IOException {
		Assert.notNull(in, "No input String specified");
		Assert.notNull(charset, "No charset specified");
		Assert.notNull(out, "No OutputStream specified");
		Writer writer = new OutputStreamWriter(out, charset);
		writer.write(in);
		writer.flush();
	}

	public static int copy(InputStream in, OutputStream out, int bufferSize) throws IOException {
		Assert.notNull(in, "No InputStream specified");
		Assert.notNull(out, "No OutputStream specified");
		int byteCount = 0;
		byte[] buffer = new byte[bufferSize];
		int bytesRead = -1;
		while ((bytesRead = in.read(buffer)) != -1) {
			out.write(buffer, 0, bytesRead);
			byteCount += bytesRead;
		}
		out.flush();
		return byteCount;
	}
	public static void copyThenClose(InputStream input, OutputStream output) throws IOException {
		copy(input, output);
		input.close();
		output.close();
	}

	public static InputStream emptyInput() {
		return new ByteArrayInputStream(EMPTY_CONTENT);
	}

	public static InputStream nonClosing(InputStream in) {
		Assert.notNull(in, "No InputStream specified");
		return new NonClosingInputStream(in);
	}

	public static OutputStream nonClosing(OutputStream out) {
		Assert.notNull(out, "No OutputStream specified");
		return new NonClosingOutputStream(out);
	}

	private static class NonClosingOutputStream extends FilterOutputStream {
		public NonClosingOutputStream(OutputStream out) {
			super(out);
		}

		public void write(byte[] b, int off, int let) throws IOException {
			this.out.write(b, off, let);
		}

		public void close() throws IOException {
		}
	}

	private static class NonClosingInputStream extends FilterInputStream {
		public NonClosingInputStream(InputStream in) {
			super(in);
		}

		public void close() throws IOException {
		}
	}
}
