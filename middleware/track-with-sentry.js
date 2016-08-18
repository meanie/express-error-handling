'use strict';

/**
 * Dependencies
 */
const raven = require('meanie-express-raven-service');

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //Skip trivial errors
  if (error.isTrivial) {
    return next(error);
  }

  //Get data
  const user = req.me;
  const serverUrl = req.originalUrl;
  const clientUrl = req.headers.referer;
  const serverVersion = req.app.locals.APP_VERSION;
  const clientVersion = req.headers['x-version'];

  //Prepare extra context
  const extra = {serverUrl, serverVersion, clientUrl, clientVersion};

  //User context
  let context = null;
  if (user && user._id) {
    context = {id: user._id.toString()};
  }

  //Use raven
  const client = raven();
  client.setUserContext(context);
  client.captureException(error, {extra});

  //Next middleware
  next(error);
};
