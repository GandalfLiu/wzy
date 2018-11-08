

$(function(){

	// 主页背景图片
	$(window).scroll(function(){
		if($(window).scrollTop()>=1200){
			$('.valentine_gdbk images').css({
				'position':'fixed',
				'bottom':0,
				'top':'auto'
			})
		}else{
			$('.valentine_gdbk images').css({
				'position':'relative', 
				'width':'100%'
			})
		}

		// 右边导航栏显示隐藏
		if($(window).scrollTop()>=300){
			$('.floor').slideDown(1000);
		}else{
			$('.floor').slideUp(1000);
		}
	})



	// $('.allCity').empty()
	// 获取 cityJSON 数据
	$.getJSON("json/city.json",function(json){

			//先遍历整个JSON，每一个数组都是一个li，然后遍历该数组对象
			for(var i=0;i<json.length;i++){
				var arr = json[i];

				// 遍历每个数组中的对象，并动态创建添加数据
				for(var j=0;j<arr.length;j++){
					$(".drstore-tab li").eq(i).find("p").append($('<span><a href="'+arr[j].href+'">'+ arr[j].city +' </a></span>'));
					$(".tab_class li").eq(i).find("p").append($('<span><a href="'+arr[j].href+'">'+ arr[j].city +' </a></span>'));
				}
				$('.allCity').append($('<span>'+json[0][i].city+'</span>'));
			}
	})

	// 城市联动动画效果
	$('.drstore-tab li').on('mouseenter',function(){
		$('.drstore-tab li').children('b').removeClass('active');
		$(this).children('b').addClass('active');
		
		// 添加动画效果之前调用 stop() 方法停止之前的动画
		$('images.line').stop().animate({'left':75+($(this).width()+48)*($(this).index()-1)})
		$('.drstore-tab p').hide().css('opacity',0);
		$(this).find('p').show().animate({'opacity':1},800)
	})




		$.getJSON("json/index.json",function(json){

			dl_nav = $('#nav li.dl_nav');//1
			pro_nav = $('#nav li.pro_nav');//2
			gift_nav = $('#nav li.gift_nav');//3
			shop_nav = $('#nav li.shop_nav');//5
			brand_nav = $('#nav li.brand_nav');//6
			com_nav = $('#nav li.com_nav');//7
			

			// 导航栏一
			$(dl_nav).hover(function(){
							callbackl(json);
							$(this).find('.block_dl').css('display','block');
						},
							function(){
							$(this).find('.block_dl').css('display','none');
						}
			)


			// 导航栏二 pro_nav
			$(pro_nav).hover(function(){
								callbackp(json);
								$(this).find('.block').css('display','block');
						},
							function(){
								$(this).find('.block').css('display','none');
								$('#nav .pro_nav .left ul li').remove();
								$('#nav .pro_nav .right ul li').remove();
						}
					);
			// $('#nav li.pro_nav ul li').click(function(){
			// 	location.href = 'goodlist.html';
			// })
			
			// 导航栏三 gift_nav
			$(gift_nav).hover(function(){callbackg(json);
						$(this).find('.block').css('display','block');
					},
					function(){
						$(this).find('.block').css('display','none');
						$('#nav .gift_nav .left ul li').remove();
						$('#nav .gift_nav .right ul li').remove();
					}
				);


			// 导航栏五 左边
			$('.tab_class li').on('mouseenter',function(){
				$('.tab_class li').children('b').removeClass('active');
				$(this).children('b').addClass('active');

				$('images.line').stop().animate({'left':20+$(this).width()*($(this).index()-1)},300)
				$('.tab_class p').hide().css('opacity',0);//先让之前的都隐藏起来，并且透明度为0
				$(this).find('p').stop().show().animate({'opacity':1},800);//让当前划过的标签显示
			})

			// 导航栏五 右边
			var i = 0;
			var timer = setInterval(move,2000)

				function move(){
				if(i<=3){
					$('.dright-images li').eq(i).stop().animate({opacity:1}).siblings().animate({opacity:0});
					i++;
					// console.log(i)
				}else if(i>3){
					i=0;
				}
			}

			for(var i=0;i<json[7].length;i++){
				$('.dright-images li').eq(i).append($('<images/>').attr('src',json[7][i].src));
				$('.dright-images li').eq(i).append($('<a/>').text(json[7][i].title));
			}

			$('.dright-images li').hover(function(){
				clearInterval(timer);
				$(this).find('a').css('color','#d49e85');
				console.log('99999');
			},function(){
				 timer = setInterval(move,2000)	 
			})


			// 导航栏六
			$(brand_nav).hover(function(){callbackl(json);
							$(this).find('.block_dl').css('display','block');
						},function(){
							$(this).find('.block_dl').css('display','none');
						}
			)

			// 导航栏七
			$(com_nav).hover(function(){callbackl(json);
							$(this).find('.block_dl').css('display','block');
						},function(){
							$(this).find('.block_dl').css('display','none');
						}
			)

			

			// 主页中所有大图
			//将页面中的大图分为 3 3 3 4的结构，每一组取相同的类名并分别从JSON中获取
			for(var i=0;i<json[6][0].length;i++){
				$('images.t1').eq(i).attr('src',json[6][0][i].src);
			}
			for(var i=0;i<json[6][1].length;i++){
				$('images.t2').eq(i).attr('src',json[6][1][i].src);
			}
			for(var i=0;i<json[6][2].length;i++){
				$('images.t3').eq(i).attr('src',json[6][2][i].src);
			}
			for(var i=0;i<json[6][3].length;i++){
				$('images.t4').eq(i).attr('src',json[6][3][i].src);
			}

	})


		// 导航栏一 callback
		function callbackl(json){
			for(var i=0;i<json[0].length;i++){
				
				// $('.shop_nav a.a5').eq(i).text(json[3][i].title);
				$('.brand_nav a.a6').eq(i).text(json[4][i].title).attr('href','goodlist.html');
				$('.com_nav a.a7').eq(i).text(json[5][i].title).attr('href','goodlist.html');
				$('images.d1').eq(i).attr('src',json[0][i].src);
				// $('images.d5').eq(i).attr('src',json[3][i].src);
				$('images.d6').eq(i).attr('src',json[4][i].src);
				$('images.d7').eq(i).attr('src',json[5][i].src);
			}
		}


		// 导航栏二 callback
		function callbackp(json){

			$.each(json[$(pro_nav).index()],function(i,ele){
				$('#nav .pro_nav .left ul').append('<li>'+ json[$(pro_nav).index()][i].title +'</li>')
				
				$('#nav .pro_nav .left ul li').off('mouseenter');
				$('#nav .pro_nav .left ul li').on({
					'mouseenter':function(){
						console.log(json[$(pro_nav).index()][$(this).index()].src);
						$('#nav .pro_nav .left .left_img images').attr('src',json[$(pro_nav).index()][$(this).index()].src);
						$(this).removeClass('add').toggleClass('add');
					},
					'mouseleave':function(){
						$(this).removeClass('add');
					},
					'click':function(){
						location.href = json[$(pro_nav).index()][$(this).index()].href;
					}
				})
			})

			$.each(json[$(pro_nav).index()],function(i,ele){
				$('#nav .pro_nav .right ul').append('<li>'+ json[$(pro_nav).index()][i].title +'</li>');
				
				$('#nav .pro_nav .right ul li').off('mouseenter')
				$('#nav .pro_nav .right ul li').on({
					'mouseenter':function(){
						console.log(json[$(pro_nav).index()][$(this).index()].src);
						$('#nav .pro_nav .right .right_img images').attr('src',json[$(pro_nav).index()][$(this).index()].src);
						$(this).removeClass('add').toggleClass('add');
					},
					'mouseleave':function(){
						$(this).removeClass('add');
					},
					'click':function(){
						location.href = json[$(pro_nav).index()][$(this).index()].href;
					}
				})
			});
		}


	// 导航栏三 callback
	function callbackg(json){
		$.each(json[$(gift_nav).index()],function(i,ele){
				$('#nav .gift_nav .left ul').append('<li>'+ json[$(gift_nav).index()][i].title +'</li>')
				
				$('#nav .gift_nav .left ul li').off('mouseenter')
				$('#nav .gift_nav .left ul li').on({
					'mouseenter':function(){
						// console.log(json[$(gift_nav).index()][$(this).index()].src);
						$('#nav .gift_nav .left .left_img images').attr('src',json[$(gift_nav).index()][$(this).index()].src);
						$(this).removeClass('add').toggleClass('add');
					},
					'mouseleave':function(){
						$(this).removeClass('add');
					},
					'click':function(){
						location.href = json[$(gift_nav).index()][$(this).index()].href;
					}
				})
			})

			$.each(json[$(gift_nav).index()],function(i,ele){
				$('#nav .gift_nav .right ul').append('<li>'+ json[$(gift_nav).index()][i].title +'</li>');
				
				$('#nav .gift_nav .right ul li').off('mouseenter')
				$('#nav .gift_nav .right ul li').on({
					'mouseenter':function(){
						// console.log(json[$(gift_nav).index()][$(this).index()].src);
						$('#nav .gift_nav .right .right_img images').attr('src',json[$(gift_nav).index()][$(this).index()].src);
						$(this).removeClass('add').toggleClass('add');
					},
					'mouseleave':function(){
						$(this).removeClass('add');
					},
					'click':function(){
						location.href = json[$(gift_nav).index()][$(this).index()].href;
					}
				})
			});
		}



	/*轮播图*/
	// 1.获取数据
	$.get('json/lunbo.json',function(data){

		// 2、显示数据到页面上
		for(var i=0;i<data.length;i++){
			var obj = data[i];
			var img = obj.img;
			var id = obj.id;

			$('#list').append("<li><images src="+ img +" /></li>");
			$("#list2").append("<li>" +(i+1)+ "</li>");
			if(i == 0){
				$('#list2 li').first().addClass('active');
			}
		}
		//开启自动轮播 调用 banner.js 函数
		banner();
	})
	/*轮播图*/


	//登录按钮
	$('.header_cen_rg_top .dl').click(function(){
		location.href = 'login.html';
	})


	//加入DR按钮
	$('.header_cen_rg_top .join').click(function(){
		location.href = 'register.html';
	})


	//身份证验证
	var timer = '';
	$('.header_cen_rg_bot input:button').click(function(){

		clearInterval(timer);//点击之前先清除之前的定时器

		$('.header_cen_rg_bot span').css('display','none');
   		// !reg.test($('.header_cen_rg_bot input:text').val())  -- var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
   		if(!IDCardCheck($('.header_cen_rg_bot input:text').val())){
   			$('.header_cen_rg_bot .info i').css('display','block');
   				timer = setInterval(function(){
   				$('.header_cen_rg_bot .info i').css('display','none');
   			},2000)
   		}else{
   			clearInterval(timer);
   		}
	})

	$('.header_cen_rg_bot .info').hover(
		function(){
		$('.header_cen_rg_bot span').css('display','block');
		},
		function(){
		$('.header_cen_rg_bot span').css('display','none');
		})
	


	//所在城市店铺
	$('.city').off('mouseenter');
	$('.city').mouseenter(function(){
		$(this).css({
			'border-top':' 1px solid #d49e85',
			'border-left': '1px solid #d49e85',
			'border-right': '1px solid #d49e85',
			'border-bottom': '1px solid #fff'
		})
		$('.allCity').css('display','block');
	})

	$('.allCity').mouseleave(function(){
		$(this).css('display','none');
		$('.city').css('border','1px solid transparent')
	})





	// 身份证验证函数
	function IDCardCheck(num) {
	    num = num.toUpperCase();
	    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
	    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
	        // alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
	        return false;
	    }
	    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	    // 下面分别分析出生日期和校验位
	    var len, re;
	    len = num.length;
	    if (len == 15) {
	        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
	        var arrSplit = num.match(re);
	 
	        // 检查生日日期是否正确
	        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
	        var bGoodDay;
	        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
	        if (!bGoodDay) {
	           // alert('输入的身份证号里出生日期不对！');
				$('.info i').html('输入的身份证号里出生日期不对！');
	            return false;
	        }
	        else {
	            // 将15位身份证转成18位
	            // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	            var nTemp = 0, i;
	            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
	            for (i = 0; i < 17; i++) {
	                nTemp += num.substr(i, 1) * arrInt[i];
	            }
	            num += arrCh[nTemp % 11];
	            return true;
	        }
	    }
	    if (len == 18) {
	        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
	        var arrSplit = num.match(re);
	 
	        // 检查生日日期是否正确
	        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
	        var bGoodDay;
	        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
	        if (!bGoodDay) {
	           // alert(dtmBirth.getYear());
	           // alert(arrSplit[2]);
	           // alert('输入的身份证号里出生日期不对！');
				$('.info i').html('输入的身份证号里出生日期不对！');
	            return false;
	        }
	        else {
	            // 检验18位身份证的校验码是否正确。
	            // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	            var valnum;
	            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	            var nTemp = 0, i;
	            for (i = 0; i < 17; i++) {
	                nTemp += num.substr(i, 1) * arrInt[i];
	            }
	            valnum = arrCh[nTemp % 11];
	            if (valnum != num.substr(17, 1)) {
	                // alert('18位身份证的校验码不正确！'); //应该为： + valnum
					$('.info i').html('18位身份证的校验码不正确！');
	                return false;
	            }
	            return true;
	        }
	    }
	    return false;
	}
	// 身份证验证 330723197902021937


	//主页大图跳转链接
	$('.dr_dring a').attr('href','goodlist.html');

	//头部左侧logo点击回到主页
	$('.header_cen_lf images').click(function(){
		location.href = 'index.html';
	})


	// ============ 登录成功后首页显示用户名 ==================
	console.log($.cookie('loginUser'));
	var userName = location.search.replace("?","");
	console.log(userName);
	var name = userName.substring(6); 

	// 判断cookie中是否有登录的用户名
	if($.cookie('loginUser')){
		var loginUser = $.cookie('loginUser');
		$('.header_cen_rg_top ul li.dl').text("Hi, "+ loginUser);
	}
	else {
		$('.header_cen_rg_top ul li.dl').text("登录");
	}
	// ============== 登录成功后首页显示用户名 =================


			var flage = true;
			// 返回顶部按钮
			$('.back_top').on({
				'mouseenter':function(){
					$(this).css({
						'background-position':'-50px -50px',
						'backgroundColor':'#fff'
					})
					$(this).find('div').stop().css({'display':'block','right':50,'opacity':1}).animate({'width':80}).text('返回顶部');
				},
				'mouseleave':function(){
					$(this).css({
						'background-position':'0px -50px',
						'backgroundColor':'#dbc7ba'
					})
					$(this).find('div').animate({'width':0,'opacity':0},400);
				},
				'click':function(){
					$('body').animate({
						scrollTop:0
					},800);
				}
			})
			$('div.car').on({
				'mouseenter':function(){
					$(this).css({
						'background-position':'40px -28px',
						'backgroundColor':'#fff',
						'cursor':'pointer'
					})
					$(this).find('div').stop().css({'display':'block','right':50,'opacity':1}).animate({'width':80}).text('购物车');
				},
				'mouseleave':function(){
					$(this).css({
						'background-position':'10px -28px',
						'backgroundColor':'#dbc7ba'
					})
					$(this).find('div').animate({'width':0,'opacity':0},400);
				},
				'click':function(){
					location.href = 'shopcar.html?'+userName;
				}
			})
			$('div.card').on({
				'mouseenter':function(){
					$(this).css({
						'background-position':'40px -70px',
						'backgroundColor':'#fff'
					})
					$(this).find('div').stop().css({'display':'block','right':50,'opacity':1}).animate({'width':80}).text('我的订单');
				},
				'mouseleave':function(){
					$(this).css({
						'background-position':'10px -70px',
						'backgroundColor':'#dbc7ba'
					})
					$(this).find('div').animate({'width':0,'opacity':0},400);
				}
			})
			$('div.mysave').on({
				'mouseenter':function(){
					$(this).css({
						'background-position':'40px -112px',
						'backgroundColor':'#fff'
					})
					$(this).find('div').stop().css({'display':'block','right':50,'opacity':1}).animate({'width':80}).text('我的收藏');
				},
				'mouseleave':function(){
					$(this).css({
						'background-position':'10px -112px',
						'backgroundColor':'#dbc7ba'
					})
					$(this).find('div').animate({'width':0,'opacity':0},400);
				},
				'click':function(){
					if(flage){
						$('.cbox').stop().animate({
							'width':250,
							'right':50
						},800)
						$('.cbox').css('display','block');
						flage = false;
					}else{
						$('.cbox').stop().animate({
							'width':0
						},600)
						$('.cbox').css('display','none');
						flage = true;
					}
					
				}
			})
			$('div.save').on({
				'mouseenter':function(){
					$(this).css({
						'background-position':'40px -152px',
						'backgroundColor':'#fff'
					})
					$(this).find('div').stop().css({'display':'block','right':50,'opacity':1}).animate({'width':80}).text('收藏网站');
				},
				'mouseleave':function(){
					$(this).css({
						'background-position':'10px -152px',
						'backgroundColor':'#dbc7ba'
					})
					$(this).find('div').animate({'width':0,'opacity':0},400);
				}
			})
			$('div.mob').on({
				'mouseenter':function(){
					$(this).css({
						'background-position':'40px -194px',
						'backgroundColor':'#fff'
					})

					$(this).find('div').stop().css({'display':'block','right':50,'opacity':1}).animate({'width':250,'height':120});
				},
				'mouseleave':function(){
					$(this).css({
						'background-position':'10px -194px',
						'backgroundColor':'#dbc7ba'
					})
					$(this).find('div').animate({'width':0,'opacity':0},400);
				}
			})
			$('div.share').on({
				'mouseenter':function(){
					$(this).css({
						'background-position':'38px 40px',
						'backgroundColor':'#fff'
					})
					$(this).find('div').stop().css({'display':'block','right':50,'opacity':1}).animate({'width':150});
				},
				'mouseleave':function(){
					$(this).css({
						'background-position':'10px 40px',
						'backgroundColor':'#dbc7ba'
					})
					$(this).find('div').animate({'width':0,'opacity':0},400);
				}
			})





// ========================= 右侧导航栏 我的收藏 =========================
		// 创建收藏栏中div函数
		function create(){
			var countCar = 0;

			var name = ""; //默认表示未登录
			if($.cookie('loginUser')){
				console.log('cookie中存了用户名：'+$.cookie('loginUser'));
				name = $.cookie('loginUser'); //如果登录了， 则name为登录的账户
			}

			$('.cbox').empty(); 

				var _cookie = $.cookie('mysave');//先判断是否有cookie，在进行操作

				if (_cookie) {
					 _cookie = JSON.parse(_cookie);

					 for(var x=0;x<_cookie.length;x++){
				  		console.log(_cookie);
				  		if(_cookie[x].userName == name){
				  			var divNode = $('<div/>').addClass('cbox_good');
				  			var spanNode = $('<span/>').text("价格："+_cookie[x].price);
				  			var pNode = $('<p/>').text("系列："+_cookie[x].discript);
				  			var numNode = $('<i/>').text("数量："+_cookie[x].num);
				  			var img = $('<images/>').attr('src',_cookie[x].img);
				  			var aNode = $('<a/>').html('X').attr('title','删除');
				  			countCar += _cookie[x].num;
						  	$('.floor div.mysave i').html(countCar);
				  			console.log(countCar);

				  			img.appendTo(divNode);
						  	spanNode.appendTo(divNode);
						  	pNode.appendTo(divNode);
						  	numNode.appendTo(divNode);
						  	aNode.appendTo(divNode);
						  	divNode.appendTo($('.cbox'));
				  		}
					}
			  }
		}

		create();



		// 点击删除清除收藏的指定内容
		$('body').on('click','.cbox a',function(){
			if(window.confirm('是否确认删除！')){//???? 点击一次弹出后面所有的：因为置于多层循环中会多次调用
				var _index = $(this).closest('div.cbox_good').index();//获取删除物品的下标

				var arrCookie = new Array();
				arrCookie = JSON.parse($.cookie("mysave"));//定义一个数组存储该cookie，然后操作该数组，最后将操作过后的数组重新覆盖原来的cookie即可	 
				arrCookie.splice(_index,1);//删除指定下标的cookie,removeCookie是被删除的条目

				// 重新覆盖原来的cookie
				$.cookie('mysave',JSON.stringify(arrCookie),{expires:7,path:'/'});
				create();//重新调用该函数，动态创建修改后的数据
			}else{
				return false;
			}
		})



			 // 点击收藏 -- 飞入到购物车的效果
			  $('body').on('click','span.save',function(){

			  	if(window.confirm('是否确认添加！')){	

			  	var clone = $(this).closest('li').clone(false);
			  	var imgNode = clone.find('img').clone(false);

			  	$('.dring_thing').append(clone);
			  	clone.css({
			  		'position':'absolute',
			  		'width':100,
			  		'height':100,
			  		'border':'1px solid #ddd',
			  		'-webkit-border-radius':100,
			  		'-moz-border-radius':100,
			  		'-o-border-radius':100,
			  		'border-radius':100,
			  		'left':$(this).offset().left,
			  		'top':$(this).closest('li').offset().top
			  	});

			  	clone.stop().animate({
			  		'left':$('.floor').offset().left,
			  		'top':$('.floor .mysave').offset().top,
			  		'width':0,
			  		'height':0,
			  		'opacity':0.5
			  	},1200,function(){
			  		clone.remove();
			  	});
			  	

				//要加入购物车的商品信息
			  	var goodsId = $(this).closest('li').find('i.sale').text();
			  	var discript = $(this).closest('li').find('p').text();
			  	var price = $(this).closest('li').find('h4').text();
			  	var img = $(this).closest('li').find('images').attr('src');
			  	var name = ""; //默认表示未登录
				if($.cookie('loginUser')){
					console.log('cookie中存了用户名：'+$.cookie('loginUser'));
					name = $.cookie('loginUser'); //如果登录了， 则name为登录的账户
				}

			  	//获取之前先判断cookie是否有
			  	var arr1 = $.cookie("mysave")?JSON.parse($.cookie('mysave')):[];

			  	//遍历查找是否之前的收藏中是否存在即将添加的商品
			  	var isExit = false;
			  	for(var j=0;j<arr1.length;j++){
			  		//如果存在该商品，把数量加一
			  		if(goodsId == arr1[j].id){
			  			arr1[j].num++;
			  			isExit = true;
			  		}
			  	}

			  	if(!isExit){
			  		//商品对象
			  		var goods = {
			  			id:goodsId,
			  			discript:discript,
			  			price:price,
			  			img:img,
			  			userName:name,
			  			num:1
			  		}
			  		arr1.push(goods);
			  	}
				  	$.cookie('mysave',JSON.stringify(arr1),{expires:7,path:'/'});
				  	console.log($.cookie('mysave'));
				  	create();
			  	}else{
			  		return false
			  	}

		  })

// ====================== 右侧导航栏我的收藏 ============================




// ================ 购物车中商品数量 ==============
	function myCar(){
		var name = ""; //默认表示未登录
		if($.cookie('loginUser')){
			console.log('cookie中存了用户名：'+$.cookie('loginUser'));
			name = $.cookie('loginUser'); //如果登录了， 则name为登录的账户
		}

		var cookieCar = $.cookie('cart');
		if(cookieCar){
			var num = 0;
			cookieCar = JSON.parse(cookieCar);

			for(var i=0;i<cookieCar.length;i++){
				if(cookieCar[i].userName == name){
					num += cookieCar[i].num
					$('.floor .car i').text(num);
				}
			}
		}
	}
	myCar();
// =================== 购物车中商品数量=====================


})