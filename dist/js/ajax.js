function ajax(url) {
	return new Promise(function(resolve,reject){
		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		xhr.open("get", url, true);
		xhr.send();
		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					var data = xhr.responseText;
					resolve(data);
				}else{
					reject("请求失败");
				}
			}
		}
	
	})
}

/*ajax("demo.php").then(function(data){
	//
}).then(function(data){
	
}).then(function(data){
	
})*/
