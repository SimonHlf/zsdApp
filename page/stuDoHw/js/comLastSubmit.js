//最后提交
function lastSubmitAnswer(currentLoreId,loreTypeName){
	var step_new = 0; 
	var userInfo = JSON.parse( localStorage.getItem('userInfo') );
	if(lastCommitNumber == questionLength){
		$('.maskLayer').show();
		if(currPageType == 'zhenduanPage_hw'){
			if(loreTypeName == "再次诊断"){
				step_new = 3;
				if(currentAllQuestionFlag == 1){//表示当前题型全部正确
					//step:stepComplete:isFinish:access
					updateLogStatus(step_new,0,1,1,currentLoreId,loreTypeName);
				}else{
					updateLogStatus(step_new,0,1,2,currentLoreId,loreTypeName);//部分正确，需要进入5部学习法
				}
			}else{
				if(currentAllQuestionFlag == 1){//表示当前题型全部正确
					//access:1--当前级全部正确，2:当前级部分正确或者无正确
					//step1:诊断时如果是本知识典直接全部正确，那么修改isfinish为2，stepComplete为1，access为1
					//step2:诊断时如果是关联知识点当前级全部正确。（转向学习状态）isfinish为1，stepComplete为1，access为1
					//step=0:表示不修改step的值
					if(checkFirstStepLore(currentLoreId)){//当第一级关联知识点一次完全通过时
						updateLogStatus(4,1,2,1,currentLoreId,loreTypeName);
					}else{
						//是第二级或者二级以后的关联知识点当前级全部正确，需要走到第三阶段，关联性诊断的学习阶段
						updateLogStatus(0,1,1,1,currentLoreId,loreTypeName);	
					}
				}else{//表示当前题型没有全部正确(继续往下级子知识点)
					if(checkLoreId(currentLoreId)){
						//表示返钱知识点的关联性诊断已经完成，需要走到第三阶段，关联性诊断的学习阶段
						updateLogStatus(0,1,1,2,currentLoreId,loreTypeName);
					}else{//第1个参数表示：当前知识点的关联性诊断还未完成
						updateLogStatus(0,0,1,2,currentLoreId,loreTypeName);
					}
				}
			}
			//执行跳转
			var field = {userId:userInfo.userId,tjId:_self.tjId};
			app.openwin('traceBackList.html',{field:field,currPage:currPage,currPos:currPos});
			var quesPage = plus.webview.currentWebview();
			setTimeout(function(){
				$('.maskLayer').hide();
				quesPage.close('none');
			},500);
		}else if(currPageType == 'studyPage_hw'){
			step_new = 3;//永远保持为3
			updateLogStatus(step_new,0,1,3,currentLoreId,loreTypeName);	
			//执行跳转
			var field = {userId:userInfo.userId,tjId:_self.tjId};
			app.openwin('traceBackList.html',{field:field,currPage:currPage,currPos:currPos}); 
			var studyPage = plus.webview.currentWebview();
			var stepWel = plus.webview.getWebviewById('studyWelcome.html');
			setTimeout(function(){
				$('.maskLayer').hide();
				stepWel.close('none');
				studyPage.close('none');
			},500);
		}
		
	}else{
		plus.nativeUI.toast('您还有试题没做完，请做完再提交！');
	}
}
function updateLogStatus(step,stepComplete,isFinish,access,currentLoreId,loreTypeName){
	var currentStepLoreArray = _self.nextLoreIdArray;
	var type = loreTypeName == '巩固训练' ? 'study' : 'diagnosis';
	var field = {tjId:_self.tjId,userId:_self.userId,step:step,stepComplete:stepComplete,isFinish:isFinish,access:access,type:type,currentLoreId:currentLoreId};
	//tjId,userId(移动端传递),stepComplete,isFinish,access,step,type,currentLoreId
	$.ajax({
		type:"post",
		async:false,
		dataType:"json",
		data:field,
		url:http_ + "/hw.do?action=updateLogStatus",
		success:function (json){ 
			app.showToast(2);
			if(json.result == 'success'){
			}else if(json.result == 'error'){
				plus.nativeUI.toast('服务器异常');
			}
		}
	});
}