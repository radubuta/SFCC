 'use strict';
 var server = require('server');
 
 server.post('Show', function(req, res, next) {
 
   var nickname = req.form.nickname;
   var firstName = req.form.firstName;
   var lastName = req.form.lastName;
 
   res.render('SFRAResultTemplate', {
     nickname : nickname,
     firstName : firstName,
     lastName : lastName
    });
    next();
   });
 
 module.exports = server.exports();