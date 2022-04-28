var socket = io();
$(document).ready(() => {

    var account = {
        username: $('#user').html(),
        email: $('#user').data('email')
    }

    /* Tham gia server */
    socket.emit('online', account)

    /* Trả về danh sách các tài khoản đang online */
    socket.on('login', users => {
        const keys = Object.keys(users)
        $('.status').removeClass('online').addClass('offline')
        $('#user-status').removeClass('offline').addClass('online')
        keys.forEach(i => {
            var element = document.getElementById(i)
            $(element).removeClass('offline')
            $(element).addClass('online')
        })
    })

    /* Tham gia phòng chat */
    socket.emit('room', (window.location.pathname).replace('/chat/r/', ''))

    /* Enter gửi message */
    $('#chatMessage').keypress((e) => {
        var message = $(e.target).val()
        if (e.which == 13 && message != "") {
            sendMessage(message, account)
        }
    })

    /* Nhấn vào icon gửi message */
    $('img[src="/img/send.svg"]').on('click', () => {
        var message = $('#chatMessage').val()
        if (message != "") {
            sendMessage(message, account)
        }
    })

    socket.on('receiveMessage', data => {
        console.log(data)
        if (data.sender.email == account.email) {
            $('#chatBoard').append(`
                        <div class="col-message-sent">
                            <p class="name-sent">Me</p>
                            <div class="message-sent">
                                <p>${data.msg}</p>
                            </div>
                        </div>`)
        } else {
            $('#chatBoard').append(`
            <div class="col-message-received">
                <p class="name-received">${data.sender.username}</p>
                <div class="message-received">
                    <p>${data.msg}</p>
                </div>
            </div>`)
        }

    })

    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})

function sendMessage(message, account) {
    var data = {
        msg: message,
        user: account
    }
    $('#chatMessage').val('')
    socket.emit('chat', (data))
}