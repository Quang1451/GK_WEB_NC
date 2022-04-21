const async = require('hbs/lib/async')
var Room = require('../models/room.js')
var Account = require('../models/account.js')
module.exports = {
    listRoom: async function(email) {
        var result = await Room.find({ members: { $regex: email }, kind: 'private'})
        result = result.map(async(room) => {
            return {
                id: room._id,
                kind: room.kind,
                email: room.members.splice(email,1).toString(),
                name: await getName(room.members.splice(email,1).toString()),
            }
        })

        return result
    },
}

async function getName(email) {
    var result =  await Account.findOne({email: email})
    return result.name
    
}