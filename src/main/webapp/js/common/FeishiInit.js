(function() {
    Date.prototype.Format = function(fmt) {// author: meizz
        var o = {
            "M+" : this.getMonth() + 1, // 月份
            "d+" : this.getDate(), // 日
            "h+" : this.getHours(), // 小时
            "m+" : this.getMinutes(), // 分
            "s+" : this.getSeconds(), // 秒
            "q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
            "S" : this.getMilliseconds()
            // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
})();
(function($) {
    $.fn.cut = function(number) {
        var html = this.html();
        if (html.length > number) {
            this.attr("title", html).html(html.substr(0, number - 3) + "...");
        }
        return this;
    }
    $.fn.addInnerToTitle = function() {
        this.attr("title", this.html());
        return this;
    }
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
})(jQuery);
/**
 * init localStorage
 * */
(function(){
	try{
		localStorage.setItem("test",localStorage.getItem("test"));
	}catch(e){
		(function(){
			var reslut={};
			window.localStorage={};
			localStorage.setItem=function(key,value){
				if(key){
					reslut[key]=value.toString();
				}
			};
			localStorage.getItem=function(key,value){
				return reslut[key.toString()];
			};
			localStorage.clear=function(){
				reslut={};
			};
		})();
	}
})();