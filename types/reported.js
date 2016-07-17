'use strict';

/**
 * Dependencies
 */
let BaseError = require('./base');

/**
 * Constructor
 */
function ReportedError(message, stack, context) {

  //Remember stack and context
  this.stack = stack;
  this.context = context || {};

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
