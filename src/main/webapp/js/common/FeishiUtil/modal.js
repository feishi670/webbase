!(function() {
    window.FeishiUtil = window.FeishiUtil || {};
    window.FeishiUtil.modal = function(selector) {
        selector = $(selector);
        selector.css({
            "display" : "block",
            "top" : "50%",
            "left" : "50%",
            "margin-left" : -selector.width() / 2 + "px",
            "margin-top" : -selector.height() / 2 + "px"
        });
        selector.find("button.close").click(function() {
            selector.css({
                "display" : "none"
            });
        });
    }
    var modalList=[];
    window.FeishiUtil.fModal=function(selector,param){
        selector = $(selector);
        selector.remove().appendTo($("body"));
        selector.show();
        var content=selector.hasClass("f-modal-content")?selector:selector.find(".f-modal-content");
        content.show();
        param=param||{};
        param.minLeft=param.minLeft||0;
        param.minTop=param.minTop||0;
        var left=($(window).width()-selector.width())/2;
        var top=($(window).height()-selector.height())/2;
        if(left<param.minLeft){
        	content.css({"left" : param.minLeft+"px"});
        }else{
        	content.css({
                "left" : "50%",
                "margin-left" : -selector.width() / 2 + "px"
        	});
        }
        if(top<param.minTop){
        	content.css({"top" : param.minTop+"px"});
        }else{
        	content.css({
                "top" : "50%",
                "margin-top" : -selector.height() / 2 + "px"
        	})
        }
        content.css({"position":"fixed"});
        modalList.push(selector);
        return selector;
    }
    
    window.FeishiUtil.fModal.clear=function(){
    	for (var i = 0; i < modalList.length; i++) {
    		modalList[i].remove();
		}
    	modalList=[];
    }
})(); 