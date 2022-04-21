const mongoose = require('mongoose')
const account = require('./account')

const roomSchema = mongoose.Schema({
    name: String,
    kind: String,
    members: [String]
})

const room = mongoose.model('Room', roomSchema)
module.exports = room