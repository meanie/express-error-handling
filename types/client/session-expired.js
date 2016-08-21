'use strict';

/**
 * Dependencies
 */
const ClientError = require('../client');

/**
 * Constructor
 */
function SessionExpiredError(message) {
  message = message || 'Session expired';
  ClientError.call(this, message);
}

/**
 * Extend prototype
 */
SessionExpiredError.prototype = Object.create(ClientError.prototype);
SessionExpiredError.prototype.constructor = SessionExpiredError;
SessionExpiredError.prototype.name = 'SessionExpiredError';
SessionExpiredError.prototype.code = 'SESSION_EXPIRED';
SessionExpiredError.prototype.isTrivial = true;

//Export
module.exports = SessionExpiredError;
