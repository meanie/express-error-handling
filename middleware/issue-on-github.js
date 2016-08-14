'use strict';

/**
 * Dependencies
 */
const github = require('meanie-express-github-service');
const errors = require('../index');

/**
 * Module export
 */
module.exports = function(error, req, res, next) {

  //Skip trivial errors
  if (error.isTrivial) {
    return next(error);
  }

  //Get error context
  const user = req.me;
  const origin = error.origin || 'server';
  const version = req.app.locals.APP_VERSION;
  const environment = req.app.locals.ENV;
  const serverUrl = req.originalUrl;
  const clientUrl = req.headers.referer;
  const userAgent = req.headers['user-agent'];

  //Prepare labels and title
  let labels = ['error', origin, environment];
  let title = error.message;

  //Initialize body parts
  let parts = [];

  //Context
  parts.push('\n### Context');
  parts.push('Environment: **' + environment + '**');
  parts.push('Origin: **' + origin + '**');
  parts.push('Version: **' + version + '**');
  parts.push('Server URL: `' + serverUrl + '`');
  parts.push('Client URL: `' + clientUrl + '`');

  //User data
  if (user && user._id) {
    parts.push('User: `' + user._id.toString() + '`');
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

  //Authenticate
  github.authenticate({
    type: 'oauth',
    token: GITHUB_TOKEN,
  });

  //First see if it exists already
  github.search.issuesAsync({
    q: 'state:open type:issue in:title "' + title + '"',
    user: GITHUB_USER,
    repo: GITHUB_REPO,
  })
    .then(result => {

      //If it doesn't exist, create now
      if (result.items.length === 0) {
        return github.issues.createAsync(data);
      }
    })
    .catch(error => errors.handler(error, req))
    .finally(() => next(error));
};
