
var Transaction = require('dw/system/Transaction');
var CustomerMgr = require('dw/customer/CustomerMgr');
var serviceABC = require('app_custom_storefront/cartridge/services/serviceABC');

function execute(args) {
  var profiles = CustomerMgr.queryProfiles("", null, true, true).asList(0, 20);
  // In this way I can grab all of the customers but in order not to overload the Google api Key I'll leave just for 20 results
  // var profiles = CustomerMgr.queryProfiles("", null, true, true)
  var svcResult;
  for (var i = 0; i < profiles.length; i++) {
    var profile = CustomerMgr.getProfile(profiles[i].customerNo);
    var address = profile.addressBook.addresses;
    if (address.length !== 0) {
      svcResult = serviceABC.serviceABCLatLong.call(address[0].address1);
    }
    if (svcResult && svcResult.status === 'OK') {
      Transaction.wrap(function () {
        profile.custom.customerLat = svcResult.object.results[0].geometry.location.lat;
        profile.custom.customerLong = svcResult.object.results[0].geometry.location.lng;
      });
    }
  }
}

module.exports = {
  execute: execute
};