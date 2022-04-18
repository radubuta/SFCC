/* eslint-disable func-names */
var server = require('server');
var service = require('app_custom_storefront/cartridge/services/dadjokeservice');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');


server.get('Show', function (req, res, next) {
  var BasketMgr = require('dw/order/BasketMgr');
  var Resource = require('dw/web/Resource');
  var URLUtils = require('dw/web/URLUtils');
  var Transaction = require('dw/system/Transaction');
  var CartModel = require('*/cartridge/models/cart');
  var ProductLineItemsModel = require('*/cartridge/models/productLineItems');
  var cartHelper = require('*/cartridge/scripts/cart/cartHelpers');
  var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');
  var collections = require('*/cartridge/scripts/util/collections');

  var currentBasket = BasketMgr.getCurrentOrNewBasket();
  var previousBonusDiscountLineItems = currentBasket.getBonusDiscountLineItems();
  var productId = req.form.pid;
  var productNameAssigned = req.form.productName;
  var productPrependCategory = req.form.prependCategory || '';
  var childProducts = Object.hasOwnProperty.call(req.form, 'childProducts')
      ? JSON.parse(req.form.childProducts)
      : [];
  var options = req.form.options ? JSON.parse(req.form.options) : [];
  var quantity;
  var result;
  var pidsObj;


  // if (currentBasket) {
  //     Transaction.wrap(function() {
  //         if (!req.form.pidsObj) {
  //             quantity = parseInt(req.form.quantity, 10);
  //             result = cartHelper.addProductToCart(
  //                 currentBasket,
  //                 productId,
  //                 quantity,
  //                 childProducts,
  //                 options,
  //                 productNameAssigned,
  //                 req
  //             );
  //         } else {
  //             // product set
  //             pidsObj = JSON.parse(req.form.pidsObj);
  //             result = {
  //                 error: false,
  //                 message: Resource.msg('text.alert.addedtobasket', 'product', null)
  //             };

  //             pidsObj.forEach(function(PIDObj) {
  //                 quantity = parseInt(PIDObj.qty, 10);
  //                 var pidOptions = PIDObj.options ? JSON.parse(PIDObj.options) : {};
  //                 var PIDObjResult = cartHelper.addProductToCart(
  //                     currentBasket,
  //                     PIDObj.pid,
  //                     quantity,
  //                     childProducts,
  //                     pidOptions
  //                 );
  //                 if (PIDObjResult.error) {
  //                     result.error = PIDObjResult.error;
  //                     result.message = PIDObjResult.message;
  //                 }
  //             });
  //         }
  //         if (!result.error) {
  //             cartHelper.ensureAllShipmentsHaveMethods(currentBasket);
  //             basketCalculationHelpers.calculateTotals(currentBasket);
  //         }
  //     });
  // }

  var quantityTotal = ProductLineItemsModel.getTotalQuantity(currentBasket.productLineItems);
  var cartModel = new CartModel(currentBasket);

  var urlObject = {
      url: URLUtils.url('Cart-ChooseBonusProducts').toString(),
      configureProductstUrl: URLUtils.url('Product-ShowBonusProducts').toString(),
      addToCartUrl: URLUtils.url('Cart-AddBonusProducts').toString()
  };

 

  // var reportingURL = cartHelper.getReportingUrlAddToCart(currentBasket, result.error);

  var requestedProductLineItem;
  // if (!empty(result.uuid)) {
  //     var allLineItems = currentBasket.allProductLineItems;
  //     collections.forEach(allLineItems, function(pli) {
  //         if (pli.UUID === result.uuid) {
  //             if (!empty(productNameAssigned)) {
  //                 Transaction.wrap(function() {
  //                     pli.setProductName(productNameAssigned);
  //                     pli.setLineItemText(productNameAssigned);
  //                     if (!empty(productPrependCategory)) {
  //                         var CatalogMgr = require('dw/catalog/CatalogMgr');
  //                         var category = CatalogMgr.getCategory(productPrependCategory);
  //                         if (!empty(category)) {
  //                             pli.setCategoryID(productPrependCategory);
  //                             pli.setCategory(category);
  //                         }
  //                     }
  //                 });
  //             }
  //             requestedProductLineItem = pli;
  //         }
  //     });
  // }
  var catalogMgr = require('dw/catalog/CatalogMgr');
        var Categories = require('*/cartridge/models/categories');
        var siteRootCategory = catalogMgr.getSiteCatalog().getRoot();

        var topLevelCategories = siteRootCategory.hasOnlineSubCategories() ?
            siteRootCategory.getOnlineSubCategories() : null;
        var caca = new Categories(topLevelCategories)

  res.json({cart: caca});

  next();

  // var viewData = {
  //     reportingURL: reportingURL,
  //     quantityTotal: quantityTotal,
  //     message: result.message,
  //     cart: cartModel,
  //     newBonusDiscountLineItem: newBonusDiscountLineItem || {},
  //     error: result.error,
  //     pliUUID: result.uuid,
  //     minicartCountOfItems: Resource.msgf('minicart.count', 'common', null, quantityTotal)
  // };

  // if ((viewData.error === false || empty(viewData.error)) && !empty(requestedProductLineItem)) {
  //     var DataLayerHelper = require('*/cartridge/scripts/gtm/dataLayerHelper');
  //     viewData.GTMDataLayer = DataLayerHelper.getAddToCartDataLayer(requestedProductLineItem, req);
  // }

  // res.json(viewData);

  // next();
  }
);


module.exports = server.exports();
