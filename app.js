var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

var users = {};


// connexion socket
io.on('connection', socket => {
    // console.log('Utilisateur connecté');
    
    socket.on('chatMessage', msg => {
        //console.log('message: ' + msg);
        io.emit('chatMessage', msg);
    });

    socket.on('disconnect', _ => {
        io.emit('Utilisateur déconnecté');
        
    });

    socket.on('typing', data => {
        io.emit('typing', data);
    });
});