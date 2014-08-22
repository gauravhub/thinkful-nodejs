var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  var nickname = socket.handshake.query.nickname;
  
  io.emit('chat message', nickname + ' connected');
  socket.on('disconnect', function(){
    io.emit('chat message', nickname + ' disconnected');
  });
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT, function(){
  console.log('listening on ' + process.env.PORT);
});