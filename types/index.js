'use strict';

/**
 * Base types
 */
let BaseError = require('./base');
let ClientError = require('./client');
let InternalError = require('./internal');
let ReportedError = require('./reported');
let ServerError = require('./server');

/**
 * Auth types
 */
let NotAuthenticatedError = require('./auth/not-authenticated');
let NotAuthorizedError = require('./auth/not-authorized');
let UserPendingError = require('./auth/user-pending');
let UserSuspendedError = require('./auth/user-suspended');

/**
 * Client types
 */
let BadRequestError = require('./client/bad-request');
let ExistsError = require('./client/exists');
let ExpiredTokenError = require('./client/expired-token');
let FileTooLargeError = require('./client/file-too-large');
let InvalidDataError = require('./client/invalid-data');
let InvalidTokenError = require('./client/invalid-token');
let NotFoundError = require('./client/not-found');
let ValidationError = require('./client/validation');

/**
 * Server types
 */
let SendMailError = require('./server/send-mail');
let ServiceUnavailableError = require('./server/service-unavailable');

/**
 * Export
 */
module.exports = {

  /**
   * Base types
   */
  BaseError,
  ClientError,
  InternalError,
  ReportedError,
  ServerError,

  /**
   * Auth types
   */
  NotAuthenticatedError,
  NotAuthorizedError,
  UserPendingError,
  UserSuspendedError,

  /**
   * Client types
   */
  BadRequestError,
  ExistsError,
  ExpiredTokenError,
  FileTooLargeError,
  InvalidDataError,
  InvalidTokenError,
  NotFoundError,
  ValidationError,

  /**
   * Server types
   */
  SendMailError,
  ServiceUnavailableError,
};
