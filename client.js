var util = require('util'),
    robot = require("kbm-robot"),
    app = require('express')(),
    http = require('http').Server(app),
    ip = process.argv[2] || "127.0.0.1",
    port = process.argv[3] || "8080",
    io = require('socket.io-client'),
    socket = io(formatAddress(ip, port));


function formatAddress(ip, port) {
    var address = util.format('http://%s:%s', ip, port);
    console.log(address);
    return address;
}

socket.on('input', function (data) {
    switch (data) {
        case 0:
            robot.press("DOWN");
            break;
        case 1:
            robot.press("UP");
            break;
        case 2:
            robot.press("RIGHT");
            break;
        case 3:
            robot.press("LEFT");
            break;
    }
});


robot.startJar();
io.emit('connection');