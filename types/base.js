'use strict';

/**
 * Base error class
 */
function BaseError(message, data) {

  //If used another error as constructor, copy those properties
  if (message && message instanceof Error) {
    let error = message;
    this.name = error.name;
    this.message = error.message;
    this.stack = error.stack;
    if (error.code) {
      this.code = error.code;
    }
  }

  //Otherwise, check if data given as first parameter
  else if (message && typeof message === 'object') {
    data = message;
    message = '';
  }

  //Set message and data
  this.data = data || null;
  if (!this.message) {
    this.message = message || '';
  }

  //Capture stack trace
  if (!this.stack) {
    Error.captureStackTrace(this, this.constructor);
  }

  //Clean up stack trace
  let regex = new RegExp(process.cwd() + '/', 'gi');
  this.stack = this.stack.replace(regex, '');

  //Still no message present?
  if (!this.message) {
    this.message = 'Unknown error';
  }
}

/**
 * Extend prototype
 */
BaseError.prototype = Object.create(Error.prototype);
BaseError.prototype.constructor = BaseError;
BaseError.prototype.status = 500;

/**
 * Convert to string
 */
BaseError.prototype.toString = function() {
  return this.name + ': ' + this.message;
};

/**
 * Convert to simple object for JSON responses
 */
BaseError.prototype.toJSON = function() {

  //If no code, then we don't send any data
  if (!this.code) {
    return undefined;
  }

  //Create object
  let error = {
    code: this.code
  };

  //Append data
  if (this.data) {
    error.data = this.data;
  }

  //Retun JSON
  return error;
};

//Export
module.exports = BaseError;
