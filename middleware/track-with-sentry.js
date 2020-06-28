'use strict';

/**
 * Dependencies
 */
const Sentry = require('@sentry/node');

/**
 * Module export
 */
module.exports = function trackWithSentry(error, req, res, next) {

  //Skip trivial errors
  if (error.isTrivial) {
    return next(error);
  }

  //Initialize user, tags and extras
  const user = {};
  const tags = {};
  const extras = {};

  //Context available?
  if (req) {

    //Get data
    const {app: {locals}, body, query, headers, originalUrl, me} = req;
    const method = req.method.toUpperCase();
    const serverUrl = originalUrl;
    const clientUrl = headers.referer;
    const serverVersion = locals.APP_VERSION;
    const clientVersion = headers['x-version'];
    const userAgent = headers['user-agent'];

    //Ignore Postman requests
    if (userAgent && userAgent.match(/PostmanRuntime/)) {
      return next(error);
    }

    //Set extra
    Object.assign(extras, {
      serverUrl, serverVersion,
      clientUrl, clientVersion,
      body, query, method, headers,
    });

    //Set user data
    if (me) {
      const {name, email} = me;
      const id = me._id.toString();
      Object.assign(user, {id, name, email});
    }
  }

  //Capture exception
  Sentry.withScope(scope => {

    //Set user, extras and tags
    scope.setUser(user);
    scope.setExtras(extras);
    scope.setTags(tags);

    //Capture exception
    Sentry.captureException(error);
  });

  //Next middleware
  next(error);
};
