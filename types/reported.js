'use strict';

/**
 * Dependencies
 */
let BaseError = require('./base');

/**
 * Constructor
 */
function ReportedError(message, stack, origin) {

  //Remember stack and origin
  this.stack = stack;
  this.origin = origin || 'client';

  //Call parent constructor
  BaseError.call(this, message);
}

/**
 * Extend prototype
 */
ReportedError.prototype = Object.create(BaseError.prototype);
ReportedError.prototype.constructor = ReportedError;
ReportedError.prototype.name = 'ReportedError';

//Export
module.exports = ReportedError;
