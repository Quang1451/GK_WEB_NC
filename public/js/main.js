var socket = io();

var account = {
    username : $('#user').html(),
    email: $('#user').data('email')
}

//Join server 
socket.emit('online', account)

socket.on('login', users=> {
    const keys = Object.keys(users)
    console.log(keys)
    $('.status').removeClass('online').addClass('offline')
    $('#user-status').removeClass('offline').addClass('online')
    keys.forEach(i => {
        var element = document.getElementById(i)
        $(element).removeClass('offline')
        $(element).addClass('online')
    })
})

