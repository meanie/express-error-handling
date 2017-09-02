'use strict';

/**
 * Dependencies
 */
const raven = require('raven');

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //Skip trivial errors
  if (error.isTrivial) {
    return next(error);
  }

  //Initialize data
  const data = {};

  //Clear context
  raven.setContext();

  //Context available?
  if (req) {

    //Get data
    const user = req.me;
    const serverUrl = req.originalUrl;
    const clientUrl = req.headers.referer;
    const serverVersion = req.app.locals.APP_VERSION;
    const clientVersion = req.headers['x-version'];

    //Get request info
    const body = req.body;
    const query = req.query;
    const method = req.method.toUpperCase();
    const headers = req.headers;

    //Prepare extra context
    data.extra = {
      serverUrl, serverVersion,
      clientUrl, clientVersion,
      body, query, method, headers,
    };

    //Set user context if user present
    if (user && user._id) {
      const id = user._id.toString();
      raven.setContext({id});
    }
  }

  //Capture exception
  raven.captureException(error, data);

  //Next middleware
  next(error);
};
