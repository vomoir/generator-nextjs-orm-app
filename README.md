# generator-generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-generator.svg?branch=master)](https://travis-ci.org/yeoman/generator-generator) 
[![Coverage Status](https://coveralls.io/repos/yeoman/generator-generator/badge.svg?branch=master&service=github)]
(https://coveralls.io/github/yeoman/generator-generator?branch=master)


> Yeoman generator generating a Yeoman generator

![Yo dawg, I heard you like generators?](http://i.imgur.com/2gqiift.jpg)


## Getting started

- Install: `npm install -g yo generator-generator`
- Run: `yo generator`


## Commands

* `yo generator` shows a wizard for generating a new generator
* `yo generator:subgenerator <name>` generates a subgenerator with the name `<name>`


## What do you get?

Scaffolds out a complete next js demo app structure for you:

```
.
+---public
¦   +---customers
+---src
    +---app
    ¦   +---dashboard
    ¦       +---(overview)
    ¦       +---customers
    ¦       +---invoices
    ¦       ¦   +---create
    ¦       ¦   +---[id]
    ¦       ¦       +---edit
    ¦       +---reports
    +---components
```

Refer to [our documentation](http://yeoman.io/authoring/) to learn more about creating a Yeoman generator.

### Running tests

Run `npm test` to run your test suite.

These tests will be run automatically in your git repository if you connect [Travis CI](https://travis-ci.org/profile). You can also track test coverage using [Coveralls](https://coveralls.io).

## Contributing

See the [contribution docs](http://yeoman.io/contributing/).


