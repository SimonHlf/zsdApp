var userInfo = JSON.parse(localStorage.getItem('userInfo')),stuName = '',ntStuField = null;
function loadStuList(opt){
	app.showToast(1);
	var _this = this;
	mui.ajax(http_ + '/common.do?action=getBindStu',{
		data:{userId:userInfo.userId},
		dataType:'json',
		type:'post',
		timeout:10000,
		success:function(json){
			if(json.result == 'success'){
				ntStuField = json;
				if(opt == 'trackGuide'){
					if(jumpPos == 'byHome'){
						$('#stuIdInp').val(json.stuId);
						$('#stuNameTxt').html(json.stuName);
						stuName = json.stuName;
					}
					loadLearnRecordList();
				}
			}else if(json.result == 'noInfo'){
				if(opt == 'trackGuide'){
					$('#stuBox').hide();
					$('.currTime').hide();
					$('.fixedFilter').hide();
					$('#listRecord').html('<div class="noData"><img src="../../images/noData.png"/><p>暂无学生</p></div>');
				}
			}
		},
		error:function(xhr,type,errorThrown){
			app.showToast(2);
			console.log(errorThrown)
		} 
	})
}