(function(){
window.FeishiUtil=window.FeishiUtil||{};
        FeishiUtil.getOrigin = function() {
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
        }
        FeishiUtil.getPathName=function(){
            if(!location.pathname){
                location.pathname=location.toString().replace(/https?:\/\/?[^\/]+(:\d+)?/g,''); 
            }
            return location.pathname;
        }
        
        FeishiUtil.getServerName=function() {
        	var result=localStorage.getItem("tvuMeService");
        	if(result){
        		return result;
        	}
        	o.setServerName();
            return localStorage.getItem("tvuMeService") || '/tvumeservice';
        },
        FeishiUtil.setServerName =function(ralativePath) {
        	ralativePath=ralativePath||"";
        	if(ralativePath){
        		ralativePath=ralativePath.split("").reverse().join("");
        	}
        	if(!location.pathname){
        		location.pathname=location.toString().replace(/[^:]*:\/\/[^\/]+/g,''); 
        	}
        	var serverName=location.pathname.substr(0,location.pathname.lastIndexOf("/"))+ralativePath;
        	localStorage.setItem("tvuMeService",serverName);
        },
        FeishiUtil.getRootUrl=function(){
            return FeishiUtil.getOrigin()+FeishiUtil.getServerName();
        }
})();