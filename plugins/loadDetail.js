/*
* @Author: simonHlf
* @Date:   2018-07-04 08:43:58
* @Last Modified by:   simonHlf
* @Last Modified time: 2018-07-27 18:17:39
*/
var noDataFlag_init = false;
var noDataFlag_more = false;
var myScroll;
var nowNumIndex = 0;
var noDataInfo = '<div class="noData" style="top:7rem;"><img src="../../images/noData.png"/><p>暂无学习记录</p></div>';
 function loadedDetail() {
	pullUpEl = document.querySelector('#'+wrapperObj).querySelector('#pullUp');
	pullUpOffset = pullUpEl.offsetHeight;;//表示获取元素自身的高度	 
	myScroll = new iScroll(wrapperObj, {
		checkDOMChanges: true,
		onRefresh: function () {
			pullUpEl = document.querySelector('#'+wrapperObj).querySelector('#pullUp');
			if (pullUpEl.className == "loading") {
				pullUpEl.className = '';
			}
		},
		onScrollMove: function () {  //onScrollMove：主要表示根据用户下拉或上拉刷新的高度值,来显示不同的交互文字;
			//this.y 表示手指下拉的高度
			pullUpEl = document.querySelector('#'+wrapperObj).querySelector('#pullUp');
			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {//向上滑动
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载更多...';
				this.maxScrollY = this.maxScrollY;
			}else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () { //onScrollEnd:表示用户下拉刷新完,放开手指时所显示的不同的交互文字
			pullUpEl = document.querySelector('#'+wrapperObj).querySelector('#pullUp');
			if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载数据中...';
				pullUpAction(wrapperObj);
			}
		}
	});
}
//获取当前状态来判断进来有无数据
function getNowStatus(wrapperObj){
	if($("#"+wrapperObj).attr("isLoadFlag")=="true"){
		if(noDataFlag_init == true){
			loadedDetail();
			document.querySelector('#'+wrapperObj).querySelector('#pullUp').style.display = "block";
		}else{
			//暂无数据
			$("#listDataUl"+nowNumIndex).append(noDataInfo);
			document.querySelector('#'+wrapperObj).querySelector('#pullUp').style.display = "none";
		}
	}
	$("#"+wrapperObj).attr("isLoadFlag","false");
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, {passive:false});