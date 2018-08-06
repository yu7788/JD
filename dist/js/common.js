//添加监听事件兼容
function addEvent(obj,type,fn){
				if(obj.addEventListener){
					obj.addEventListener(type,fn);
				}else{
					obj.attachEvent("on"+type,fn);
				}
			}
//清除监听事件兼容
function removeEvent(obj,type,fn){
				if(obj.removeEventListener){
					obj.removeEventListener(type,fn);
				}else{
					obj.detachEvent("on"+type,fn);
				}
			}
//获取class名兼容性问题
function getByClass(classname){
				if (document.getElementsByClassName){
					return document.getElementsByClassName(classname);
				}else{
					//先取到所有的标签
					var allEle = document.getElementsByTagName("*");
					
					var newArr = []; //保存含有指定类名的DOM对象
					
					for (var i = 0; i < allEle.length; i++){
						//取到每一个元素的类名
						var cn = allEle[i].className;
						
						// 避免使用indexOf方法，原因：比如取test1，含有testtest1这个类名的元素也将被取到
						// 将类名字符串转换成数组，已知类名是以空格来分割的
						var arr=cn.split(" ");
						
						// 避免使用indexOf，因为其是ES5新增方法，有兼容性问题
						for (var j=0;j<arr.length;j++){
							if (arr[j] == classname ){
								newArr.push(allEle[i]);
								break;
							}
						}	
					}
					return newArr;
				}
			}
//获取style低IE版本兼容
function getStyle(obj,attr){
				/*if(obj.currentStyle){
					return obj.currentStyle[attr];
				}
				return getComputedStyle(obj,null)[attr];*/
				
				if(window.getComputedStyle){
					return getComputedStyle(obj,null)[attr];
				}
				return obj.currentStyle[attr];
			}
//随机颜色
//(1)		Math.floor(Math.random()*16777216).toString("16")
//(2)		+Math.floor(Math.random()*256)+" "+Math.floor(Math.random()*256)+" "+Math.floor(Math.random()*256)+



//添加cookie及其值
function setCookie(name, value, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	document.cookie = name + "=" + value + ";expires=" + oDate + ";path=/";
}
//获得cookie的信息
function getCookie(name) {
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("=");
		if(newArr[0] === name) {
			return newArr[1];
		}
	}
}
//清除cookie
function removeCookie(name) {
	setCookie(name, 1, -1);
}



//运动和半透明封装
function startMove(obj,json,fn){//fn 回调函数
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;
		for(var attr in json){
			if(attr == "opacity"){
				var iCur = parseInt(getStyle(obj,"opacity")*100);
			}else{
				var iCur = parseInt(getStyle(obj,attr));
			}
			var iTarget = json[attr];
			var iSpeed = (iTarget-iCur)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if(attr == "opacity"){
				obj.style.opacity = (iCur + iSpeed)/100;
				obj.style.filter = "alpha(opacity="+(iCur + iSpeed)+")"
			}else{
				obj.style[attr] = iCur + iSpeed + "px";
			}
			
			
			
			if(iCur != iTarget){
				flag = false;
			}
			
		}
		
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
		
		
		
	},30);
}
function getStyle(obj,attr){
				if(obj.currentStyle){
					return obj.currentStyle[attr];
				}
				return getComputedStyle(obj,null)[attr];
			}

//数组中取最小值
function getMinIndex(arr){
				var minVal = Math.min.apply(null,arr);
				var minIndex = arr.indexOf(minVal);
				return minIndex;
			}




//前后端连接封装调用函数
function Ajax(obj){
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	}else{
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var str = "";
	for(var attr in obj["data"]){
		str+= attr+"="+obj["data"][attr]+"&";
	}
	str = str.replace(/&$/,"");

	if(obj["type"].toLowerCase() == "get"){
		if(obj["data"]===undefined){
			xhr.open("get",obj["url"],true);
		}else{
			xhr.open("get",obj["url"]+"?"+str,true);
		}
		
		xhr.send();
	}else{
		xhr.open("post",obj["url"],true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}
	
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status==200){
				var data = xhr.responseText;
				obj["success"](data);
			}else{
				if(obj["error"]){
					obj["error"]();
				}
				
			}
			
		}
	}
}



//header("content-type:text/html;charset=utf-8");PHP阻止汉字乱码
//mysqli_query($conn,'set names utf8');治疗数据库乱码

//header("Access-Control-Allow-Origin:*"); 后台php页面添加，前端可直接接收