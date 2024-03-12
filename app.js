var app = require('express')();
var http = require('http').Server(app);



var path = require('path')
var io=require('socket.io')(http);


app.get('/', function(req,res){

    var option= {
        root:path.join(__dirname)
    }
    var fileName= 'index.html';
    res.sendFile(fileName,option);

});

var users=0;

// connect a usr
io.on('connection', function(socket){
    console.log("user is connected");
    // tptal user connected, this message for all users
    users++;
    // io.sockets.emit('total', {message: users +'total users'});

//  socket.send('a user is connected on front');
// custom event
// socket.emit('eventName', {note: 'server custom message'});


// this is for curerent user connected
socket.emit('current', {message:'welcome new user'});


// this message for 2 connected user
socket.broadcast.emit('current', {message: users+ 'users connected'});


















// disconnect a usr
socket.on('disconnect', function(){
    console.log('a user disconnected')
// tptal user disconnected, this message for all users
    users--;
// io.sockets.emit('total', {message: users +'total users'});
socket.broadcast.emit('current', {message: users+ 'users connected'});





})

});



http.listen(3000, function(){
    console.log('Server ready on 3000')
});

