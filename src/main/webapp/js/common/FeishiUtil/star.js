!(function() {
    window.FeishiUtil = window.FeishiUtil || {};
    window.FeishiUtil.createFiveStar = function(selected,sum,multiple,starWidth){
            starWidth=starWidth||24;
            multiple=multiple||1;
            var content=$("<div></div>").css({"width":(1/multiple+0.5)*100+"%","text-align": "left"});
            var body=$("<div></div>").css({"display":"inline-block","overflow":" hidden","text-align":"left","width":sum*starWidth*multiple+"px"});
            for (var i = 0; i < selected; i++) {
                $("<span></span>").attr("class", "glyphicon glyphicon-star").appendTo(content);
            }
            for (var i = selected; i < sum; i++) {
                $("<span></span>").attr("class", "glyphicon glyphicon-star grayStay").appendTo(content);
            }
            content.css({"transform-origin": "0 50%"});
            content.css({"transform": "scale("+multiple+")"});
            return body.append(content);
        }
    window.FeishiUtil.createSelectableStar=function(starNum,resultName){
        var content=$("<span></span>").css({"cursor": "pointer"});
        var input=$("<input type='hidden'/>").attr("name",resultName).appendTo(content);
        for(var i=0;i<starNum;i++){
            $("<span></span>").attr("class","glyphicon glyphicon-star grayStay").appendTo(content)
            .click(function(){
                var thisObj=$(this);
                thisObj.attr("class","glyphicon glyphicon-star");
                thisObj.prevAll().attr("class","glyphicon glyphicon-star");
                thisObj.nextAll().attr("class","glyphicon glyphicon-star grayStay");
                if(thisObj.attr("pre")){
                    thisObj.attr("pre","");
                    }
                thisObj.siblings().each(function(){
                    if($(this).attr("pre")){
                    $(this).attr("pre","");
                    }
                });
                input.val($(this).index());
            }).hover(
                function(){
                    var thisObj=$(this);
                    thisObj.attr("pre",$(this).attr("class"));
                    thisObj.siblings().each(function(){
                        $(this).attr("pre",$(this).attr("class"));
                    });
                    thisObj.attr("class","glyphicon glyphicon-star");
                    thisObj.prevAll().attr("class","glyphicon glyphicon-star");
                    thisObj.nextAll().attr("class","glyphicon glyphicon-star grayStay");
                },
                function(){
                    var thisObj=$(this);
                    if(thisObj.attr("pre")){
                        $(this).attr("class",$(this).attr("pre"));
                        }
                    thisObj.siblings().each(function(){
                        if($(this).attr("pre")){
                        $(this).attr("class",$(this).attr("pre"));
                        }
                    });
                }
            );
        }
        return content;
    }
})(); 