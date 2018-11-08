	 	

		
	 		/**
	 		 * 
	 		 * @param {Object} 需要运动的元素
	 		 * @param {Object} 需要修改所有的属性
	 		 * @param {Object} 回调函数
	 		 */

	 		 function startMove(obj,json,fn){
	 			//1.清除之前的定时器
	 			clearInterval(obj.timer);
	 			
	 			//2.再开启新的定时器
	 			obj.timer = setInterval(function(){
	 					
	 				//默认所有属性都达到了目标值，可以关闭定时器，停止动画了
	 				var bStop = true;

	 				// 先要知道修改哪些属性值
	 				for(var attr in json){
	 					//attr:属性名
	 					//json[attr]：对应attr属性的值
	 					var iTarget = json[attr];//目标元素
	 					
	 					// 1、获取当前值
	 					var current = 0;
	 					if(attr == 'opacity'){
	 						current = parseFloat(getStyleAtrr(obj,attr)*100);
	 						current = Math.round(current);
	 					}else{
	 						current = parseFloat(getStyleAtrr(obj,attr));
	 						current = Math.round(current);
	 					}

	 					// 2、给一个速度
	 					var iSpeed = (iTarget - current)/8;
	 					iSpeed     = iSpeed > 0?Math.ceil(iSpeed):Math.floor(iSpeed);

	 					// 3、判断是否到达了目标值
	 					if(current != iTarget){
	 						bStop = false;//表示不能够停止运动，不能关闭定时器
	 					}


	 					// 4、运动
	 					if(attr == 'opacity'){
	 						obj.style.opacity = ( current + iSpeed )/100;
	 						obj.style.filter  = "alpha(opacity="+(current + iSpeed)+")";
	 					}else{
	 						obj.style[attr] = current + iSpeed + 'px';
	 					}
	 				}

				// 5、定时器是否应该关闭了
				if(bStop){//如果为真，则可以关闭定时器，停止动画了
					clearInterval(obj.timer);

					// 判断是否存在回调函数,有就执行
					if(fn){
						fn();
					}
				}
	 				
	 			},30);
	 			

	 		}
			//获取某个元素的属性值
	   		function getStyleAtrr(obj,attr){
	   			if(window.getComputedStyle){
	   				return window.getComputedStyle(obj,null)[attr];
	   			}
	   			return obj.currentStyle[attr];//ie8-
	   		}














	 		
	 		
	 		/**
	 		 * 
	 		 * @param {Object} 需要运动的元素
	 		 * @param {Object} 需要改变的属性
	 		 * @param {Object} 需要达到的目标值(终点值)
	 		 * @param {Object} 回调函数
	 		 */
	 	// 	function startMove(obj,attr,iTarget,fn){
	 	// 		//1.清除之前的定时器
	 	// 		clearInterval(obj.timer);
	 			
	 	// 		//2.再开启新的定时器
	 	// 		obj.timer = setInterval(function(){
	 	// 			//1.获取当前值
	 	// 			var current = 0;
	 				
	 	// 			if(attr == "opacity"){//修改透明度
	 	// 				current = parseFloat(getStyleAtrr(obj,attr))*100;
	 	// 				current = Math.round(current);
	 					
	 	// 			}else{//left,top,width,height
	 	// 				current = parseFloat(getStyleAtrr(obj,attr));
	 	// 				current = Math.round(current);
	 	// 			}
	 				
	 				
	 	// 			//2.给一个速度
	 	// 			var iSpeed = (iTarget - current)/8;
	 	// 			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	 				
	 	// 			//3.判断是否到达目标值
	 	// 			if(current == iTarget){
	 	// 				clearInterval(obj.timer);//关闭定时器，停止运动
	 	// 				//如果存在回调函数，则执行回调函数
	 	// 				if(fn){
	 	// 					fn();
	 	// 				}
	 	// 				return ;
	 	// 			}
	 				
	 				
	 	// 			//4.运动
	 	// 			if(attr=="opacity"){//透明度
	 	// 				obj.style.opacity = (current + iSpeed)/100;
	 	// 				obj.style.filter  = "alpha(opacity="+(current + iSpeed)+")";
	 	// 			}else{//left,top,width,height
	 	// 				obj.style[attr] = current + iSpeed +　"px";
	 	// 			}
	 				
	 	// 		},30);
	 			
	 			
	 	// 	}
			// //获取某个元素的属性值
	  //  		function getStyleAtrr(obj,attr){
	  //  			if(window.getComputedStyle){
	  //  				return window.getComputedStyle(obj,null)[attr];
	  //  			}
	  //  			return obj.currentStyle[attr];//ie8-
	  //  		}