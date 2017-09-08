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
  const data = {req};

  //Context available?
  if (req) {

    //Get data
    const {app: {locals}, body, query, headers, originalUrl} = req;
    const method = req.method.toUpperCase();
    const serverUrl = originalUrl;
    const clientUrl = headers.referer;
    const serverVersion = locals.APP_VERSION;
    const clientVersion = headers['x-version'];

    //Set extra data and tags
    data.extra = {
      serverUrl, serverVersion,
      clientUrl, clientVersion,
      body, query, method, headers,
    };
  }

  //Capture exception
  raven.captureException(error, data);

  //Next middleware
  next(error);
};
