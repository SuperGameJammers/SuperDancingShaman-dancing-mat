/**ph
 * Created by damador on 1/31/16.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ledData = 1;
var mraa = require('mraa'); //require mraa
console.log("sup nigga");
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console
var myOnboardLed = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output




function sendTime() {
    console.log("sending current time, bitch");
    io.emit('time', {time: new Date().toJSON()});
}

setInterval(sendTime, 5 * 1000);


app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});


io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('led', function (data) {
        console.log("blinked");
        ledData = (ledData === 1) ? 0 : 1;
        myOnboardLed.write(ledData);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(8080, function () {
    console.log('listening on *:8080');
});