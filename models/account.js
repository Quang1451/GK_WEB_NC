const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
    role: String
})

const account = mongoose.model('Account', accountSchema)
module.exports = account