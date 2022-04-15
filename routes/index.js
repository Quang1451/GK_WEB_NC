var express = require('express');
var router = express.Router();
var Account = require('../models/account.js')

/* Tự động tạo account admin */
Account.find((err, accounts) => {
  if(accounts.length) return

  new Account({
    name: 'admin',
    email: 'admin123@gmail.com',
    password: '123456'
  }).save();
})

/* GET chat page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Chat' });
});

/* GET login page. */
router.get('/login', function(req, res) {
  res.render('login');
});

/* Post login page. */
router.post('/login', function(req, res) {
  var {username, password} = req.body
  Account.findOne({email: username, password: password}, (err,account) => {
    if(err)
      return res.redirect(303,'/login')
    
    if(account == null)
      return res.redirect(303,'/login')
    res.redirect(303,'/')
  })
});

/* Post register page. */
router.post('/register', function(req, res) {
  var {name, email, password, re_password} = req.body
  Account.findOne({email: email}, (err,account) => {
    if(err)
      return res.redirect(303,'/login')
    
    if(account == null) {
      new Account({
        name: name,
        email: email,
        password: password,
      }).save()
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
