'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');

server.get('Start', function (req, res, next) {
  var actionUrl = URLUtils.url('NewsletterResult-Show'); 
  var newsletterForm = server.forms.getForm('newsletterForm');
  newsletterForm.clear();

  res.render('NewsletterTemplate', {
    actionUrl: actionUrl,
    newsletterForm: newsletterForm
  });
  next();
});

module.exports = server.exports();
