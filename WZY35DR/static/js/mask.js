$(function(){
	// mask();
})

//遮罩层广告
function mask(){
	// 显示的内容盒子
	var box = $('<div id="box"></div>');
	// 遮罩层
	var mask = $('<div id="mask"></div>');
	// ×
	var  aNode = $('<a class="del"></a>');// 叉的转义字符 .html('&times;')

	//这里定义的clientW和clientH是第一次调用函数时的浏览器分辨率，所以下面当屏幕分辨率改变时需要重新获取屏幕分辨率
	// var clientW = $(window).width();
	// var clientH = $(window).height();

	$('body').append(box);
	$('body').append(mask);
	$(box).append(aNode);

	center(box,mask);

	// X 点击事件
	aNode.click(function(){
		close();
	})

	// 定时器
	var  i = 5;
	var pNode = $('<p class="ptime"/>');
	var time = setInterval(function(){
	$(box).append(pNode);
		pNode.text('广告关闭还有 '+i+' 秒')
			if(i <= 0){
				close();
				clearInterval(time);
			}
			i--;
		},1000);

	// 窗口改变时触发
	$(window).resize(function(){
		center(box,mask);
		console.log('窗口改变')
	})

	// 滚动条时触发
	$(window).scroll(function(){
		center(box,mask);
		console.log('滚动')
	})

	// 清除广告函数
	function close(){
		box.remove();
		mask.remove();	
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


