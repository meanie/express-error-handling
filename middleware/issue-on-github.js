'use strict';

/**
 * Dependencies
 */
let github = require('meanie-express-github-service');

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //Skip trivial errors
  if (error.isTrivial) {
    return next(error);
  }

  //Get context
  let {
    origin, user, userAgent,
    serverVersion, serverUrl,
    clientVersion, clientUrl,
  } = error.context;

  //Prepare labels and title
  let labels = ['error', origin];
  let title = error.message;

  //Initialize body parts
  let parts = [];

  //Context
  parts.push('\n### Context');
  parts.push('Origin: **' + origin + '**');
  parts.push('Server version: **' + serverVersion + '**');
  parts.push('Client version: **' + clientVersion + '**');
  parts.push('Server URL: `' + serverUrl + '`');
  parts.push('Client URL: `' + (clientUrl || '–') + '`');

  //User data
  if (user) {
    parts.push('User: `' + user.id + '`');
  }

  //User agent
  if (userAgent) {
    parts.push('\n### User agent');
    parts.push('`' + userAgent + '`');
  }

  //Stack trace
  if (error.stack) {
    parts.push('\n### Stack trace');
    parts.push('```');
    parts.push(error.stack);
    parts.push('```');
  }

  //Get github data
  const GITHUB_USER = req.app.locals.GITHUB_USER;
  const GITHUB_REPO = req.app.locals.GITHUB_REPO;
  const GITHUB_TOKEN = req.app.locals.GITHUB_TOKEN;

  //Create body from body parts and prepare data for issue
  let body = parts.join('\n');
  let data = {
    title, body, labels,
    user: GITHUB_USER,
    repo: GITHUB_REPO,
  };

  //Authenticate and create issue
  github.authenticate(GITHUB_TOKEN);
  github.issues.create(data)
    .catch(error => console.log(error))
    .finally(() => next(error));
};
