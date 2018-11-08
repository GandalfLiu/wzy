

$(function(){

	// var goodId = location.search.splice(1);
	// 获取该商品的id，唯一
	var ID = location.search.replace("?","");
	var goodId = ID.substring(0);
	var userName = ID.substring(8);
	console.log(userName);
	console.log(goodId);

		if( goodId=="" ){
			alert("没有产品")
		}else{
			goodOp(goodId); 
		}

		function goodOp(goodId){
			$.get({
				"url":"json/goodlist.json",
				"success":function(res){
					
					//res 是ajax请求成功时的返回值
					//刷新页面  更新详情
					callback(res);
				}
			})
		}


	    // 获取数据显示商品详情
		var bigArea = $('.bigArea');
		var divTop = $('.byright_top');
		var bc_left = $('.bc_left')
		var byright_center = $('.byright_center')

		function callback(json){
			// console.log(json);//[Array[6], Array[6], Array[6], Array[6], Array[6], Array[4]]	
				// 添加新的节点
				for(var i=0;i<json.length;i++){

					var arr = json[i];//第一次遍历--每一个小数组
					// console.log(arr)

					for(var j=0;j<arr.length;j++){

						var obj = arr[j];//第二次遍历每个数组中的对象
						
						    if(parseInt(obj.id) == goodId){//获取指定id的对象
							console.log(obj.id);
								// 创建新的节点
								smallImg = $('<images/>').addClass('smallImg').attr('src',obj.src);
								bigImg = $('<images/>').addClass('bigImg').attr('src',obj.src);
								var p1Node = $('<p/>').addClass('discript').html(obj.discript);
								var p2Node = $('<p/>').addClass('price').append($('<span/>').html(obj.price));
								var p3Node = $('<p/>').addClass('xq');
								var iSale = $('<i/>').addClass('xq-sale').html("已售："+obj.sale);
								var iMod = $('<i/>').addClass('xq-mod').html("评价："+obj.com);

								var cp1Node = $('<p/>').addClass('cz');
								var cp2Node = $('<p/>').addClass('sc');
								var cp3Node = $('<p/>').addClass('kz');
								var c1Span = $('<span/>').text('材质:');
								var c2Span = $('<span/>').text('手寸:');
								var c3Span = $('<span/>').text('刻字:');
									console.log(obj)
									var p1 = obj.price1;
									var p2 = obj.price2;
								var i1Node = $("<i/>").addClass('pink_bor').html(obj.material1).click(function(){
									// 创建对象时添加的事件会在全部遍历完之后才执行，所以需要在外部用变量存储所需当前对象的值
									$(this).addClass('bg').siblings().removeClass('bg');
									$('p.price span').html(p1);
									console.log(obj)//不是当前的obj，是循环完最后的obj
								});
								var i2Node = $("<i/>").addClass('pink_bor').html(obj.material2).click(function(){
									$(this).addClass('bg').siblings().removeClass('bg');
									$('p.price span').html(p2);
								});
								var selectNode = $('<select/>').attr('id','size').val('0');
								var op1Node = $('<option/>').val('0').text('-请选择-');
								var op2Node = $('<option/>').val('10').text('10');
								var op3Node = $('<option/>').val('12').text('12');
								var op4Node = $('<option/>').val('13').text('13');
								var op5Node = $('<option/>').val('14').text('14');
								var inputNode = $('<input/>').attr({'type':'text','placeholder':'5个汉字或10个字母'}).addClass('cutname');
								var b1Node = $('<b/>').addClass('write_choose').text('♥').click(function(){
									byright_center.find('input:text').val(byright_center.find('input:text').val()+$(this).text())
								});
								var b2Node = $('<b/>').addClass('write_choose').text('&').click(function(){
									byright_center.find('input:text').val(byright_center.find('input:text').val()+$(this).text())
								});
								var emNode = $('<em/>').text('效果预览');

								console.log(obj.id);
								// console.log('==================='+obj.images[0].src);
								// 左侧四张小图
								for(var i=0;i<obj.img.length;i++){
									var liNode = $("<li/>");
									var imgNode = $('<images/>').attr('src',obj.img[i].src);
									imgNode.appendTo(liNode);
									liNode.appendTo(bc_left);
								}
								

								p3Node.append(iSale);
								p3Node.append(iMod);
								divTop.append(p1Node);
								divTop.append(p2Node);
								divTop.append(p3Node);
								bigImg.appendTo(bigArea);
								smallImg.appendTo($('.bc_center li'));

								c1Span.appendTo(cp1Node);
								i1Node.appendTo(cp1Node);
								i2Node.appendTo(cp1Node);
								c2Span.appendTo(cp2Node);
								op1Node.appendTo(selectNode);
								op2Node.appendTo(selectNode);
								op3Node.appendTo(selectNode);
								op4Node.appendTo(selectNode);
								op5Node.appendTo(selectNode);
								selectNode.appendTo(cp2Node);
								c3Span.appendTo(cp3Node);
								inputNode.appendTo(cp3Node);
								b1Node.appendTo(cp3Node);
								b2Node.appendTo(cp3Node);
								emNode.appendTo(cp3Node);
								cp1Node.appendTo(byright_center);
								cp2Node.appendTo(byright_center);	
								cp3Node.appendTo(byright_center);


								// 从json中获取点击轮播图以及跳转链接
								for(var x=0;x<arr.length;x++){
									console.log('i='+i+' , x='+x)
									var liNode = $('<li/>');
									var aNode = $('<a href=goodlist.html?'+goodId+'><images src='+arr[x].src+'></a>');
									var pNode = $('<p/>').text(arr[x].discript);

									liNode.append(aNode);
									liNode.append(pNode);
									liNode.appendTo($('.record_banner ul'));
								}
								// 从json中获取点击轮播图以及跳转链接

							}	
						}
					}



		// 左侧小图划过淡入淡出切换图片效果
		$('.bc_left li').on('mouseenter',function(){
			// $('.bc_center li').eq($(this).index()).stop().show().animate({'opacity':1},1500).siblings().stop().hide().animate({'opacity':0},600);
			// $('.bc_center li').eq($(this).index()).css('background-image','url(../images/small_right.png) no-repeat center center');
			console.log($('.bc_left li images').eq($(this).index()).attr('src'));
			$('.bc_center li images').attr({
				'src':$('.bc_left li images').eq($(this).index()).attr('src')
			});
			$(this).addClass('box').siblings().removeClass('box');
			$(this).find('images').css('border','none').siblings().css('border','1px solid #dadada');
			$('.bigArea images').attr({
				'src':$('.bc_left li images').eq($(this).index()).attr('src')
			});
		})

		// 左侧展示图片点击切换效果
		var img_index = 0;
		$('.bc_center i').on('click',function(){
			$('.bc_left li').eq(img_index).addClass('box').siblings().removeClass('box');
			$('.bc_center li images').attr({
				'src':$('.bc_left li images').eq(img_index).attr('src')
			});
			$('.bigArea images').attr({
				'src':$('.bc_left li images').eq(img_index).attr('src')
			});
			img_index++;
			if(img_index>$('.bc_left li').length-1){
				img_index = 0;
			}
		})


		/*放大镜效果*/
		var _smallImg = $('.bc_center li');//小图
		console.log(_smallImg);
		var _smallArea = $('.bc_center li').find('span');//小区域
		var _bigImg = $('.bigImg');//大图
		var _bigArea = $('.bigArea');//大区域

		// 计算小区域的宽高 width() innerWidth() outerWidth()
		_smallArea.width(_bigArea.width()*_smallImg.width() / _bigImg.width());
		_smallArea.height(_bigArea.height()*_smallImg.height() / _bigImg.height());

			// 放大倍数
			var scale = _bigImg.width()/_smallImg.width();//4

			// mousemove
			_smallImg.mousemove(function(e){

				_smallArea.show();//显示小区域
				_bigArea.show();//显示大区域

				// clientX:可视区域的x值
				// pageX:距离窗口左边的值(不管滚动条如何显示)
				// offset().left:距离窗口的左边距
				var x = e.pageX - _smallImg.offset().left - _smallArea.width()/2;
				var y = e.pageY - _smallImg.offset().top - _smallArea.height()/2;

				// 控制小区域范围在小图内
				if(x<0){//不超出左边界
					x=0;
				}else if(x >= _smallImg.width() - _smallArea.width()){
					x = _smallImg.width() - _smallArea.width();
				}
				
				if(y<0){//不超出右边
					y=0;
				}else if(y >= _smallImg.height() - _smallArea.height()){
					y = _smallImg.height() - _smallArea.height();
				}

				_smallArea.css({
					left:x,
					top:y
				})

				// 移动大图
				_bigImg.css({
					left:-x*scale,
					top:-y*scale
				})

			})

			// mouseleave
			_smallImg.mouseleave(function(){

				_smallArea.hide();//隐藏小区域
				_bigArea.hide();//隐藏大区域

			})
			/*放大镜效果*/


		//右边小件物品----材质
		// $('.byright_center p.cz i').click(function(){
		// 	console.log('创建对象后添加的事件，要么在同一函数中进行，要么在对象创建之前添加事件绑定')
		// })
	

	}



		// 点击加入购物车
		$('.byright_bottom .join').click(function(){
			if($('#size').val() == 0){
				alert('请选择尺寸');
				return false;
			}else{
				//获取之前保存在cookie中的购物车信息
				var arr = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];

				//要加入购物车的商品信息，从动态创建的对象中获取
				var goodRelated = $('.discript').text();//商品系列
				var goodPrice = $('.price').text();//商品价格
				var goodCutname = $('.cutname').val();//用户自定义刻字
				var chiCun = $('#size').val();//手寸
				var name = ""; //默认表示未登录
				if($.cookie('loginUser')){
					console.log('cookie中存了用户名：'+$.cookie('loginUser'));
					name = $.cookie('loginUser'); //如果登录了， 则name为登录的账户
				}

				// 遍历查找是否之前的购物车cookie中存在即将添加的商品
				var isExist = false;
				for(var i=0;i<arr.length;i++){
					if(goodId == arr[i].id && goodCutname == arr[i].cutname && chiCun == arr[i].chiCun){
						arr[i].num++;
						isExist = true;//表示存在该商品;
					}
				}

				// 如果不存在则添加一个商品
				if(!isExist){
					var goods = {
						id:goodId,
						script:goodRelated,
						price:goodPrice,
						cutname:goodCutname,
						chiCun:chiCun,
						userName:name,
						num:1
					}
					arr.push(goods);//push():向数组的末尾添加一个或更多元素，并返回新的长度。
				}

				// 保存到cookie中
				$.cookie("cart",JSON.stringify(arr),{expires:7,path:'/'});
				console.log( $.cookie("cart") );
			}
			//跳转到购物车页面
			location.href = "shopcar.html";
		})



		// ==================商品详情 Tab切换===================
		$('.goodnews').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.goodnews_con').css('display','block').siblings('div').css('display','none');
		})
		$('.com').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.com_con').css('display','block').siblings('div').css('display','none');
		})
		$('.buy').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.buy_con').css('display','block').siblings('div').css('display','none');
		})
		$('.ques').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.ques_con').css('display','block').siblings('div').css('display','none');
		})
		$('.serv').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.serv_con').css('display','block').siblings('div').css('display','none');
		})
		// =====================商品详情 Tab切换=================
		

		/*========== jq如何切换背景图片 ===========*/
		// $('.bc_left li images').on({
		// 	'mouseenter':function(){
		// 		$('.bc_center li images').css('src',$('.bc_left li images').src);
		// 	}
		// })

		

		$(window).scroll(function(){
			// if($(window).scrollTop()>=1000){
			// 	$('.gd_nav ul').addClass('fix_top');
			// }else{
			// 	$('.gd_nav ul').removeClass('fix_top');
			// }
		})


		//点击轮换图片
		var i = 0;
		$('span.next').click(function(){
			i++;
			move();
		})
		$('span.pre').click(function(){
			i--;
			if(i<=0){
				$('.record ul').stop().animate({'left':0},500);
				i=0;
			}
			move();
		})

		function move(){
			if(i>$('.record_banner ul li').length-1){
				$('.record ul').stop().animate({'left':0},500);
				i=0;
			}
			$('.record ul').stop().animate({'left':-i*$('.record_banner ul li').outerWidth(true)},300);
		}
		//点击轮换图片



		//右边小件物品----钻石搭配
		$('.arrangement ul li').click(function(){
			$(this).addClass('bg').siblings().removeClass('bg'); 	
		})



		// =============== 刻字效果预览 ====================
		// 使用事件绑定添加点击事件
		$('body').on('click','p.kz em',function(){
			if($('input.cutname').val() != ''){
				$('div.kzyl').empty();
				$('div.kzyl').css('display','block').text($('input.cutname').val());
			}
		})
		// =============== 刻字效果预览 ====================


})




















