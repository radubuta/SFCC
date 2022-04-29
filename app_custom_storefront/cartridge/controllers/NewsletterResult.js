'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

server.post('Show', function (req, res, next) {
  var name = req.form.firstName;
  var email = req.form.email;

  try {
    Transaction.wrap(function () {
      var emailObj = CustomObjectMgr.createCustomObject('newsletter-radu', email);
      emailObj.custom.name = name;
      emailObj.custom.email = email;
    });
    res.render('NewsletterTemplateShow', {
      firstName: name,
      email: email
    });
  } catch (e) {
    var Logger = require('dw/system/Logger');
    Logger.error('Stack trace:\n' + e.message);
    Logger.error('Radu errorrrrrrrr');
    res.render('NewsletterTemplateShow', {
      error: e.message
    });
  }

  next();
});

module.exports = server.exports();