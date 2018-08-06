$(function(){
	var url = "http://datainfo.duapp.com/shopdata/getGoods.php?callback=?";
	var classid = location.search.split("=")[1];
	    $.getJSON(url,{classID:classid},function(rel){
//	    	console.log(rel);
	    	var str = "";
	    	for(var i=0;i<rel.length;i++){
//	    		console.log(rel[1]);
	            str +=`<li class="list-xiang">
	            <a href="../html/xiangqing.html?id=${rel[i].goodsID}">
	            <img src="${rel[i].goodsListImg}"/>
				<p id="list-p">${rel[i].goodsName}</p>
	            <span id="list-price">＄${rel[i].price}</span>
	            <p id="list-mai">加入购物车</p></a>
	            </li>`
 			} 
 			
 			$("#list-l").append(str);
	    });
	   
});


  