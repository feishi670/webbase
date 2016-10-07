(function() {
	Array.name="Array";
	function transArrToObj(arr,fun){
		arr=initArr(arr);
		fun=initFun(fun);
		var result={};
		for (var i = 0; i < arr.length; i++) {
			result[fun(arr[i])]=arr[i];
		}
		return result;
	}
	function initFun(fun){
		return typeof fun=='function'?fun:function(a){return a;};
	}
	function initArr(arr){
		return arr.constructor.name!='Array'?[arr]:arr;
	}
	Array.prototype.each=function(fun){
		if(typeof fun!='function'){
			return;
		}
		for (var i = 0; i < this.length; i++) {
			if(fun(this[i],i)===false){
				break;
			}
		}
	}
    Array.prototype.sort = function(fun) {
        fun=typeof fun=='function'?fun:function(a,b){return a<b;};
        var t = this;
        var a;
        for (var i = 1; i < t.length; i++) {
            for (var j = i; j > 0; j--) {
                var rs=fun(t[j], t[j - 1]);
                rs=rs<0?false:rs;
                if (rs) {
                    a = t[j];
                    t[j] = t[j - 1];
                    t[j - 1] = a;
                } else {
                    break;
                }
            }
        }
        return t;
    }
    Array.prototype.sortByKeys = function() {
    	var t = this;
    	var a;
    	var funs=[];
    	for (var i = 0; i < arguments.length; i++) {
    		if(typeof arguments[i]=="function"){
    			funs.push(arguments[i]);
        	}else{
        		if(typeof arguments[i].fun=="function" &&arguments[i].arr){
        			funs.push(getArrayCompareFun(arguments[i].arr,arguments[i].fun));
        		}
        	}
		}
    	if(funs.lenth==0){
    		funs[0]=function(a,b){return a<b;};
    	}
    	
    	for (var i = 1; i < t.length; i++) {
    		for (var j = i; j > 0; j--) {
    			var rs=0;
    			var index=0;
    			while(rs===0&&typeof funs[index]=="function"){
        			var rs=funs[index++](t[j], t[j - 1]);
    			}
    			rs=rs<0?false:rs;
    			if (rs) {
    				a = t[j];
    				t[j] = t[j - 1];
    				t[j - 1] = a;
    			} else {
    				break;
    			}
    		}
    	}
    	return t;
    }
    function getArrayCompareFun(arr,fun){
    	var keys={};
    	for(var i=0;i<arr.length;i++){
    		keys[arr[i]]=i+1;
    	}
    	return function(a0,b0){
    		var a=fun(a0);
    		var b=fun(b0);
    		var na=keys[a];
    		var nb=keys[b];
    		
    		if(na&&nb){
    			return nb-na;
    		}
    		if(na||nb){
    			return na&&!nb;
    		};
    		return false;
    	};
    }
    Array.prototype.sortByArr=function(arr,fun){
        fun=typeof fun=='function'?fun:function(a,b){return false;};
    	var keys={};
    	for(var i=0;i<arr.length;i++){
    		keys[arr[i]]=i+1;
    	}
    	return this.sort(function(a,b){
    		var na=keys[a];
    		var nb=keys[b];
    		if(na&&nb){
    			return nb-na;
    		}
    		if(na||nb){
    			return na&&!nb;
    		};
    		return fun(a,b);
    	});
    }
    Array.compareByArr=function(a,b,arr){
    	var keys={};
    	for(var i=0;i<arr.length;i++){
    		keys[arr[i]]=i+1;
    	}
		var na=keys[a];
		var nb=keys[b];

		if(na&&nb){
			return nb-na;
		}
		if(na||nb){
			return na&&!nb;
		};
		return false;
    }
//    Array.prototype.sortByKey = function(fun) {
//    	fun=typeof fun=='function'?fun:function(a){return a;};
//    	
//    	var t = this;
//    	var r=[];
//    	var ro={};
//    	for (var i = 0; i < t.length; i++) {
//    		var v=fun(t[i]);
//    		r.splice(v,0,t[i]);
//    	}
//    	return t;
//    }
    Array.prototype.remove=function(fun){
        var func=typeof fun=='function'?fun:function(d){return d==fun;};
        var t = this;
        for(var i=t.length-1;i>=0;i--){
            if(func(t[i])){
                t.splice(i,1);
            }
        }
        return t;
    }
    Array.prototype.removeFirst=function(fun){
        var func=typeof fun=='function'?fun:function(d){return d==fun;};
        var t = this;
        for(var i=0;i<t.length;i++){
            if(func(t[i])){
                t.splice(i,1);
                break;
            }
        }
        return t;
    }
    Array.prototype.removeLast=function(fun){
        var func=typeof fun=='function'?fun:function(d){return d==fun;};
        var t = this;
        for(var i=t.length-1;i>=0;i--){
            if(func(t[i])){
                t.splice(i,1);
                break;
            }
        }
        return t;
    }
    
    /**
     * 模拟sql
     * param sqlCase:类型:方法，参数为数组中单个元素 如:function(a){ return a>0;};过滤符合条件数据。
     * param orderCase:类型:方法，排序规则，参数为数组中两个元素 如:function(a,b){return a<b;};返回true，按参数顺序升序，否则降序。
     * param orderCase:类型:数值，结果值截取数据。
     *  */
    Array.prototype.executeSql=function(sqlCase,orderCase,limitNum){
        var result=[];
        var t=this;
        var a;
        limitNum=limitNum||t.length;
        sqlCase=typeof sqlCase=='function'?sqlCase:function(){return true;};
        orderCase=typeof orderCase=='function'?orderCase:function(){return false;};
        
        for(var i=0;i<t.length;i++){
            if(sqlCase(t[i])){
                if(result.length>=limitNum+1){
                    if(orderCase(t[i],result[limitNum])){
                        result[limitNum]=t[i];
                    }else{
                        continue;
                    }
                }else{
                    result[result.length]=t[i];
                }
                for(var j=result.length-1;j>0;j--){
                    var rs=orderCase(result[j], result[j - 1]);
                    rs=rs<=0?false:rs;
                    if (rs) {
                        a = result[j];
                        result[j] = result[j - 1];
                        result[j - 1] = a;
                    } else {
                        break;
                    }
                }
            }
        }
        result.length=result.length>limitNum?limitNum:result.length;
        return result;
    }
    //完全包含
    Array.prototype.contain=function(arr,getCompareKey){
    	var thisKey=transArrToObj(this,getCompareKey);
    	var targetKey=transArrToObj(arr,getCompareKey);
    	for (p in targetKey) {
			if(!thisKey[p]){
				return false;
			}
		}
    	return true;
    };
    Array.prototype.getRepeat=function(getCompareKey){
    	var fun=initFun(getCompareKey);
    	var thisKey={};
    	var result={};
    	var t=this;
    	for (var i = 0; i < t.length; i++) {
    		var key=fun(t[i]);
    		if(thisKey[key]){
    			result[key]=result[key]||[thisKey[key]];
    			result[key].push(thisKey[key]);
    		}else{
    			thisKey[key]=t[i];
    		}
		}
    	return result;
    };
    Array.prototype.reduce=function(arr,getCompareKey){
    	var fun=initFun(getCompareKey);
    	var rKey=transArrToObj(arr,getCompareKey);
    	var result=[];
    	var t=this;
    	for (var i = 0; i < t.length; i++) {
    		if(!rKey[fun(t[i])]){
    			result.push(t[i]);
    		}
		}
    	return result;
    };
    Array.prototype.intersect=function(arr,getCompareKey){
    	var fun=initFun(getCompareKey);
    	var rKey=transArrToObj(arr,getCompareKey);
    	var result=[];
    	var t=this;
    	for (var i = 0; i < t.length; i++) {
    		if(rKey[fun(t[i])]){
    			result.push(t[i]);
    		}
    	}
    	return result;
    };
    Array.prototype.merge=function(arr,getCompareKey,getMergeObj){
    	var fun=initFun(getCompareKey);
    	var rKey=transArrToObj(arr,getCompareKey);
    	getMergeObj=initFun(getMergeObj);
    	var result=[];
    	var t=this;
    	for (var i = 0; i < t.length; i++) {
    		var tr=rKey[fun(t[i])];
    		if(tr){
    			result.push(getMergeObj(t[i],tr));
    		}
    	}
    	return result;
    };
    Array.prototype.union=function(arr,getCompareKey){
    	arr=initArr(arr);
    	return this.concat(arr.reduce(this));
    };
})(); 