const async = require('hbs/lib/async')
var Chat = require('../models/chat.js')
module.exports = {
    saveMessage: function(idRoom,msg,user) {
        new Chat({
            idRoom: idRoom,
            message: msg,
            user: JSON.stringify(user)
        }).save()
    }
}
