'use strict';

/**
 * Dependencies
 */
const chalk = require('chalk');

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //Log stack if present and if not a trivial error
  if (error.stack && !error.isTrivial) {
    console.log(chalk.red(error.stack));
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
