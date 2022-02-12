# @meanie/express-error-handling

[![npm version](https://img.shields.io/npm/v/@meanie/express-error-handling.svg)](https://www.npmjs.com/package/@meanie/express-error-handling)
[![github issues](https://img.shields.io/github/issues/meanie/express-error-handling.svg)](https://github.com/meanie/express-error-handling/issues)

Error handlers and middleware for use in Express or [Meanie Express Seed](https://github.com/meanie/express-seed) projects

## 🚨 DEPRECATED 🚨 
This package is deprecated and no longer maintained. It is recommended to generate your own custom error handling middleware stack going forward. You are welcome to copy the error handlers from this package and embed them into your own projects.

## Installation

You can install this package using `yarn` or `npm`.

```shell
#yarn
yarn add @meanie/express-error-handling

#npm
npm install @meanie/express-error-handling --save
```

## Configuration

```js
//Load library
const errors = require('@meanie/express-error-handling');

//Define some custom middleware
const myHandler = function(error, req, res, next) { ... };

//Register it with the error handler
errors.register('my-handler', myHandler);

//Specify default middleware stack to use
errors.use([
  'normalize', 'track-with-sentry', 'my-handler', 'log-to-console',
]);
```

## Usage

Load stack of pre-registered error handling middleware:

```js
const stack = errors.middleware();
```

Use it as express middleware:

```js
stack.forEach(handler => app.use(handler));
```

Run an error through error handling middleware stack:

```js
someRoute(req, res, next) {
  doSomething()
    .then(() => {

      //End response
      res.end();

      //Do something else async which won't be part of the request
      //error handling stack, but catch and process the errors anyway.
      doSomethingElse()
        .catch(error => errors.handler(error, req));
    })
    .catch(next);
}
```

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [@meanie/express-error-handling issue tracker](https://github.com/meanie/express-error-handling/issues).

## Contributing

Pull requests are welcome! If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Sponsor

This package has been kindly sponsored by [Hello Club](https://helloclub.com?source=meanie), an [all in one club and membership management solution](https://helloclub.com?source=meanie) complete with booking system, automated membership renewals, online payments and integrated access and light control. Check us out if you happen to belong to any kind of club or if you know someone who helps run a club!

## License

(MIT License)

Copyright 2016-2022, Adam Reis
