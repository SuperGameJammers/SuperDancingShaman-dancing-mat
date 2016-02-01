/**ph
 * Created by damador on 1/31/16.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var m = require('mraa'); //require m
var playerConnected = false;
var anal_up = new m.Aio(0), anal_down = new m.Aio(1), anal_left = new m.Aio(2), anal_right = new m.Aio(3);

var matKeys = [anal_up, anal_down, anal_left, anal_right]; //Anal for everyone :v

function sendTime() {
    console.log("sending current time, bitch");
    io.emit('time', {time: new Date().toJSON()});
}

setInterval(sendTime, 5 * 1000);


app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});


function button_press(matKeys) {
    for (var i = 0; i < matKeys.length; i++) {
        if (matKeys[i].read() > 500) return i;//Circuit is kind of screwed, so it sometimes outputserroneous values.
    }
    return 5;
}

io.on('connection', function (socket) {
    console.log("player connected");
    if (playerConnected) socketFunctions(socket);

    var key = button_press();
    if (key != 5) sendKeyValue(socket, key);
    socket.on('disconnect', function () {
        console.log('user disconnected');
        playerConnected = false;
    });
    playerConnected = true;
});

function sendKeyValue (socket, key) {
    socket.emit('input', key);
};

function socketFunctions(socket) {
    if (dig_down.read()) {
        socket.emit('input')
    }
}

http.listen(8080, function () {
    console.log('listening on *:8080');
});