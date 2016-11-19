'use strict';

/**
 * Dependencies
 */
const types = require('../types');
const NotAuthenticatedError = types.NotAuthenticatedError;

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //For any unauthenticated error, clear the refresh token cookie
  //unless we were requesting secure status
  if (error instanceof NotAuthenticatedError && !req.body.secureStatus) {

    //Clear cookie
    res.clearCookie('refreshToken', {
      secure: req.secure,
      httpOnly: true,
    });
  }

  //Next middleware
  next(error);
};
