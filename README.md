# meanie-express-error-handling

[![npm version](https://img.shields.io/npm/v/meanie-express-error-handling.svg)](https://www.npmjs.com/package/meanie-express-error-handling)
[![node dependencies](https://david-dm.org/meanie/express-error-handling.svg)](https://david-dm.org/meanie/express-error-handling)
[![github issues](https://img.shields.io/github/issues/meanie/express-error-handling.svg)](https://github.com/meanie/express-error-handling/issues)
[![codacy](https://img.shields.io/codacy/4864254c6487475690821ffd20c498f0.svg)](https://www.codacy.com/app/meanie/express-error-handling)


A collection of error types, handlers and middleware for use with [Meanie Express Seed](https://github.com/meanie/express-seed) projects

![Meanie](https://raw.githubusercontent.com/meanie/meanie/master/meanie-logo-full.png)

## Installation

You can install this package using `npm`.

```shell
npm install meanie-express-error-handling --save
```

## Configuration
```js
//Load library
const errors = require('meanie-express-error-handling');

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

Use some of the pre defined error types:

```js
//Load error
const BadRequestError = errors.BadRequestError;

//Use in route
someRoute(req, res, next) {
  if (somethingBad()) {
    return next(new BadRequestError('Bad things'))
  }
  next();
}
```

See the [Meanie Express Seed](https://github.com/meanie/express-seed) for usage.

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [meanie-express-error-handling issue tracker](https://github.com/meanie/express-error-handling/issues).

## Contributing

Pull requests are welcome! If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Credits

* Meanie logo designed by [Quan-Lin Sim](mailto:quan.lin.sim+meanie@gmail.com)

## License
(MIT License)

Copyright 2016-2017, [Adam Reis](http://adam.reis.nz)
