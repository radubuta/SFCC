var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var serviceABCLatLong = LocalServiceRegistry.createService('ServiceABC.Service', {
  createRequest: function (svc, params) {

    svc.setRequestMethod('GET');
    svc.addHeader('Accept', 'application/json');
    var url = svc.getURL() + "&address"+params
    svc.setURL(url);
    return params;
  },
  parseResponse: function (svc, httpClient) {
    var result;

    try {
      result = JSON.parse(httpClient.text);
    } catch (e) {
      result = httpClient.text;
    }
    return result;
  }
});

module.exports = {
  serviceABCLatLong: serviceABCLatLong
}