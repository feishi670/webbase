(function(){
	window.condition=window.condition||{};
	var rule={
			login:function(callBack){
				beans.user.isLogin(function(user){
					console.log(user)
					if(!user){
						page.initManager.execute("login");
//						FeishiUtil.confirm("Login required!Login immediately!",null,function(){
//						});
					}
					callBack(!!user);
				});
			},
			hasR:function(callBack){
				beans.device.getUserR(function(rList){
					if(!rList.length){
						if(FeishiUtil.notice){
							FeishiUtil.notice({
								title:"Warning",
								description:"You need own TVU Receiver,go device manager to add it!!",
								funs:{
									"Lean more":function(){
										window.open("http://www.tvunetworks.com/products/receivers/","_blank");
									},
									"Add Receiver":function(){
										FeishiUtil.postUrl(FeishiUtil.getRootUrl()+"/device.jsp","_self");
										return "close";
									}
								}
								});
						}else{
							FeishiUtil.confirm("You need own TVU Receiver,go device manager to add it!!",null,function(){
								FeishiUtil.postUrl(FeishiUtil.getRootUrl()+"/device.jsp","_self");
							});
						}
					}
					callBack(!!rList.length);
				});
			},
			hasT:function(callBack){
				beans.device.getUserT(function(tList){
					if(!tList.length){
						FeishiUtil.confirm("User must has T,go device manager to add it!!",null,function(){
							FeishiUtil.postUrl(FeishiUtil.getRootUrl()+"/device.jsp","_self");
						});
					}
					callBack(!!tList.length);
				});
			},
			isAdmin:function(callBack){
				if(!page.loginCallBack.user.isAdmin){
					FeishiUtil.alert("You have no right to do this. it needs administrator power.!",null,function(){
						FeishiUtil.postUrl(FeishiUtil.getRootUrl()+"/","_self");
					});
				}else{
					callBack(true);
				}
			}
	};
	condition.checkElement=function(type,fun){
		var thisObj=this;
		if(this.dataset.precondition&&((!this.dataset.conditionType&&(this.dataset.conditionType=type))||this.dataset.conditionType==type)){
			condition.preCheck(this.dataset.precondition,function(){
				fun.call(thisObj);
			});
		}else{
			fun.call(this);
		}
	}
	condition.preCheck=function(key,callBack){
		var thisObj=this;
//		console.log("preCheck",key,callBack)
		var keys=key.split(",");
		var newcallback=function(status){
			if(i==-1){
				return;
			}
			if(status){
				i--;
			}else{
				i=-1;
			}
			if(i==0){
				callBack.call(thisObj);
			}
		}
		var i=1;
		for (var j = 0; j < keys.length; j++) {
			if(rule[keys[j]]){
				i++;
				rule[keys[j]](newcallback);
			}
		}
		i--;//防止同步验证立即执行。
		if(i==0){
			i--;
			callBack();
		}
	};
})();