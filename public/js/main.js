var socket = io();
$(document).ready(() => {

    var account = {
        username: $('#user').html(),
        email: $('#user').data('email')
    }

    /* Tự động đến đoạn chat mới nhất */
    $('.message').scrollTop($('.message').prop("scrollHeight"));

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

    /* Nhận chat và tự động cuộn xuống vị trí đoạn chat mới nhất */
    socket.on('receiveMessage', data => {
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
        $('.message').scrollTop($('.message').prop("scrollHeight"));
    })

    /* Hiển thị thông báo tạo phòng thành công hay không */
    $('#myForm').submit(e => {
        e.preventDefault()
        var data = {name: $('#nameRoom').val()}

        fetch('/api/createRoom', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(data => {
            console.log(data.message)
            $('#nameRoom').val('')
            closeForm()
        })
        .catch(e => {
            console.log(e)
        })
    })

    /* Hiện thi phòng mới vào danh sách */
    socket.on('newRoom', data => {
        console.log(data)
    })
})

function sendMessage(message, account) {
    var data = {
        msg: message,
        user: account
    }
    $('#chatMessage').val('')
    socket.emit('chat', (data))
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("btnForm").style.display = "none";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("btnForm").style.display = "block";
}