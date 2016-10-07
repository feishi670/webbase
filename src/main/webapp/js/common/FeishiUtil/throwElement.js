(function(){
window.FeishiUtil=window.FeishiUtil||{};
        FeishiUtil.throwElement = function(param) {
        	var from =$(param.from);
        	var to =$(param.to);
        	var moveElement=$(param.moveElement);
        	var curvature=(param.curvature||1)*0.0015;
        	param.callBack=param.callBack||function(){};
        	var fromOffset=from.offset();
        	var toOffset=to.offset();
        	var x1=fromOffset.left+from.width()/2;
        	var y1=fromOffset.top+from.height()/2;
        	var x2=toOffset.left+to.width()/2;
        	var y2=toOffset.top+to.height()/2;
        	var a=(x1+x2-(y1-y2)/((x1-x2)*curvature))/2;
        	var b=(x1-a)*(x1-a)*curvature-y1;
        	if(b>0){
        		if(y1*y2>0){
        			var t=Math.sqrt(y1/y2);
        			a=(t*x2+x1)/(1+t);
        			curvature=y1/((x1-a)*(x1-a));
        			b=0;
        		}
        	}
        	var time=200;
        	var rate=200;
        	var i=0;
//        	console.log(fromOffset.left,fromOffset.top,toOffset.left,toOffset.top,a,b);
        	function move(){
        		if(i>=rate){
        			moveElement.remove();
        			param.callBack();
        			return;
        		}
        		var x=(x2-x1)*i/rate+x1;
        		var y=(x-a)*(x-a)*curvature-b;
        		moveElement.css({left:x+"px",top:y+"px"});
        		i++;
        		setTimeout(move,time/rate);
        	}
        	move();
        }
})();