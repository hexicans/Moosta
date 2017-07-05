// small functions
const debug = log => console.log

const createElement = {
	newUser : username => {
		$('#messages').append(`<li class="info">${username} viens de se connecter.</li>`)
	},
	addUserList : (id, username) => {
		$('#users').append(`<li id="user-${id}"><span class="status"></span> ${username}</li>`)
	},
	newMessage : (username, message) => {
		$('#messages').append(`<li><span>${username}</span> : ${message}</li>`)
	},
	logoutUser : username => {
		$('#messages').append(`<li class="info">${username} viens de se déconnecter.</li>`)
	}
}

$(document).keypress(e => (e.which == 13) ? $('#btn-msg').click() : null)