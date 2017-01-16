/* eslint no-unused-vars: off */
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

  //No response object present? Don't use this middleware
  if (!res) {
    return;
  }

  //Headers already sent?
  if (res.headersSent) {
    return;
  }

  //Reported errors don't need to be sent back to the client, so end the request
  if (error instanceof ReportedError) {
    return res.end();
  }

  //Initialise data
  const status = error.status || 500;
  let json;

  //Check if we have a to JSON converter present
  if (typeof error.toJSON === 'function' && (json = error.toJSON())) {
    res.status(status).json(json);
  }
  else {
    res.status(status).end();
  }
};
