package com.wendell.util.xml;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

public class DomUtil {
	public static void main(String[] args) throws Exception {

        String text = "<csdn></csdn>";
//        Document document = DocumentHelper.parseText(text); 
        
        Document document = DocumentHelper.createDocument();//创建根节点  
        Element root = document.addElement("csdn"); 
        System.out.println(document.asXML());
	}
}
