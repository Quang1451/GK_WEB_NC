const async = require('hbs/lib/async')
var Room = require('../models/room.js')
var Account = require('../models/account.js')
module.exports = {
    /* Lấy danh sách các phòng private chat mà tài khoản liên kết */
    listPrivateRoom: async function(email) {
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

    /* Lấy danh sách các phòng public chat mà tài khoản liên kết */
    listPublicRoom: async function() {
        var result = await Room.find({ kind: 'public'})
        result = result.map((room) => {
            return {
                id: room._id,
                kind: room.kind,
                name: room.name,
                avatar: room.avatar
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
                name: JSON.parse(room.members.find(item  => (JSON.parse(item)).email != email).toString()).name
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
        if(room === null)
            return room
        return room._id
    }
}
