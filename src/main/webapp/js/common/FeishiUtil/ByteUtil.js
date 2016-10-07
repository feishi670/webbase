(function(){
	window.ByteUtil={};
	var innerCode="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+=";
	var code64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+=";
	var code32="ABCDEFGHIJKLMNOPQRSTUVWXYZ012345";
	var code16="0123456789ABCDEF";
	ByteUtil.encode=function(str,code,pwd){
		var bytes=getBytesArray(str);
		if(!code){
			code=innerCode;
		}
		code=getEncodeCode(pwd,code);
		var result="";
		var i=0;
		var index=0;
		var length=parseInt(Math.log2(code.length));
		var  currentValue=0;
		var currentLength=0;
		while (index<=bytes.length) {
			if(currentLength<length&&index<bytes.length){
				var b = bytes[index];
				currentValue=currentValue*256+(b>0?b:(256+b));
				index++;
				currentLength+=8;
				continue;
			}
			if(index==bytes.length){
				if(currentLength==0){
					break;
				}
				if(currentLength-length<0){
					var plus= Math.pow(2, length-currentLength);
					result+=code.charAt(currentValue*plus);
					break;
				}
			}
			var reduce= Math.pow(2, currentLength-length);
			currentLength=currentLength-length;
			result+=code.charAt(parseInt(currentValue/reduce));
			currentValue=currentValue%reduce;
		}
		return result;
	};
	function getBytesArray(str){
		str=encodeURI(str);
		var result=[];
		var i=0;
		while(i<str.length){
			var b=0;
			if(str.charAt(i)=="%"){
				b=parseInt(str.substr(i+1,2),16);
				i+=3;
			}else{
				b=str.charCodeAt(i);
				i+=1;
			}
			result.push(b);
		}
		return result;
	}
	function getEncodeCode(pwd,code){
		if(!code){
			code=innerCode;
		}
		if(!pwd){
			return code;
		}
		var bytes=getBytesArray(pwd);
		var length=code.length;
		var move=0;
		var i=0;
		var step=0;
		var currentValue=0;
		while(i<=bytes.length){
			if(currentValue==0){
				if(i==bytes.length){
					break;
				}
				currentValue=bytes[i];
				i++;
			}
			move=currentValue%length;
			var end=code.substr(step);
			code=code.substr(0,step)+end.substr(move)+end.substr(0,move);
			currentValue=parseInt(currentValue/length);
			step++;
			length--;
			if(length<=2){
				break;
			}
		}
		return code;
	}
	ByteUtil.getEncodeCode=getEncodeCode;
	function getStrFromBytesArray(bytes){
		var encodeStr="";
		var i=0;
		while(i<bytes.length){
			var b=bytes[i];
			
			var step=9-Math.ceil(Math.log2(256-b));
			if(step==1){
				encodeStr+=String.fromCharCode(b);
				i++;
			}else{
				while(step>0){
					b=bytes[i];
					encodeStr+="%"+b.toString(16).toUpperCase();
					i++;
					step--;
				}
			}
		}
		return decodeURI(encodeStr);
	}
	ByteUtil.decode=function(formatStr,code,pwd){
		if(!code){
			code=innerCode;
		}
		code=getEncodeCode(pwd,code);
		var bytes=[];
		var index=0;
		var length=parseInt (Math.log2(code.length));
		var plus=Math.pow(2, length);
		var currentValue=0;
		var currentLength=0;
		while (index<=formatStr.length) {
			if(currentLength<8&&index<formatStr.length){
				currentValue=currentValue*plus+code.indexOf(formatStr.charAt(index));
				currentLength+=length;
				index++;
				continue;
			}
			
			var reduce= Math.pow(2, currentLength-8);
			currentLength=currentLength-8;
			bytes.push(parseInt(currentValue/reduce));
			currentValue=currentValue%reduce;
			if(index==formatStr.length){
				index++;
			}
		}
		return getStrFromBytesArray(bytes);
	};
	ByteUtil.encode64=function(str,pwd){
		return ByteUtil.encode(str,code64,pwd)
	}
	ByteUtil.decode64=function(str,pwd){
		return ByteUtil.decode(str,code64,pwd)
	}
	ByteUtil.encode32=function(str,pwd){
		return ByteUtil.encode(str,code32,pwd)
	}
	ByteUtil.decode32=function(str,pwd){
		return ByteUtil.decode(str,code32,pwd)
	}
	ByteUtil.encode16=function(str,pwd){
		return ByteUtil.encode(str,code16,pwd)
	}
	ByteUtil.decode16=function(str,pwd){
		return ByteUtil.decode(str,code16,pwd)
	}
})();