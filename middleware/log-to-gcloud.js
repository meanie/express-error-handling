'use strict';

/**
 * Dependencies
 */
const fs = require('fs');

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //Skip trivial errors
  if (error.isTrivial) {
    return next(error);
  }

  //Get locals
  const APP_NAME = req.app.locals.APP_NAME;
  const APP_VERSION = req.app.locals.APP_VERSION;
  const LOG_PATH = req.app.locals.GCLOUD_LOG_PATH;
  const LOG_FILE = req.app.locals.GCLOUD_LOG_FILE;

  //Create context
  let context;
  if (req) {
    context = {
      httpRequest: {
        method: req.method,
        url: req.originalUrl,
        userAgent: req.headers['user-agent'],
        remoteIp: req.ip,
      },
      user: req.me ? req.me._id : '',
    };
  }

  //Create error data for log file
  let data = {
    eventTime: Date.now(),
    serviceContext: {
      service: APP_NAME,
      version: APP_VERSION,
    },
    message: error.stack,
    context,
  };

  //Write to log file
  fs.appendFile(LOG_PATH + LOG_FILE, JSON.stringify(data), () => {
    next(error);
  });
};
