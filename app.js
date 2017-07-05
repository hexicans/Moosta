const express = require('express')
const app = express()
const port = 3000
const server = require('http').Server(app)
const io = require('socket.io')(server)
const users = []

// paths assets
app.use(express.static(__dirname + '/js'))
app.use(express.static(__dirname + '/css'))

// routes
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

// socket.io
io.on('connection', socket => {    
	let me

	for(let k in users) socket.emit('newUser', users[k])

	// Login user
	socket.on('login', user => {
		me = user

		me.id = Math.round((Math.random() * 1000000))
		me.name = user.username

		users[me.id] = me

		io.emit('newUser', me)
	})

	// New message
    socket.on('chatMessage', msg => io.emit('chatMessage', msg))

	// Disconnect user
    socket.on('disconnect', () => {
		if(!me) return false

		delete users[me.id]

		io.sockets.emit('disconnectUser', me)
	})
})

// server
server.listen(port, () => console.log('Server good width the port : ' + port))
