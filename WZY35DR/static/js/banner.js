

/*轮播图*/
	function banner(){
		var _list1 = $('#list');
		var _list2 = $('#list2');
		var _li1 = $('#list li');
		var _li2 = $('#list2 li');
		$('#list li').css('width',$(document).width());//设置li和img的宽度为屏幕的宽度
		$('#list li images').css('width',$(document).width());

		//复制第一张图到最后
		_li1.first().clone(false).appendTo(_list1);

		// 图片数量
		var size = $("#list li").length;

		var iWidth = _li1.width();
		// var iWidth = $(document).width();

		var i = 0;//即将显示的图片的下标

		//开启定时器，自动轮播
		var timer = setInterval(function(){
			i++;
			move();
		},3000);


		//图片移动
		function move(){

			// 如果超出左边界，瞬间移动到第一张
			if(i>=size){
				_list1.css('left',0);//瞬间移动到第一张图(非动画);
				i = 1;//即将移动到第二张图(i=1);
			}

			//动画移动核心代码
			_list1.stop().animate({left:-i*iWidth},1000);

			
			// 更改按钮的选中状态
			_li2.eq(i).removeClass().addClass("active");
			//添加样式之前先清除样式
			_li2.removeClass().eq(i).addClass("active");
			if(i==size-1){
				_li2.removeClass().first().addClass('active');
			}
		}


		// 上一页
		$('#pre a').click(function(){
			i--;
			if(i<0){
				// i = (size-1);
				_list1.css('left',-(size-1)*iWidth);
				i = (size-2);//即将移动到第四张图，(i-3的图)
			}
			move();
		})

		// 下一页
		$('#next a').click(function(){
			i++;
			move();
		})


		// 小图片的移入事件
		_li2.mouseenter(function(){
			i = $(this).index();
			move();
		})

		$(".banner").hover(
			function(){
				clearInterval(timer);
			},
			function(){
				clearInterval(timer);
				timer = setInterval(function(){
					i++;
					move();
				},3000);
			}
		)
}
		/*轮播图*/