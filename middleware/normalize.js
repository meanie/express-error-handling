'use strict';

/**
 * Dependencies
 */
const {BaseError, ServerError, InternalError, ValidationError, BadRequestError} = require('@meanie/express-errors');
const jsonError = new RegExp(/^unexpected token.*in JSON/gi);

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //If this is not an object yet at this stage, create an error representation
  //and default to a server error
  if (typeof error !== 'object') {
    error = new ServerError(String(error));
  }

  //Handle syntax errors coming from JSON body parser
  else if (error instanceof SyntaxError && error.message.match(jsonError)) {
    error = new BadRequestError(error);
  }

  //Wrap internal errors
  else if (InternalError.isInternalError(error)) {
    error = new InternalError(error);
  }

  //Convert mongoose validation errors
  else if (ValidationError.isMongooseError(error)) {
    error = ValidationError.fromMongoose(error);
  }

  //Convert Joi validation errors
  else if (ValidationError.isJoiError(error)) {
    error = ValidationError.fromJoi(error);
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
