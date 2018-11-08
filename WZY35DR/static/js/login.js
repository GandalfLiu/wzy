
$(function(){

	var isEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	var isTel = /^[1][358][0-9]{9}$/;
	var isPassword =  /^[^\s]{6,20}$/;
	var isChinese = /^[^\u4e00-\u9fa5]{0,}$/;
	var flage = false; 


	// 先判断cookie中是否保存了账号和密码
	// if(getCookie('users')){
	// 	$('input.user').val(getCookie('username')); 
	// 	$('input.pwd').val(getCookie('password')); 
	// }
	
		// 记住密码
		// if($(':checkbox:checked')){
		// 	var username = $('.user').val();
		// 	var pwd = $('.pwd').val();

		// 	var d = new Date();
		// 	d.setDate(d.getDate()+7);
		// 	setCookie("username",username,d);
		// 	setCookie("password",pwd,d);
		// }


	//账户验证
	$('input.user').on({
		'focus':function(){
			if(!isPassword.test($('input.pwd').val()) || !isChinese.test($('input.pwd').val())){
				$(this).css('border','');
			}else{
				$(this).css('border','1px solid red');
			}
		},
		'blur':function(){ 

			if($('input.user').val() == ''){
				$('.info').slideDown(200).text('账号不能为空！');
				$('input.user').css('border','1px solid red');
				flage = false;
			}else if(!isEmail.test($('input.user').val()) && !isTel.test($('input.user').val())){
				$('.info').slideDown(200).text('邮箱格式/手机号码不正确，请重新输入');
				$('input.user').css('border','1px solid red');
				$('input.pwd').css('border','');
				flage = false;
			}else{
				$('input.user').css('border','1px solid #ddd');
				$('.info').animate({
					'display':'none',
					'opacity':1
				});
				flage = true;
			}
		}
	})

	//密码验证
	$('input.pwd').on({
		'focus':function(){
			if($('input.user').css('border','1px solid red')){
				$(this).css('border','');
			}else{
				$(this).css('border','1px solid red');
			}
		},
		'blur':function(){
			if($('input.pwd').val() == ''){
				$('.info').slideDown(200).text('密码不能为空！');
				$('input.pwd').css('border','1px solid red');
				flage = false;
			}else if(!isPassword.test($('input.pwd').val()) || !isChinese.test($('input.pwd').val())){
				$('.info').slideDown(200).text('请输入长度为6-20位数的密码');
				$('input.pwd').css('border','1px solid red');
				$('input.user').css('border','');
				flage = false;
			}else{
				$(this).css('border','');
				$('.info').css('display','none');
				flage = true;
			}
		}
	})


	// 确认密码
	$('.checkPwd').on({
		'blur':function(){
			if($('.checkPwd').val() != $('.pwd').val()){
				$('.info').slideDown(200).text('两次密码输入不一致！');
				flage = false;
			}else{
				flage = true;
			}
		}
	})


	// 生成验证码
	function checkNum(){
		var str = '';//每次调用该函数时，都将之前的数据清空
		for(var i=0;i<4;i++){
			var num = parseInt((Math.random()*10)%2);// %2 后这里就只会输出 0 1 ，概率各为50%
			// console.log(num);
			if(num){
				str+=Math.ceil(Math.random()*9);
			}
			else{
				 str+=String.fromCharCode(Math.ceil(Math.random()*25)+65);
			}
		}
			return str;
	}
	$('#getCheckNum_phone').val(checkNum());
	$('#getCheckNum_mail').val(checkNum());

	$('#getCheckNum_phone').click(function(){
		$(this).val(checkNum());
	})

	$('#getCheckNum_mail').click(function(){
		$(this).val(checkNum());
	})
	

	// 校验验证码 --- 手机号
	$('#checkNum_phone').blur(function(){
		if($('#checkNum_phone').val() != $('#getCheckNum_phone').val()){
			$('.info').slideDown(200).text('验证码输入有误，请重新输入！');
			flage = false;
		}else{
			$('.info').css('display','none');
			flage = true;
		}
	})

	// 校验验证码 --- 邮箱
	$('#checkNum_mail').blur(function(){
		if($('#checkNum_mail').val() != $('#getCheckNum_mail').val()){
			$('.info').slideDown(200).text('验证码输入有误，请重新输入！');
			flage = false;
		}else{
			$('.info').css('display','none');
			flage = true;
		}
	})

	
	// 登录--判断用户是否存在于cookie中，有就可以登录
	$('.loginbtn').click(function(){
		var users = $.cookie('users');
		console.log(users);

		if(users){
			//反序列化，将json字符串转成对象
		    users = JSON.parse(users);
			
			//遍历查找是否有匹配的用户
			var isExit = false;//表示是否存在该用户
			for(var i=0;i<users.length;i++){
				if($('.login .user').val() == users[i].name && $('.login .pwd').val() == users[i].pwd){
					console.log('登陆成功');
					isExit = true;

					//保存最新登录的用户名
					$.cookie("loginUser", users[i].name, {expires:22, path:"/"});
					console.log($.cookie("loginUser"))
					location.href = 'index.html';//跳转到首页并将用户名传递过去
				}
			}
			if(!isExit){
				alert('用户名或密码不正确，请重新输入！');
				return;
			}

		}else{
			alert('请输入正确的账号密码！');
		}

	// if($('input.user').val() == '' || $('input.pwd').val()){
	// 		$('.info').slideDown(200).text('请先输入账号密码在登录！');
	// 		$('input.user').css('border','1px solid red');
	// 		$('input.pwd').css('border','1px solid red');
	// 		console.log('没有输入!');
	// 		return false;
	// 	}

	})

		// 随机色函数
		function color(){
			return "rgba("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+",1)"
		}


})