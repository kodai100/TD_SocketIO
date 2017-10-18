var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync(__dirname + '/public/index.html', 'utf-8'));
}).listen(3000);

var io = socketio.listen(server);
console.log("Now listening ...");

// 接続が確立されたときにコールバックされる
io.sockets.on('connection', function(socket) {

    console.log("Connected");
    socket.emit('greeting', 'Hello, new client!');

    socket.on('ping', function(data){
      socket.emit('pong', "I'm here");
    });

    socket.on('browser', function(data) {
        console.log("Client said : ", data);

        io.sockets.emit('browser', data);
    });

    socket.on('touch', function(data) {
        console.log("TouchDesigner said : ", data);

        io.sockets.emit('touch', data);
    });

    socket.on('disconnect', function(){
      console.log('!!!!!!!!!!!!! A client was disconnected !!!!!!!!!!!!');
    });
});
