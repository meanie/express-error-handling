'use strict';

/**
 * Dependencies
 */
let ClientError = require('../client');

/**
 * Constructor
 */
function FileTooLargeError(message, maxFileSize) {
  if (typeof message === 'number') {
    maxFileSize = message;
    message = '';
  }
  message = message || 'File too large';
  ClientError.call(this, message, {maxFileSize}, 400);
}

/**
 * Extend prototype
 */
FileTooLargeError.prototype = Object.create(ClientError.prototype);
FileTooLargeError.prototype.constructor = FileTooLargeError;
FileTooLargeError.prototype.name = 'FileTooLargeError';
FileTooLargeError.prototype.code = 'FILE_TOO_LARGE';
FileTooLargeError.prototype.isTrivial = true;

//Export
module.exports = FileTooLargeError;
