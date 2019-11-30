//知识讲解
function renderStudyInfo_video(json){
	var source = json.sourceDetail,
		videoSrc = source.replace(".flv",".mp4");
	if(!player){
		player = plus.video.createVideoPlayer('videoplayer',{
			src:http_ + '/' + videoSrc,
			top:'180px',
			left:'0px',
			width: '100%',
			height: '200px',
			position: 'static',
			poster:''
		});
		plus.webview.currentWebview().append(player);
	}
}
//点拨指导
function renderStudyInfo_guide(list){
	var comMoveWid = Math.ceil(($("#guidePoint").width() - $("#moveBox").width())/2),str='';
	$('#studyInfo').html("");
	$('#videoBtn').hide();
	$('#guideBtn').show();
	$("#moveBox").css({"margin-left":0})
	player.close();
	for(var i=0;i<list.length;i++){
		if(i == 0){
			str += '<div class="listPart">';
			str += '<div class="smTit moreHigh"><span class="lineSpan"></span><p>'+ list[i].loreType +'</p></div>';
			str += '<div class="list stepStudyList">';
				str += '<div class="listTop"><strong>标题：</strong><div class="ellip">'+ list[i].lqsTitle +'</div></div>';
				str += '<div class="listBot"><strong class="conTit">内容：</strong><div class="listBotCon">'+ list[i].lqsContent +'</div></div>';
			str += '</div></div>';
		}else{
			if(list[i-1].loreType == list[i].loreType){
				str += '<div class="list specList">';
					str += '<div class="listTop"><strong>标题：</strong><div class="ellip">'+ list[i].lqsTitle +'</div></div>';
					str += '<div class="listBot"><strong class="conTit">内容：</strong><div class="listBotCon">'+ list[i].lqsContent +'</div></div>';
				str += '</div>';
			}else{
				str += '<div class="listPart">';
				str += '<div class="smTit moreHigh"><span class="lineSpan"></span><p>'+ list[i].loreType +'</p></div>';
				str += '<div class="list"   attr="currIndex_'+ i +'">';
					str += '<div class="listTop"><strong>标题：</strong><div class="ellip">'+ list[i].lqsTitle +'</div></div>';
					str += '<div class="listBot"><strong class="conTit">内容：</strong><div class="listBotCon">'+ list[i].lqsContent +'</div></div>';
				str += '</div></div>';
			}
		}
	}
	$('#studyInfo').html(str);
	var hasImgLen = $("#studyInfo").find('img').length;
	if(hasImgLen > 0){
		$('#studyInfo').find('img').each(function(k){
			$('#studyInfo').find('img').eq(k).attr('src', http_ + '/' + $('#studyInfo').find('img').eq(k).attr('src'));
		});
	}
	$("#moveBox").animate({"left":app.getId("guidePoint").offsetLeft + comMoveWid},600,function(){$("#guidePoint").addClass("active");});
	$("#moveLineDiv").animate({"width":$("#guidePoint").width()});
}
//知识清单
function renderStudyInfo_loreList(list){
	var comMoveWid = Math.ceil(($("#guidePoint").width() - $("#moveBox").width())/2),str='';
	var number = "";
	$('#studyInfo').html("");
	$('#guideBtn').hide();
	$('#loreBtn').show();
	/*for(var i=0;i<list.length;i++){
		str += '<div class="listPart">';
		str += '<div class="smTit"><span class="lineSpan"></span><p>'+ list[i].loreType + (i+1) +'</p></div>';
		str += '<div class="list">';
			str += '<div class="listTop"><strong>标题：</strong><div class="ellip">'+ list[i].lqsTitle +'</div></div>';
			str += '<div class="listBot"><strong class="conTit">内容：</strong><div class="listBotCon">'+ list[i].lqsContent +'</div></div>';
		str += '</div></div>';
	}*/
	
	for(var i=0;i<list.length;i++){
		str += '<div class="listPart jietiPart">';
		str += '<div class="smTit"><span class="lineSpan"></span><p>知识清单第'+ (i+1) +'题</p></div>';
		str += '<div class="list_jieti">';
			str += '<div class="listSub"><strong>标题：</strong><div class="listSubCon">'+ list[i].lqsTitle +'</div></div>';
			//自己背诵
			str += '<div id="selfZsqdTit_'+ (i+1) +'" onclick="showMySoloveTips_zsqd('+ (i+1) +')" class="selfSoloveTit comJitiTit">自己背诵<span class="triSp noSel"></span></div>';
			//查看答案
			str += '<div id="viewZsqdCon_'+ (i+1) +'"" onclick="showRealAns_zsqd('+ (i+1) +')" class="viewAnsJietiTit comJitiTit">查看内容<span class="triSp noSel"></span></div>';
			//自己解题说明层
			str += '<div id="selfZsqdTip_'+ (i+1) +'" class="selfSoloveBox">';
			str += '<p><span class="cirSpan"></span>请展开内容熟背!</p>';
			str += '</div>';
			//内容层
			str += '<div id="zsqdCon_'+ (i+1) +'" class="ansAnalysisBox">'
			str += '<div class="listAns"><strong>内容：</strong><div class="listAnsCon">'+ list[i].lqsContent +'</div></div>';
		str += '</div></div>';
		number += (i+1) + ",";
	}
	str += '<input type="hidden" id="number_zsqd" value="'+ number +'"/>';
	$('#studyInfo').html(str);
	var hasImgLen = $("#studyInfo").find('img').length;
	if(hasImgLen > 0){
		$('#studyInfo').find('img').each(function(k){
			$('#studyInfo').find('img').eq(k).attr('src', http_ + '/' + $('#studyInfo').find('img').eq(k).attr('src'));
		});
	}
	$("#moveBox").animate({"left":app.getId("loreListBox").offsetLeft + comMoveWid},function(){$("#loreListBox").addClass("active");});
	$("#moveLineDiv").animate({"width":$("#guidePoint").width()*2});
}
//解题示范
function renderStudyInfo_jieti(list){
	var number = "";
	var comMoveWid = Math.ceil(($("#guidePoint").width() - $("#moveBox").width())/2),str='';
	$('#studyInfo').html(""); 
	$('#loreBtn').hide();
	$('#exampleBtn').show();
	for(var i=0;i<list.length;i++){
		str += '<div class="listPart jietiPart">';
		str += '<div class="smTit"><span class="lineSpan"></span><p>解题示范第'+ (i+1) +'题</p></div>';
		str += '<div class="list_jieti">';
			str += '<div class="listSub"><strong>题干：</strong><div class="listSubCon">'+ list[i].queSub +'</div></div>';
			//自己解题
			str += '<div id="selfSoloveTit_'+ (i+1) +'" onclick="showMySoloveTips('+ (i+1) +')" class="selfSoloveTit comJitiTit">自己解题<span class="triSp noSel"></span></div>';
			//查看答案
			str += '<div id="viewAnsJietiTit_'+ (i+1) +'"" onclick="showRealAns('+ (i+1) +')" class="viewAnsJietiTit comJitiTit">查看答案<span class="triSp noSel"></span></div>';
			//自己解题说明层
			str += '<div id="selfSolove_'+ (i+1) +'" class="selfSoloveBox">';
			str += '<p><span class="cirSpan"></span>请拿出纸和笔写下你的解题过程</p>';
			str += '<p><span class="cirSpan"></span>请注意规范步骤与书写格式</p>';
			str += '<p><span class="cirSpan"></span>请像对待考试一样解答完试题</p>';
			str += '</div>';
			//答案层
			str += '<div id="ansAnalysis_'+ (i+1) +'" class="ansAnalysisBox">'
			str += '<div class="listAns"><strong>答案：</strong><div class="listAnsCon">'+ list[i].queAnswer +'</div></div>';
			str += '<div class="listAnaly"><strong>解析：</strong><div class="listAnalyCon">'+ list[i].queResolution +'</div></div></div>';
		str += '</div></div>';
		number += (i+1) + ",";
	}
	str += '<input type="hidden" id="number_jtsf" value="'+ number +'"/>';
	$('#studyInfo').html(str); 
	var hasImgLen = $("#studyInfo").find('img').length;
	if(hasImgLen > 0){ 
		$('#studyInfo').find('img').each(function(k){
			$('#studyInfo').find('img').eq(k).attr('src', http_ + '/' + $('#studyInfo').find('img').eq(k).attr('src'));
		});
	}
	$("#moveBox").animate({"left":app.getId("exampleKpBox").offsetLeft + comMoveWid},function(){$("#exampleKpBox").addClass("active");});
	$("#moveLineDiv").animate({"width":$("#guidePoint").width()*3});
}
//巩固训练
function renderStudyInfo_gg(list){
	//console.log( JSON.stringify( list ) )
	comMoveWid_gg = Math.ceil(($("#guidePoint").width() - $("#moveBox").width())/2);
	$('#studyInfo').hide().html("");
	$('.stepBotBtn').hide();
	$('#exampleBtn').hide();
	setTimeout(function(){
		$('.mainQuesAreaStudy').show();//答题区域show
	},310);
	renderQuesList(list);
}
//知识清单自己背诵
function showMySoloveTips_zsqd(num){
	var allNumber = $("#number_zsqd").val();
	$("#number_zsqd").val(allNumber.replace(num+",",""));
	$("#selfZsqdTip_"+ num).slideDown();
	$("#zsqdCon_"+ num).slideUp();
	$("#selfZsqdTit_"+ num).find('span').removeClass("noSel").addClass("hasSel");
	$("#viewZsqdCon_"+ num).find('span').removeClass("hasSel").addClass("noSel");
}
function showRealAns_zsqd(num){
	$("#selfZsqdTip_"+ num).slideUp();
	$("#zsqdCon_"+ num).slideDown();
	$("#selfZsqdTit_"+ num).find('span').removeClass("hasSel").addClass("noSel");
	$("#viewZsqdCon_"+ num).find('span').removeClass("noSel").addClass("hasSel");	
}
//解题示范自己解答
function showMySoloveTips(num){
	var allNumber = $("#number_jtsf").val();
	$("#number_jtsf").val(allNumber.replace(num+",",""));
	$("#selfSolove_"+ num).slideDown();
	$("#ansAnalysis_"+ num).slideUp();
	$("#selfSoloveTit_"+ num).find('span').removeClass("noSel").addClass("hasSel");
	$("#viewAnsJietiTit_"+ num).find('span').removeClass("hasSel").addClass("noSel");
}
//解题示范查看答案
function showRealAns(num){
	$("#selfSolove_"+ num).slideUp();
	$("#ansAnalysis_"+ num).slideDown();
	$("#selfSoloveTit_"+ num).find('span').removeClass("hasSel").addClass("noSel");
	$("#viewAnsJietiTit_"+ num).find('span').removeClass("noSel").addClass("hasSel");	
	
}