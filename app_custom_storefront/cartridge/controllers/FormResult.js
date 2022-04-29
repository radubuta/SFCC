'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');


server.post('Show', server.middleware.http,
  function (req, res, next) {

    var nickname = req.form.nickname;

    res.render('SFRAResultTemplate', {
      nickname: nickname
    });
    next();
  });

module.exports = server.exports();