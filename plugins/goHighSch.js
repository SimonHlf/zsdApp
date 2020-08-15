/**
 * 获取对象属性的值
 * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
 * @param {Object} obj 对象
 * @param {String} param 属性名
 */
function createNewMap(keyMap,oldObj){
	for(var i = 0;i < oldObj.length;i++){
		var obj = oldObj[i];
		for(var key in obj){
		   var newKey = keyMap[key];
			if(newKey){
				obj[newKey] = obj[key];
				delete obj[key];
			}
		}
	}
	return oldObj;
}
var _getParam = function(obj, param) {
	return obj[param] || '';
};
var townCode = 0,isHasTownFalg=true;
function switchNumToCHN(num){
	var currCHN = '';
	if(num == 1){
		currCHN = '一年级';
	}else if(num == 2){
		currCHN = '二年级';
	}else if(num == 3){
		currCHN = '三年级';
	}else if(num == 4){
		currCHN = '四年级';
	}else if(num == 5){
		currCHN = '五年级';
	}else if(num == 6){
		currCHN = '六年级';
	}else if(num == 7){
		currCHN = '七年级';
	}else if(num == 8){
		currCHN = '八年级';
	}else if(num == 9){
		currCHN = '九年级';
	}else if(num == 10){
		currCHN = '高一';
	}else if(num == 11){
		currCHN = '高二';
	}else if(num == 12){
		currCHN = '高三';
	}
	return currCHN;
}
function getGreadeClassList(stNum,endNum,pushObj,type){
	for(var i=stNum;i<=endNum;i++){
		var gradeObj = {};
		gradeObj.value = i;
		if(type=='grade'){
			gradeObj.name = switchNumToCHN(i);
		}else{
			gradeObj.name = i + '班';
		}
		pushObj.push(gradeObj);
	}
} 
var schTypeData = [
	{
		value: '1,5',
		name: '小学(五年制)'
	},
	{
		value: '1,6',
		name: '小学(六年制)'
	},
	{
		value: '2,3',
		name: '初中(三年制)'
	},
	{
		value: '2,4',
		name: '初中(四年制)'
	},
	{
		value: '3,3',
		name: '高中'
	}
];
var schTypeData_nt = [
	{
		value: '1',
		name: '小学'
	},
	{
		value: '2',
		name: '初中'
	},
	{
		value: '3',
		name: '高中'
	}
];
var gradeFive = [],gradeSix = [],gradeMidThree = [],gradeMidFour=[],gradeHigh=[],classList=[];
//生成1-5年级 (小学五年制)
getGreadeClassList(1,5,gradeFive,'grade');

