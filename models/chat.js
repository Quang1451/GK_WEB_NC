const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    idRoom : String,
    message : String,
    user: String
})

const chat = mongoose.model('Chat', chatSchema)
module.exports = chat