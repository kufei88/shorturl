var http = require('http');
var url = require("url");
var fs = require("fs");
var os = require("os");

var serverPort = process.env.PORT || 5000;
http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});
	var pathname = url.parse(request.url).pathname.substr(1);
	var hostname = os.hostname();
	
	var data = fs.readFileSync('data.txt');
	if(data.toString()==''){
		var s = {};
	}
	else{
		var s = JSON.parse(data.toString());
	}
	
	if(s[pathname]){
		response.writeHead(302,{
			'Location':s[pathname]
		});
		response.end();
	}
	else{
		var n = Math.floor(Math.random()*100);
		while(s[n.toString()]){
			n = Math.floor(Math.random()*100);
		}
		s[n.toString()] = pathname;
		fs.writeFileSync('data.txt', JSON.stringify(s));
		var shorturl = {};
		shorturl.original_url = pathname;
		shorturl.short_url = n;
		
		response.end(JSON.stringify(shorturl));
	}
	
	
	// 发送响应数据 "Hello World"
	
}).listen(serverPort);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:5000/');