var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var reactCDNService = LocalServiceRegistry.createService('MagicCartridge.Job.Service', {
  createRequest: function (svc, params) {
    svc.setRequestMethod('GET');
    svc.addHeader('Accept', 'application/json');
    return params;
  },

  parseResponse: function (svc, httpClient) {
    return httpClient.text;
  }
});

module.exports = {
  reactCDNService: reactCDNService
}