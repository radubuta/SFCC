'use strict';

var server = require('server');
server.extend(module.superModule);
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var cache = require('*/cartridge/scripts/middleware/cache');

server.append('Show', cache.applyDefaultCache, function (req, res, next) {
  var Transaction = require('dw/system/Transaction');
  var CustomerMgr = require('dw/customer/CustomerMgr');

  viewData = res.getViewData();

  if (!viewData.product) {
    return
  }
  if (customer.authenticated) {
    var profile = CustomerMgr.getProfile(customer.profile.customerNo);
    Transaction.wrap(function () {
      profile.custom.lastProductVisited = viewData.product.id;
    });
  }
  next();

}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
