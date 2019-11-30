//做对做错提示信息
function showTipInfo(opt){
	if(opt == 0){
		$('.rightErrorImg').removeClass('rightImg').addClass('errorImg');
		$('.infoState').removeClass('rightState').addClass('errState');
		$('.tipIcon').addClass('icon-cry').removeClass('icon-xiaolian');
		$('.infoState').find('span').html('很遗憾你答错了！');
		$('.info').html('胜不骄败不馁，再接再厉取得好成绩');
		$("#tipInfoBox").animate({'bottom':0},500);
	}else{
		$('.rightErrorImg').removeClass('errorImg').addClass('rightImg');
		$('.infoState').removeClass('errState').addClass('rightState');
		$('.tipIcon').addClass('icon-xiaolian').removeClass('icon-cry');
		$('.infoState').find('span').html('恭喜你答对了！');
		if(currPageType == 'zhenduanPage' || currPageType == 'zhenduanPage_buff' || currPageType == 'zhenduanPage_hw' || currPageType == 'buffetPage' || currPageType == 'hwQueListPage'){
			$('.info').html('恭喜答对了,获得10金币奖励');
		}else if(currPageType == 'studyPage' || currPageType == 'studyPage_hw' || currPageType == 'studyPage_buff'){
			$('.info').html('恭喜答对了,继续加油哦~');
		}
		$("#tipInfoBox").animate({'bottom':0},500);
	}
	$("#tipInfoBox").css({
		"-webkit-transform":"translateY(0)",
		"transform":"translateY(0)"
	});
	setTimeout(function(){
		$("#tipInfoBox").css({
			"-webkit-transform":"translateY(3rem)",
			"transform":"translateY(3rem)" 
		});
	},1000);
}
//问答题和填空题时显示答案
function showResult(index){
	$("#tkWdNoticeTxt_"+index).hide();//隐藏提示
	$("#showResBtn_"+index).hide();//隐藏验算完成按钮(显示正确答案)
	$("#tkWdRightAns_"+index).show();//显示正确答案和结果
	$("#tkWdMyAns_"+index).show();
	$("#subQuesBtn_"+index).show();//显示提交按钮
	choiceOptionAns($(".tkWdInpSel"),"active");
}
//根据底部答题卡题号切换对应题
function showQuestionByIndex(number){
	$(".quesListLi").hide().css({"opacity":0});
	$("#question_"+number).show().animate({"opacity":1},200);
	$(".quesCardNum").removeClass("active");
	$("#queIndex_"+number).addClass("active");
	$(".layer").hide();
	$("#quesCardList").removeClass("animation").addClass("animationClose");
	$(".currQuesNum").html(number);
	if(currPageType == 'zhenduanPage'){
		$('.jiucuoBtn').hide();
		$('#jiucuoBtn_' + number).show();
	}
}
//单选题，多选题，判断题选中状态
function choiceOption(quesType,optionIndex,number){
	if(quesType == "单选题" || quesType == "判断题"){
		$("div[name='optionList_"+ number +"']").removeClass("active");
		$("#"+optionIndex+"_"+number).addClass("active");
	}else if(quesType == "多选题"){
		var currSelectAnswer = $("#selectMultAnsesr_"+number).val();
		var currSelectLabelValue = $("#selectLabelMultAnsesr_"+number).val();
		var objInp = $("#answer_option_radio_" + number + "_" + optionIndex);
		var objInpVal = $("#answer_option_radio_" + number + "_" + optionIndex).val();
		if($("#"+optionIndex+"_"+number).attr("class").indexOf("active") < 0){ //选中
			$("#"+optionIndex+"_"+number).addClass("active");
			var selectIndex = objInp.attr("id").replace("answer_option_radio_"+number+"_","");
			if(currSelectAnswer == ""){
				currSelectAnswer += objInp.val();
				currSelectLabelValue += $("#answer_option_label_1"+selectIndex+"_"+number).html();
			}else{
				currSelectAnswer += "," + objInp.val();
				currSelectLabelValue += "," + $("#answer_option_label_1"+selectIndex+"_"+number).html();
			}	
		}else{//未选中
			$("#"+optionIndex+"_"+number).removeClass("active");
			var resultArray = currSelectAnswer.split(",");
			var labelArray = currSelectLabelValue.split(",");//和答案多少一样，可共用
			var strLength = resultArray.length;
			var repalceStr = "";
			var replaceLabelStr = "";
			for(var i = 0 ; i < strLength;i++){
				if(resultArray[i] == objInpVal){
					if(i == 0){//首位
						if(strLength == 1){
							repalceStr = objInpVal;
							replaceLabelStr = labelArray[i];
						}else{
							repalceStr = objInpVal + ",";
							replaceLabelStr = labelArray[i] + ",";
						}
					}else{//中间任何位置+末尾
						repalceStr = "," + objInpVal;
						replaceLabelStr = "," + labelArray[i];
					}
					break;
				}
			}
			currSelectAnswer = currSelectAnswer.replace(repalceStr,"");
			currSelectLabelValue = currSelectLabelValue.replace(replaceLabelStr,"");
		}
		$("#selectMultAnsesr_"+number).val(currSelectAnswer);
		$("#selectLabelMultAnsesr_"+number).val(currSelectLabelValue);
	}	
}
//填空选择题，问答题，填空题raido点击
function choiceOptionAns(obj,newClassName){
	$(obj).each(function(){
		$(this).on("click",function(){
			$(this).attr("checked",true);
			$(this).parent("div").addClass(newClassName).siblings().removeClass(newClassName);
		});
	});
}
//将选项赋值到数组中
function assignToArray(optionA,optionB,optionC,optionD,optionE,optionF){
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
}
//数组答案选项随机排序
function radomAnswerArray(array){
	var array_new = array;
	array_new.sort(function(){
		return Math.random() > 0.5 ? -1 : 1;
	});
	return array_new;
}
//切换下一题
function goNextQuestion(number){
	if(number <= questionLength){
		$(".quesListLi").hide().css({"opacity":0});//全部题隐藏
		if(currPageType == 'zhenduanPage'){
			$('.jiucuoBtn').hide();
		}
		for(var i = 1 ; i <= questionLength ; i++){
			if(i != number){
				$("#queIndex_"+i).removeClass('active');//题号
			}else{
				$("#queIndex_"+i).addClass('active');
				$("#question_"+number).show().animate({"opacity":1},200);
				if(currPageType == 'zhenduanPage'){
					$('#jiucuoBtn_' + number).show();
				}
			}
		}
		$(".currQuesNum").html(number);
	}
}	
//去掉末尾分隔符（","）
function delLastSeparator(result){
	if(result != ""){
		return result.substring(0,result.length - 1);
	}else{
		return "";
	}
}
//将数字转化成字母选项（1,2--A,B）
function transOption(number){
	if(number == 1){
		return "A";
	}else if(number == 2){
		return "B";
	}else if(number == 3){
		return "C";
	}else if(number == 4){
		return "D";
	}else if(number == 5){
		return "E";
	}else if(number == 6){
		return "F";
	}
}
//数组转json
function arrayToJson(o) { 
    var r = [];   
    if (typeof o == "string") 
    	return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";   
    if (typeof o == "object") {   
    	if (!o.sort) {   
    		for (var i in o)   
			    r.push(i + ":" + arrayToJson(o[i]));   
		    if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){   
		    	r.push("toString:" + o.toString.toString());   
		    }   
		    r = "{" + r.join() + "}";   
		} else {   
		    for (var i = 0; i < o.length; i++) {   
		    	r.push(arrayToJson(o[i]));   
		    }   
		    r = "[" + r.join() + "]";   
		}   
		return r;   
	}   
    return o.toString();   
}
//将字母转成数字
function transOption_1(myAnswer){
	if(myAnswer == "A"){
		return 1;
	}else if(myAnswer == "B"){
		return 2;
	}else if(myAnswer == "C"){
		return 3;
	}else if(myAnswer == "D"){
		return 4;
	}else if(myAnswer == "E"){
		return 5;
	}else if(myAnswer == "F"){
		return 6;
	}
}
//替换所有的单引号为自定义字符
function replaceChara(value){
	return value.replace(/&#wmd;/g,"'");
}
//检查答案是否为图片
function checkAnswerImg(answer){
	if(answer.indexOf("jpg") > 0 || answer.indexOf("gif") > 0 || answer.indexOf("bmp") > 0 || answer.indexOf("png") > 0){
		return true;
	}
	return false;
}
function checkLoreId(currentLoreId){ 
	var pathArray = lorePath.split(":");
	for(var i = 0 ; i < pathArray.length; i++){
		var pathDetailArray = pathArray[i].split("|");
		for(j = 0 ; j < pathDetailArray.length ; j++){
			if(currentLoreId == pathDetailArray[j]){
				if(i == 0 && j == pathDetailArray.length - 1){//本知识点--stepComplete = 1
					return true;
				}else if(i > 0 && i < pathArray.length - 1){//中间知识点--stepComplete = 0
					return false;
				}else if(i == pathArray.length - 1){//溯源最后一个知识点--stepComplete = 1
					return true;
				}
			}
		}
	}
}