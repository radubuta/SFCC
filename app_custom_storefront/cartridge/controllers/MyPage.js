/* eslint-disable func-names */
var server = require('server');

server.get('Show', function (req, res, next) {
  var template = 'mypage'
  res.render(template, {});

  next();
});

server.get('Content', function (req, res, next) {
  var template = 'myasset'
  res.render(template, {});
  next();
});

server.get('Preference', function (req, res, next) {
  var template = 'mypreference'
  res.render(template, {});
  next();
});

module.exports = server.exports();
