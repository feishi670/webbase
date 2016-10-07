(function() {
    window.FeishiUtil = window.FeishiUtil || {};
    FeishiUtil.loading = function(target){
    	target=$(target||"body");
    	target=target.length>0&&target||$("body");
    	var bg=$("<div></div>").css({
    	   "height": "100%",
	        "position": "absolute",
	        "width": "100%",
	        "background": "rgba(0, 0, 0, 0.75)",
	        "top": 0,
	        "left": 0,
	        "z-index": 1000
    	}).appendTo(target);
    	var img=$("<img/>").css({
    		"position": "absolute",
    		"top": "50%",
    		"left": "50%",
    		"height": "64px",
    		"margin":"-32px"
    	}).attr("src",FeishiUtil.getRootUrl()+"/img/loading/loading.gif")
    	.appendTo(bg);
    }
})();