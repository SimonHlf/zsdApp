function createFooter(roleId){
	var str = '';
	str += '<div class="footer mui-bar-tab">';
	if(roleId == stu_role_id){//学生
		str += '<ul class="stFooterUl">';
		str += '<li><a id="defaultTab" isLoadFlag="true" currType="home_st" class="mui-tab-item mui-active" href="page/home.html">';
		str += '<i class="iconfont icon-shouye"></i><span>首页</span></a></li>';
		str += '<li><a isLoadFlag="false" currType="ntTea_st" class="mui-tab-item" href="page/myNtTea/myNtTea.html">';
		str += '<i class="iconfont icon-laoshi"></i><span>导师</span></a></li>';
		str += '<li><a isLoadFlag="false" currType="buy_st" class="mui-tab-item" href="page/buy/buy.html"> ';
		str += '<i class="iconfont icon-goumai"></i><span>购买</span></a></li>';
		str += '<li><a isLoadFlag="false" currType="mine_st" class="mui-tab-item" href="page/mine/mine.html">';
		str += '<i class="iconfont icon-wode1"></i><span>我的</span></a></li>';
	}else if(roleId == ntTea_role_id){//网络导师
		str += '<ul class="ntFooterUl">';
		str += '<li><a id="defaultTab" isLoadFlag="true" currType="home_nt" class="mui-tab-item mui-active" href="page/home_nt.html">';
		str += '<i class="iconfont icon-shouye"></i><span>首页</span></a></li>';
		str += '<li><a isLoadFlag="false" currType="stList_nt"  class="mui-tab-item" href="page/myStu_nt/myStu.html">';
		str += '<i class="iconfont icon-xuesheng"></i><span>学生</span></a></li>';
		str += '<li><a isLoadFlag="false" currType="mine_nt" class="mui-tab-item" href="page/mine/mine_nt.html">';
		str += '<i class="iconfont icon-wode1"></i><span>我的</span></a></li>';
	}else if(roleId == tea_role_id){//班内老师
		str += '<ul class="ntFooterUl">';
		str += '<li><a id="defaultTab" class="mui-tab-item mui-active" currType="home_tea" isLoadFlag="true" href="page/home_tea.html">';
		str += '<i class="iconfont icon-shouye"></i><span>首页</span></a></li>';
		str += '<li><a isLoadFlag="false" currType="hwRep_tea" class="mui-tab-item" href="page/hwReport/hwReport.html">';
		str += '<i class="iconfont icon-xuesheng"></i><span>作业报告</span></a></li>';
		str += '<li><a isLoadFlag="false" currType="mine_tea" class="mui-tab-item" href="page/mine/mine_tea.html">';
		str += '<i class="iconfont icon-wode1"></i><span>我的</span></a></li>';
	}else if(roleId == stuPar_role_id){//家长端
		str += '<ul class="ntFooterUl">';
		str += '<li><a id="defaultTab" isLoadFlag="true" currType="home_par" class="mui-tab-item mui-active" href="page/home_par.html">';
		str += '<i class="iconfont icon-shouye"></i><span>首页</span></a></li>';
		str += '<li><a isLoadFlag="false" currType="ntTea_st" class="mui-tab-item" href="page/myNtTea/myNtTea.html">';
		str += '<i class="iconfont icon-laoshi"></i><span>导师</span></a></li>';
		str += '<li><a isLoadFlag="false" currType="mine_st" class="mui-tab-item" href="page/mine/mine_par.html">';
		str += '<i class="iconfont icon-wode1"></i><span>我的</span></a></li>';
	}
	str += '</ul></div><div id="indexLayer" class="layer"></div>';
	return str;
}