
$(function(){

shopCar();


// ==================== 从cookie中获取数据并动态创建节点添加数据 ================
function shopCar(){
	
	var name = ""; //默认表示未登录,name为空
	if($.cookie('loginUser')){
		console.log('cookie中存了用户名：'+$.cookie('loginUser'));
		name = $.cookie('loginUser'); //如果登录了， 则name为登录的账户
	}
	
	$('.show').empty();// 先清空列表内所有内容，因为每次都是从cookie中重新获取数据，重新添加一次数据

	/* 
	错误提示：Uncaught SyntaxError: Unexpected token u
		检查js代码中是否含有json解析的代码
		如JSON.parse，JSON.parse在传参数是未定义时会出现该异常
	*/
	var _cookie = $.cookie("cart");//为防止清空cookie后，出现未定义 JSON解析
		console.log(_cookie);//打印的这个cookie是 -- ‘字符串’

	if(_cookie){
		 _cookie = JSON.parse(_cookie);//从JSON中获取数据并转换成对象，反序列化

		 if (_cookie.length > 0) {//JSON解析之后的_cookie才是 [数组对象]，才能通过长度来判断
		 	console.log(_cookie);
			var show = $('.show');
			var num = 0;//商品个数
			var sum = 0;//商品总价

			$.getJSON("json/goodlist.json",function(json){//从商品列表的JSON中获取数据

				for(var i=0;i<_cookie.length;i++){//遍历cookie中的数据
					console.log(_cookie[i].userName);
					var id = _cookie[i].id;

					if(_cookie[i].userName == name){//name = ""时，表示无账号登录，name=$('loginUser')时,表示指定用户登录，创建指定用户的cookie

						for(var j=0;j<json.length;j++){//遍历JSON中的数据
							var arr = json[j];
							for(var x=0;x<arr.length;x++){//遍历JSON中的每一个对象
								var obj = arr[x];

								if(obj.id == _cookie[i].id ){//匹配对应id，并创建对应节点获取相应的信息

									//console.log(obj.id)
									// 创建节点
									var shoplist = $('<div/>').addClass('shoplist');
									var inputNode = $('<input/>').attr('type','checkbox');
									var sp = $('<span/>').addClass('sp');
									var img = $('<images/>').attr('src',obj.src).on('click',function(){
										location.href = 'goodinfo.html?'+ id;
									});
									var aNode = $('<a/>').text(obj.title);
									var number = $('<em class="number"><b>'+_cookie[i].num+' 件</b></em>');

									// 如果cookie中取出来的价格和指定价格相同，则执行相应函数
									if(_cookie[i].price == obj.price1){
										var cz = $('<span/>').addClass('cz').text(obj.material1);
									}else if(_cookie[i].price == obj.price2){
										var cz = $('<span/>').addClass('cz').text(obj.material2);
									}else{
										var cz = $('<span/>').addClass('cz').text("PTV");
									}
									
									var cc = $('<span/>').addClass('cc').text(_cookie[i].chiCun);

									// 如果没有刻字，默认 无
									if(_cookie[i].cutname == ''){
										var kz = $('<span/>').addClass('kz').text('无');
									}else{
										var kz = $('<span/>').addClass('kz').text(_cookie[i].cutname);
									}
									var price = $('<span/>').addClass('price').text(_cookie[i].price);
									var close = $("<span/>").addClass('close');

									sp.append(img);
									sp.append(aNode);
									sp.append(number);
									inputNode.appendTo(shoplist);
									sp.appendTo(shoplist);
									cz.appendTo(shoplist);
									cc.appendTo(shoplist);
									kz.appendTo(shoplist);
									price.appendTo(shoplist);
									close.appendTo(shoplist);
									shoplist.appendTo(show);
								}	
							}
						}

						// 获取购物车中商品总数
						num += _cookie[i].num;
						$('.num').html(num);

						// 总计 --计算商品总价值
						sum+=parseInt(_cookie[i].price * _cookie[i].num);
						$('.sum').html(sum);
					}

					//继续购买
					$('.gobuy').click(function(){
						location.href = 'goodlist.html';
					})
				}
				//点击结算弹出遮罩层
				$('body').on('click','.statement .count',function(){
					popUp(num,sum);
					return false;
				})
			});
		 }
		else{
			$('.num').text(' 零 ');
			$('.sum').text('￥ 0');
			num = 0;
			sum = 0;
		}
	}
}


// ==================== 从cookie中获取数据并动态创建节点添加数据 ================



			// ================= 清空购物车 ==============
			
			$('span.clean').click(function(){
				$('.show').empty();
				$('.num').text(' 零 ');
				$('.sum').text('￥ 0');
				$.cookie("cart","",{expires:0, path:'/'});
			})

			// ================= 清空购物车 ==============
			

			/*=============== 点击叉删除该商品信息 ================*/
			// 动态创建对象之前或之后通过事件委托添加事件，先找到该对象已存在的父元素，然后绑定事件
			$('body').on('click','span.close',function(){
				// 1、获取点击删除项目的下标
				// 2、定义一个数组存储cookie
				// 3、删除对应cookie中指定下标的数据
				// 4、重新覆盖原来的cookie
				//cookie:  [{1}, {2}, {3}]
				//如果删除第1个数据， 则删除cookie数组中的第一个：{1}
				//-> [{2}, {3}] -> 重新覆盖原来的cookie

				if(window.confirm('是否确认删除！')){//???? 点击一次弹出后面所有的：因为置于多层循环中会多次调用
					var arrCookie = new Array();
					var _index = $(this).closest('div.shoplist').index();//获取删除物品的下标

					arrCookie = JSON.parse($.cookie("cart"));//定义一个数组存储该cookie，然后操作该数组，最后将操作过后的数组重新覆盖原来的cookie即可	 
					var removeCookie = arrCookie.splice(_index,1);//删除指定下标的cookie,removeCookie是被删除的条目

					// 重新覆盖原来的cookie
					$.cookie('cart',JSON.stringify(arrCookie),{expires:7,path:'/'});

					shopCar();//重新调用该函数，动态创建修改后的数据
				}else{
					return false;
				}
			});
			/*=============== 点击叉删除该商品信息 ================*/



			/*============== 点击复选框删除指定信息 ==============*/			
			//1、遍历所有的复选框，找到所有没有被选中的项，获取其下标，
			//2、然后通过下标获取对应cookie中的对象，并一一添加到空数组arr1中
			//3、将新数组重新覆盖原来的cookie
			//4、调用shorCar()函数创建cookie中对象
			$('.cbox').on('click',function(){
				if(JSON.parse($.cookie('cart')).length == 0){
					alert('购物车已清空，快去挑选商品吧！');
					return;
				}

				var arr1 = new Array();
				$(':checkbox').each(function(){
					if(!$(this).prop('checked')){
						var index = $(this).closest('div.shoplist').index();
						console.log(index);
					 
					 	arr1.push(JSON.parse($.cookie("cart"))[index]);
					 	console.log(JSON.parse($.cookie("cart"))[index]);
					}
				});
				$.cookie('cart',JSON.stringify(arr1),{expires:7,path:'/'});
				shopCar();


			})
			// console.log($.cookie('cart'));
			/*============== 点击复选框删除指定信息 ==============*/
		



			// 登录成功后页面显示 用户名，先判断cookie中是否有用户名
			if($.cookie('loginUser')){
				var loginUser = $.cookie('loginUser');
				$('.head-right span.my-dr').text("Hi, "+ loginUser);
			}
			else {
				$('.header_cen_rg_top ul li.dl').text("我的DR");
			}


			// 点击退出 删除cookie中 loginUser
			$("span.quit").on('click',function(){
				$.cookie('loginUser','',{expires:-1,path:'/'});
				location.href = 'index.html';
				console.log('popopopopopop')
			})


			$('.header .logo images').click(function(){
				location.href = 'index.html';
			})



})

			// ================== 点击立即结算弹出层 ===================

			function popUp(num,sum){
				// // 显示的内容盒子
				var count_box = $('<div/>').addClass('count_box');
				// // 遮罩层
				var count_mask = $('<div/>').addClass('count_mask');
				// 叉的转义字符 .html('&times;')
				var  aNode = $('<a/>').addClass('count_del');
				var count_con = $('<div/>').addClass('count_con');
				var p1Node = $('<p/>').text('商品总数：'+num);
				var p2Node = $('<p/>').text('商品总价：'+sum);
				var span1Node = $('<span/>').text('继续购物');
				var span2Node = $('<span/>').text('确定');


				$(count_box).append(aNode);
				p1Node.appendTo(count_con);
				p2Node.appendTo(count_con);
				span1Node.appendTo(count_con);
				span2Node.appendTo(count_con);
				count_con.appendTo(count_box);
				$('body').append(count_box);
				$('body').append(count_mask);

				center(count_box,count_mask);

				// X 点击事件
				aNode.click(function(){
					close();
				})

				span1Node.on('click',function(){
					location.href = 'goodlist.html';
				})	
				span2Node.on('click',function(){
					if($.cookie('loginUser')){
						alert('Thank You!');
						location.href = 'index.html';
					}else{
						alert('请先登录!');
						location.href = 'login.html';
					}
				})		


				// 窗口改变时触发
				$(window).resize(function(){
					center(count_box,count_mask);
					console.log('窗口改变')
				})

				// 滚动条时触发
				$(window).scroll(function(){
					center(count_box,count_mask);
					console.log('滚动')
				})

				// // 清除广告函数
				function close(){
					count_box.remove();
					count_mask.remove();	
				}


				// 内容居中，遮罩层全屏
				function center(box,mask){
					// 内容盒子居中显示
					box.css({
						'left':($(window).width() - box.outerWidth())/2,
						'top':($(window).height() - box.outerHeight())/2+$(window).scrollTop()	
					})

					// 遮罩层全屏显示
					mask.css({
						'width':$(window).width(),
						'height':$(window).height()+$(window).scrollTop()
					})
				}
			}
			// ================== 点击立即结算弹出层 ===================