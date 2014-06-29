var http = require('http');  
var io = require('/home/dogstar/Env/socket.io');  
       
var yourserver = http.createServer(function (request, response) {  
    response.writeHead(250, { 'Content-Type': 'text/html' });  
    response.end('ShakeNext WebSocket Server is running now ...');  
	}).listen(12345);  
    
var yoursocket = io.listen(yourserver).set('log', 1);  

yoursocket.on('connection', function (client) {  
		console.log('+1 has connected ...');

		client.on('goNext', function (jsonData) {  
			console.log('Client Custom Message: ', jsonData);  

			var data = JSON.parse(jsonData);
			console.log(data);

			if (data.cmd == null) return;

			if (data.cmd == "showNews") {
				var nextData = {};
				nextData.title = (data.params.title != null) ? data.params.title : '';
				nextData.content = data.params.content != null ? data.params.content : '';
				nextData.curTime = new Date().getTime();  

				var nextJsonData = JSON.stringify(nextData);

				console.log('showNews Broadcast: ' + nextJsonData);
				client.broadcast.emit('doNext', nextJsonData);  
			} else {
				console.log("Unknow cmd: " + data.cmd);
			}

			});  

		client.on('disconnect', function () {  
			console.log('-1 has disconnected ...');  
			});  
		}); 

