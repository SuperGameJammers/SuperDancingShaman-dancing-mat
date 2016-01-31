var util = require('util')
var robot = require("kbm-robot");
var app = require('express')();
var http = require('http').Server(app);



var ip = process.argv[2] || "localhost";
var port = process.argv[3] || "8654";

//var socket = io.connect(formatAddress(ip, port));
var io = require('socket.io-client'),
    socket = io.connect(formatAddress(ip,port));
function formatAddress(ip, port) {
    return util.format('https://%s:%s/', ip, port);
}

socket.on('connection', function (data) {
   console.log("FUCK");
});
socket.on('time', function(data) {
console.log(data);
});
//robot.startJar();
