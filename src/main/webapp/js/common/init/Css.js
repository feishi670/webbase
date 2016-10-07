(function(){
	function css(){
		this.styles = document.createElement ("style");
		document.getElementsByTagName ("head")[0].appendChild (this.styles);
		this.sheet = this.styles.sheet||this.styles.styleSheet;
		this.sheet.rules=this.sheet.rules||this.sheet.cssRules;
	}
	css.prototype={
		addRule:function(selector,style){
			selector=selecorFormat(selector);
			style=style||"";
			if(this.sheet.insertRule){
				this.sheet.insertRule(selector+"{"+style+"}",0);
			}else{
				this.sheet.addRule(selector,style,0);
			}
		},
		getRule:function(selector){
			selector=selecorFormat(selector);
			for(var i=0;i<this.sheet.rules.length;i++){
				if(selector==this.sheet.rules[i].selectorText){
					return this.sheet.rules[i];
				}
			}
			this.addRule(selector);
			return this.getRule(selector);
		}
	}
	window.Css=css;
	function selecorFormat(selector){
		return selector.replace(/\s+/g," ").replace(/:+/g,"::");
	}
})();