(function(){
    window.FeishiUtil = window.FeishiUtil || {};
    FeishiUtil.gridList= function(selector, param, data, callBack) {
        selector = $(selector).html("");
        if(param.search){
        	addSearch(selector,param.search);
        }
        content = $("<div><div>").appendTo(selector);
        content.addClass("gridTable");
        var cols = param.cols;
        var row = $("<div></div>").attr("class", "top row");
        var percentages=100;
        noperCols=cols.executeSql(function(col){
        	if(col.percentage){
        		percentages-=col.percentage;
        		return false;
        	}else{
        		return true;
        	}
        });
        noperCols.executeSql(function(col){col.percentage=percentages/noperCols.length;});
        for (var j = 0; j < cols.length; j++) {
            $("<div></div>").attr("class", "cutTitle").html(cols[j].show).appendTo(row).css({
                "width" : (cols[j].percentage + "%")
            });
        }
        row.appendTo(content);
        for (var i = 0; i < data.length; i++) {
            row = $("<div></div>").attr("class", "row");
            var col;
            var bean=param.bean?(new param.bean(data[i])):data[i];
            for (var j = 0; j < cols.length; j++) {
                var appendObj = _getData(bean, cols[j],param.update);
                $("<div></div>").attr("class", "cutTitle").append(appendObj).appendTo(row).css({
                    "width" : cols[j].percentage ? (cols[j].percentage + "%") : ""
                });
                ;
            }
            if(param.render){
            	$("<div class='rowDetail'></div>").html(param.render(bean)).appendTo(row);
            	console.log(bean);
            }
            addClick(row, param.callBack, bean);
            row.appendTo(content);
        }
        if (callBack) {
            callBack(selector, param, data);
        }
        function addClick(row, fun, data) {
            if (fun) {
                row.click(function() {
                    fun(data);
                });
                row.css({
                    "cursor" : "pointer"
                });
            }
        }
    };
    function _getData(row, colrow,updateCallBack) {
        var col = colrow.name;
        var fun = colrow.showFun;
        var cut = colrow.cut;
        var cols = col.split(".");
        var i = 0;
        var result = row;
        while (cols.length > i && result) {
            result = result[cols[i]];
            i++;
        }
        if (fun && typeof fun == 'function') {
            result=fun(result, row);
            if(typeof result=='string'){
                result=$("<span></span>").html(result).attr("title",result);
            }
            return result;
        } else {
                result=$("<span></span>").html(result).attr("title",result);
                if(colrow.editable){
                	activate(result,row,colrow.name,colrow.show,updateCallBack,colrow.editType);
                }
            return result;
        }
    }
    
        function activate(selector,row,key,defaultShow,callBack,type){
            selector=$(selector);
            type=type||"input";
            var thisObj=selector;
            var _key=selector.attr("name");
            var content=thisObj.html();
            var showContent=content;
            thisObj.html("");
            if(type=="checkBox"){
            	var checkBox=$("<input type='checkBox'/>");
            	checkBox.appendTo(thisObj);
            	if(content=="1"){
            		checkBox.attr("checked","checked");
            	}
            	checkBox.click(function(){
            		content=checkBox.prop("checked");
            		row[key]=content?1:0;
            		callBack(row);
            	});
            	return;
            }
            if(type=="radio"){
            	var checkBox=$("<input  type='radio'/>").attr("name",key);
            	checkBox.appendTo(thisObj);
            	if(content=="1"){
            		checkBox.attr("checked","checked");
            	}
            	checkBox.change(function(){
            		content=checkBox.prop("checked");
            		row[key]=content?1:0;
            		callBack(row);
            	});
            	return;
            }
            var newContent=$("<span></span>").css({"cursor":"pointer"});
            newContent.html(showContent+"&nbsp;");
            thisObj.append(newContent);
            var _editContent;
            newContent.click(function(){
                if(_editContent){
                    return;
                }
                
                if(type=="input"){
                    _editContent=$("<input type='text' class='form-control'/>").attr("placeholder",defaultShow).val(content);
                    _editContent.css({"width":selector.parent().width()+"px","border":0,"outline": "none","vertical-align":"baseline","line-height":"1.8em","text-align":"center"});
                    newContent.html("").append(_editContent);
                    _editContent.focus();
                }else if(type=="textarea"){
                    _editContent=$("<textarea row='3' style='width: 100%' ></textarea>").val(content);
                    newContent.html("").append(_editContent);
                    _editContent.focus();
                }
                    _editContent.blur(function(){
                        content=_editContent.val();
                        row[key]=content;
                        if(!content){
                                showContent=content;
                        }else{
                                showContent=content;
                        }
                        newContent.html(showContent+"&nbsp;");
                        _editContent=undefined;
                        callBack(row);
                    });
            });
        }
})();