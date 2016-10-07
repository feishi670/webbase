(function(){
    var o={
    	download:function(){
    		var url;
    		if(FeishiUtil.client.isAndroid()){
    			url=FeishiUtil.getRootUrl()+"/download/VideoCameraActivity.apk";
    		}else if(FeishiUtil.client.isIPhone()||FeishiUtil.client.isIPad()||FeishiUtil.client.isMac()){
    			url="https://itunes.apple.com/us/app/tvume/id1114700268?mt=8";
    		}else{
    			(FeishiUtil.alert||alert)("The client must be apple or Android!");
    			return;
    		}
    		if(navigator.userAgent.indexOf("MicroMessenger")!=-1){
    			url='http://a.app.qq.com/o/simple.jsp?pkgname=com.tvunetworks.android.anywhere&g_f=991653';
    		}
    		window.open(url,"_self");
    	},
    	getClientName:function(){
    		var clientName="iPhone";
    		switch(true){
    		case FeishiUtil.client.isAndroid():clientName="Android";break;
    		case FeishiUtil.client.isIPhone():clientName="iPhone"; break;
    		case FeishiUtil.client.isIPad():clientName="iPad"; break;
    		case FeishiUtil.client.isMac():clientName="Mac"; break;
    		case FeishiUtil.client.isWindow():clientName="Window"; break;
    		default:clientName="iPhone";
    		}
    		return clientName;
    	}
    }

    function extend(a,b){
        for(c in b){
            a[c]=b[c];
        }
    }
    window.AppUtil=window.AppUtil||{};
    extend(AppUtil,o);
})();