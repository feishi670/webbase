(function($) {
    _lazyAjax = {};
    var o = {
        getOrigin : function() {
            var i = location.origin;
            if (i) {
                return i;
            } else {
                if ( typeof location == 'string') {
                    i = location.split("://")[0];
                    i += locations = location.split("://")[1].split("/")[0];
                    return i;
                } else if ( typeof location == 'object') {
                    if (location.protocol && location.host) {
                        i = location.protocol + "//" + location.host;
                        return i;
                    } else {
                        return '';
                    }
                }
            }
        },
        getServerName : function() {
        	var result=localStorage.getItem("tvuMeService");
        	if(result){
        		return result;
        	}
        	o.setServerName();
            return localStorage.getItem("tvuMeService") || '/tvumeservice';
        },
        setServerName : function(ralativePath) {
        	ralativePath=ralativePath||"";
        	if(!location.pathname){
        		location.pathname=location.toString().replace(/[^:]*:\/\/[^\/]+/g,''); 
        	}
        	var serverName=location.pathname.substr(0,location.pathname.lastIndexOf("/"))+ralativePath;
        	localStorage.setItem("tvuMeService",serverName);
        },
        getRootUrl:function(){
            return o.getOrigin()+o.getServerName();
        },
        transHtmlToDom:function(htmlString){
        	  htmlString = htmlString.replace(/^\s*([\S\s]*)\b\s*$/, '$1');
        	  var tempDiv = document.createElement('DIV');
        	  tempDiv.innerHTML = htmlString;
        	  if (tempDiv.childNodes.length == 1) {
        	    return /** @type {!Node} */ (tempDiv.removeChild(tempDiv.firstChild));
        	  } else {
        	    var fragment = document.createDocumentFragment();
        	    while (tempDiv.firstChild) {
        	      fragment.appendChild(tempDiv.firstChild);
        	    }
        	    return fragment;
        	  }
        },
        lazyAjax : function(param, activeTime) {
            var key = param.url + JSON.stringify(param.data || {});
            if (_lazyAjax[key]) {
                if (_lazyAjax[key].data) {
                    param.success(_lazyAjax[key].data);
                } else {
                    _lazyAjax[key].success.push(param.success);
                }
            } else {
                _lazyAjax[key] = {};
                _lazyAjax[key].success = [param.success];
                param.success = function(data) {
                    _lazyAjax[key].data = data;
                    for (var i = 0; i < _lazyAjax[key].success.length; i++) {
                        _lazyAjax[key].success[i](data);
                    }
                    _lazyAjax[key].success.length = 0;
                    if (activeTime) {
                        setTimeout(function() {
                            _lazyAjax[key] = null;
                        }, activeTime);
                    }
                };
                o.ajax(param);
            }
        },
        repeatAjax : function(param, config) {
            var callback = param.oldSuccess || param.success;
            param.oldSuccess = callback;
            var currentTime = new Date().getTime();
            config.minFailedTime = config.minFailedTime || 1;
            config.minFailedTime--;
            config.maxTime = config.maxTime || 0;
            config.isSuccess = config.isSuccess ||
            function(data) {
                return true
            };
            config.fail = config.fail ||
            function(data) {
                return true
            };
            config.minInterval = config.minInterval || 0;
            var realCallBack = function(data) {
                if (config.isSuccess(data)) {
                    callback(data);
                    return;
                } else {
                    var minInterval = new Date().getTime() - currentTime;
                    config.maxTime = config.maxTime + currentTime - new Date().getTime();
                    if (config.maxTime > 0) {
                        if (minInterval < config.minInterval) {
                            window.setTimeout(function() {
                                o.repeatAjax(param, config);
                            }, config.minInterval - minInterval);
                        } else {
                            o.repeatAjax(param, config);
                        }
                    } else {
                        if (config.minFailedTime > 0) {
                            if (minInterval < config.minInterval) {
                                window.setTimeout(function() {
                                    o.repeatAjax(param, config);
                                }, config.minInterval - minInterval);
                            } else {
                                o.repeatAjax(param, config);
                            }
                        } else {
                            config.fail();
                        }
                    }
                }
            }
            param.success = realCallBack;
            o.ajax(param);
        },
        requirejs : function(url, callBack) {
            $.getScript(url, function(a, b, c) {
                if (b == "success") {
                    eval(a);
                    if (callBack) {
                        callBack();
                    }
                }
            });
        },
        repeatGet : function(config) {
            config.minFailedTime = config.minFailedTime || 1;
            config.minFailedTime--;
            config.maxTime = config.maxTime || 0;
            config.isSuccess = config.isSuccess ||
            function(data) {
                return true
            };
            config.fail = config.fail ||
            function(data) {
                return true
            };
            config.minInterval = config.minInterval || 0;
        },
        postUrl : function(url, target, inparams) {
            var sessionId = localStorage.getItem("sessionId");
            if (sessionId) {
                inparams = inparams || {};
                inparams.sessionId = inparams.sessionId || sessionId;
            }
            var urls = url.split("?");
            var param = "";
            if (urls.length > 1) {
                for (var i = 1; i < urls.length; i++) {
                    if (i == 1) {
                        param = urls[i];
                    } else {
                        param += "?" + urls[i];
                    }
                }
            }
            var form = $("<form></form>").attr("action", urls[0]).attr("target", target || "_self").attr("method", "post");
            while (param.indexOf("&amp;") >= 0) {
                param = param.replace(/&amp;/g, "&");
            }
            var params = param.split("&");
            if (params.length > 0) {
                for (var i = 0; i < params.length; i++) {
                    var temp = params[i];
                    if (temp || temp.split("=").length > 1) {
                        var tempLocation = temp.indexOf("=");
                        var input = $("<input>", {
                            type : "hidden",
                            name : temp.substr(0, tempLocation),
                            value : temp.substr(tempLocation + 1)
                        });
                        form.append(input);
                    }
                }
            }
            if (inparams) {
                for (pro in inparams) {
                	console.log(pro);
                    var input = $("<input>", {
                        type : "hidden",
                        name : pro,
                        value : inparams[pro]
                    });
                    form.append(input);
                }
            }
            form.appendTo("body");
            form.submit();
            form.remove();

        },
        drawFiveStar : function(selected, number, content,smaler) {

            for (var i = 0; i < selected; i++) {
                $("<span></span>").attr("class", "glyphicon glyphicon-star").appendTo(content)
            }
            for (var i = selected; i < number; i++) {
                $("<span></span>").attr("class", "glyphicon glyphicon-star grayStay").appendTo(content)
            }
            if(smaler&&parseFloat(smaler).toString()!=="NaN"){
                content.css({"transform": "scale("+smaler+")"});
                if(!content[0].style.transformOrigin){
                    content.css({"transform-origin": "5% 50%"})
                }
            }
            return content;
        },
        createFiveStar:function(selected,sum,multiple,starWidth){
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
        },
        createStars:function(selected,sum,multiple,starWidth){
            starWidth=starWidth||1.3;
            var rightReduce=1.3-starWidth;
            multiple=multiple||1;
            var content=$("<div></div>").css({"width":(1/multiple+0.5)*100+"%","text-align": "left"});
            var body=$("<div></div>").css({"display":"inline-block","vertical-align": "middle","overflow":" hidden","text-align":"left","width":sum*starWidth*multiple+"em"});
            for (var i = 0; i < selected; i++) {
                $("<span></span>").attr("class", "iconfont-star").css({"margin-right":-rightReduce+"em"}).appendTo(content);
            }
            for (var i = selected; i < sum; i++) {
                $("<span></span>").attr("class", "iconfont-star-empty").css({"margin-right":-rightReduce+"em"}).appendTo(content);
            }
            content.css({"transform-origin": "0 50%"});
            content.css({"transform": "scale("+multiple+")"});
            return body.append(content);
        },
        drawInfoTable : function(selector, param, data, leftWidth, paddingBottom) {
            var cols=param.cols;
            if(typeof param.bean=='function'){
                data=new param.bean(data);
            }
            selector = typeof selector == 'string' ? $(selector) : selector;
            if (!data || !cols || cols.length == 0) {
                return selector;
            }
            var table = $("<table></table>").attr("class", "infoTable").appendTo(selector);
            var row;
            for (var i = 0; i < cols.length; i++) {
                row = $("<tr></tr>");
                $("<td></td>").append(cols[i].show?(cols[i].show + ":"):"&nbsp;").width(leftWidth).appendTo(row);
                $("<td></td>").html(_getData(data, cols[i])).appendTo(row);
                row.appendTo(table);
                if (paddingBottom) {
                    row.find("td").css({
                        "padding-bottom" : paddingBottom
                    });
                }
            }
        },
        addInfoTableTitle:function(selector,title){
            $(selector).prepend($("<div></div>").html(title).attr("class","infoTableTitle"));
        },
        drawInfoList : function(selector, param, data, callBack) {
            selector = $(selector);
            content = selector.html("");
            content.addClass("tempTable");
            var cols = param.cols;
            var row = $("<div></div>").attr("class", "top row");
            for (var j = 0; j < cols.length; j++) {
                $("<div></div>").attr("class", "col-md-" + (cols[j].space ? cols[j].space : "1")).html(cols[j].show).appendTo(row).css({
                    "width" : cols[j].percentage ? (cols[j].percentage + "%") : ""
                });
            }
            row.appendTo(content);
            for (var i = 0; i < data.length; i++) {
                row = $("<div></div>").attr("class", "row");
                var col;
                var bean=param.bean?(new param.bean(data[i])):data[i];
                for (var j = 0; j < cols.length; j++) {
                    var appendObj = _getData(bean, cols[j]);
                    $("<div></div>").attr("class", "col-md-" + (cols[j].space ? cols[j].space : "1")).append(appendObj).appendTo(row).css({
                        "width" : cols[j].percentage ? (cols[j].percentage + "%") : ""
                    });
                    ;
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

        },
        ajax : function(param) {
            var sessionId = localStorage.getItem("sessionId");
            if (sessionId) {
                param.data = param.data || {};
                param.data.sessionId = param.data.sessionId || sessionId;
            } else {
                param.data.sessionId = '';
            }
            var oldSuccess = param.success;
            param.success = function(data) {
                var _data = data||{};
                if ( typeof data == 'string') {
                    try {
                        _data = JSON.parse(data);
                    } catch(e) {
                    }
                }
                if (_data.isRedirect) {
                	if(page&&page.stopRedirect){
                		if(page.initManager){
                			page.initManager.execute("loginit");
                			page.loginCallBack.execute("loginCallBack");
                		}
                	}else{
	                    if (_data.redirectUrl) {
	                        window.open(o.getOrigin() + o.getServerName() + _data.redirectUrl, "_self");
	                        return;
	                    }
                	}
                }
                if (oldSuccess) {
                    oldSuccess(data);
                }
            }
            $.ajax(param);
        },
        delayButton : function(obj, wait, disableShow, enableShow) {
            if (wait == 0) {
                obj.removeAttribute("disabled");
                wait = 60;
                if (obj.innerHTML != disableShow)
                    return;
                obj.innerHTML = enableShow || obj.innerHTML;
            } else {
                obj.setAttribute("disabled", true);
                enableShow = enableShow || obj.innerHTML;
                disableShow = obj.innerHTML = disableShow || obj.innerHTML;
                return setTimeout(function() {
                    o.delayButton(obj, 0, disableShow, enableShow)
                }, wait);
            }
        },
        fixToTop : function(selector, height) {
            selector = $(selector);
            var top = selector.offset().top;
            var width = selector.innerWidth();
            $(window).scroll(function() {//侦听滚动时
                var scrolls = $(this).scrollTop();
                if (scrolls > top - height) {//如果滚动到页面超出了当前元素element的相对页面顶部的高度
                    if (window.XMLHttpRequest) {//如果不是ie6
                        selector.css({//设置css
                            position : "fixed", //固定定位,即不再跟随滚动
                            top : height + "px", //距离页面顶部为0
                            width : width
                        });
                    } else {//如果是ie6
                        selector.css({
                            top : scrolls, //与页面顶部距离
                            "margin-top" : height + "px"
                        });
                    }
                } else {
                    selector.css({
                        position : "relative",
                        width : "",
                        top : 0
                    });
                }
            });
        },
        loadGoogleMap : function(callBack) {
        	if(FeishiUtil.loadScript){
        		FeishiUtil.loadScript("bom.beans.map",function(){
        			bom.beans.map.loadGoogleMap(callBack);
        		});
        	}else{
        		bom.beans.map.loadGoogleMap(callBack);
        	}
        },
        alert : function(notice, title, callBack) {
            var backgroud = $("<div></div>").css({
                "width" : "100%",
                "height" : "100%",
                "position" : "fixed",
                "top" : "0",
                "left" : "0",
                "font-size":"18px",
                "z-index" : "9999",
                "background-color" : "transparent"
            });
            var body = $("<div></div>").css({
                "position" : "absolute",
                "left" : "50%",
                "top" : "50%",
                "background" : "#FFF",
                "min-width" : "250px",
                "min-width" : "450px",
                "padding" : "0 15px 15px 15px",
                "border-radius" : "8px",
                "box-shadow" : "0 0 20px 0px #555"
            });
            var title = $("<div></div>").css({
                "line-height" : "1.4em",
                "padding" : " 0.5em 0 0.5em 0"
            }).html( title ? title : "Notice").attr("class", "titleInfo");
            var content = $("<div></div>").css({
                "background" : "#FFF",
                "line-height" : "1.4em",
                "padding" : "15px 0 2.8em 0",
                "word-wrap" : "break-word",
                "font-weight" : "700"
            }).html(notice);
            var button = $("<button></button>").attr("class", "btn").html("Confirm").css({
                "float" : "right",
                "padding": "0 0.8em",
                "border-radius": "8em",
                "line-height": "1.8em"
            }).click(function() {
                backgroud.remove();
                if ( typeof callBack == 'function') {
                    callBack();
                }
            });
            backgroud.appendTo($("body")).append(body.append(title).append($("<div></div>").attr({
                "class" : "breakLine"
            })).append(content).append(button));

            body.css({
                "margin-left" : (-body.width() / 2) + "px",
                "margin-top" : (-body.height() / 2) + "px"
            });
        },
        confirm : function(notice, title, trueCallBack, falseCallBack) {
            var backgroud = $("<div></div>").css({
                "width" : "100%",
                "height" : "100%",
                "position" : "fixed",
                "font-size":"18px",
                "top" : "0",
                "left" : "0",
                "z-index" : "9999",
                "background-color" : "transparent"
            });
            var body = $("<div></div>").css({
                "position" : "absolute",
                "left" : "50%",
                "top" : "50%",
                "background" : "#FFF",
                "min-width" : "250px",
                "min-width" : "450px",
                "padding" : "0 15px 15px 15px",
                "border-radius" : "8px",
                "box-shadow" : "0 0 20px 0px #555"
            });
            var title = $("<div></div>").css({
                "line-height" : "1.4em",
                "padding" : " 0.5em 0 0.5em 0"
            }).html( title ? title : "Confirm").attr("class", "titleInfo");
            var content = $("<div></div>").css({
                "background" : "#FFF",
                "line-height" : "1.4em",
                "padding" : "15px 0 2.8em 0",
                "word-wrap" : "break-word",
                "font-weight" : "700"
            }).html(notice);
            var cancelButton = $("<button></button>").attr("class", "btn").html("Cancel").css({
                "float" : "right"
            }).click(function() {
                backgroud.remove();
                if ( typeof falseCallBack == 'function') {
                    falseCallBack();
                }
            });
            var button = $("<button></button>").attr("class", "btn").html("Confirm").css({
                "float" : "right",
                "margin-right" : "15px"
            }).click(function() {
                backgroud.remove();
                if ( typeof trueCallBack == 'function') {
                    trueCallBack();
                }
            });
            backgroud.appendTo($("body")).append(body.append(title).append($("<div></div>").attr({
                "class" : "breakLine"
            })).append(content).append(cancelButton).append(button));

            body.css({
                "margin-left" : (-body.width() / 2) + "px",
                "margin-top" : (-body.height() / 2) + "px"
            });
        }
    };
    function _addRowClick(row, fun, data) {
        if (fun) {
            row.click(function() {
                fun(data);
            });
            row.css({
                "cursor" : "pointer"
            });
        }
    }

    function _getData(row, colrow) {
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
             if (cut) {
                result = $("<span></span>").html(result).cut(cut);
             }else{
                result=$("<span></span>").html(result).attr("title",result);
             }
            return result;
        }
    }
    function extend(a,b){
        for(c in b){
            a[c]=b[c];
        }
    }
    window.FeishiUtil=window.FeishiUtil||{};
    extend(FeishiUtil,o);
})(jQuery);
