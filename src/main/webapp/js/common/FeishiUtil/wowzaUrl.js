(function() {
	window.FeishiUtil = window.FeishiUtil || {};
	var urlKeyTest0 = /^(http|rtmp|rtsp)(.*)(\/playlist\.m3u8)$/;
	var urlKeyTest1 = /^(http|rtmp|rtsp)(.*)(\/playlist\.m3u8)?$/;
	var sourceKeyTest=/^.+(\/\w+\/|\/\w+\/mp4:)([\w\d]*)(\.mp4)?(\/playlist\.m3u8)?$/;
	FeishiUtil.wowzaUrl = function(url) {
		if (urlKeyTest0.test(url)||urlKeyTest1.test(url)) {
			this.urlKey = RegExp.$2;
		}
		if (sourceKeyTest.test(url)) {
			this.sourceKey = RegExp.$2;
		}
	};
	FeishiUtil.wowzaUrl.prototype = {
		getFlashUrl : function() {
			return "rtmp" + this.urlKey + "";
		},
		getAndroidUrl : function() {
			return "rtsp" + this.urlKey + "";
		},
		getAppleUrl : function() {
			return "http" + this.urlKey + "/playlist.m3u8";
		}
	}
})();