'use strict';

/**
 * Error middleware service
 */
let service = {

  /**
   * Registered middleware
   */
  middlewares: {},

  /**
   * Register a middleware for use
   */
  register(key, handler) {
    service.middlewares[key] = handler;
  },

  /**
   * Load a stack of middlewares
   */
  middleware(types) {
    return types
      .map(type => service.middlewares[type])
      .filter(handler => !!handler);
  },

  /**
   * This is a wrapper function to send an error through the basic error
   * handlers, e.g. normalize, log etc. This should *not* be used as
   * error handling middleware, but rather in cases where you want to capture
   * an error, yet don't want it to break the response. By using this handler,
   * you avoid silent errors that go unnoticed. Req can be used to extract info
   * from the request.
   */
  handler(error, req) {

    //Must have request specified
    if (!req || typeof req !== 'object') {
      console.warn('Error handler must be called with the request object');
      return;
    }

    //Must have error middleware config
    if (!Array.isArray(req.app.locals.ERROR_MIDDLEWARE)) {
      console.warn('Error middleware');
      return;
    }

    //Load error middleware stack
    let stack = service.middleware(req.app.locals.ERROR_MIDDLEWARE);
    if (stack.length === 0) {
      return;
    }

    //Create next handler
    let i = 0;
    let next = function(error) {
      if (stack[i] && typeof stack[i] === 'function') {
        stack[i++](error, req, null, next);
      }
    };

    //Call first middleware
    next(error);
  },
};

//Register middleware
let path = './middleware/';
let middleware = [
  'auth-clear-cookie', 'issue-on-github',
  'log-to-console', 'log-to-gcloud',
  'normalize', 'send',
];
middleware.forEach(name => service.register(name, require(path + name)));

//Register error types
let types = require('./types');
for (let type in types) {
  if (types.hasOwnProperty(type)) {
    service[type] = types[type];
  }
}

/**
 * Export
 */
module.exports = service;
