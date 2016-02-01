/**ph
 * Created by damador on 1/31/16.
 */
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    m = require('mraa'), //require m
    playerConnected = false,
    timesPerSec = (1 / 10) * 1000,
    anal_up = new m.Aio(0), anal_down = new m.Aio(1), anal_left = new m.Aio(2), anal_right = new m.Aio(3),
    matKeys = [anal_up, anal_down, anal_left, anal_right]; //Anal for everyone :v

function inputCheck() {
    if (playerConnected == true) {
        socketFunctions();
    }
}


app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});


function button_press() {
    for (var i = 0; i < matKeys.length; i++) {
        if (matKeys[i].read() > 500) {
            return i;//Circuit is kind of screwed, so it sometimes outputs erroneous values.
        }
    }
    return 5;
}

io.on('connection', function (socket) {
    playerConnected = true;
    //setInterval(sendTime, 5 * 1000);
    setInterval(inputCheck, timesPerSec)
    //setInterval(inputCheck(socket), (Math.floor((1 / timesPerSec) * 1000)));
    socket.on('disconnect', function () {
        console.log('user disconnected');
        playerConnected = false;
    });
});

function sendKeyValue(key) {
    io.emit('input', key);
};

function socketFunctions() {
    var value = button_press();
    if (value != 5) sendKeyValue(value);
}

http.listen(8080, function () {
    console.log('listening on *:8080');
});