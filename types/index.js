'use strict';

/**
 * Base types
 */
const BaseError = require('./base');
const ClientError = require('./client');
const InternalError = require('./internal');
const ReportedError = require('./reported');
const ServerError = require('./server');

/**
 * Auth types
 */
const NotAuthenticatedError = require('./auth/not-authenticated');
const NotAuthorizedError = require('./auth/not-authorized');
const UserPendingError = require('./auth/user-pending');
const UserSuspendedError = require('./auth/user-suspended');

/**
 * Client types
 */
const BadRequestError = require('./client/bad-request');
const ExistsError = require('./client/exists');
const ExpiredTokenError = require('./client/expired-token');
const FileTooLargeError = require('./client/file-too-large');
const InvalidDataError = require('./client/invalid-data');
const InvalidTokenError = require('./client/invalid-token');
const NotFoundError = require('./client/not-found');
const ValidationError = require('./client/validation');
const SessionExpiredError = require('./client/session-expired');

/**
 * Server types
 */
const SendMailError = require('./server/send-mail');
const ServiceUnavailableError = require('./server/service-unavailable');

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
  SessionExpiredError,

  /**
   * Server types
   */
  SendMailError,
  ServiceUnavailableError,
};
