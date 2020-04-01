# Development setup

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

## Requirements
  - Docker
  - An editorconfig plugin for your editor of choice.

## First run

Note: Only tested on Mac OS X and Linux so far.
Assuming you have a functional make and docker on your system, you only need to run:

```
$ make
```
It will:

1. Build the docker images for the different containers (NodeJS environment), and fetch all dependencies.

2. Install dependencies of the application.

3. Run all docker containers.

After it finishes you will see something like this on your console:

```
 [nodemon] 1.19.1
 [nodemon] to restart at any time, enter `rs`
 [nodemon] watching: *.*
 [nodemon] starting `babel-node src/index.js`
 app Let's rock!! 🤘🏻🚀
 app Server running at http://127.0.0.1:8085/
 app graphQL server running at http://127.0.0.1:8085/gql/
 app graphQL server running at http://127.0.0.1:8085/api-docs

```

## Contributing

This repository had a [EditorConfig](.editorconfig) file that defines the basic rules on writing code. more information [here](https://editorconfig.org/)

[ESLint](https://eslint.org/) is our default linter and we follow the [airbnb code standard](https://github.com/airbnb/javascript), for formatting we use [Prettier](https://prettier.io/), this tools run in a pre-commit hook for validation of the rules in ESLint and autoformating the staged code by rettier
