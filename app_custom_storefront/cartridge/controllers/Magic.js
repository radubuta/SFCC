/* eslint-disable func-names */
var server = require('server');
var service = require('app_custom_storefront/cartridge/services/dadjokeservice');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.get('Show', function (req, res, next) {
  var properties = {};
  var template = 'magic';


  var svcResult = service.dadJokeAPIService.call();
  if (svcResult.status === 'OK') {
    properties.joke = svcResult.object.joke;
  }

  res.render(template, properties);
  next();
});

server.get('Product', function (req, res, next) {
  var template = 'product';
  var newFactory = require('*/cartridge/scripts/factories/product');
  var products = ['radu-product', 'radu-product'];
  var productModels = products.map(function (product) {
    return newFactory.get({ pid: product, pview: 'tile' });
  });

  res.render(template, { products: productModels });
  next();
});

/**
 * Cart-Show : The Cart-Show endpoint renders the cart page with the current basket
 * @name Base/Cart-Show
 * @function
 * @memberof Cart
 * @param {middleware} - server.middleware.https
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - csrfProtection.generateToken
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Cart', server.middleware.https, csrfProtection.generateToken,
  function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var Transaction = require('dw/system/Transaction');
    var CartModel = require('*/cartridge/models/cart');
    var cartHelper = require('*/cartridge/scripts/cart/cartHelpers');
    var reportingUrlsHelper = require('*/cartridge/scripts/reportingUrls');
    var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');

    var template = 'magicCart';

    var currentBasket = BasketMgr.getCurrentBasket();
    var reportingURLs;

    if (currentBasket) {
      Transaction.wrap(function () {
        if (currentBasket.currencyCode !== req.session.currency.currencyCode) {
          currentBasket.updateCurrency();
        }
        cartHelper.ensureAllShipmentsHaveMethods(currentBasket);

        basketCalculationHelpers.calculateTotals(currentBasket);
      });
    }

    if (currentBasket && currentBasket.allLineItems.length) {
      reportingURLs = reportingUrlsHelper.getBasketOpenReportingURLs(currentBasket);
    }

    res.setViewData({ reportingURLs: reportingURLs });

    var basketModel = new CartModel(currentBasket);
    
    
    // res.json('cart', currentBasket);
    // res.render(template, basketModel);
    res.render(template, basketModel);
    next();
  }
);

server.get('Search', function (req, res, next) {
  var properties = {};
  var template = 'magicSearch';
  var searchTerm = req.querystring.term || '';

  var url = service.dadJokeAPIService.getURL() + 'search';
  var svcResult = service.dadJokeAPIService.setURL(url).addParam('term', searchTerm).call();
  if (svcResult.status === 'OK') {
    properties.term = searchTerm;
    properties.jokes = svcResult.object.results;
  }

  res.render(template, properties);
  next();
});

module.exports = server.exports();