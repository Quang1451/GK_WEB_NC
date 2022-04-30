var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var getRoom = require('../lib/Room.js')
var getChat = require('../lib/Chat.js')

/* GET chat */
router.get('/',async function(req, res) {
  if(!req.session.account)
    return res.redirect(303,'/login')

  var accountInfo = req.session.account
  var roomChat = await getRoom.getRoomByEmail(accountInfo.email)
  if(roomChat === null) {
    req.session.message = {
      style: 'danger',
      message: 'Hiện không thể đăng nhập vì không có phòng chat nào'
    }
    return res.redirect(303,'/login')
  }
  res.redirect('/chat/r/'+roomChat);
});

/* GET chat room với id room*/
router.get('/r/:id',async function(req, res) {
  if(!req.session.account)
    return res.redirect(303,'/login')

  var accountInfo = req.session.account
  var css = ['/css/chat.css','/css/normalize.css']

  /* Lấy danh sách các phòng private chat */
  var listPrivateRooms = await getRoom.listPrivateRoom(accountInfo.email)
  /* Lấy danh sách các phòng public chat */
  var listPublicRooms = await getRoom.listPublicRoom()
  /* Lấy thông tin phòng chat */
  var roomChat = await getRoom.getRoomById(req.params.id, accountInfo.email)
  /* Lấy lịch sử chat */
  var chatHistory = await getChat.getChatHistory(req.params.id)
  
  /* Kiểm tra người dùng có phải là admin hay không để hiện thị nút tạo phòng */
  var createRoom = false
  if(accountInfo.role === 'admin'){
    createRoom = true
  }
  var content = { title: 'Chat',
   cssFile : css,
   account : accountInfo,
   friends: listPrivateRooms,
   listPublicRoom : listPublicRooms,
   room: roomChat.name,
   chatHistory : chatHistory,
   showCreateRoom : createRoom
   }
  res.render('index', content);
});

module.exports = router;



