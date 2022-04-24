const async = require('hbs/lib/async')
var Room = require('../models/room.js')
var Account = require('../models/account.js')
module.exports = {
    /* Lấy danh sách các phòng chat mà tài khoản liên kết */
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

    /* Lấy thông tin phòng chat bằng Id và hiển thị tên người chat */
    getRoomById: async function(id,email) {
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
    },

    /* Lấy id phòng chat bằng Email */
    getRoomByEmail: async function(email) {
        var room = await Room.findOne({ members: { $regex: email }})
        return room._id
    }
}
