$(function(){
		$("#mybutton").click(function(e){
			var file = $("#myfile")[0].files;
		var formData = new FormData();
		   formData.append("file" , file[0]);
		   formData.append("file" , file[1]);
			　　$.ajax({
			　　　　type: "POST",
			　　　　url: "../springUpload",
			　　　　data: formData ,　　// 这里上传的数据使用了formData 对象
			　　　　processData : false,  
			　　　　// 必须false才会自动加上正确的Content-Type
			　　　　contentType : false , 
			　　　　
			　　　　// 这里我们先拿到jQuery产生的 XMLHttpRequest对象，为其增加 progress
				// 事件绑定，然后再返回交给ajax使用
			　　　　xhr: function(){
			　　　　　　var xhr = $.ajaxSettings.xhr();
			　　　　　　if(xhr.upload) {
			　　　　　　　　xhr.upload.addEventListener("progress" , function(e){console.log("上传百分比",(e.loaded/e.total*100).toFixed(2)+"%")}, false);
			　　　　　　}return xhr;
			　　　　} 
			　　});
			e.preventDefault();
		});

	});