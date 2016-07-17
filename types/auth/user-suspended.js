'use strict';

/**
 * Dependencies
 */
let NotAuthenticatedError = require('./not-authenticated');

/**
 * Constructor
 */
function UserSuspendedError(message) {
  message = message || 'User suspended';
  NotAuthenticatedError.call(this, message);
}

/**
 * Extend prototype
 */
UserSuspendedError.prototype = Object.create(NotAuthenticatedError.prototype);
UserSuspendedError.prototype.constructor = UserSuspendedError;
UserSuspendedError.prototype.name = 'UserSuspendedError';
UserSuspendedError.prototype.code = 'USER_SUSPENDED';
UserSuspendedError.prototype.isTrivial = true;

//Export
module.exports = UserSuspendedError;
