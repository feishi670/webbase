/**
 * Created by wendell on 2015-08-03.
 */
(function() {
    window.FeishiUtil = window.FeishiUtil || {};
    var platform=window.navigator.platform;
    var userAgent=window.navigator.userAgent;
    FeishiUtil.client={
        platform:window.navigator.platform,
        userAgent:window.navigator.userAgent,
        isWindow:function(){
            return platform.indexOf("Win")>=0;
        },
        isMac:function(){
            return platform.indexOf("Mac")>=0;
        },
        isIPad:function(){
            return platform.indexOf("iPad")>=0;
        },
        isIPhone:function(){
            return platform.indexOf("iPhone")>=0;
        },
        isAndroid:function(){
            return (platform.indexOf("Linux")>=0&&userAgent.indexOf("Mobile")>=0)||(userAgent.indexOf("Android")>=0);
        },
        isMobile:function(){
            return userAgent.indexOf("Mobile")>=0;
        },
        isChrome:function(){
            return userAgent.indexOf("Chrome")>=0;
        }
    };
})();