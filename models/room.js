const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    name: String,
    kind: String,
    members: [String],
    avatar: String
})

const room = mongoose.model('Room', roomSchema)
module.exports = room