var express = require('express');
var app = express();
var port = 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
var id = Math.round((Math.random() * 1000000));

server.listen(port, function(){
    console.log('Wesh::port => '+ port);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/js'));

// connexion socket
io.on('connection', socket => {    
    console.log('Utilisateur connecté');

    socket.on('chatMessage', msg => {
        console.log('message: ' + msg);
        io.emit('chatMessage', msg);
    });

    socket.on('disconnect', _ => {
        console.log('Utilisateur déconnecté');        
    });
});
