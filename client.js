var util = require('util')
var robot = require("kbm-robot");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io-client');


var ip = process.argv[2] || "127.0.0.1";
var port = process.argv[3] || "8080";

var ioClient = io.connect(formatAddress(ip, port));

function formatAddress(ip, port) {
    return util.format('https://%s:%s', ip, port);
}
ioClient.on('foo', function (msg) {
    console.info(msg);
});

robot.startJar();
