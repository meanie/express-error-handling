'use strict';

/**
 * Error middleware service
 */
const service = {

  /**
   * Registered middleware
   */
  middlewares: {},

  /**
   * Enabled middleware types
   */
  types: ['normalize', 'log-to-console', 'send'],

  /**
   * Register a middleware for use
   */
  register(key, handler) {
    service.middlewares[key] = handler;
  },

  /**
   * Specify which middleware types to use
   */
  use(types) {
    if (!Array.isArray(types)) {
      throw new Error('Must specify an array of middleware types');
    }
    service.types = types;
  },

  /**
   * Get middleware stack
   */
  middleware(types) {
    types = types || service.types;
    return types
      .map(type => service.middlewares[type])
      .filter(handler => !!handler);
  },

  /**
   * This is a wrapper function to send an error through the basic error
   * handlers, e.g. normalize, log etc. This should *not* be used as
   * error handling middleware, but rather in cases where you want to capture
   * an error, yet don't want it to break the response. By using this handler,
   * you avoid silent errors that go unnoticed. A request object can be passed
   * to extract info from the request.
   */
  handler(error, req) {

    //Load error middleware stack
    const stack = service.middleware();
    if (stack.length === 0) {
      return;
    }

    //Create next handler
    let i = 0;
    const next = function(error) {
      if (stack[i] && typeof stack[i] === 'function') {
        stack[i++](error, req, null, next);
      }
    };

    //Call first middleware
    next(error);
  },
};

//Register middleware
const path = './middleware/';
const middleware = [
  'normalize', 'log-to-console', 'track-with-sentry', 'send',
];
middleware.forEach(name => service.register(name, require(path + name)));

/**
 * Export
 */
module.exports = service;
