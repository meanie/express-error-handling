'use strict';

/**
 * Dependencies
 */
const ServerError = require('../server');

/**
 * Constructor
 */
function GatewayTimeoutError(message) {
  ServerError.call(this, message, 504);
}

/**
 * Extend prototype
 */
GatewayTimeoutError.prototype = Object.create(ServerError.prototype);
GatewayTimeoutError.prototype.constructor = GatewayTimeoutError;
GatewayTimeoutError.prototype.name = 'GatewayTimeoutError';
GatewayTimeoutError.prototype.code = 'GATEWAY_TIMEOUT';
GatewayTimeoutError.prototype.isTrivial = true;

//Export
module.exports = GatewayTimeoutError;
