window.onload=function(){
	$(function(){
		$("#zhuce-btn").click(function(){
			var zhanghao = $("#zhuce-zhang").val();
			var mima = $("#zhuce-mima").val();
			var url = "http://datainfo.duapp.com/shopdata/userinfo.php";
			$.get(url,{status:"register",userID:zhanghao,password:mima},function(data){
	//			data = JSON.parse(data);
	console.log("aa");
				console.log(data);
				if(data == 1){
					location.href="../html/denglu.html";
				}else{
					alert("请输入正确的账号或密码");
				};
			});
		});
	});
};