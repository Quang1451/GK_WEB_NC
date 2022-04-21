const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: String
})

const account = mongoose.model('Account', accountSchema)
module.exports = account