//回显自助餐答题列表
function renderQuesList(list){
	if(list != null){ 
		questionLength = list.length;
		$('.totalQuesNum').html('共' + questionLength + '题');
		for(var i=0;i<questionLength;i++){
			var index = i + 1,currentLoreId = list[i].currLoreId;
			//底部题号
			var li_index = ""; 
			if(index == 1){
				li_index =  "<li id='queIndex_"+index+"' class='quesCardNum active' onclick='showQuestionByIndex("+index+")'>"+ index +"</li>";//题库序列号li
			}else{
				li_index =  "<li id='queIndex_"+index+"' class='quesCardNum' onclick='showQuestionByIndex("+index+")'>"+ index +"</li>";//题库序列号li
			}
			$('#innerQuesCartUl').append(li_index);
			//核心区域内容
			var li_question = "";
			if(index == 1){
				li_question = "<li id='question_"+index+"' class='quesListLi' style='opacity:1;display:block;'></li>";//题库列表li-显示
			}else{
				li_question = "<li id='question_"+index+"' class='quesListLi'></li>";//题库列表li-隐藏
			}
			$('#quesAreaUl').append(li_question);
			//题型 题干
			var lqId_input_value = '<inpu type="hidden" id="loreQuestionId_input_'+ index +'" value="'+ list[i].lqId +'"/>';
			var mySelAns_input_value = '<input type="hidden" id="mySelAns_input_'+ index +'"/>';
			var queTypeSub_st = '<div class="queAnsBox"><div class="quesTypeSub">';
			var queTypeSub_titSt = '<strong class="quesTypeTxt">'+ index +'.'+ list[i].lqType +'</strong>';
			var queTypeSub_sub = '<div id="queSubBox_'+ index +'" class="queSubBox">'+ list[i].lqSub +'</div></div>';
			var quesOptions = '<div id="questionOption_'+ index +'" class="optionsBox"></div>';
			var quesTkWd = '<div id="tkWdWrap_'+ index +'" class="tkWdWrap"></div>';
			//myAnsOpt_ 我的解答针对填空选择题
			var quesTkxz = '<div id="tkxzWrap_'+ index +'" class="tkxzWrap"><div id="tkXzOpt_par_'+ index +'"></div><div id="myAnsOpt_'+ index +'" class="myAnsOpt"></div></div></div>';
			var quesCardArea = '<div id="questionSubmit_'+ index +'" class="quesCardArea"></div>';
			$("#question_"+index).append(lqId_input_value + mySelAns_input_value + queTypeSub_st + queTypeSub_titSt + queTypeSub_sub + quesOptions + quesTkWd + quesTkxz + quesCardArea);
			//判断题干这块是否还有图片
			var hasImgLen = $("#queSubBox_" + index).find('img').length;
			if(hasImgLen > 0){
				$('#queSubBox_' + index).find('img').each(function(k){
					$('#queSubBox_' + index).find('img').eq(k).attr('src', http_ + '/' + $('#queSubBox_' + index).find('img').eq(k).attr('src'));
				});
			}
		
			//生成随机答案选项数组(将随机答案选项添加到questionOption__index的dd标签中)
			var answerOptionArray = new Array();
			if(list[i].completeStatus == 1){//已经做过的题
				answerOptionArray = assignToArray(list[i].answerA,list[i].answerB,list[i].answerC,list[i].answerD,list[i].answerE,list[i].answerF);
			}else{//如果是没有做过的题，就需要将选项进行随机排列
				answerOptionArray = radomAnswerArray( assignToArray(list[i].answerA,list[i].answerB,list[i].answerC,list[i].answerD,list[i].answerE,list[i].answerF) );
			}
			var j = 0,answerA = "",answerB = "",answerC = "",answerD = "",answerE = "",answerF = "";
			
			if(list[i].answerA != ""){
				if(checkAnswerImg(list[i].answerA)){
					answerA = "<img src='"+ http_ +"/"+ answerOptionArray[j++] +"'/>";
				}else{
					answerA = answerOptionArray[j++];
				}
				var divOption = '<div id="1_'+ index +'" class="optionList" name="optionList_'+ index +'"><span class="optionsWord">A</span><div class="optionsCon">'+ answerA +'</div></div>';
				$('#questionOption_' + index).append(divOption);
			}
			if(list[i].answerB != ""){
				if(checkAnswerImg(list[i].answerB)){
					answerB = "<img src='"+ http_ +"/"+ answerOptionArray[j++] +"'/>";
				}else{
					answerB = answerOptionArray[j++];
				}
				var divOption = '<div id="2_'+ index +'" class="optionList" name="optionList_'+ index +'"><span class="optionsWord">B</span><div class="optionsCon">'+ answerB +'</div></div>';
				$('#questionOption_' + index).append(divOption);
			}
			if(list[i].answerC != ""){
				if(checkAnswerImg(list[i].answerC)){
					answerC = "<img src='"+ http_ +"/"+ answerOptionArray[j++] +"'/>";
				}else{
					answerC = answerOptionArray[j++];
				}
				var divOption = '<div id="3_'+ index +'" class="optionList" name="optionList_'+ index +'"><span class="optionsWord">C</span><div class="optionsCon">'+ answerC +'</div></div>';
				$('#questionOption_' + index).append(divOption);
			}
			if(list[i].answerD != ""){
				if(checkAnswerImg(list[i].answerD)){
					answerD = "<img src='"+ http_ +"/"+ answerOptionArray[j++] +"'/>";
				}else{
					answerD = answerOptionArray[j++];
				}
				var divOption = '<div id="4_'+ index +'" class="optionList" name="optionList_'+ index +'"><span class="optionsWord">D</span><div class="optionsCon">'+ answerD +'</div></div>';
				$('#questionOption_' + index).append(divOption);
			}
			if(list[i].answerE != ""){
				if(checkAnswerImg(list[i].answerE)){
					answerE = "<img src='"+ http_ +"/"+ answerOptionArray[j++] +"'/>";
				}else{
					answerE = answerOptionArray[j++];
				}
				var divOption = '<div id="5_'+ index +'" class="optionList" name="optionList_'+ index +'"><span class="optionsWord">E</span><div class="optionsCon">'+ answerE +'</div></div>';
				$('#questionOption_' + index).append(divOption);
			}
			if(list[i].answerF != ""){
				if(checkAnswerImg(list[i].answerF)){
					answerF = "<img src='"+ http_ +"/"+ answerOptionArray[j++] +"'/>";
				}else{
					answerF = answerOptionArray[j++]; 
				}
				var divOption = '<div id="6_'+ index +'" class="optionList" name="optionList_'+ index +'"><span class="optionsWord">F</span><div class="optionsCon">'+ answerF +'</div></div>';
				$('#questionOption_' + index).append(divOption);
			}
			var answerNumber = 0;
			var questionType_flag = false;//表示是问答和填空题
			if(list[i].lqType == "问答题" || list[i].lqType == "填空题"){
				$('#tkWdWrap_'+index).show();
				questionType_flag = true;
				answerNumber = 1;//只有错和对，所以赋值1;
				var tkwdBefore = '<div id="tkWdBefore_'+ index +'" class="tkWdBefore"">';
				tkwdBefore += '<div id="tkWdNoticeTxt_'+ index +'" class="tkWdNoticeTxt"><i class="iconfont icon-gonggao"></i><span>请拿出纸和笔验算一下，这道题考察的是你的解题规范和解题步骤，要认真验算！得出结果后点击验算完成即可!</span></div>';
				//验算完成显示正确答案并选择自己算的对或错
				tkwdBefore += '<div id="tkWdRightAns_'+ index +'" class="tkWdRightAns"><strong>正确答案：</strong><div class="rightTkWdAns">'+ replaceChara( list[i].realAnswer ) +'</div></div>';
				tkwdBefore += '<div id="tkWdMyAns_'+ index +'" class="tkWdMyAns"><strong>我的答案：<span class="noticeTxt">请如实填写</span></strong>';
				tkwdBefore += '<div class="selectTkWdAns clearfix">';
				tkwdBefore += '<div class="myWdAns"><p>正确</p><input type="radio" class="tkWdInpSel" name="answer_option_radio_'+ index +'1" value="1"/><span><i class="iconfont icon-duihao"></i></span></div>';
				tkwdBefore += '<div class="myWdAns"><p>错误</p><input type="radio" class="tkWdInpSel" name="answer_option_radio_'+ index +'1" value="0"/><span><i class="iconfont icon-duihao"></i></span></div></div></div>';
				tkwdBefore += '</div>';
				//提交之后 显示我的解答
				var myTkWdAnsRes = '<div id="myTkWdAnsRestBox_'+ index +'" class="mySelAnsRes"></div>';
				$("#tkWdWrap_"+index).append(tkwdBefore + myTkWdAnsRes);
			}else{
				questionType_flag = false;
				answerNumber = list[i].answerNum;
				for(var k = 1 ; k <= answerNumber ; k++){
					var number_new = index + "" + k;
					//填空选择题 几个空生成几层
					var option_div = '<div id="option_div_'+ number_new +'" class="listTkxz"></div>';										
					var answer_span = "<span class='titSpan'>选项"+k+":</span>"; 
					var answer_mainCon = "<div id='tkxzOpt_"+number_new+"' class='tkxzOpt'>";
					if(list[i].lqType == "填空选择题"){
						$('#tkXzOpt_par_' + index).append(option_div);
						$("#option_div_"+number_new).append(answer_span + answer_mainCon);
					}
					var jj = 0;
					for(var ii = 1 ; ii <= j ; ii++){
						var spanNumber = k + "" + ii + "_" + index;
						var answer_option_span = "<div id='tkxzOptList_"+spanNumber+"' class='tkxzOptList'></div>"; //填空选择题下使用
						var input_radio_value = answerOptionArray[jj++];
						var input_radio = "",tkXzOptCon='';
						if(list[i].lqType == "多选题"){
							//<input type="radio" name="optionsRad" />
							input_radio = "<input type='checkbox' class='selAnsInp_"+ index +"' onclick=choiceOption('"+list[i].lqType+"',"+ ii +","+index+") id='answer_option_radio_"+ index +"_"+ii+"' name='answer_option_radio_"+number_new+"' value='"+input_radio_value+"'/>";
						}else if(list[i].lqType == "填空选择题"){
							input_radio = "<input type='radio' id='answer_option_radio_"+ index +"_"+ii+"' class='spaceAnsRadio' name='answer_option_radio_"+number_new+"' value='"+input_radio_value+"'/>";
							tkXzOptCon = "<p id='answer_option_label_"+spanNumber+"'>"+ transOption(ii) +"</p><span><i class='iconfont icon-duihao'></i></span>";
						}else{
							input_radio = "<input type='radio' class='selAnsInp_"+ index +"' onclick=choiceOption('"+list[i].lqType+"',"+ ii +","+index+") id='answer_option_radio_"+ index +"_"+ii+"' name='answer_option_radio_"+number_new+"' value='"+input_radio_value+"'/>";
						}
						
						if(list[i].lqType == "单选题" || list[i].lqType == "多选题" || list[i].lqType == "判断题"){
							var input_lable_value = "<span id='answer_option_label_"+spanNumber+"' style='display:none;'>"+ transOption(ii) +"</span>";
							//$("#questionOption_"+index).append(input_radio + input_lable_value);
							$('#' + ii + '_' + index).append(input_radio + input_lable_value);
						}else if(list[i].lqType == "填空选择题"){
							$("#tkxzOpt_"+number_new).append(answer_option_span);
							$("#tkxzOptList_"+spanNumber).append(input_radio + tkXzOptCon);
						}
	
					}
					
					//多选题选择的答案
					var selectAnserValue = "<input type='hidden' id='selectMultAnsesr_"+index+"'/>";
					var selectLabelAnserValue = "<input type='hidden' id='selectLabelMultAnsesr_"+index+"'/>";
					if(list[i].lqType == "多选题"){
						$("#questionOption_"+index).append(selectAnserValue + selectLabelAnserValue);
					}
					
				}
	
			}
			//提交动作和显示结果
			var answer_array = arrayToJson(answerOptionArray);
			//提交按钮
			//var subMitBtn = "<span id='subQuesBtn_"+ index +"' onclick=submitAnswer('"+ list[i].lqType +"',"+ list[i].lqId +","+ index +","+ answerNumber +",'"+ escape(answer_array) +"') class='comSubBtn' style='display:block;'>提交</span>";
			var subMitBtn = "<button id='subQuesBtn_"+ index +"' onclick=submitAnswer('"+ list[i].lqType +"',"+ list[i].lqId +","+ index +","+ answerNumber +",'"+ escape(answer_array) +"') class='comSubBtn' style='display:block;'>提交</button>";
			//创建进入下一题按钮
			var nextNumber = index+1;
			var goNextBtn = '<span id="goNextBtn_'+ index +'" onclick=goNextQuestion('+ nextNumber +') class="comSubBtn">进入下一题</span>';
			//验算完成
			var showResBtn = '<span id="showResBtn_'+ index +'" class="comSubBtn" onclick=showResult('+ index +')>验算完成</span>';
			var doneBtn = '';
			if(i == questionLength - 1){//最后一题
				//最后一题 做完了
				//doneBtn = '<span id="doneBtn" onclick=lastSubmitAnswer('+ currentLoreId +',"'+ list[i].loreType +'") class="comSubBtn">做完了</span>';
				doneBtn = '<button id="doneBtn" onclick=lastSubmitAnswer('+ currentLoreId +',"'+ list[i].loreType +'") class="comSubBtn">做完了</button>';
			}
			//组合提交层 btn group
			$('#questionSubmit_' + index).append(subMitBtn + goNextBtn + showResBtn + doneBtn);
			if(questionType_flag){//问答和填空题
				//隐藏首次的提交按钮，出现验算完成按钮
				$("#subQuesBtn_"+index).hide();
				$("#showResBtn_"+index).show().css('display','block');
			}else{
				$("#subQuesBtn_"+index).show().css('display','block');
				$("#showResBtn_"+index).hide();
			}
			if(list[i].completeStatus == 1){//做过的题
				var questionType_temp = list[i].lqType;
				completeNum++;
				//列出答案和我的答案
				if(list[i].result == 1){//正确
					if(questionType_temp == "填空选择题"){
						//填空选择下我的解答
						var myAnsDOM = '<span>我的解答：</span><span>'+ list[i].myAnswer +'</span><i class="iconfont icon-duihao rightIcon"></i>';
						$('#tkXzOpt_par_' + index).hide();
						$('#myAnsOpt_' + index).show().html(myAnsDOM);
					}else if(questionType_temp == '多选题'){
						var myAnswerArray = list[i].myAnswer.split(",");
						for(var kk = 1 ; kk <= myAnswerArray.length ; kk++){
							var optionIndex_new = transOption_1(myAnswerArray[kk - 1]);
							$("#"+optionIndex_new+"_"+index).addClass("rightAns active");
						}
					}else if(questionType_temp == "问答题" || questionType_temp == "填空题"){
						$('#tkWdBefore_' + index).hide();
						$('#myTkWdAnsRestBox_' + index).show().html('<p>我的解答：</p><p class="rightAnsSta">回答正确</p>');
					}else{
						//单选题 判断题
						var optionIndex = transOption_1(list[i].myAnswer);
						$("#"+optionIndex+"_"+index).addClass("rightAns active");
					}
					currentAllQuestionFlag *= 1;
					$("#innerQuesCartUl li").eq(i).addClass("rightAns");
				}else if(list[i].result == 0){//0 做错
					if(questionType_temp == "填空选择题"){
						//填空选择下我的解答
						var myAnsDOM = '<span>我的解答：</span><span>'+ list[i].myAnswer +'</span><i class="iconfont icon-wrong wrongIcon"></i>';
						$('#tkXzOpt_par_' + index).hide();
						$('#myAnsOpt_' + index).show().html(myAnsDOM);
					}else if(questionType_temp == '多选题'){
						var myAnswerArray = list[i].myAnswer.split(",");
						for(var kk = 1 ; kk <= myAnswerArray.length ; kk++){
							var optionIndex_new = transOption_1(myAnswerArray[kk - 1]);
							$("#"+optionIndex_new+"_"+index).addClass("errorAns active");
						}
					}else if(questionType_temp == "问答题" || questionType_temp == "填空题"){
						$('#tkWdBefore_' + index).hide();
						$('#myTkWdAnsRestBox_' + index).show().html('<p>我的解答：</p><p class="errAnsSta">回答错误</p>');
					}else{
						//单选题 判断题
						var optionIndex = transOption_1(list[i].myAnswer);
						$("#"+optionIndex+"_"+index).addClass("errorAns active");
					}
					currentAllQuestionFlag *= 0;
					$("#innerQuesCartUl li").eq(i).addClass("errorAns");
				}
				//$("label[name='comLabelName_"+index+"']").removeAttr("ontouchend");
				$("#subQuesBtn_"+index).hide();//隐藏提交按钮DIV
				$('#showResBtn_' + index).hide();//验算完成按钮隐藏
				if(i == questionLength - 1){//表示是最后一题
					$("#doneBtn").show().css('display','block');//显示最后总提交按钮DIV
				}else{
					$("#goNextBtn_"+index).show().css('display','block');//显示下一题按钮DIV
				}
				lastCommitNumber++;
			}
		}
	
		$('.currQuesNum').html(1);
		$('.totalQuesNumCard').html(questionLength);
		perScale = completeNum / questionLength;
		if(currPageType == 'zhenduanPage_buff' || currPageType == 'zhenduanPage_hw'){
			$("#currPercentSp").css({"width":perScale * $(".totalPercent").width()});
		}else if(currPageType == 'studyPage_hw' || currPageType == 'studyPage_buff'){
			$("#moveLineDiv").animate({"width":$("#guidePoint").width()*4});
			$("#moveBox").animate({"left":app.getId("consolidKpBox").offsetLeft + comMoveWid_gg},function(){
				var cirLeft = "<span id='criLeft' class='comCirSpan'><i id='cirLeft_i' class='comCirSpan'></i></span>";
				var cirRight = "<span id='criRight' class='comCirSpan'><i id='cirRight_i' class='comCirSpan'></i></span>";
				var cirMask = "<span id='maskSpan'><i id='mask_i'></i></span>";
				$("#consolidKpBox").addClass("active");
				$("#consoSpan").html(cirLeft + cirRight + cirMask).css({"font-size":12,"background":"#4d47f1"});
				$("#mask_i").html(completeNum + "/"+questionLength);
			});
			
		}
		if($(".spaceAnsRadio").length > 0){
			choiceOptionAns($(".spaceAnsRadio"),"active");
		}
	}
}
//提交答案
function submitAnswer(lqType,lqId,value,answerNumber,answerOptionArray){
	var selectAnserValue_result = "";
	var selectAnserLableValue_result = "";
	var flag = false;
	var regS = new RegExp("\\Module/commonJs/ueditor/jsp/lore/","g");//替换所有带特殊符号的字符串
	var userInfo = JSON.parse( localStorage.getItem('userInfo') );
	if(lqType == '多选题'){
		var selectMultAnserValue = $("#selectMultAnsesr_"+value).val();
		if(selectMultAnserValue == ""){
			selectAnserValue_result = "";
			selectAnserLableValue_result = "";
			plus.nativeUI.toast('请选择答案');
			flag = false;
		}else{
			if( checkAnswerImg(selectMultAnserValue) ){
				//替换所有
				selectAnserValue_result += selectMultAnserValue.replace(regS,"") + ",";
			}else{
				selectAnserValue_result += selectMultAnserValue + ",";
			}
			selectAnserLableValue_result = $("#selectLabelMultAnsesr_"+value).val() + ",";
			console.log( 'selectAnserLableValue_result=' + selectAnserLableValue_result )
			flag = true;
		}
	}else{
		for(var i = 1 ; i <= answerNumber ; i++){
			var selectAnserValue = $("input[name='answer_option_radio_"+value+i+"']:checked").val();
			if(selectAnserValue == undefined){
				plus.nativeUI.toast('请选择答案');
				//清空数据
				selectAnserValue_result = "";
				selectAnserLableValue_result = "";
				flag = false;
				return;
			}else{
				if(checkAnswerImg(selectAnserValue)){
					selectAnserValue_result += selectAnserValue.replace(regS,"") + ",";
				}else{
					selectAnserValue_result += selectAnserValue + ",";
				}
				if(lqType == "问答题" || lqType == "填空题"){
					if(selectAnserValue_result == "1,"){
						selectAnserLableValue_result = "回答正确,";
					}else{
						selectAnserLableValue_result = "回答错误,";	
					}
				}else{
					var selectAnserRadioId = $("input[name='answer_option_radio_"+value+i+"']:checked").attr("id");
					var number1 = i;
					var number2 = selectAnserRadioId.replace("answer_option_radio_"+value+"_","");
					selectAnserLableValue_result += $("#answer_option_label_"+number1 + "" + number2+"_"+value).html() + ",";
				}
				flag = true;
			}
		}
	}
	if(flag){
		$('#subQuesBtn_' + value).css('background','#eee').attr('disabled',true).html('提交中...');
		selectAnserValue_result = delLastSeparator(selectAnserValue_result);
		selectAnserLableValue_result = delLastSeparator(selectAnserLableValue_result);
		if(currPageType == 'zhenduanPage_buff' || currPageType == 'studyPage_buff'){
			var field = {bsdId:globalBsdId,questionStep:value,myAnswer:escape( selectAnserLableValue_result ),answerOptionArray:answerOptionArray,
						lqId:lqId,userId:userInfo.userId};
			var url = http_ + '/buffetStudy.do?action=insertStudyInfo';
		}else if(currPageType == 'zhenduanPage_hw' || currPageType == 'studyPage_hw'){
			var field = {tjId:_self.tjId,questionStep:value,myAnswer:escape( selectAnserLableValue_result ),answerOptionArray:answerOptionArray,
						lqId:lqId,userId:userInfo.userId};
			var url = http_ + '/hw.do?action=insertStudyInfo';
		}
		//console.log( JSON.stringify( field ) )
		$.ajax({
			url : url,
			data:field, 
			dataType:'json',
			type:'post',
			timeout:10000,
			beforeSend : function(){
				app.showToast(1);
			},
			success:function(json){
				app.showToast(2);
				//console.log( JSON.stringify( json ) )
				if(json.result == 'success'){
					//json.studyStatus 0错 1对
					renderNowStudyInfo(json.studyResult,lqType,selectAnserLableValue_result,value);
					$("#subQuesBtn_"+value).hide();//隐藏提交按钮div
					if(value == questionLength){//表示最后一题
						$("#doneBtn").show().css('display','block'); //显示最后提交按钮div
						$("#goNextBtn_"+value).hide(); //隐藏下一题按钮div
					}else{
						$("#goNextBtn_"+value).show().css('display','block'); //显示下一题按钮div
					} 
					lastCommitNumber++;
					
				}else if(json.result == 'error'){
					plus.nativeUI.toast('服务器异常，请稍后重试~');
					$('#subQuesBtn_' + value).css('background','#4d47f1').attr('disabled',false).html('提交');
				}else if(json.result == 'reSubmit'){
					plus.nativeUI.toast('当前不能重复提交');
					$('#subQuesBtn_' + value).css('background','#4d47f1').attr('disabled',false).html('提交');
				}
			},
			error:function(xhr,type,errorThrown){
				app.showToast(2);
				plus.nativeUI.toast('服务器异常');
			}
		});				
	}
}
//每次提交后将当前做题正确错误的状态回显
function renderNowStudyInfo(studyResult,lqType,myAnswer,questionStep){
	if(studyResult == 0){//错
		if(lqType == '填空选择题'){
			var myAnsDOM = '<span>我的解答：</span><span>'+ myAnswer +'</span><i class="iconfont icon-wrong wrongIcon"></i>';
			$('#tkXzOpt_par_' + questionStep).hide();
			$('#myAnsOpt_' + questionStep).show().html(myAnsDOM);
		}else if(lqType == '多选题'){
			var myAnswerArray = myAnswer.split(",");
			for(var kk = 1 ; kk <= myAnswerArray.length ; kk++){
				var optionIndex_new = transOption_1(myAnswerArray[kk - 1]);
				$("#"+optionIndex_new+"_"+questionStep).addClass("errorAns active");
			}
		}else if(lqType == '问答题' || lqType == '填空题'){
			$("#tkWdBefore_"+questionStep).hide();
			$('#myTkWdAnsRestBox_' + questionStep).show().html('<p>我的解答：</p><p class="errAnsSta">回答错误</p>');
		}else{//单选题，判断题
			var optionIndex = transOption_1(myAnswer);
			$("#"+optionIndex+"_"+questionStep).addClass("errorAns active");
		}
		showTipInfo(0);
		currentAllQuestionFlag *= 0;
		$("#innerQuesCartUl li").eq(questionStep-1).addClass("errorAns");
	}else{//对
		if(lqType == '填空选择题'){
			var myAnsDOM = '<span>我的解答：</span><span>'+ myAnswer +'</span><i class="iconfont icon-duihao rightIcon"></i>';
			$('#tkXzOpt_par_' + questionStep).hide();
			$('#myAnsOpt_' + questionStep).show().html(myAnsDOM);
		}else if(lqType == '多选题'){
			var myAnswerArray = myAnswer.split(",");
			for(var kk = 1 ; kk <= myAnswerArray.length ; kk++){
				var optionIndex_new = transOption_1(myAnswerArray[kk - 1]);
				$("#"+optionIndex_new+"_"+questionStep).addClass("rightAns active");
			}
		}else if(lqType == '问答题' || lqType == '填空题'){
			$('#tkWdBefore_' + index).hide();
			$('#myTkWdAnsRestBox_' + index).show().html('<p>我的解答：</p><p class="rightAnsSta">回答正确</p>');
		}else{//单选题，判断题
			var optionIndex = transOption_1(myAnswer);
			$("#"+optionIndex+"_"+questionStep).addClass("rightAns active");
		}
		currentAllQuestionFlag *= 1;
		showTipInfo(1);
		$("#innerQuesCartUl li").eq(questionStep-1).addClass("rightAns");
	}
	$('.selAnsInp_' + questionStep).removeAttr('onclick');
	completeNum++;
	if(currPageType == 'zhenduanPage_buff' || currPageType == 'zhenduanPage_hw'){
		perScale = completeNum / questionLength;
		$("#currPercentSp").animate({"width":perScale * $(".totalPercent").width()});
	}else if(currPageType == 'studyPage_buff' || currPageType == 'studyPage_hw'){
		$("#mask_i").html(completeNum + "/"+questionLength);
		var num = completeNum * (360/questionLength);
		if(num <= 180){
			$("#cirRight_i").css('transform', "rotate(" + num + "deg)");
		}else{
			$("#cirRight_i").css('transform', "rotate(180deg)");
			$("#cirLeft_i").css('transform', "rotate(" + (num - 180) + "deg)");			
		}
	}
}
//判断当前知识点是否是第一级关联知识点(当第一级关联知识点一次完全通过时，启用该方法)
function checkFirstStepLore(currentLoreId){
	var flag = false;
	var pathArray = lorePath.split(":");
	for(var i = 1 ; i < pathArray.length; i++){//buffet编号去掉
		var pathDetailArray = pathArray[i].split("|");
		for(j = 0 ; j < pathDetailArray.length ; j++){
			if(currentLoreId == pathDetailArray[j]){
				if(i == 1){
					flag = true;
					break;
				}
			}
		}
	}
	return flag;
}