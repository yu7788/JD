$(function(){
	
	var url = "http://datainfo.duapp.com/shopdata/userinfo.php";
	$("#btn").click(function(){
		var dzhanghao = $("#d-zhanghao").val();
		console.log(dzhanghao);
		var dmima = $("#d-mima").val();
		$.get(url,{status:"login",userID:dzhanghao,password:dmima},function(data){
			if(data == 0){
				alert("账号或者密码不正确");
				
			}else if(data == 2){
				alert("账号或者密码不正确");
			}else{
				$.cookie("username",dzhanghao,{expires:7,path:"/"});
				location.href="../html/index.html";
			};
		});
	});
});
