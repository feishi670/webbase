<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
	<form name="serForm" action="../fileUpload" method="post"
		enctype="multipart/form-data">
		<h1>采用流的方式上传文件</h1>
		<input type="file" name="file"> <input type="submit"
			value="upload" />
	</form>

	<form name="Form2" action="../fileUpload2" method="post"
		enctype="multipart/form-data">
		<h1>采用multipart提供的file.transfer方法上传文件</h1>
		<input type="file" name="file"> <input type="submit"
			value="upload" />
	</form>

	<form name="Form2" action="../springUpload" method="post"
		enctype="multipart/form-data">
		<h1>使用spring mvc提供的类的方法上传文件</h1>
		<input type="file" name="file"> <input type="submit"
			value="upload" />
	</form>

	<form name="Form2" action="../springUpload" method="post"
		enctype="multipart/form-data">
		<h1>使用spring mvc提供的类的方法上传多文件</h1>
		<input type="file" multiple="" accept="*.zip" name="file"> <input
			type="hidden" name="dfgd" value="asfsdf"> <input
			type="submit" value="upload" />
	</form>
	
	<form action="" id="myform">
		<h1>使用ajax 上传多文件 并打印进度日志</h1>
		<input type="file" multiple=""  name="file" id="myfile"> 
	 	<input type="submit" value="upload" id="mybutton" />
	</form>
	
	
	
	
	
	<script type="text/javascript" src="../js/jquery/jquery-1.12.4.min.js"></script>
	<script type="text/javascript" src="../js/project/upload/upload.js">
	
	</script>
</body>
</html>