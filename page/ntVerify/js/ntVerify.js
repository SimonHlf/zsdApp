//mui.plusReady(function(){
	function choicePic(opt){
		var _this = this;
		if(mui.os.plus){
			var a=[{
				title:'拍照'
			},{
				title:'从手机相册选择'
			}];
			plus.nativeUI.actionSheet({
				cancel:'取消',
				buttons:a
			},function(b){
				switch(b.index){
					case 0:
						break;
					case 1:
						//拍照
						getImages(opt);
					break;
					case 2:
						//打开相册
						galleryImages(opt);
					break;
					default:
						break;
				}
			},false); 
		}
	}
	//删除已选
	function delChoicePic(currObj,opt){
		var imgurl = currObj.getAttribute('data-name');
		if(opt == 'delFrontImg'){
			if(verifyInfo != null){//已上传未审核 已上传审核未通过
				delFrontFlag = true;
			}
			app.getId('frontImg').style.display = 'none';
			app.getId('frontImg').setAttribute('src','');
			app.getId('imgBox_front').setAttribute('data-img','');
		}else if(opt == 'delBackImg'){
			if(verifyInfo != null){//已上传未审核 已上传审核未通过
				delBackFlag = true;
			}
			app.getId('backImg').style.display = 'none';
			app.getId('backImg').setAttribute('src','');
			app.getId('imgBox_back').setAttribute('data-img','');
		}else if(opt == 'delDegreeImg'){
			app.getId('degreeImg').style.display = 'none';
			app.getId('degreeImg').setAttribute('src','');
			app.getId('imgBox_degree').setAttribute('data-img','');
		}else if(opt == 'delZgzImg'){
			app.getId('zgzImg').style.display = 'none';
			app.getId('zgzImg').setAttribute('src','');
			app.getId('imgBox_zgz').setAttribute('data-img','');
		}
		currObj.style.display = 'none';
		currObj.setAttribute('data-name','');
		plus.io.resolveLocalFileSystemURL("_doc/fileimgs/"+imgurl, function(entry){
			entry.remove(function(entry){
				//console.log("删除成功");
			}, function ( e ){
				//console.log("删除失败");
			});
		},function(e){
			console.log('目标对象不存在'); 
		});	
	}
	//拍照
	function getImages(opt){
		var fnums=96; //图片压缩比率
		var cmr = plus.camera.getCamera(),path = '',name='';
		cmr.captureImage(function(p) {
			plus.io.resolveLocalFileSystemURL(p, function(entry) {
				entry.file(function(file){
					if(file.size/1024>300){//当图片超过300kb 就压缩高点
						fnums=65; //图片压缩比例
					}
				});
				path = entry.toLocalURL();
				name = entry.toLocalURL().substr(entry.toLocalURL().lastIndexOf('/') + 1);
				//压缩图片
				plus.zip.compressImage({
					src:path,
					dst: '_doc/fileimgs/' + name,
					overwrite:true,
					format:"jpg,png",
					quality:fnums
				}, function(zip){
					var news_name = zip.target.substr(zip.target.lastIndexOf('/') + 1);
					if(opt == 'frontImg'){//身份证正面
						app.getId('delFrontImg').style.display = 'block';
						app.getId('delFrontImg').setAttribute('data-name',news_name);
						app.getId('frontImg').style.display = 'block';
						app.getId('frontImg').setAttribute('src',zip.target);
						app.getId('imgBox_front').setAttribute('data-img',zip.target);
					}else if(opt == 'backImg'){
						app.getId('delBackImg').style.display = 'block';
						app.getId('delBackImg').setAttribute('data-name',news_name);
						app.getId('backImg').style.display = 'block';
						app.getId('backImg').setAttribute('src',zip.target);
						app.getId('imgBox_back').setAttribute('data-img',zip.target);
					}else if(opt == 'degreeImg'){
						app.getId('delDegreeImg').style.display = 'block';
						app.getId('delDegreeImg').setAttribute('data-name',news_name);
						app.getId('degreeImg').style.display = 'block';
						app.getId('degreeImg').setAttribute('src',zip.target);
						app.getId('imgBox_degree').setAttribute('data-img',zip.target);
					}else if(opt == 'zgzImg'){
						app.getId('delZgzImg').style.display = 'block';
						app.getId('delZgzImg').setAttribute('data-name',news_name);
						app.getId('zgzImg').style.display = 'block';
						app.getId('zgzImg').setAttribute('src',zip.target);
						app.getId('imgBox_zgz').setAttribute('data-img',zip.target);
					}
				}, function(zipe){
					mui.toast('该图片有误！')
				});
				
			});
		});
	}
	//打开相册
	function galleryImages(opt){
		var _this = this;
		plus.gallery.pick(function(e){
			var fnums=96; //图片压缩比率
			var name = e.files[0].substr(e.files[0].lastIndexOf('/') + 1);  
			plus.io.resolveLocalFileSystemURL(e.files[0], function( entry ){
				entry.file(function(file){
					if(file.size/1024>300){//当图片超过300kb 就压缩高点
						fnums=65; //图片压缩比例
					}
				});
			});
			//把包含有中文的图片名，重新命名
			if(escape(name).indexOf("%u") !=-1){
				//包括中文 
				name=name.substr(name.lastIndexOf('.'));
				var times=new Date();
				name=times.getTime()+name;
			} 
			//压缩图片
			plus.zip.compressImage({
				src:e.files[0],
				dst: '_doc/fileimgs/' + name,
				overwrite:true,
				format:"jpg",
				quality:fnums
			}, function(zip){
				var news_name = zip.target.substr(zip.target.lastIndexOf('/') + 1); 
				if(opt == 'frontImg'){//身份证正面
					app.getId('delFrontImg').style.display = 'block';
					app.getId('delFrontImg').setAttribute('data-name',news_name);
					app.getId('frontImg').style.display = 'block';
					app.getId('frontImg').setAttribute('src',zip.target);
					app.getId('imgBox_front').setAttribute('data-img',zip.target);
				}else if(opt == 'backImg'){
					app.getId('delBackImg').style.display = 'block';
					app.getId('delBackImg').setAttribute('data-name',news_name);
					app.getId('backImg').style.display = 'block';
					app.getId('backImg').setAttribute('src',zip.target);
					app.getId('imgBox_back').setAttribute('data-img',zip.target);
				}else if(opt == 'degreeImg'){
					app.getId('delDegreeImg').style.display = 'block';
					app.getId('delDegreeImg').setAttribute('data-name',news_name);
					app.getId('degreeImg').style.display = 'block';
					app.getId('degreeImg').setAttribute('src',zip.target);
					app.getId('imgBox_degree').setAttribute('data-img',zip.target);
				}else if(opt == 'zgzImg'){
					app.getId('delZgzImg').style.display = 'block';
					app.getId('delZgzImg').setAttribute('data-name',news_name);
					app.getId('zgzImg').style.display = 'block';
					app.getId('zgzImg').setAttribute('src',zip.target);
					app.getId('imgBox_zgz').setAttribute('data-img',zip.target);
				}
			}, function(zipe){
				mui.toast('该图片有误！')
			});
		},function(e){
			//取消选择图片;	
		},
		{filter:'image',multiple:true,maximum:1,system:false,onmaxed:function(){
			plus.nativeUI.alert('最多发布1张图片');	
		}});
	}
//});