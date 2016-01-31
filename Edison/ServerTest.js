/**ph
 * Created by damador on 1/31/16.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Emit welcome message on connection
io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('connection',"hello");
});
// Send current time to all connected clients
function sendTime() {
    console.log("Sending time");
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

http.listen(8654, function(){
    console.log('listening on *:8654');
});