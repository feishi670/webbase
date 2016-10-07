(function() {
    window.FeishiUtil = window.FeishiUtil || {};
    FeishiUtil.cookie = function(name, value, options) {
        if ( typeof value != "undefined") {
            options = options || {};
            if (value === null) {
                value = "";
                options = $.extend({}, options);
                options.expires = -1;
            }
            var expires = "";
            if (options.expires && ( typeof options.expires == "number" || options.expires.toUTCString)) {
                var date;
                if ( typeof options.expires == "number") {
                    date = new Date();
                    date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1e3);
                } else {
                    date = options.expires;
                }
                expires = "; expires=" + date.toUTCString();
            }
            var path = options.path ? "; path=" + options.path : "";
            var domain = options.domain ? "; domain=" + options.domain : "";
            var secure = options.secure ? "; secure" : "";
            document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != "") {
                var reg=new RegExp("^(.*;)*\\s*"+name+"=([^;]+)"+"[;|$]")
                if(reg.test(document.cookie)){
                    cookieValue=RegExp.$2;
                }
            }
            return cookieValue;
        }
    };
})();
