window.onload=function(){

$(function(){
//列表菜单
$.getJSON("http://datainfo.duapp.com/shopdata/getclass.php",function(data){
	console.log(data);
	    	var shouyestr = "";
	    	for(var i = 0;i<data.length; i++){
	    		shouyestr +=`<li class="shouyeli"><a href="../html/list.html">${data[i].className}</a></li>`;    		
	    	}
	    	$(".banner-lists").append(shouyestr);
	    })
	
//右边侧边栏
$("#right-lists a li").hover().stop().find("span")
.animate({left:"80px"});


//banner轮播图
	var num = 0;
	var timer = setInterval(function(){
		if(num < $("#imgLists li").length-1){
			num++;
		}else{
			num = 0;
		}
		change(num);
	},3500);
	$("#indexLists").find("li").each(function(item){
		$(this).hover(function(){
			clearInterval(timer);
			change(item);
			num = item;
		},function(){
			timer = setInterval(function(){
				if(num < $("#imgLists li").length-1){
					num++;
				}else{
					num = 0;
				}
				change(num);
			},3500);
		});
	});
		$("#button-right").stop(true,true).click(function(){
			num++;
			if(num == $("#imgLists li").length){
				num = 0;
			};
			$("#imgLists").find("li").eq(num).fadeIn();
		});
		$("#button-left").stop(true,true).click(function(){
			num--;
			if(num == $("#imgLists li").length){
				num = 0;
			};
			$("#imgLists").find("li").eq(num).fadeIn();
		});
	function change(x){
		$("#imgLists").find("li").removeClass("imgOn").hide().eq(x).fadeIn(500).addClass("imgOn");
		$("#indexLists").find("li").removeClass("indexOn").eq(x).addClass("indexOn");
	}
	
	
//小轮播提	
	var num1 = 0;
	var xiaotimer = setInterval(function(){
		if(num1 < $("#jinru-lunbotu-img li").length-1){
			num1++;
		}else{
			num1 = 0;
		}
		xiaochange(num1);
	},2500);
	$("#jinru-lunbotu-index").find("li").each(function(item1){
		$(this).hover(function(){
			clearInterval(xiaotimer);
			xiaochange(item1);
			num1 = item1;
		},function(){
			xiaotimer = setInterval(function(){
				if(num1 < $("#jinru-lunbotu-img li").length-1){
					num1++;
				}else{
					num1 = 0;
				}
				xiaochange(num1);
			},2500);
		});
	});
	function xiaochange(y){
		$("#jinru-lunbotu-img").find("li").removeClass("imgOn").hide().eq(y).fadeIn(500).addClass("imgOn");
		$("#jinru-lunbotu-index").find("li").removeClass("indexOn").eq(y).addClass("indexOn");
	}
	
//楼梯阶层
$(window).scroll(function(){
//	event.preventDefault();
//	evt.cancelBubble = true;
	var flag = true;
	if(flag){
		var scrolltop = $(this).scrollTop();
		if(scrolltop >= 500){
			$("#floorNav").fadeIn("slow");
			$("#huitop").fadeIn("slow");
		}else{
			$("#floorNav").fadeOut("flow");
			$("#huitop").fadeOut("flow");
		}
		$("#huitop").click(function(){
			event.preventDefault();
			$("html,body").stop().animate({"scrollTop":"0"},200);
		});
		$("#huitop").mouseenter(function(){
			event.preventDefault();
			$(this).stop().animate({"width":"100px"},200);
		});
		
	//右侧边栏滑过事件
	$("#right-lists li").each(function(){
		var num2 = $(this).index();
		$("#right-lists li").eq(num2).mouseenter(function(){
			$(this).stop().animate({"width":"100px"},200);
		});
		$("#right-lists li").eq(num2).mouseout(function(){
			$(this).stop().animate({"width":"30px"},200);
		});
	})
		
		
		
		
		$("#huitop").mouseout(function(){
			event.preventDefault();
			$(this).stop().animate({"width":"30px"},200);
		});
		if(scrolltop >= 600){
			$("#right-lists").fadeIn("slow");
		}else{
			$("#right-lists").fadeOut("flow");
		}
						
		$("#content li").each(function(){
			if(scrolltop>= $(this).offset().top-$(this).outerHeight()/2){
				var index = $(this).index();
				$("#floorNav li").eq(index).css({background:"orange",color:"white"}).siblings().not($("#floor-last")).css({background:"none",color:"black"});
			}
		})
	}
	$("#floorNav li:not(:last)").click(function(){
		event.preventDefault();
//		evt.cancelBubble = true;
		flag = false;
		var index = $(this).index();
		$(this).css({background:"orange",color:"white"}).siblings().not($("#floor-last")).css({background:"none",color:"black"});
		$("html,body").stop().animate({"scrollTop":$("#content li").eq(index).offset().top},1000,function(){
			flag = true;
		});
	})
					
		$("#floorNav li:last").click(function(){
			event.preventDefault();
//			evt.cancelBubble = true;
			flag = false;
			$("html,body").stop().animate({"scrollTop":0},500,function(){
				flag = true;
			});
		})
})
//加入购物车滑动事件
$("#xiuxian-bottom-right").find("li").hover(function(){
	$(this).find("#xiuxian-bottom-gouwuche").slideToggle(100);
});

//计时器
	
	var wltime = new Date("2018-07-01 00:00:00");
	var otimesh = document.getElementById("times-h");
	var otimesm = document.getElementById("times-m");
	var otimess = document.getElementById("times-s");
	function countDown(time){
	  timer=setInterval(function(){
	  	var otime = new Date();
	  	var times = time - otime;
	    if(times > 0){
	    	var ss = Math.abs(times/1000);
	        var hour = Math.floor(ss/3600%24);
			var minute = Math.floor(ss/60%60);
			var second = Math.floor(ss%60);
	    }
	    if (hour <= 9) hour = '0' + hour;
	    if (minute <= 9) minute = '0' + minute;
	    if (second <= 9) second = '0' + second;
	    otimesh.innerHTML = hour;
	    otimesm.innerHTML = minute;
	    otimess.innerHTML = second;
	    times--;
	  },1000);
	  if(times<=0){
	    clearInterval(timer);
	  }
	}
	countDown(wltime);



//热卖商品滚动

//点击回到顶部



//首页数据
	
	$("#txt").stop().bind("input properpychange",function(){
			$("#txt-u").css("display","block").mouseleave(function(){
			$("#txt-u").stop().css("display","none");
		})
		var sousuoval = $("#txt").val();
	    var url = "https://suggest.taobao.com/sug?code=utf-8&q="+sousuoval+"&_ksTS=1528548166577_433&callback=?";
	    $.getJSON(url,function(data){
	    	var newdata = data.result;
	    	var shouyestr = "";
	    	for(var i = 0;i<newdata.length; i++){
	    		shouyestr +=`<a href="../html/list.html"><li>${newdata[i][0]}</li></a>`;    		
	    	}
	    	$("#txt-u").append(shouyestr);
	    })
	})
	$("body").click(function(){
		$("#txt-u").css("display","none");
	})
})
 }