(function() {
    window.FeishiUtil = window.FeishiUtil || {};
    FeishiUtil.fixToTop = function(selector, height) {
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
    }
    FeishiUtil.fixToCenter = function(selector) {
        selector = $(selector);
        selector.css({
            "position" : "fix",
            "top" : "50%",
            "left" : "50%",
            "margin-top" : -selector.outerHeight() / 2 + "px",
            "margin-left" : -selector.outerWidth() / 2 + "px"
        });
    }
})();
