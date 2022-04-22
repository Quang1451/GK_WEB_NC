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

    getRoom: async function(id,email) {
        var room = await Room.findOne({_id : id})
        var result
        if(room.kind == 'private') {
            result = {
                id: room._id,
                kind: room.kind,
                name: JSON.parse(room.members.find(item  => (JSON.parse(item)).email != email).toString())
            }
        }
        else {
            result = {
                id: room._id,
                kind: room.kind,
                name: room.name
            }
        }
        return result
    }
}
