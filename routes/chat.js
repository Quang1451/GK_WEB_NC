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

  res.redirect('/chat/r/'+roomChat);
});

/* GET chat room với id room*/
router.get('/r/:id',async function(req, res) {
  if(!req.session.account)
    return res.redirect(303,'/login')

  var accountInfo = req.session.account
  var css = ['/css/chat.css','/css/normalize.css']

  /* Lấy danh sách các phòng chat */
  var listRooms = await getRoom.listPrivateRoom(accountInfo.email)
  /* Lấy thông tin phòng chat */
  var roomChat = await getRoom.getRoomById(req.params.id, accountInfo.email)
  /* Lấy lịch sử chat */
  var chatHistory = await getChat.getChatHistory(req.params.id)
  
  var content = { title: 'Chat',
   cssFile : css,
   account : accountInfo,
   friends: listRooms,
   room: roomChat.name.name,
   chatHistory : chatHistory
   }
  res.render('index', content);
});

module.exports = router;



