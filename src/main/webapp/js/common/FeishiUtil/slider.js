(function(){
window.FeishiUtil=window.FeishiUtil||{};
	var contentStyle={"position":"relative","background-color":"#000","width":"100%","height":"1px","z-index":"10"};
	var markerStyle={"width":"2px","height":"5px","top":"-2px","background-color":"#222","display": "inline-block","position": "absolute","z-index":"-1","cursor": "pointer"};
	var labelStyle={"display": "inline-block","margin": "3px 0 0 -15px","width":"30px","line-height": "2em","text-align":"center"};
	var movableMarker={"position": "absolute","left":"100%","cursor":"pointer","top":"-7px","width":"13px","margin-left":"-6px","height":"14px","background":'url("img/slider/marker.png") no-repeat'};
	/*
		var config={
				data:[{show:1},{show:3},{show:6},{show:12}],
				movable:true,
				callBack:function(datai){console.log(datai)}
				};	 
	 */
	function slider(config){
		this.content=$("<div></div>").css(contentStyle);
		this.callBack=config.callBack;
		
		this.data=config.data;
		this.dataLength=config.data.length;
		this.width=100/this.dataLength;
		if(config.movable){
			this.moveMaker=$("<div></div>").css(movableMarker);
			this.moveMaker.appendTo(this.content);
			this.makeMarkerMovable();
		}
		var moveMaker=this.moveMaker;
		for(var i=0;i<this.dataLength;i++){
			var marker=$("<div></div>").css(markerStyle).css({"left":(i+1)*this.width+"%"}).appendTo(this.content);
			if(this.data[i].show){
				marker.append($("<div class='label'></div>").css(labelStyle).html(this.data[i].show));
			}
			(function(marker,data){
				marker.click(function(){
					moveMaker.animate({left:marker.css("left")},200);
					config.callBack(data);
				});
			})(marker,this.data[i]);
				
		}
	}
	slider.prototype={
			makeMarkerMovable:function(){
				var moveMaker=this.moveMaker;
				var content=this.content;
				var dataLength=this.dataLength;
				var data=this.data;
				var callBack=this.callBack;
		        this.moveMaker.mousedown(function(e) {
		            var _left = moveMaker.offset().left;
		            var _pageX=e.pageX;
		            var _epageX
		            var _x = e.pageX - _left ;
		            var contentWidth=content.width();
		            var partWidth=contentWidth/dataLength;
		            var _minleft= content.offset().left;
		            $(document).mouseup(function() {
		            	moveUp();
		            });
		            var x;
		            $(document).bind("mousemove", function(ev) {
		            	_epageX=ev.pageX;
		                x = ev.pageX - _x-_minleft;
		                x=x<=0?1:(x>contentWidth?contentWidth:x);
		                if(ev.which==0){
		                	moveUp();
		                }
		                moveMaker.css({
		                    'left' : x + "px"
		                });
		            });
		            function moveUp(){
		            	$(document).unbind("mousemove");
		            	$(document).unbind("mouseup");
		            	var place=1;
		            	if(_epageX-_pageX>0){
		            		place=Math.ceil(x/partWidth);
		            	}else{
		            		place=Math.round(x/partWidth);
		            		place=place||1;
		            	}
		            	var target=place*partWidth;
		            	if(callBack){
		            		callBack(data[place-1]);
		            	}
		            	moveMaker.animate({left:target+"px"},300);
		            }
		        });		
			},
			getContent:function(){
				return this.content;
			}
	};
	FeishiUtil.slider=slider;
})();