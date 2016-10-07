!(function() {
    window.FeishiUtil = window.FeishiUtil || {};
    window.FeishiUtil.notice=function(param) {
    	var description=param.description;
    	var title=param.title;
    	var funs=param.funs;
        var backgroud = $("<div></div>").css({
            "width" : "100%",
            "height" : "100%",
            "position" : "fixed",
            "font-size":"18px",
            "top" : "0",
            "left" : "0",
            "z-index" : "9999",
            "background-color" : param.backgroud||"transparent"
        });
        var body = $("<div></div>").css({
            "position" : "absolute",
            "left" : "50%",
            "top" : "50%",
            "background" : "#FFF",
            "min-width" : "400px",
            "max-width" : "800px",
            "padding" : "0 15px 15px 15px",
            "border-radius" : "8px",
            "box-shadow" : "0 0 20px 0px #888"
        });
        var close=$("<div style='font-family: monospace;POSITION: absolute;font-weight: bold;right: 1em;top: 0.5em;border-radius: 2em;font-size: 16px;width: 24px;height: 24px;border: 2px solid #888;text-align: center;padding: 2px;color: #444;background: #eee;cursor: pointer;z-index: 10;'></div>").html("×").appendTo(body)
        	.click(function(){
        		backgroud.remove();
        	});
        ;
        var title = $("<div style='line-height: 1.4em; padding: 0.6em 15px 0.4em 15px;font-size: 1.5em;font-weight: bold;'></div>").html(title);
        var description = $("<div></div>").css({
            "background" : "#FFF",
            "line-height" : "1.4em",
            "padding" : "15px 15px 2.8em 15px",
            "word-wrap" : "break-word",
            "font-weight" : "700"
        }).html(description);
        
        var btns=$("<div></div>");
        for (p in funs) {
        	(function(p,funs){
        		var btn=$("<button></button>").attr("class", "btn").html(p).css({
        			"float" : "right",
        			"margin-right" : "15px"
        		}).click(function(e){
        			if(typeof funs[p]=='function'){
        				var result=funs[p].call(this);
        				if(result=="close"){
        					backgroud.remove();
        				};
        			}
        		}).appendTo(btns);
        	})(p,funs);
		}
        
        backgroud.appendTo($("body")).append(body.append(title).append($("<div></div>").attr({
            "class" : "breakLine"
        })).append(description).append(btns));

        body.css({
            "margin-left" : (-body.width() / 2) + "px",
            "margin-top" : (-body.height() / 2) + "px"
        });
        return backgroud;
    };
})(); 