'use strict';

/**
 * Dependencies
 */
const ClientError = require('../client');

/**
 * Constructor
 */
function ValidationError(message, data, isTrivial = true) {

  //Object given?
  if (typeof message === 'object') {
    data = message;
    message = '';
  }

  //Mark triviality
  this.isTrivial = isTrivial;

  //Call parent constructor
  message = message || ValidationError.createMessage(data);
  ClientError.call(this, message, data, 422);
}

/**
 * Extend prototype
 */
ValidationError.prototype = Object.create(ClientError.prototype);
ValidationError.prototype.constructor = ValidationError;
ValidationError.prototype.name = 'ValidationError';
ValidationError.prototype.code = 'NOT_VALIDATED';
ValidationError.prototype.isTrivial = true;

/**
 * Static helper to create a summarized message from data
 */
ValidationError.createMessage = function(data) {

  //Initialize
  let message = 'Validation error';

  //No data or not the expected structure?
  if (!data || typeof data !== 'object' || !data.fields) {
    return message;
  }

  //Append fields
  const {fields} = data;
  for (const field in fields) {
    if (fields.hasOwnProperty(field)) {
      const {type, message: fieldMessage} = fields[field];
      message += `\n  - ${field}: ${fieldMessage} (${type})`;
    }
  }

  //Return
  return message;
};

/**
 * Static helper to convert from mongoose errors
 */
ValidationError.fromMongoose = function(mongooseError) {

  //Get info from error and initialize data
  const {message, errors} = mongooseError;
  const data = {fields: {}};

  //Initialize data for validation error
  for (const field in errors) {
    if (errors.hasOwnProperty(field)) {
      const {kind: type, message} = errors[field];
      data.fields[field] = {type, message};
    }
  }

  //Create new error
  return new ValidationError(message, data);
};

//Export
module.exports = ValidationError;
