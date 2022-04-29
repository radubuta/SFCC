/* eslint-disable func-names */
var server = require('server');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

server.get('Show', function (req, res, next) {
  var template = 'addObject';

  var id = 'id' + Math.floor(Math.random() * 100);
  var name = 'name' + Math.floor(Math.random() * 100);
  var age = 'age' + Math.floor(Math.random() * 100);
  Transaction.wrap(function () {
    var test = CustomObjectMgr.createCustomObject('radu-custom-object-1', id);
    test.custom.raduName = name;
    test.custom.raduAge = age;
  });
  var customObject = {
    id: id,
    name: name,
    age: age
  };

  res.render(template, { data: customObject });
  next();
});

module.exports = server.exports();
