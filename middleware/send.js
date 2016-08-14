'use strict';

/**
 * Dependencies
 */
const types = require('../types');
const ReportedError = types.ReportedError;

/**
 * Module export
 */
module.exports = function(error, req, res, next) {
  next = next || null;

  //Headers already sent?
  if (res.headersSent) {
    return;
  }

  //Reported errors don't need to be sent back to the client, so end the request
  if (error instanceof ReportedError) {
    return res.end();
  }

  //Initialise data
  let json;
  let status = error.status || 500;

  //Check if we have a to JSON converter present
  if (typeof error.toJSON === 'function' && (json = error.toJSON())) {
    res.status(status).json(json);
  }
  else {
    res.status(status).end();
  }
};
