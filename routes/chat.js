var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var getRoom = require('../lib/Room.js')
/* GET chat */
router.get('/',async function(req, res) {
  if(!req.session.account)
    return res.redirect(303,'/login')

  var accountInfo = req.session.account
  var css = ['/css/chat.css','/css/normalize.css']
  var listRooms = await getRoom.listRoom(accountInfo.email)

  var content = { title: 'Chat',
   cssFile : css,
   account : accountInfo,
   friends: listRooms
   }
  res.render('index', content);
});

/* GET chat room với id room*/
router.get('/r/:id',async function(req, res) {
  if(!req.session.account)
    return res.redirect(303,'/login')

  var accountInfo = req.session.account
  var css = ['/css/chat.css','/css/normalize.css']
  var listRooms = await getRoom.listRoom(accountInfo.email)
  var roomChat = await getRoom.getRoom(req.params.id,accountInfo.email)

  var content = { title: 'Chat',
   cssFile : css,
   account : accountInfo,
   friends: listRooms,
   room: roomChat.name.name
   }
  res.render('index', content);
});

module.exports = router;



