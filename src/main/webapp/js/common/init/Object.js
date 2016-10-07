(function(){
	function clone(o){
		if(typeof o!='object'||!o){
			return o;
		}
		if(o.constructor==Array){
			return cloneArr(o);
		}
		var r={};
		for(p in o){
			r[p]=clone(o[p]);
		}
		return r;
	}
	function cloneArr(arr){
		var r=[];
		for(var i =0 ; i<arr.length;i++){
			r[i]=clone(arr[i]);
		}
		return r;
	}
})();