//生成1-6年级 (小学六年制)
getGreadeClassList(1,6,gradeSix,'grade');
//console.log( JSON.stringify( gradeSix ) )
//生成7-9年级 (初中三年制)
getGreadeClassList(7,9,gradeMidThree,'grade');
//生成6-9年级 (初中四年制)
getGreadeClassList(6,9,gradeMidFour,'grade');
//生成高一-高三
getGreadeClassList(10,12,gradeHigh,'grade'); 
//生成班级
getGreadeClassList(1,20,classList,'class'); 
var classPicker = new mui.PopPicker();
classPicker.setData(classList);
var schTypePicker_nt = new mui.PopPicker();
schTypePicker_nt.setData(schTypeData_nt);
function resetInfo(){
	if(app.getId('schoolIdInp').value != ''){
		app.getId('showSchoolPicker').className = 'noSel';
		app.getId('schoolIdInp').value = '';
		app.getId('selSchoolTxt').innerText = '请选择学校';
		
		app.getId('gradePicker').className = 'noSel';
		app.getId('gradeNum').value = '';
		app.getId('gradeTxt').innerText = '请选择年级';
		
		app.getId('classPicker').className = 'noSel';
		app.getId('classInp').value = '';
		app.getId('classTxt').innerText = '请选择班级';
	}
}
(function(mui, doc) {
	mui.init();
	mui.ready(function() {
		var schTypePicker = new mui.PopPicker();
		schTypePicker.setData(schTypeData);
		var cityPicker3 = new mui.PopPicker({
			layer: 3
		}); 
		cityPicker3.setData(cityData);
		//选择城市 省市县
		var showCityPickerButton = doc.getElementById('showCityPicker3'),
			schoolTypeTxt = doc.getElementById('schoolTypeTxt'),
			schTypePickerBtn = doc.getElementById('schTypePicker'),
			cityResult3 = doc.getElementById('selTxt'),
			showTownPicker = doc.getElementById('showTownPicker'),
			selTownTxt = doc.getElementById('selTownTxt');
		var townPicker = new mui.PopPicker();
			showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker3.pickers[0].setSelectedName(proveCode); 
			setTimeout(function(){
				cityPicker3.pickers[1].setSelectedName(cityCode);
			});
			cityPicker3.show(function(items) { 
				cityResult3.innerText =  _getParam(items[0], 'name') + " " + _getParam(items[1], 'name') + " " + _getParam(items[2], 'name');
				showCityPickerButton.className = 'hasSel';
				str_prov = _getParam(items[0], 'name');
				str_city = _getParam(items[1], 'name');
				str_county = _getParam(items[2], 'name');
				townCode = _getParam(items[2], 'value');
				//清空之前已选择学校 年级 班级
				resetInfo();
				
				mui.ajax(http_ + '/baseInfo.do?action=getSpecTownData',{   
					dataType:'json', 
					data:{countyCode:townCode},
					type:'post',
					timeout:10000,
					beforeSend : function(){
						plus.nativeUI.showWaiting();
					},
					success:function(json){   
						plus.nativeUI.closeWaiting();
						if(json.result == 'success'){
							isHasTownFalg = true;
							var keyMap = {
								"townCode" : "value",
								"townName" : "name"
							}
							var res = createNewMap(keyMap,json.townList);
							//var res = json.townList.map(o=>{return{value:o.townCode, name:o.townName}});
							//装载对应的学校信息数据
							townPicker.setData(res);
							
							app.getId('showTownPicker').className = 'noSel';
							app.getId('selTownTxt').innerText = '请选择乡/镇/街道'; 
							str_town = '';
							
						}else if(json.result == 'noInfo'){
							str_town = '';
							isHasTownFalg = false;
							app.getId('showTownPicker').className = 'hasSel';
							selTownTxt.innerText = '此地区暂无乡/镇/街道';
							resetInfo();
						}
					},  
					error:function(xhr,type,errorThrown){ 
						plus.nativeUI.closeWaiting();
						console.log(type);  
					}  
				})
				
				//返回 false 可以阻止选择框的关闭
				//return false;
			}); 
		}, false);
		//选择乡镇 str_town
		showTownPicker.addEventListener('tap',function(){
			if(str_prov == ''){
				mui.toast('请选择省市县');
				return;
			}
			if(isHasTownFalg){
				townPicker.show(function(items) {
					str_town =  _getParam(items[0], 'name');
					selTownTxt.innerText = _getParam(items[0], 'name');
					app.getId('showTownPicker').className = 'hasSel';
					resetInfo();
				});
			}
		},false);
		
		//选择学段
		schTypePickerBtn.addEventListener('tap', function(event) {
			schTypePicker.show(function(items) {
				schoolTypeTxt.innerText = _getParam(items[0], 'name');
				str_schType = _getParam(items[0], 'value').split(',')[0];
				str_yearSys = _getParam(items[0], 'value').split(',')[1];
				schTypePickerBtn.className = 'hasSel';
				//每次选择了学段清空之前已经选择的学校
				resetInfo();
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
		 
		
		//学校选择
		document.querySelector('#showSchoolPicker').addEventListener('tap',function(){
			var selSchoolTxt = app.getId('selSchoolTxt'),schoolIdInp = app.getId('schoolIdInp');
			if(str_prov == ''){
				mui.toast('请选择省市县');
				return;
			}
			if(isHasTownFalg && str_town == ''){
				mui.toast('请选择乡/镇/街道');
				return;
			}  
			if(str_schType == ''){
				mui.toast('请选择学段');
				return;
			}
			var field = { prov:escape(str_prov),city:escape(str_city),county:escape(str_county),town:escape( str_town ),schoolType:str_schType,yearSystem:str_yearSys }
			//console.log( JSON.stringify( field ) )
			mui.ajax(http_ + '/baseInfo.do?action=getSchoolData',{   
				dataType:'json',//服务器返回json格式数据  
				data:field,
				type:'post',//HTTP请求类型  
				timeout:10000,//超时时间设置为10秒；  
				beforeSend : function(){
					plus.nativeUI.showWaiting();
				},
				success:function(json){   
					//setTimeout(function(){
					plus.nativeUI.closeWaiting();
					//},1000);
					if(json.result == 'success'){
						var keyMap = {
							"schoolId" : "value",
							"schoolName" : "name"
						}
						var res = createNewMap(keyMap,json.schList);
						//var res = json.schList.map(o=>{return{value:o.schoolId, name:o.schoolName}});
						//装载对应的学校信息数据
						var schoolPicker = new mui.PopPicker();
						schoolPicker.setData(res);
						schoolPicker.show(function(items) {
							selSchoolTxt.innerText = _getParam(items[0], 'name');
							schoolIdInp.value = _getParam(items[0], 'value');
							app.getId('showSchoolPicker').className = 'hasSel';
						});
					}else if(json.result == 'noInfo'){
						mui.toast('暂无学校');
					}
				},  
				error:function(xhr,type,errorThrown){ 
					plus.nativeUI.closeWaiting();
					console.log(type);  
				}  
			})
			
		});
		//年级选择
		app.getId('gradePicker').addEventListener('tap',function(){
			var schoolIdInp = app.getId('schoolIdInp'),gradeTxt = app.getId('gradeTxt'),gradeNum=app.getId('gradeNum');
			if(schoolIdInp.value == ''){
				mui.toast('请选择学校');
				return;
			}
			var gradePicker = new mui.PopPicker();
			if(str_schType == 1){//小学
				if(str_yearSys == 5){//五年制
					gradePicker.setData(gradeFive);
				}else if(str_yearSys == 6){//六年制
					gradePicker.setData(gradeSix);
				}
			}else if(str_schType == 2){//初中
				if(str_yearSys == 4){//四年制
					gradePicker.setData(gradeMidFour);
				}else if(str_yearSys == 3){//三年制
					gradePicker.setData(gradeMidThree);
				}
			}else if(str_schType == 3){//高中
				if(str_yearSys == 3){
					gradePicker.setData(gradeHigh);
				}
			}
			gradePicker.show(function(items) {
				gradeTxt.innerText = _getParam(items[0], 'name');
				gradeNum.value = _getParam(items[0], 'value');
				app.getId('gradePicker').className = 'hasSel';
			});
		});
		//班级选择
		app.getId('classPicker').addEventListener('tap',function(){
			var classTxt = app.getId('classTxt'),classInp = app.getId('classInp'),gradeNum = app.getId('gradeNum');
			if(gradeNum.value == ''){
				mui.toast('请选择年级');
				return;
			}
			classPicker.show(function(items) {
				classTxt.innerText = _getParam(items[0], 'name');
				classInp.value = _getParam(items[0], 'name');
				app.getId('classPicker').className = 'hasSel';
			});
		});
		
		
	});
})(mui, document);