const socket = io.connect('http://localhost:3000')
const user = { name, status }
let   isLogged = false

// login user.
const loginUser = () => {
	const btn = $('#btn-login')

	btn.click(() => {
		const input = $('#input-login').val()

		if(!input.length == 0){
			user.name = input

			$('section#login').hide()
			$('section#tchat').show()
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

// show messages
socket.on('chatMessage', data =>
	$('#messages').append(`<li><span>${data.username}</span> : ${data.message}</li>`)
)

loginUser()
sendMessage()