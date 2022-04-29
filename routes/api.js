var express = require('express');

var router = express.Router();
var Room = require('../models/room.js')

router.post('/createRoom', (req,res) => {
    if(!req.body)
        return res.json({code: 1, message: 'Thiếu thông tin'})
    var name = req.body.name
    var newRoom = new Room({
        name: name,
        kind: 'public',
        avatar: 'room.jpg'
    })
    newRoom.save()
    var roomInfo = {id: newRoom._id, name: name, avatar: newRoom.avatar}
    
    var io = req.app.get('socketio')
    io.emit('newRoom', roomInfo)
    res.json({code: 0, message: 'Tạo phòng thành công'})
})

module.exports = router;



