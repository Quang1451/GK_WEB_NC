var express = require('express');
var router = express.Router();
var Account = require('../models/account.js')
var Room = require('../models/room.js')
/* Tự động tạo account admin */
Account.find((err, accounts) => {
  if(accounts.length) return

  new Account({
    name: 'admin',
    email: 'admin123@gmail.com',
    password: '123456',
    avatar: 'avatar-5.png'
  }).save();
})

/* GET chat page. */
router.get('/', function(req, res) {
  if(!req.session.account)
    return res.redirect(303,'/login')
  res.redirect(303,'/chat');
});

/* GET login page. */
router.get('/login', function(req, res) {
  var css = ['/css/login.css']
  res.render('login', {cssFile : css});
});

/* Post login page. */
router.post('/login', function(req, res) {
  var {username, password} = req.body
  Account.findOne({email: username, password: password}, (err,account) => {
    if(err)
      return res.redirect(303,'/login')
    
    if(account == null)
      return res.redirect(303,'/login')

    req.session.account = account
    res.redirect(303,'/')
  })
});

/* Post register page. */
router.post('/register', function(req, res) {
  var {name, email, password, re_password} = req.body
  /* Kiểm tra email đã tồn tại trong database hay không */
  Account.findOne({email: email}, (err,account) => {
    if(err)
      return res.redirect(303,'/login')
    
    /* Tạo tài khoản mới với avatar ngẫu nhiên */
    if(account == null) {
      var imgs = ['avatar.png','avatar-2.png','avatar-3.png','avatar-4.png','avatar-5.png']
      new Account({
        name: name,
        email: email,
        password: password,
        avatar: imgs[Math.floor(Math.random()*imgs.length)]
      }).save()

      /* Tạo các phòng chat private giữa account mới và các account cũ */
      Account.find({email: {$ne: email }}, (err,accounts) => {
        if (accounts.length === 0)
          return res.redirect(303,'/login')
        accounts.forEach(account => {   
          new Room({
            name: null,
            kind: 'private',
            members: [email,account.email]
          }).save()
        })
      })

      return res.redirect(303,'/login')
    }
    else {
      req.session.falseRegister = {
        status : true
      }
      return res.redirect(303,'/login')
    }
  })
  
});
module.exports = router;
