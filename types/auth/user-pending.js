'use strict';

/**
 * Dependencies
 */
const NotAuthenticatedError = require('./not-authenticated');

/**
 * Constructor
 */
function UserPendingError(message) {
  message = message || 'User pending approval';
  NotAuthenticatedError.call(this, message);
}

/**
 * Extend prototype
 */
UserPendingError.prototype = Object.create(NotAuthenticatedError.prototype);
UserPendingError.prototype.constructor = UserPendingError;
UserPendingError.prototype.name = 'UserPendingError';
UserPendingError.prototype.code = 'USER_PENDING';
UserPendingError.prototype.isTrivial = true;

//Export
module.exports = UserPendingError;
