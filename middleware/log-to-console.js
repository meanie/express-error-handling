'use strict';

/**
 * Dependencies
 */
const chalk = require('chalk');
const types = require('../types');
const ValidationError = types.ValidationError;
const ReportedError = types.ReportedError;

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //Don't log reported errors
  if (error instanceof ReportedError) {
    return next(error);
  }

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

  //Log validation errors fields
  if (error instanceof ValidationError && error.data && error.data.fields) {
    let fields = error.data.fields;
    let lines = [];
    for (let field in fields) {
      if (fields.hasOwnProperty(field)) {
        let message = fields[field].message || fields[field].type;
        lines.push(chalk.red('  - ', field + ':', message));
      }
    }
    if (lines.length) {
      console.log(chalk.red('\nFields:'));
      lines.forEach(line => console.log(chalk.red(line)));
    }
  }

  //Call next middleware
  next(error);
};
