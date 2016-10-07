!(function() {
	window.FeishiUtil = window.FeishiUtil || {};
	var opendDropdown = {};
	$("body").on("click",function(e) {
						for (p in opendDropdown) {
							if ($(e.target).closest(opendDropdown[p].button).length == 0
									&& $(e.target).closest(opendDropdown[p].dropdown).length == 0) {
								opendDropdown[p].dropdown.addClass("hide");
								delete opendDropdown[p];
							}
						}
					});
	window.FeishiUtil.dropdown = function(buttonSelector) {
		buttonSelector = $(buttonSelector);
		buttonSelector.each(function() {
			var button = $(this);
			var targetSelector = $("#" + this.dataset.target);
			var flag = this.dataset.controlOnly;
			var key = button.attr("id");
			key = key || ("opendDropdown" + Math.random());
			button.click(function() {
				if (flag) {
					targetSelector.toggleClass("hide");
					return;
				}
				if (targetSelector.hasClass("hide")) {
					targetSelector.removeClass("hide");
					opendDropdown[key]={button:button,dropdown:targetSelector};
				} else {
					targetSelector.addClass("hide");
					delete opendDropdown[key];
				}
				;
			});
		});
	};

})();