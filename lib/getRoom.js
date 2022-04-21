const async = require('hbs/lib/async')
var Room = require('../models/room.js')
var Account = require('../models/account.js')
module.exports = {
    listRoom: async function(email) {
        var result = await Room.find({ members: { $regex: email }, kind: 'private'})
        result = result.map((room) => {
            return {
                id: room._id,
                kind: room.kind,
                account: JSON.parse(room.members.find(item  => (JSON.parse(item)).email != email).toString()),
            }
        })
        return result
    },
}