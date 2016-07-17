# meanie-express-error-handling

[![npm version](https://img.shields.io/npm/v/meanie-express-error-handling.svg)](https://www.npmjs.com/package/meanie-express-error-handling)
[![node dependencies](https://david-dm.org/meanie/express-error-handling.svg)](https://david-dm.org/meanie/express-error-handling)
[![github issues](https://img.shields.io/github/issues/meanie/express-error-handling.svg)](https://github.com/meanie/express-error-handling/issues)
[![codacy](https://img.shields.io/codacy/4864254c6487475690821ffd20c498f0.svg)](https://www.codacy.com/app/meanie/express-error-handling)
[![Join the chat at https://gitter.im/meanie/meanie](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg)](https://gitter.im/meanie/meanie?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A collection of error types, handlers and middleware for use with [Meanie Express Seed](https://github.com/meanie/express-seed) projects

![Meanie](https://raw.githubusercontent.com/meanie/meanie/master/meanie-logo-full.png)

## Installation

You can install this package using `npm`.

```shell
npm install meanie-express-error-handling --save
```

## Usage

Register new or override existing error handling middleware:

```js
let errors = require('meanie-express-error-handling');
let issueOnGithub = function(error, req, res, next) { };
errors.register('issue-on-github', issueOnGithub);
```

Load a specific stack of pre-registered error handling middleware:

```js
let errors = require('meanie-express-error-handling');
let stack = errors.middleware(['normalize', 'issue-on-github']);
```

Run error through configured error handling middleware stack:

```js
let errors = require('meanie-express-error-handling');

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
let errors = require('meanie-express-error-handling');
let BadRequestError = errors.BadRequestError;

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

Copyright 2016, [Adam Buczynski](http://adambuczynski.com)
