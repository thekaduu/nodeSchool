var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');

});


io.on('connection', function(socket){	
	socket.on('clientId', function(id) {
		socket.id = id;		
	})

    socket.on('message', function(msg){		
	    socket.broadcast.emit('message',{clientId: socket.id, text: msg});    
  });
});



http.listen(3000, function(){
  console.log('Rodando em localhost:3000');
});
