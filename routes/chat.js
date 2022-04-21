var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var getRoom = require('../lib/getRoom.js')
/* GET chat */
router.get('/',async function(req, res) {
  if(!req.session.account)
    return res.redirect(303,'/login')

  var accountInfo = req.session.account
  var css = ['/css/chat.css','/css/normalize.css']
  var listRooms = await getRoom.listRoom(accountInfo.email)
  console.log(listRooms)
  var content = { title: 'Chat',
   cssFile : css,
   account : accountInfo,
   friends: listRooms
   }
  res.render('index', content);
});

/* GET chat room với id room*/
router.get('/r/:id', function(req, res) {
  if(!req.session.account)
    return res.redirect(303,'/login')

  var accountInfo = req.session.account
  var css = ['/css/chat.css','/css/normalize.css']

  res.render('index', { title: 'Chat', cssFile : css, account : accountInfo });
});

module.exports = router;



