let socket = io.connect('http://localhost:3000');
let isTyping = false;
let timeOut = undefined;

let name = prompt('Votre pseudo si vous plait', 'Gynidark');    

if (name == null)
    $("body").alert('Veuillez rafraichir la page!');

const sendMessage = () => {
    let msg = $('#msg').val();
    
    if(!msg.length == 0){
        socket.emit('chatMessage', {
            name: name,
            msg: $('#msg').val()
        });
    }else{
        // error!
        return false;
    }
    
    $('#msg').val('');
}

socket.on('chatMessage', data => {
    $('#messages')
        .append($('<li>')
        .append($('<b>')
            .text(data.name)
        .append('<strong>:</strong>')
        .append($('</b>')))
        .append(data.msg));
});

$(document).ready(_ => {
    $("#msg").keyup(e => {
        if(e.keyCode == 13)
            sendMessage();
    });
});

window.onload = () => {
    $('#user-name').html(name);
}
