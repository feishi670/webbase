(function(){
	var opendDropdown={};
	window.FeishiInit=window.FeishiInit||{};
	if(FeishiInit.dropdown){
		return;//防止文件多次引用造成事件多次绑定。
	}
	FeishiInit.dropdown=true;
	$("body").on("click",function(e) {
		for (p in opendDropdown) {
			if ($(e.target).closest(opendDropdown[p].button).length == 0&& $(e.target).closest(opendDropdown[p].dropdown).length == 0) {
				opendDropdown[p].dropdown.removeClass("show");
				delete opendDropdown[p];
			}
		}
	});
	$("body").on("click",".dropdownBtn",function(e){
		if(window.condition){
			condition.checkElement.call(this,"dropdown",function(){
				dropdownBtnClick.call(this,e);
			})
		}else{
			dropdownBtnClick.call(this,e);
		}
	});
	function dropdownBtnClick(e){
		var button = $(this);
		var targetSelector
		var content;
		console.log(this);
		var key = button.attr("id")?button.attr("id"):(button.attr("id",("opendDropdown" + Math.random())),button.attr("id"));
		if(this.dataset.target){
			var selecor=this.dataset.target;
			if(!/(^[\.#].+)|([\s,][\.#].+)/.test(this.dataset.target)){
				selecor="#"+this.dataset.target;
			}
			targetSelector = $(selecor);
		}else{
			targetSelector=$(this).find(".dropdown");
			content=$(this).find(".dropdownContent");
			if(targetSelector.length==0){
				targetSelector=$(this).parent().find(".dropdown");
				content=$(this).parent().find(".dropdownContent");
			}
		}
		if(button.find(".notPop").length>0&&$(e.target).closest(button.find(".notPop")).length>0){
			return;
		}
		if(targetSelector.hasClass("notPop")&&$(e.target).closest(targetSelector).length>0){
			return;
		}
		if (targetSelector.hasClass("show")) {
			targetSelector.removeClass("show");
			delete opendDropdown[key];
		} else {
			targetSelector.addClass("show");
			opendDropdown[key]={button:button,dropdown:targetSelector};
		}
		if(content){
			targetSelector.each(function(){
				if($(this).closest(content).length>0){
					$(this).removeClass("show");
				}
			});
		}
	}
})();