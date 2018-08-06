window.onload = function() {
	var oBox = document.getElementById("box");
	var oBigbox = document.getElementById("bigbox");
	var oImg2 = oBigbox.children[0];
	var oJing = document.getElementById("jing");
	oBox.onmouseover = function() {
		oBigbox.style.display = "block";
		oJing.style.display = "block";
	}
	oBox.onmouseout = function() {
		oBigbox.style.display = "none";
		oJing.style.display = "none";
	}
	oBox.onmousemove = function(e) {
		var evt = e || event;
		var _left = evt.pageX - oBox.offsetLeft - oJing.offsetWidth / 2;
		var _top = evt.pageY - oBox.offsetTop - oJing.offsetHeight / 2;
		if(_left <= 0) {
			_left = 0;
		}
		if(_left >= oBox.offsetWidth - oJing.offsetWidth) {
			_left = oBox.offsetWidth - oJing.offsetWidth;
		}
		if(_top <= 0) {
			_top = 0;
		}
		if(_top >= oBox.offsetHeight - oJing.offsetHeight) {
			_top = oBox.offsetHeight - oJing.offsetHeight;
		}
		oJing.style.left = _left + "px";
		oJing.style.top = _top + "px";
		oImg2.style.left = -oJing.offsetLeft / oBox.offsetWidth * oImg2.offsetWidth + "px";
		oImg2.style.top = -oJing.offsetTop / oBox.offsetHeight * oImg2.offsetHeight + "px";
	}
}
$(function() {
	var goodsid = location.search.split("=")[1];
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?", { goodsID: goodsid }, function(data) {
		console.log(data);
		var goodsbenurl = JSON.parse(data[0].goodsBenUrl);
		var str = `
				<div id="box">
					<img class="xiaoim" src="${data[0].goodsListImg}" />
					<div id="jing"></div>				
				</div>
				<ul id="xiaotu">
					<li><img src="${goodsbenurl[0]}"/></li>
					<li><img src="${goodsbenurl[1]}"/></li>
					<li><img src="${goodsbenurl[2]}"/></li>
					<li><img src="${goodsbenurl[3]}"/></li>
				</ul>
				<div id="bigbox">
					<img class="daim" src="${data[0].goodsListImg}" />
				</div>
				<div id="xinxi">
					<p>${data[0].goodsName}<em>$${data[0].price}<em></p>
					<div id="jiajian"><span class="sp-i">-</span><strong>1</strong><span class="sp-z">+</span></div>
					<div id="gou-mai">
						加入购物车
					</div>
					<a href="../html/cart.html">查看购物车</a>
				</div>`
		
		$("#big").append(str);
		
		
		$("#xiaotu>li").find("img").hover(function(){
			$(".xiaoim").attr("src",$(this).attr("src"));
			$(".daim").attr("src",$(this).attr("src"));
		});
	//添加购物车	
		var num = 1;
		$(".sp-z").click(function(){
			num++;
			$("strong").text(num);
		});
		$(".sp-i").click(function(){
			num--;
			if(num<1){
				num=0;
				alert("请添加商品数量");
			}
			$("strong").text(num);
		})
		
		
		//详情页添加购物车数量
//		$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID: $.cookie("username")},function(rel){
//			console.log(rel);
//			console.log(num);
//		});



		$("#gou-mai").click(function() {
				$.get("http://datainfo.duapp.com/shopdata/updatecar.php", {userID: $.cookie("username"),goodsID:data[0].goodsID,number:num},function(data) {
					console.log(data);
					if(data == 0) {
						alert("添加失败");
					}
					if(data == 1) {
						alert("添加成功");
					}
				})
		});
		
		
	
		

	})
	
	
})