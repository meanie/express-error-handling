/* eslint no-unused-vars: off */
'use strict';

/**
 * Module export
 */
module.exports = function send(error, req, res, next) {

  //No response object present or headers already sent?
  if (!res || res.headersSent) {
    return;
  }

  //Get status
  const status = error.status || 500;

  //Check if we have a to JSON converter present
  if (typeof error.toJSON === 'function') {
    const json = error.toJSON();
    if (json) {
      return res.status(status).json(json);
    }
  }

  //End with status only
  res.status(status).end();
};
