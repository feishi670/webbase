(function(){
    function deviceUtil(platform){
        this.platform=platform;
    }
    deviceUtil.prototype={
        getName:function(){
            _getName(this.platform);
        },
        getType:function(){
            _getType(this.platform);
        }
        
    };
    window.deviceUtil=window.deviceUtil||{};
    var deviceTypeObj = {
    1 : "tm2000",
    2 : "tm8000",
    3 : "tm8100",
    4 : "tm2100",
    5 : "android-old",
    6 : "tm8200-sdi",
    7 : "tm8200-hdmi",
    8 : "tm5000",
    9 : "tm5000-se",
    10 : "iOS",
    "10.5" :"device",
    11 : "android",
    12 : "win",
    13 : "mac",
    14 : "wp",
    15 : "TM8200:MiniRecorder",
    20 : "TM8300:MiniRecorder",
    21 : "TM8300:SDI",
    22 : "TM8300:HDMI",
    24 : "TM8300",
    26 : "minirecorder",
    27 : "sdi card",
    28 : "HDMI card",
    29 : "studio card",
    30 : "TE3200 serial",
    31 : "minirecorder",
    32 : "sdi card",
    33 : "HDMI card",
    34 : "TE4200 serial",
    35 : "TE4200 serial"
    }; 
    function _getName(platform){
        var result=deviceTypeObj[platform];
        return result||"device";
    }
    function _getType(platform){
        platform=platform||"10";
        platform=parseInt(platform);
        if(platform<10||platform>14){
            return "TVUPack";
        }else if(platform==12||platform==13){
            return "IP camera";
        }else{
            return "Anywhere";
        }
    }
    
    deviceUtil.getName=_getName;
    deviceUtil.getType=_getType;
})();
