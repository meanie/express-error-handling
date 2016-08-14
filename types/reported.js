'use strict';

/**
 * Dependencies
 */
let BaseError = require('./base');

/**
 * Constructor
 */
function ReportedError(message, stack, origin, context) {

  //Remember stack and origin
  this.stack = stack;
  this.origin = origin || 'client';

  //Set context if given
  if (context) {
    this.context = context;
  }

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
