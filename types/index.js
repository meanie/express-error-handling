'use strict';

/**
 * Base types
 */
let Base = require('./types/base');
let Client = require('./types/client');
let Internal = require('./types/internal');
let Reported = require('./types/reported');
let Server = require('./types/server');

/**
 * Auth types
 */
let NotAuthenticated = require('./types/auth/not-authenticated');
let NotAuthorized = require('./types/auth/not-authorized');
let UserPending = require('./types/auth/user-pending');
let UserSuspended = require('./types/auth/user-suspended');

/**
 * Client types
 */
let BadRequest = require('./types/client/bad-request');
let Exists = require('./types/client/exists');
let ExpiredToken = require('./types/client/expired-token');
let FileTooLarge = require('./types/client/file-too-large');
let InvalidData = require('./types/client/invalid-data');
let InvalidToken = require('./types/client/invalid-token');
let NotFound = require('./types/client/not-found');
let Validation = require('./types/client/validation');

/**
 * Server types
 */
let SendMail = require('./types/server/send-mail');
let ServiceUnavailable = require('./types/server/service-unavailable');

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
