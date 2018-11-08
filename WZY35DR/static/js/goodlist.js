

$(function(){
	var ulNode = $('.dring_thing');
	// 页数
	var index = 0;

	// 全局变量存储JSON数据
	var str = [];

	// 商品总数
	var count = 0;
	

	// var userName = location.search.replace("?","");
	// var name = userName.substring(6); //取到用户名

	$.get({
		"url":"json/goodlist.json",
		"success":function(res){

			// 定义一个全局变量将JSON数据保存，便于其他函数调用
			str = res;
			console.log(str);
			
			//更新界面的回调函数，动态创建li并获取相对应数据
			refreshPage(str);

			// 计算总商品数
			for(var j=0;j<str.length;j++){
		  		count+=str[j].length;
		  		// console.log(count);
		  }

		  $('.pageCount').html(count);


		  // ================ 点击页码翻页 ==================
		  for(x=0;x<str.length;x++){
		  		
		  	if(x>3){
		  		var liNodePc = $('<li/>').text('...');
		  		liNodePc.appendTo($('ul.pageC'));
		  		return false;
		  	}else{
		  		//默认显示第一页，第一个按钮高亮显示
			   $('ul.pageC li').first().addClass('pageC_active');
		  		var liNodePc = $('<li/>').text(x+1).click(function(){
		  			$(this).addClass('pageC_active').siblings().removeClass('pageC_active');
		  			index = $(this).index();
		  			refreshPage(str);
		  		});
		  			liNodePc.appendTo($('ul.pageC'));
		  	}
		  }
		  // ================ 点击页码翻页 ==================
		}
	})


	// 更新页数的回调函数
	function refreshPage(json){

		// 显示当前页数
		$('.pageNum').html((index+1)+"/"+json.length);

		//添加新节点
		var arr = json[index];
		console.log(arr);//JSON中的六个小数组就是每页的数据 
		createShopList(arr);
	}


	// =============== 创建商品列表函数 ===================
	function createShopList(arr) {
		//清除原来的旧节点
		ulNode.empty();

		//添加新节点
		for(var i=0;i<arr.length;i++){

			var liNode = $('<li/>');

			var id = arr[i].id;//用变量将指定id的对象存储，方便后面点击事件调用
			// 通过商品的 唯一的id 在JSON中找到对应的详情 arr[i].id ==> json[index][i].id --- index：页数，i：对象下标，id；id属性
			var aNode = $('<a/>').attr('href',"goodinfo.html?"+id); 
			var imgNode = $('<images/>').attr('src',arr[i].src);
			var divNode = $('<div/>').addClass('dring_thing-cort');
			var h4 = $('<h4/>').addClass('price').text(arr[i].price);
			var pNode = $('<p/>').text(arr[i].discript);;
			var spansNode = $('<span/>').addClass('save').text('收藏');
			var spanbNode = $('<a/>').attr('href',"goodinfo.html?"+id).addClass('buy').text('购买');
			var isNode = $("<i/>").addClass('sale').text("已售："+arr[i].sale);
			var icNode = $('<i/>').addClass('com').text("评价："+arr[i].com);

			// 添加标签
			liNode.append(aNode.append(imgNode));
			divNode.append(h4);
			divNode.append(pNode);
			divNode.append(spansNode);
			divNode.append(spanbNode);
			liNode.append(divNode);
			liNode.append(isNode);
			liNode.append(icNode);

			// 从json中获取所需数据
			ulNode.append(liNode);
		  
		}
		// =============== 创建商品列表函数 ===================
	}

		
	

		 // ==================== 上下翻页按钮 ===================
		 var prevPage = $('.nextPage');
		 var nextPage = $('.prevPage');

		 prevPage.click(function(){
		 	if(index<=0){
		 		return false;//阻止默认点击事件，不阻止的话还是会调用 refreshPage()函数
		 	}else{
		 		index-=1;
		 	}
		 	//翻页按钮跟着上下翻页一起动
			$('ul.pageC li').eq(index).addClass('pageC_active').siblings().removeClass('pageC_active');
			refreshPage(str);


			return false;//阻止默认点击事件
		 })

		  nextPage.click(function(){
		 	if(index>=str.length-1){
		 		return false;//阻止 a标签 默认点击事件
		 	}else{
		 		index+=1;
		 	}
			$('ul.pageC li').eq(index).addClass('pageC_active').siblings().removeClass('pageC_active');
			refreshPage(str);

			return false;//阻止 a标签 的默认点击事件
		 })
		 // ==================== 上下翻页按钮 ===================
		 


		 //=================== 按价格排序 =====================
		 var t = 0;
		 $('.drring_sort i.sort-price').on('click',function(){
		  	// $(this).css({'background-color':'#DBC7BA','color':'#fff'}).siblings('i').css({'background-color':'#fff','color':'#8F8888'});
		  	$(this).addClass('sort-hover').siblings('i').removeClass('sort-hover');
		 	for(var i=0;i<str[index].length;i++){
		 		for(var j=0;j<str[index].length;j++){
		 			if(parseInt(str[index][i].price) > parseInt(str[index][j].price)){
		 				t = str[index][i];
		 				str[index][i] = str[index][j];
		 				str[index][j] = t;
		 			}
		 		}
		 		console.log(typeof parseInt(str[index][i].price));
		 	}
		 	createShopList(str[index]);
		 	return str[index];
		 })
		 //=================== 按价格排序 =====================
		 


		//=================== 按销量排序 =====================
		 $('.drring_sort i.sort-num').on('click',function(){
		  	// $(this).css({'background-color':'#DBC7BA','color':'#fff'}).siblings('i').css({'background-color':'#fff','color':'#8F8888'});
		  	$(this).addClass('sort-hover').siblings('i').removeClass('sort-hover');
		 	for(var i=0;i<str[index].length;i++){
		 		for(var j=0;j<str[index].length;j++){
		 			if(parseInt(str[index][i].sale) > parseInt(str[index][j].sale)){
		 				t = str[index][i];
		 				str[index][i] = str[index][j];
		 				str[index][j] = t;
		 			}
		 		}
		 		console.log(typeof parseInt(str[index][i].sale));
		 	}
		 	createShopList(str[index]);
		 	return str[index];
		 })
		 //=================== 按价格排序 =====================


		//=================== 按人气排序 =====================
		 $('.drring_sort i.sort-com').on('click',function(){
		  	// $(this).css({'background-color':'#DBC7BA','color':'#fff'}).siblings('i').css({'background-color':'#fff','color':'#8F8888'});
		  	$(this).addClass('sort-hover').siblings('i').removeClass('sort-hover');
		 	for(var i=0;i<str[index].length;i++){
		 		for(var j=0;j<str[index].length;j++){
		 			if(parseInt(str[index][i].com) > parseInt(str[index][j].com)){
		 				t = str[index][i];
		 				str[index][i] = str[index][j];
		 				str[index][j] = t;
		 			}
		 		}
		 		console.log(typeof parseInt(str[index][i].com));
		 	}
		 	createShopList(str[index]);
		 	return str[index];
		 })
		 //=================== 按人气排序 =====================

		  
})
