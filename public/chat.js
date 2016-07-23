let socket = io.connect('http://localhost:3000');
let isTyping = false;
let timeOut = undefined;

var name = prompt('Votre pseudo si vous plait', 'Gynidark');    

if (name == null)
    $("body").alert('Veuillez rafraichir la page!');

const timeoutFunction = _ => {
    isTyping = false;
    socket.emit('typing', {
        name : name,
        isTyping : false
    });
}

const isUserTyping = _ => {
    if (isTyping === false && $('#msg').is(':focus')) {
        isTyping = true;
        let data = {
            name : name,
            isTyping : true
        };
        socket.emit('typing', data);
    } else {
        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunction, 5000);
    }
}

const sendMessage = _ => {
    var msg = $('#msg').val();
    
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

socket.on('typing', data => {
    if (data.isTyping) {
        $('#status').append("<li id='"+ data.name +"'><small>" + data.name + " est en train d'écrire...</small></li>");
        timeout = setTimeout(timeoutFunction, 1500);
    }
    else {
        $('#' + data.name + '').remove();
    }
});

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