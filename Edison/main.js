/**ph
 * Created by damador on 1/31/16.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Send current time to all connected clients
function sendTime() {
    console.log("sending current time");
    io.emit('time', { time: new Date().toJSON() });
}

setInterval(sendTime, 5 * 1000);


app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});


http.listen(8080, function(){
    console.log('listening on *:8080');
});