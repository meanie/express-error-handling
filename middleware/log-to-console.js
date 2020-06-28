'use strict';

/**
 * Dependencies
 */
const chalk = require('chalk');

/**
 * Module export
 */
module.exports = function logToConsole(error, req, res, next) {

  //Log full error if not a trivial error
  if (error.stack && !error.isTrivial) {
    console.error(error.stack);
  }

  //Log only error name and message otherwise
  else {
    console.log(chalk.red(
      error.name + (error.message ? (': ' + error.message) : '')
    ));
  }

  //Call next middleware
  next(error);
};
