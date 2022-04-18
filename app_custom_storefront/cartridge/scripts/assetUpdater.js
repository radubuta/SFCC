var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var logger = require('dw/system/Logger');
var reactServices = require('../services/reactservice.js');


function execute(args) {

  var sharedLibrary = 'MobileFirstSharedLibrary';
  var destinationPath = File.LIBRARIES + '/' + sharedLibrary + '/default/';

  var destinationFile = new File(destinationPath + 'react.min.js');
  var fileWriter = new FileWriter(destinationFile, 'UTF-8');

  try {
    var result = reactServices.reactCDNService.setRequestMethod('GET').call();
    if (result) {
      fileWriter.writeLine(result.object);
    }
  } catch (ex) {
    logger.error('[ERROR][Asset Updater Job] - ' + ex);
  } finally {
    fileWriter.flush();
    fileWriter.close();
  }

  return PIPELET_NEXT;
}

module.exports = {
  execute: execute
};