var webSocket = require('ws');
var webSocketServer = webSocket.Server;
var port = 3001;
var ws = new webSocketServer({
    port: port
})
var messages = [];
console.log('websockets server started...');

ws.on('connection', function(socket) {
    messages.forEach(function(m) {
        socket.send(m);
    })
    console.log('client connection established..');

    socket.on('message', function(data) {
        console.log('message recieved: ' + data);
        messages.push(data);
        ws.clients.forEach(function(c) {
            c.send(data);
        })
    })
});