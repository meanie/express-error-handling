'use strict';

/**
 * Base types
 */
let Base = require('./base');
let Client = require('./client');
let Internal = require('./internal');
let Reported = require('./reported');
let Server = require('./server');

/**
 * Auth types
 */
let NotAuthenticated = require('./auth/not-authenticated');
let NotAuthorized = require('./auth/not-authorized');
let UserPending = require('./auth/user-pending');
let UserSuspended = require('./auth/user-suspended');

/**
 * Client types
 */
let BadRequest = require('./client/bad-request');
let Exists = require('./client/exists');
let ExpiredToken = require('./client/expired-token');
let FileTooLarge = require('./client/file-too-large');
let InvalidData = require('./client/invalid-data');
let InvalidToken = require('./client/invalid-token');
let NotFound = require('./client/not-found');
let Validation = require('./client/validation');

/**
 * Server types
 */
let SendMail = require('./server/send-mail');
let ServiceUnavailable = require('./server/service-unavailable');

/**
 * Export
 */
module.exports = {

  /**
   * Base types
   */
  Base,
  Client,
  Internal,
  Reported,
  Server,

  /**
   * Auth types
   */
  NotAuthenticated,
  NotAuthorized,
  UserPending,
  UserSuspended,

  /**
   * Client types
   */
  BadRequest,
  Exists,
  ExpiredToken,
  FileTooLarge,
  InvalidData,
  InvalidToken,
  NotFound,
  Validation,

  /**
   * Server types
   */
  SendMail,
  ServiceUnavailable,
};
