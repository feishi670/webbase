(function(){
	/**
	 * 字符串左补齐
	 * */
	String.prototype.appendLeft=function(c,l){
		if(this.length>=l){
			return this.substr(-16,16);
		}
		var result=this;
		for (var i = 0;result.length<l; i++) {
			result=c+result;
		}
		return result.appendLeft(c,l);
	};
	/**
	 * 字符串右补齐
	 * */
	String.prototype.appendRight=function(c,l){
		if(this.length>=l){
			return this.substr(0,16);
		}
		var result=this;
		for (var i = 0;result.length<l; i++) {
			result+=c;
		}
		return result.appendRight(c,l);
	};
	/**
	 * 去两边空格
	 * */
	String.prototype.trim=function(){
		return this.replace(/(^\s+)|(\s+$)/g,"");
	};
	/**
	 * 是否包含全角字符
	 * */
	String.prototype.hasChWord=function(){  
		return /[^\x00-\xff]/g.test(this);
	};
	String.prototype.len=function(){  
		return this.replace(/[^\x00-\xff]/g,"**").length;
	};
})();