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

socket.on('chatMessage', data => $('#messages').append(`<li><span>${data.username}</span> : ${data.message}</li>`))

socket.on('newUser', user => {
	$('#messages').append(`<li class="info">${user.username} viens de se connecter.</li>`)
	$('#users').append(`<li id="user-${user.id}"><span class="status"></span> ${user.username}</li>`)
})

socket.on('disconnectUser', user => {
	$('#messages').append(`<li class="info">${user.username} viens de se déconnecter.</li>`)
	$('li#user-' + user.id).remove()
})

loginUser()
sendMessage()