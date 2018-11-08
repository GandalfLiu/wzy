
$(function(){
	$('.register .moble').click(function(){
		$('.register_cont_phone').css('display','block');
		$('.register_cont_mail').css('display','none');
		$('.register .moble').css({
			'background':'#fff',
			'border':'none'
		})
		$('.register .Email').css({
			'background':'#f5f5f5',
			'border':'1px solid #e4e6e8'
		})
	})

	$('.register .Email').click(function(){
		$('.register_cont_phone').css('display','none');
		$('.register_cont_mail').css('display','block');
		$('.register .Email').css({
			'background':'#fff',
			'border':'none'
		})
		$('.register .moble').css({
			'background':'#f5f5f5',
			'border':'1px solid #e4e6e8'
		})
	})



	var isEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	var isTel = /^[1][358][0-9]{9}$/;
	var isPassword =  /^[^\s]{6,20}$/;
	var isChinese = /^[^\u4e00-\u9fa5]{0,}$/;

	// =======================用户注册 存入cookie中===========================
	// 点击注册按钮时要先判断上面所有的信息是否填写正确，如果不对则高亮显示
	// 1、手机号码注册
	$('.register_cont_phone .joindr').click(function(){
		console.log('ppppp')
		if(!($('#agree_phone:checkbox').prop('checked'))){
			alert('请勾选用户注册协议和隐私条款！');
			return;	
		}
		else if(!( isTel.test($('.register_cont_phone .user').val()) )){
			$('.info').slideDown(200).text('邮箱格式/手机号码不正确，请重新输入');
			$('.register_cont_phone .user').css('border','1px solid red');
			console.log('账号输入有误');
			return;
		}else if(!isPassword.test($('input.pwd').val()) || !isChinese.test($('input.pwd').val())){
			$('.register_cont_phone .info').slideDown(200).text('请输入长度为6-20位数的密码');
			$('.register_cont_phone .pwd').css('border','1px solid red');
			console.log('密码输入有误')
			return;
		}else if($('.register_cont_phone .checkPwd').val() != $('.register_cont_phone .pwd').val()){
			$('.info').slideDown(200).text('两次密码输入不一致！');
			$('.register_cont_phone .checkPwd').css('border','1px solid red');
			console.log('两次密码输入不一致！');
			return;
		}else if($('#checkNum_phone').val() != $('#getCheckNum_phone').val()){
			alert('验证码输入错误，请重新输入！');
			return;
		}else{
			// 获取之前保存的用户名
			var users = $.cookie('users')?JSON.parse($.cookie('users')):[];

			// 遍历users数组，判断是否存在该用户，如果存在则不能注册
			for(var i=0;i<users.length;i++){
				if($('.register_cont_phone .user').val() == users[i].name){
					alert('该用户已存在，不能注册！');
					return;
				}
			}

			//将需要注册的用户保存到 cookie 中去，用对象存储
			var user = {
				name:$('.register_cont_phone .user').val(),
				pwd:$('.register_cont_phone .pwd').val()
			}
			users.push(user);//添加新用户

			//保存到cookie中去
			$.cookie('users',JSON.stringify(users),{expires:7,path:'/'});
			console.log($.cookie('users'));

			//清空数据跳转到登陆界面
			$('.register_cont_mail input').val('');
			$('.register_cont_phone input').val('');
			location.href = 'login.html';
			alert('注册成功！');
		}
	})


	// 2、邮箱注册
	$('.register_cont_mail .regBtn').click(function(){
		console.log('EEEEEEEEmail');
		if(!($('#agree_mail:checkbox').prop('checked'))){
			alert('请勾选用户注册协议和隐私条款！');
			return;	
		}
		else if(!( isEmail.test($('.register_cont_mail .user').val()) )){
			$('.register_cont_mail .info').slideDown(200).text('邮箱格式/手机号码不正确，请重新输入');
			$('.register_cont_mail .user').css('border','1px solid red');
			console.log('账号输入有误');
			return;
		}else if(!isPassword.test($('.register_cont_mail input.pwd').val()) || !isChinese.test($('.register_cont_mail input.pwd').val())){
			$('.register_cont_mail .info').slideDown(200).text('请输入长度为6-20位数的密码');
			$('.register_cont_mail .pwd').css('border','1px solid red');
			console.log('密码输入有误')
			return;
		}else if($('.register_cont_mail .checkPwd').val() != $('.register_cont_mail .pwd').val()){
			$('.info').slideDown(200).text('两次密码输入不一致！');
			$('.register_cont_mail .checkPwd').css('border','1px solid red');
			console.log('两次密码输入不一致！');
			return;
		}else if($('#checkNum_mail').val() != $('#getCheckNum_mail').val()){
			alert('验证码输入错误，请重新输入！');
			return;
		}else{
			// 获取之前保存的用户名
			var users = $.cookie('users')?JSON.parse($.cookie('users')):[];

			// 遍历users数组，判断是否存在该用户，如果存在则不能注册
			for(var i=0;i<users.length;i++){
				if($('.register_cont_mail .user').val() == users[i].name){
					alert('该用户已存在，不能注册！');
					return;
				}
			}

			//将需要注册的用户保存到 cookie 中去，用对象存储
			var user = {
				name:$('.register_cont_mail .user').val(),
				pwd:$('.register_cont_mail .pwd').val()
			}
			users.push(user);//添加新用户

			//保存到cookie中去
			$.cookie('users',JSON.stringify(users),{expires:7,path:'/'});
			console.log($.cookie('users'));

			//清空数据跳转到登陆界面
			$('.register_cont_mail input').val('');
			$('.register_cont_phone input').val('');
			location.href = 'login.html';
			alert('注册成功！');
		}
	})
	// =======================用户注册===========================

	//以后账户登录 
	$('.other_login span').click(function(){
		location.href = 'login.html'
	})
	
})
