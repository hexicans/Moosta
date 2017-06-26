var express = require('express')
var app = express()
var port = 3000
var server = require('http').Server(app)
var io = require('socket.io')(server)
var id = Math.round((Math.random() * 1000000))

// Path assets
app.use(express.static(__dirname + '/js'))
app.use(express.static(__dirname + '/css'))

// Routes
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

// Socket.IO
io.on('connection', socket => {    
    console.log('Utilisateur connecté')

    socket.on('chatMessage', msg => io.emit('chatMessage', msg))
    socket.on('disconnect', () => console.log('Utilisateur déconnecté'))
})

// Server
server.listen(port, () => console.log('Serveur bien démarré avec le port : ' + port))