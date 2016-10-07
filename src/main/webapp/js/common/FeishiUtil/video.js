/**
 * Created by wendell on 2015-08-03.
 */
(function() {
    window.FeishiUtil = window.FeishiUtil || {};
    var playVideo=function(param){
        param=param||{};
        extendDefault(param,playVideo.param);
        if(!param.url||!param.selector){
            console.error("not enough param","url:",param.url,"selector:",param.selector);
            return;
        }
        param.selector=$(param.selector);
        var playType="html5";
        var url=param.url;
        if(param.type=="wowza"){
            var URL=new FeishiUtil.wowzaUrl(param);
            if(FeishiUtil.client.isWindow()){
                url=URL.getFlashUrl();
                playType="flash";
            }else if(FeishiUtil.client.isMac()){
            	if(FeishiUtil.client.isChrome()){
                    url=URL.getFlashUrl();
                    playType="flash";
            	}else{
            		url=URL.getAppleUrl();
            		playType="html5";
            	}
            }else if(FeishiUtil.client.isIPhone()||FeishiUtil.client.isIPad()){
                url=URL.getAppleUrl();
                playType="html5";
            }else if(FeishiUtil.client.isAndroid()){
                url=URL.getAndroidUrl();
                playType="html5";
            }else if(FeishiUtil.client.isMobile()){
                url=URL.getAppleUrl();
                playType="html5";
            }else{
                url=URL.getFlashUrl();
                playType="flash";
            }
        }
        var playParam={
            url:url,
            selector:param.selector,
            controlBarShow:!(param.controlBarShow==false)
        };
//        console.log(playParam);
        extendDefault(playParam,param);
//        $("#videoresult").html("playType:"+playType+";url:"+url);
        if(playType=="html5"){
        	return createVideo(playParam);
        }else if(playType=="flash"){
            return createFlashVideo(playParam);
        }
    }
    FeishiUtil.playVideo=playVideo;
    FeishiUtil.wowzaUrl=function(param){
    	var url=param.url;
    	var key=param.urlLevel||"";
        var test=[/(http|rtmp|rtsp)(.*)(\/playlist\.m3u8)/,/(http|rtmp|rtsp)(.*)(\/playlist\.m3u8)?/];
        if(test[0].test(url)||test[1].test(url)){
            this.urlKey=RegExp.$2;
        }
        if(this.urlKey){this.urlKey+=key}
    };
    FeishiUtil.wowzaUrl.prototype={
        getFlashUrl:function(){
            return "rtmp"+this.urlKey+"";
        },
        getAndroidUrl:function(){
            return "http"+this.urlKey+"/playlist.m3u8";
        },
        getAppleUrl:function(){
            return "http"+this.urlKey+"/playlist.m3u8";
        }
    }
    function createVideo(param){
        var element=$("<video webkit-playsinline x-webkit-airplay='allow'></video>");
        element.attr("src",param.url);
        element.attr("autoplay","autoplay");
        element.attr("controls",!!param.controlBarShow);
        element.css({"height":"100%","width":"100%"});
        param.selector.html("").append(element);
        bindFunctionForVideo(element);
        return element;
    }
    function bindFunctionForVideo(element){
    	element.changeVolume=function(i){
    		element.volume=i;
    	}
    	element.changeFace=function(i){
    		element.controls=!i;
    	}
    }
    function createFlashVideo(param){
    	var setUp=[1,0,1,1,1,2,0,1,0,0,1,1,300,0,2,1,0,1,1,1,2,10,3,0,1,2,3000,0,0,0,0,0,1,1,1,0,1,250,0,90,0,0];
        var id=param.selector.attr("id")||(param.selector.attr("id","id"+Math.random()),param.selector.attr("id"));
        var key="videoId"+(Math.random()+"").replace(".","");
        window.playerCallback=window.playerCallback||{};
        playerCallback[key]={};
        playerCallback[key].loadedHandler=function(){
            CKobject.getObjectById(key).addListener('error',"playerCallback['"+key+"'].onError");
            CKobject.getObjectById(key).addListener('sendNetStream',"playerCallback['"+key+"'].onGetStream");
            CKobject.getObjectById(key).addListener('buffer',"playerCallback['"+key+"'].buffer");
        }
        playerCallback[key].onError=param.onError||function(){};
        playerCallback[key].onGetStream=param.onGetStream||function(){};
        playerCallback[key].buffer=param.buffer||function(){};
        var flashvars={
            f:param.url,
            c:0,
            e:0,
            p:1,
            loaded:"playerCallback['"+key+"'].loadedHandler"
        };
        var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
        if(!param.controlBarShow){
        	setUp[28]=2;
        }else{
        	setUp[28]=0;
        }
        if(param.record){
        	setUp[1]=1;
        	setUp[17]=1;
        	setUp[31]=1;
        	setUp[32]=1;
        	setUp[35]=1;
        }
        console.log("param.controlBarShow",param.controlBarShow);
        if(window.ckstyle){
        	ckstyle.setUp=setUp.join(",");
        }
        CKobject.embedSWF(FeishiUtil.getRootUrl()+'/ckplayer/ckplayer.swf',id,key,'100%','100%',flashvars,params);
        var video=CKobject.getObjectById(key);
        video.key=key;
        return video;
    }
    function extendDefault(a,b){
       for(c in b){
           a[c]=a[c]||b[c];
       }
    }
    playVideo.param={
        type:"wowza"
    };
})();