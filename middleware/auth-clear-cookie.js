'use strict';

/**
 * Dependencies
 */
let types = require('../types');
let NotAuthenticatedError = types.NotAuthenticatedError;

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //For any unauthenticated error, clear the refresh token cookie
  //unless we were requesting secure status
  if (error instanceof NotAuthenticatedError && !req.body.secureStatus) {

    //Get secure cookie setting
    const COOKIE_SECURE = req.app.locals.REFRESH_TOKEN_COOKIE_SECURE;

    //Clear cookie
    res.clearCookie('refreshToken', {
      secure: COOKIE_SECURE,
      httpOnly: true,
    });
  }

  //Next middleware
  next(error);
};
