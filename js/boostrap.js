// small functions
const debug = log => console.log

const createElement = {
    /**
     * Function to say that the user has just logged in.
     *
     * @param {String} username
     * @example createElement.newUser(user.username)
     * @return {String} Gynidark viens de se connecter.
     */
    newUser : username => {
        $('#messages').append(`<li class="info">${username} vient de se connecter.</li>`)
    },

    /**
     * Function to add the user to the sidebar.
     *
     * @param {Number} id
     * @param {String} username
     * @example createElement.addUserList(user.id, user.username)
     * @return {String} Gynidark
     */
    addUserList : (id, username) => {
        $('#users').append(`<li id="user-${id}"><span class="status"></span> ${username}</li>`)
    },

    /**
     * Function to send a new message.
     *
     * @param {String} username
     * @param {String} message
     * @example createElement.newMessage(data.username, data.message)
     * @return {String} The message send
     */
    newMessage : (username, date, message) => {
        $('#messages').append(`<li><span class="username">${username}</span> [ <span class="date">${date}</span> ] : ${message}</li>`)
    },

    /**
     * Function to say that the user has just logged out.
     *
     * @param {String} username
     * @example createElement.logout(user.username)
     * @return {String} Gynidark viens de se déconnecter.
     */
    logoutUser : username => {
        $('#messages').append(`<li class="info">${username} vient de se déconnecter.</li>`)
    }
}

// Send a message using the "enter" key.
$(document).keypress(e => (e.which == 13) ? $('#btn-msg').click() : null)