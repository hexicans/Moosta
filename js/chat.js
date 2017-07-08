const socket = io.connect('http://localhost:3000')
const user = { name, status }
const users = {}
let   isLogged = false

// Login user.
const loginUser = () => {
    $('#btn-login').click(() => {
        const input = $('#input-login').val()

        // If the field is different from empty
        if(input.length > 3 && input.length < 17){
            user.name = input

            // So, i connect the user
            socket.emit('login', {
                username : user.name
            })

            // Change of section
            $('section#login').hide()
            $('section#tchat').show()

            // I delete all messages
            $('#messages').html('')
        }
    })
}

// Send message.
const sendMessage = () => {
    $('#btn-msg').click(() => {
        const input = $('#input-msg').val()

        // If the field is different from empty
        if (!input.length == 0) {
            // So, i send a message
            socket.emit('chatMessage', {
                username: user.name,
                date : new Date().toString().split(" ")[4],
                message: input
            })

            // Once the message is sent, I empty the field
            $('#input-msg').val('')
        }
    })
}

// New message
socket.on('chatMessage', data =>
    createElement.newMessage(data.username, data.date, data.message)
)
// New user
socket.on('newUser', user => {
    createElement.newUser(user.username)
    createElement.addUserList(user.id, user.username)
})

// Disconnect user
socket.on('disconnectUser', user => {
    createElement.logoutUser(user.username)

    // Removing the user from the sidebar.
    $('li#user-' + user.id).remove()
})

loginUser()
sendMessage()