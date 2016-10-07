(function() {
    window.FeishiUtil = window.FeishiUtil || {};
    FeishiUtil.buildMoving = function(button, target,limit) {
        button = $(button);
        if(!limit&&target&&!target.toLowerCase&&!target.tagName&&!target.jquery){
    		limit=target;
    		target=null;
        }
        limit=limit||{};
        var l=limit.left||0;
        var r=limit.right||0;
        var t=limit.top||0;
        var b=limit.bottom||0;
        target = $(target||button);
        button.css({"cursor":"move"});
        button.mousedown(function(e) {
        	if(e.target&&e.target.tagName&&e.target.tagName.toLowerCase()=='input'){return;}
        	target.css("margin",target.css("margin"));
            var maL =target.css("margin-left")? target.css("margin-left").replace("px",'') * 1:0;
            var maT =target.css("margin-top")? target.css("margin-top").replace("px",'') * 1:0;
            var _left = target.offset().left;
            var _top = target.offset().top;
            var w=$(target).parent().width();
            var h=$(target).parent().height();
            var w0=$(target).width();
            var h0=$(target).height();
            target.css({
                "position" : "absolute"
            });
            var x = e.pageX - _left + maL;
            var y = e.pageY - _top + maT;
            var cl=l-maL;
            var ct=t-maT;
            var cr=r+maL;
            var cb=b+maT;
            $(document).mouseup(function() {
                $(this).unbind("mousemove");
            });
            $(document).bind("mousemove", function(ev) {
                var _x = ev.pageX - x;
                var _y = ev.pageY - y;
                _x=_x>=cl&&(_x<=w-w0-cr)?_x:((_x<cl&&cl)||((_x>w-w0-cr)&&(w-w0-cr)));
                _y=_y>=ct&&(_y<=h-h0-cb)?_y:((_y<ct&&ct)||((_y>h-h0-cb)&&(h-h0-cb)));
                if(ev.which==0){
                    $(this).unbind("mousemove");
                	return;
                }
                if(limit.keepY){
                    target.css({
                        'left' : _x + "px"
                    });
                }else if(limit.keepX){
                    target.css({
                        'top' : _y + "px"
                    });
                }else{
                	target.css({
                		'left' : _x + "px",
                		'top' : _y + "px"
                	});
                }
            });
        });
    };
    FeishiUtil.unbuildMoving=function(button, target){
        button = $(button);
        button.css({"cursor":"default"});
        button.unbind("mousedown");
    };
})();
