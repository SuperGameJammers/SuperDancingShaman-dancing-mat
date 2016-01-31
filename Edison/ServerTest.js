/**ph
 * Created by damador on 1/31/16.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
            io.emit('chat message', "test");
});



http.listen(3000, function(){
    console.log('listening on *:3000');
});