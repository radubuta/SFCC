var Status = require('dw/system/Status');
var URLUtils = require('dw/web/URLUtils');

function onRequest() {
	if (request.httpRequest && !request.includeRequest) {
		if (request.httpQueryString && request.httpQueryString.match(/magic=true/ig)) {
			response.redirect(URLUtils.url('Magic-Show'));
		}
	}
	
	return new Status(Status.OK);
}

module.exports = {
    onRequest: onRequest
};