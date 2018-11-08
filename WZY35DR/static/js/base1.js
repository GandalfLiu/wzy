		
		/*1、设置cookie*/
		function setCookie(name,value,expires,path,domain,secure){
			// name = value
			var cookieText = encodeURIComponent(name)+'='+encodeURIComponent(value);

			//失效时间
			// 判断参数 expires 是不是时间类型
			// instanceof 判断是否属于某个类型
			if(expires instanceof Date){
				cookieText += '; expires='+expires;//分号后面加空格
			} 
			// path
			if(path){
				cookieText += '; path='+path;
			}
			//domain
			if(domain){
				cookieText += '; domain='+domain;
			}
			//secure
			if(secure){
				cookieText += '; secure';
			}

			document.cookie = cookieText;//设置cookie
			return document.cookie;
		}


		/*获取cookie*/
		function getCookie(name){//需要什么参数就传什么参数进去
			//解码
			var cookie = decodeURIComponent(document.cookie);
			// "name=jone; password=12345; expries=...."
			var arr = cookie.split(';');//["username=jone","password=12345","",""]

			for(var i=0;i<arr.length;i++){
				var arr2 = arr[i].split('=');//用等号继续拆分["username","jone"]

				if(arr2.length>=2){//避免取到最后取到secure
					if(arr2[0] == name){
						//如果等于了，我们就返回下标为1的值
						return arr2[1];
					}
				}
			}	
		return "";
		}
		

		/*删除cookie:设置失效日期*/
		function removeCookie(name){
			var d = new Date();

			document.cookie = decodeURIComponent(name)+"+=; expries="+d;
			return document.cookie;
			// setCookie(name,'',-1);
		}

		// ==============================================================
		

		// 设置cookie
		// var d = new Date("2016,9,9");
		// var cookieText = setCookie("name5","Alice",d);
		// console.log(cookieText);


		// 获取cookie
		// var value = getCookie("name5");
		// console.log(value);


		// 删除cookie
		// var cookie = removeCookie("name5");
		// console.log(cookie);
