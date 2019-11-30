var userInfo = JSON.parse( localStorage.getItem('userInfo') );
var compStatus = [
	{"type":0,"value":"全部"},
	{"type":1,"value":"未完成"},
	{"type":2,"value":"已完成"}
];
var pubStatus = [
	{"type":2,"value":"全部"},
	{"type":0,"value":"未发布"},
	{"type":1,"value":"已发布"}
];
var comMet = {
	//加载学科
	loadSubject : function(){
		mui.ajax(http_ + '/baseInfo.do?action=getSelfSubjectData',{
			data:{userId:userInfo.userId,roleId:userInfo.roleId},
			dataType:'json',
			type:'post',
			timeout:10000,
			success:function(json){
				if(json.result == 'success'){
					new MobileSelect({
						trigger: '#subTxt',
						title: '请选择学科',
						wheels: [ 
							{data: json.subList}
						],
						position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
						transitionEnd:function(indexArr, data){},
						keyMap:{"id":"subId","value":"subName"},
						callback:function(indexArr, data){
							app.getId('currSubId').value = data[0].subId;
						}
					});
				}else if(json.result == 'noInfo'){
					plus.nativeUI.toast('暂无科目信息');
				}
			},
			error:function(xhr,type,errorThrown){
			} 
		});
	},
	showPickDate : function(obj){
		var dDate = new Date();
		if(app.getId(obj).value != ''){
			var curr = app.getId(obj).value.split('-');
			dDate.setFullYear(curr[0],(curr[1]-1),curr[2]);
		}
		plus.nativeUI.pickDate(function(e) { 
			var d = e.date,currDate=''; 
			currDate = d.getFullYear() + "-" + app.appendZero( (d.getMonth() + 1) ) + "-" + app.appendZero( d.getDate() );
			app.getId(obj).value = currDate;
		}, function(e) {
		}, {  
			title: "请选择日期",
			date : dDate
		});
	},
	assignToArray : function(optionA,optionB,optionC,optionD,optionE,optionF){
		var array = new Array();
		var i = 0;
		if(optionA != ""){
			array[i++] = optionA;
		}
		if(optionB != ""){
			array[i++] = optionB;
		}
		if(optionC != ""){
			array[i++] = optionC;
		}
		if(optionD != ""){
			array[i++] = optionD;
		}
		if(optionE != ""){
			array[i++] = optionE;
		}
		if(optionF != ""){
			array[i++] = optionF;
		}
		return array;
	},
	checkAnswerImg : function(answer){
		if(answer.indexOf("jpg") > 0 || answer.indexOf("gif") > 0 || answer.indexOf("bmp") > 0 || answer.indexOf("png") > 0){
			return true;
		}
		return false;
	}
};