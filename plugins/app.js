//var http_ = "http://www.zsddx.cn";
var http_ = "http://192.168.1.105:8080";
var stu_role_id = 2,ntTea_role_id = 3,tea_role_id = 4,admin_role_id = 5,stuPar_role_id = 6;
var app = { 
	getId : function(id){
		return document.getElementById(id);
	},
	getName : function(name){
		return document.getElementsByName(name);
	},
	trim:function(str){
		return str.replace(/(^\s*)|(\s*$)/g, ""); 
	},
	//小于10补0
	appendZero : function(obj){
		if (obj < 10) {
		  return '0' + obj
		} else {
		  return obj
		}
	},
	focuBlurFun : function(obj){
		for(var i=0;i<obj.length;i++){
			obj[i].onfocus = function(){
				this.parentNode.classList.add('hasFoc');
			}
			obj[i].onblur = function(){
				this.parentNode.classList.remove('hasFoc');
			}
		}
	},
	//检测是否存在新消息/邮件
	checkEmailUnRead : function(){
		//getUnReadCount
		mui.ajax(http_ + '/email.do?action=getUnReadCount',{
			data:{userId:userInfo.userId},
			dataType:'json',
			type:'post', 
			timeout:10000,
			success:function(json){
				app.showToast(2);
				if(json.result == 'success'){
					if(json.unReadeCount > 0){
						app.getId('unReadMsg').style.display = 'block';
					}else{
						app.getId('unReadMsg').style.display = 'none';
					}
				}else if(json.result == 'error'){
					mui.toast('服务器错误');
				}
			},
			error:function(xhr,type,errorThrown){
				app.showToast(2);
				console.log(errorThrown)
			} 
		})
	},
	//由科目->图标
	switchIconBySubName : function(subName){
		var subIconClsName = '';
		if(subName == '语文'){
			subIconClsName = 'icon-yuwen';
		}else if(subName == '数学'){
			subIconClsName = 'icon-shuxue';
		}else if(subName == '英语'){
			subIconClsName = 'icon-yingyu';
		}else if(subName == '物理'){
			subIconClsName = 'icon-wuli';
		}else if(subName == '化学'){
			subIconClsName = 'icon-huaxue';
		}else if(subName == '地理'){
			subIconClsName = 'icon-dili';
		}else if(subName == '生物'){
			subIconClsName = 'icon-shengwu';
		}else if(subName == '历史'){
			subIconClsName = 'icon-lishi';
		}else if(subName == '生命科学'){
			subIconClsName = 'icon-shengmingkexue';
		}else if(subName == '科学'){
			subIconClsName = 'icon-kexue';
		}
		return subIconClsName;
	},
	//检测用户登录状态
	checkLoginStatus : function(userId,logStatus){
		var _this = this,currStatus=true;
		var loginView = plus.webview.getWebviewById('login');
		mui.ajax(http_ + '/baseInfo.do?action=checkUserLoginStatus',{   
			dataType:'json',
			data:{userId:userId,loginStatus:logStatus},
			async:false,
			type:'post',
			timeout:1000,
			success:function(json){   
				plus.nativeUI.closeWaiting();
				//console.log(JSON.stringify(json ))
				if(json.result == 'success'){
					currStatus = true; 
				}else if(json.result == 'loginOut'){//账号别处登录
					currStatus = false;
					mui.toast('您的账号已在别处登录！');
					mui.fire(loginView,"noLoginCheck",{opt:'noLogin_other'});//从app内除了人为退出为login页面绑定的opt
					_this.doLogin();
				}else if(json.result == 'sessionLose'){//长时间无操作
					//由于长时间无操作，请重新登录
					currStatus = false;
					mui.toast('由于您超过3天未登录，请重新登录');
					mui.fire(loginView,"noLoginCheck",{opt:'noLogin_other'});
					_this.doLogin();
				}else if(json.result == 'accountLock'){
					currStatus = false;
					mui.toast('您账号已被锁定，请联系管理员');
					mui.fire(loginView,"noLoginCheck",{opt:'noLogin_other'});
					_this.doLogin();
				}else if(json.result == 'accountError'){
					currStatus = false;
					mui.toast('请登录');
					mui.fire(loginView,"noLoginCheck",{opt:'noLogin_other'});
					_this.doLogin();
				}
			},   
			error:function(xhr,type,errorThrown){   
				plus.nativeUI.closeWaiting();
				//console.log(errorThrown);     
				mui.toast('服务器连接失败');
				currStatus = false;
			}
		});
		return currStatus;
	},
	checkLoginStaInfo : function(res,roleId){
		var loginView = plus.webview.getWebviewById('login');
		if(res == 'loginOut'){
			mui.toast('您的账号已在别处登录！');
			mui.fire(loginView,"noLoginCheck",{opt:'noLogin_other'});//从app内除了人为退出为login页面绑定的opt
		}else if(res == 'sessionLose'){
			//由于长时间无操作，请重新登录
			mui.toast('由于您超过3天未登录，请重新登录');
			mui.fire(loginView,"noLoginCheck",{opt:'noLogin_other'});
		}else if(res == 'accountLock'){
			mui.toast('您账号已被锁定，请联系管理员');
			mui.fire(loginView,"noLoginCheck",{opt:'noLogin_other'});
		}
		app.openwin('/login.html',{roleId:roleId});
	},
	//打开新窗口
	openwin : function(url,ex){
		mui.openWindow({
			url:url, 
			//id:Math.random(),
			id:url,
			//styles:{popGesture:'close'},
			extras:ex,
			show:{aniShow:'pop-in'},
			waiting:{autoShow:false,title:'加载中...'}
		});
	}, 
	isEmojiCharacter : function(substring){
		if(substring){
			for ( var i = 0; i < substring.length; i++) {
				var hs = substring.charCodeAt(i);
				if (0xd800 <= hs && hs <= 0xdbff) {
					if (substring.length > 1) {
						var ls = substring.charCodeAt(i + 1);
						var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
						if (0x1d000 <= uc && uc <= 0x1f77f) {
							return true;
						}
					}
				} else if (substring.length > 1) {
					var ls = substring.charCodeAt(i + 1);
					if (ls == 0x20e3) {
						return true;
					}
				} else {
					if (0x2100 <= hs && hs <= 0x27ff) {
						return true;
					} else if (0x2B05 <= hs && hs <= 0x2b07) {
						return true;
					} else if (0x2934 <= hs && hs <= 0x2935) {
						return true;
					} else if (0x3297 <= hs && hs <= 0x3299) {
						return true;
					} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
						|| hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
						|| hs == 0x2b50) {
						return true;
					}
				}
			}
		}
	},
	backFun : function(){ 
		this.getId('backBtn').ontouchend = function(){
			plus.webview.currentWebview().close('pop-out');
		};
	},
	showToast : function(opt,msg){
		if(opt == 1){
			plus.nativeUI.closeWaiting();
			//plus.nativeUI.showWaiting(msg == undefined ? '加载中...' : msg);
		}else{
			setTimeout(function(){
				plus.nativeUI.closeWaiting();
			},300);
		}
	},
	is_login : function(){
		if(localStorage.getItem("userInfo")){
			return true;
		}
		return false;
	}, 
	//统一登录处理 
	doLogin : function(){
		var login = plus.webview.getWebviewById("login");
		login.show("pop-in");		
	},
	checkAppVersion(isClickFlag){
		plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			//uni.setStorageSync('currVersion',widgetInfo.version);
			plus.storage.setItem("currVersion",inf.version);
			mui.ajax(http_ + '/baseInfo.do?action=getNewAppVersion',{
				data:{opt:'new'},
				dataType:'json',
				type:'post', 
				timeout:10000, 
				success:function(json){ 
					if(json.result == 'success'){
						if(inf.version != json.version){
							var btnArray = ['确定'];
							mui.confirm('系统检测到有最新版本,请下载升级', '版本更新提示', btnArray, function(e) {
								if(e.index == 0){
									if (plus.os.name.toLowerCase() == 'ios') {
										// 跳转到下载页面
										//plus.runtime.openURL(res.data.upgradeUrl)
										mui.toast({title: 'ios后续开放',icon:'none'});
									}else{
										var dtask = plus.downloader.createDownload(
											http_ + "/Module/appDown/zsd.apk",
											{method:"get"},
											function(d, status) {
												console.log(status)
												mui.toast('下载完成')
												// 下载完成
												if (status == 200) {
													plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, e => e, function(error) {
														mui.toast('安装失败');
													})
												} else {
													mui.toast('安装失败');
												}
											});
										try {
											dtask.start(); // 开启下载的任务
											var prg = 0;
											var showLoading = plus.nativeUI.showWaiting("正在下载");  //创建一个showWaiting对象 
											dtask.addEventListener('statechanged', function(
											  task,
											  status
											){
											  // 给下载任务设置一个监听 并根据状态  做操作
											  switch (task.state) {
												case 1:
												  showLoading.setTitle("正在下载");
												  break;
												case 2:
												  showLoading.setTitle("已连接到服务器");
												  break;
												case 3:
												  prg = parseInt(
													(parseFloat(task.downloadedSize) /parseFloat(task.totalSize)) *100
												  );
												  showLoading.setTitle("  正在下载" + prg + "%  ");
												  break;
												case 4:
												   plus.nativeUI.closeWaiting();
													//下载完成
												  break;
											  }
											});
										}catch (err) {
											plus.nativeUI.closeWaiting();
											mui.toast('安装失败');
										}
									}
								}
							});
						}else{
							if(isClickFlag){
								mui.toast('已是最新版本');
							}
						}
					}else if(json.result == 'noInfo'){
						
					}
				},
				error:function(xhr,type,errorThrown){
					app.showToast(2);
					console.log(errorThrown)
				} 
			});
		});
	}
};