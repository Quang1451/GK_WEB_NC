const async = require('hbs/lib/async')
var Chat = require('../models/chat.js')
module.exports = {
    saveMessage: function(idRoom,msg,user) {
        new Chat({
            idRoom: idRoom,
            message: msg,
            user: JSON.stringify(user)
        }).save()
    },

    getChatHistory: async function(idRoom) {
        var result = await Chat.find({idRoom: idRoom})

        return result.map((chat) => {
            return {
                id: chat.idRoom,
                msg: chat.message,
                sender: JSON.parse(chat.user)
            }
        })
    }
}
