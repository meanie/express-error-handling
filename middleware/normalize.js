'use strict';

/**
 * Dependencies
 */
const errors = require('@meanie/express-errors');
const {BaseError, ServerError, InternalError, ValidationError} = errors;

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //If this is not an object yet at this stage, create an error representation
  //and default to a server error
  if (typeof error !== 'object') {
    error = new ServerError(String(error));
  }

  //Wrap internal errors
  else if (InternalError.isInternalError(error)) {
    error = new InternalError(error);
  }

  //Convert mongoose validation errors
  else if (ValidationError.isMongooseError(error)) {
    error = ValidationError.fromMongoose(error);
  }

  //Still not an instance of BaseError at this stage?
  if (!(error instanceof BaseError)) {
    error = new BaseError(error);
  }

  //Ensure that error.message is enumerable
  Object.defineProperty(error, 'message', {
    enumerable: true,
  });

  //Call next middleware
  next(error);
};
