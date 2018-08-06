$(function(){
	var str = "";
	$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
		
		$.each(data,function(index,item) {
			str += `<li id="cart-cart-l"><img src="${item.goodsListImg}"/>
			<p id="cart-name">${item.goodsName}</p>
			<p id="cart-price">$${item.price}</p>
			<div id="jiajian">
				<div class="jiajian-num" data=${item.goodsID}>
					数量<button class="sp-i">-</button>
					<p class="cart-num">${item.number}</p>
					<button class="sp-z">+</button>
				</div>
			</div>
			<p id="heji">合计:<span class="xiaoji">$${item.price*item.number}</span></p>
			<input type="botton" value="删除" class="cart-btn"/></li>`
			
		});	
			$("#cart-cart").append(str);
			//删除
			$(".cart-btn").click(function(){
				$.get("http://datainfo.duapp.com/shopdata/updatecar.php", { userID: $.cookie("username"), goodsID: data[0].goodsID, number:0}, function(data) {
					console.log(data);
//					if(data == 0) {
//						alert("更新失败");
//					}
//					if(data == 1) {
//						alert("更新成功");
//					}
				})
				$(this).parent().remove();
			})
			
			
			
			
			//加减
//			var num = $(".cart-num").text();
			$(".sp-z").click(function(){
				$(this).prev().text($(this).prev().text()-0+1);
				$.getJSON("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:$(this).parent().attr("data"),number:$(this).prev().text()},function(data){
					console.log(data);
				});
			});
			$(".sp-i").click(function(){
				$(this).next().text($(this).next().text()-0-1);
				if($(this).next().text()<=0){
					$(this).parent().parent().parent().remove();
					$.get("http://datainfo.duapp.com/shopdata/updatecar.php", { userID: $.cookie("username"), goodsID: data[0].goodsID, number:$(this).next().text()}, function(data) {
						console.log(data.number);
					})
				}
				$.getJSON("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:$(this).parent().attr("data"),number:$(this).next().text()},function(data){
					console.log(data);
				});
			});
	});
});