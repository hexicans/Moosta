const socket = io.connect('http://localhost:3000')
const user = { name, status }
const users = {}
let   isLogged = false

// login user.
const loginUser = () => {
	const btn = $('#btn-login')

	btn.click(() => {
		const input = $('#input-login').val()

		if(!input.length == 0){
			user.name = input

			socket.emit('login', {
				username : user.name
			})

			$('section#login').hide()
			$('section#tchat').show()

			 $('#messages').html('')
		}
	})
}

// send message.
const sendMessage = () => {
	const btn = $('#btn-msg')

	btn.click(() => {
		const input = $('#input-msg').val()

		if (!input.length == 0) {
			socket.emit('chatMessage', {
				username: user.name,
				message: input
			})

			$('#input-msg').val('')
		}
	})
}

const actionsSocket = () => {
	socket.on('chatMessage', data =>
		createElement.newMessage(data.username, data.message)
	)

	socket.on('newUser', user => {
		createElement.newUser(user.username)
		createElement.addUserList(user.id, user.username)
	})

	socket.on('disconnectUser', user => {
		createElement.logoutUser(user.username)
		$('li#user-' + user.id).remove()
	})
}

loginUser()
sendMessage()
actionsSocket()