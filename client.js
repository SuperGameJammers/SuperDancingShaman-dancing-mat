var util = require('util')
var robot = require("kbm-robot");
var app = require('express')();
var http = require('http').Server(app);


var ip = process.argv[2] || "127.0.0.1";
var port = process.argv[3] || "8080";

var io = require('socket.io-client'),
    socket = io(formatAddress(ip, port));
function formatAddress(ip, port) {
    var address = util.format('http://%s:%s', ip, port);
    console.log(address);
    return address;
}

socket.on('time', function (data) {
    console.log(data);
});

setInterval(blinkLed, 2 * 1000);
function  blinkLed(){
    console.log("client blinked");
    socket.emit('led');
};
//robot.startJar();
